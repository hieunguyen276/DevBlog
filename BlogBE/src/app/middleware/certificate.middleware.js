import {isValidObjectId} from "mongoose";
import {responseError} from "@/utils/helpers";
import {Certificate} from "@/app/models";

export const checkCertificateId = async function (req, res, next) {
    const _id = req.params.id;

    if (isValidObjectId(_id)) {
        const certificate = await Certificate.findOne({_id});
        if (certificate) {
            req.certificate = certificate;
            return next();
        }
    }

    return responseError(res, 404, "Chứng chỉ không tồn tại hoặc đã bị xóa");
};
