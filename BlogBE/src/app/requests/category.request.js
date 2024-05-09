import Joi from "joi";
// import { Blog } from "../models";
import { MAX_STRING_SIZE, SUPER_STRING} from "@/configs";
// import { FileUpload} from "@/utils/types";
import { tryValidateOrDefault } from "@/utils/helpers";

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid( "name"), "name"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "asc"),
}).unknown(true);

export const createItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Tên danh mục"),
    description: Joi.string()
        .trim()
        .max(SUPER_STRING)
        .required()
        .label("Mô tả"),
    // blogs: Joi.array()
    //     .label("Danh mục"),
});

export const updateItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Tên danh mục"),
    description: Joi.string()
        .trim()
        .max(SUPER_STRING)
        .required()
        .label("Mô tả"),
    // blogs: Joi.array()
    //     // .allow("")
    //     .required()
    //     .label("Danh mục")
});
// export const resetPassword = Joi.object({
//     new_password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label("Mật khẩu"),
// });

