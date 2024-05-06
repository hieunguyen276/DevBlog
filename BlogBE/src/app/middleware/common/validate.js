import {validateAsync, responseError} from "@/utils/helpers";

export function validate(schema) {
    return async function (req, res, next) {
        const field = req.method === "GET" ? "query" : "body";

        //Xác định dữ liệu đầu vào
        const [value, error] = await validateAsync(schema, req[field], req);

        //Kiểm tra nếu có lỗi thì đẩy ra error
        if (Object.keys(error).length > 0) {
            return responseError(res, 400, "Validation Error", error);
        }

        // Gán giá trị đã xác thực vào trường tương ứng chuyển đến hàm tiếp theo
        req[field] = value;
        return next();
    };
}
