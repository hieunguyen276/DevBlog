import Joi from "joi";
import {Author} from "../models";
import {MAX_STRING_SIZE, SUPER_STRING, VALIDATE_SPECIAL_CHARACTERS} from "@/configs";
import {AsyncValidate, FileUpload} from "@/utils/types";
import {convertToTimestamp, tryValidateOrDefault} from "@/utils/helpers";
import { AUTHOR_STATUS } from "../middleware/common/enum";


export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("created_at", "name", "email"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "asc"),
}).unknown(true);

export const createItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Họ và tên tác giả")
        .replace(/ + /g, " ")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    return VALIDATE_SPECIAL_CHARACTERS.test(value) ? value : helpers.error("string.invalidName");
                }),
        ), //.alphanum()
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label("Email")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await Author.findOne({email: value});
                    return !user ? value : helpers.error("any.exists");
                }),
        ),
    bio: Joi.string().trim().max(SUPER_STRING).required().label("Tiểu sử"),
    avatar: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh đại diện"),
    })
        .instance(FileUpload)
        .allow("")
        .label("Ảnh đại diện"),
    birthday: Joi.string().label("Ngày sinh").custom((value, helpers) => convertToTimestamp(value, helpers)),
    status: Joi.number().max(MAX_STRING_SIZE).required().label("Trạng thái").valid(...Object.values(AUTHOR_STATUS)),
    certificateName: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Tên chứng chỉ"),
    certificateTime: Joi.string()
        .required()
        .label("Thời gian nhận")
        .custom((value, helpers) => convertToTimestamp(value, helpers)),
});

export const updateItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Họ và tên tác giả"),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label("Email")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) { //req: được lấy ra từ middle trước đó
                    // console.log(req.currentUser);            // chỉ req mới được truyền lần lượt theo các middleware
                    const author = await Author.findOne({ email: value, _id: { $ne: req.author._id } });
                    return !author ? value : helpers.error("any.exists");
                }),
        ),
    bio: Joi.string().trim().max(SUPER_STRING).required().label("Tiểu sử"),
    avatar: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh đại diện"),
    })
        .instance(FileUpload)
        .allow("")
        .label("Ảnh đại diện"),
        
    birthday: Joi.string().trim().required().label("Ngày sinh").custom((value, helpers) => convertToTimestamp(value, helpers)),
    status: Joi.number().max(MAX_STRING_SIZE).required().label("Trạng thái"),
    certificateName: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Tên chứng chỉ"),
    certificateTime: Joi.string()
        .required()
        .label("Thời gian nhận")
        .custom((value, helpers) => convertToTimestamp(value, helpers)),
});
