import jwt, {JsonWebTokenError, NotBeforeError, TokenExpiredError} from "jsonwebtoken";
import {isUndefined} from "lodash";
import {User} from "@/app/models";
import {tokenBlocklist} from "@/app/services/auth.service";
import {SECRET_KEY, TOKEN_TYPE} from "@/configs";
import {responseError, getToken} from "@/utils/helpers";

export async function verifyToken(req, res, next) {
    try {
        const token = getToken(req.headers);

        if (token) {

            // kiểm tra xem token đó có nằm trong danh sách token bị chặn hay không:
            //allowedToken là true, tức là token không nằm trong danh sách bị chặn, thì tiếp tục xử lý.
            const allowedToken = isUndefined(await tokenBlocklist.get(token)); 
            if (allowedToken) {

                //jwt.verify() để xác thực token và lấy thông tin từ token
                const {type, data} = jwt.verify(token, SECRET_KEY);

                //kiểm tra xem type của token có phải là TOKEN_TYPE.AUTHORIZATION hay không:
                if (type === TOKEN_TYPE.AUTHORIZATION) {
                    const user = await User.findOne({_id: data.user_id});
                    if (user) {
                        req.currentUser = user;
                        return next();
                    }
                }
            }
        }

        return responseError(res, 401, "Từ chối truy cập");
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
                return responseError(res, 401, "Mã xác thực đã hết hạn");
            } else if (error instanceof NotBeforeError) {
                return responseError(res, 401, "Mã xác thực không hoạt động");
            } else {
                return responseError(res, 401, "Mã xác thực không hợp lệ");
            }
        }

        return next(error);
    }
}
