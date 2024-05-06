import Joi from "joi";
import { Certificate } from "../models";
import { MAX_STRING_SIZE} from "@/configs";
import {AsyncValidate} from "@/utils/types";

// import { FileUpload} from "@/utils/types";
import { convertToTimestamp, tryValidateOrDefault } from "@/utils/helpers";

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("created_at", "name", ), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "desc"),
}).unknown(true);

export const createItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Tên chứng chỉ"),
    time: Joi.string()
        .required()
        .label("Thời gian nhận")
        .custom((value, helpers) => convertToTimestamp(value, helpers)),
    author_id: Joi
        .string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label("Mã tác giả")
        .custom(
            (value, helpers) => 
                new AsyncValidate(value, async function () {
                    const certificate = await Certificate.findOne({author_id: value});
                    return !certificate ? value : helpers.error("any.exists");
                }),
        )
});

export const updateItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Tên chứng chỉ"),
    time: Joi.string()
        .required()
        .label("Thời gian nhận")
        .custom((value, helpers) => convertToTimestamp(value, helpers)),
    author_id: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Mã tác giả")
        .custom(
            (value, helpers) => 
                new AsyncValidate(value, async function (req) {
                    const certificate = await Certificate.findOne({author_id: value, _id: { $ne: req.certificate._id} });
                    return !certificate ? value : helpers.error("any.exists");
                }),
        )
});
// export const resetPassword = Joi.object({
//     new_password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label("Mật khẩu"),
// });
