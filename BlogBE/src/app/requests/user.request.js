import Joi from "joi";
import {User} from "../models";
import {MAX_STRING_SIZE, VALIDATE_PHONE_REGEX, VALIDATE_SPECIAL_CHARACTERS} from "@/configs";
import {AsyncValidate, FileUpload} from "@/utils/types";
import {tryValidateOrDefault} from "@/utils/helpers";

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("phone", "name", "email"), "name"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "asc"),
}).unknown(true);

export const createItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Họ và tên").pattern(VALIDATE_SPECIAL_CHARACTERS)
        .replace(/ + /g, " ")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    return VALIDATE_SPECIAL_CHARACTERS.test(value) ? value : helpers.error("string.invalidName");
                }),
        ),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label("Email")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await User.findOne({email: value});
                    return !user ? value : helpers.error("any.exists");
                }),
        ),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .required()
        .label("Số điện thoại")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await User.findOne({phone: value});
                    return !user ? value : helpers.error("any.exists");
                }),
        ),
    password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label("Mật khẩu"),

    avatar: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh đại diện"),
    })
        .instance(FileUpload)
        .allow("")
        .label("Ảnh đại diện")

    //Up nhiều ảnh
    // avatar: Joi.array()
    //     .items(
    //         Joi.object({
    //             originalname: Joi.string().trim().required().label("Tên ảnh"),
    //             mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
    //                 .required()
    //                 .label("Định dạng ảnh"),
    //             buffer: Joi.binary().required().label("Ảnh đại diện"),
    //         })
    //             .instance(FileUpload)
    //             .label("Ảnh đại diện")
    //     )
    //     .label("Danh sách ảnh đại diện")
});

export const updateItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Họ và tên").pattern(VALIDATE_SPECIAL_CHARACTERS),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label("Email")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const userId = req.params.id;
                    const user = await User.findOne({email: value, _id: {$ne: userId}});
                    return !user ? value : helpers.error("any.exists");
                }),
        ),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow("")
        .required()
        .label("Số điện thoại")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {  //Kiểm tra có người dùng nào khác đã sử dụng sđt này chưa
                    const userId = req.params.id;
                    const user = await User.findOne({phone: value, _id: {$ne: userId}});
                    return !user ? value : helpers.error("any.exists");
                }),
        ),
    avatar: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh đại diện"),
    })
        .instance(FileUpload)
        .allow("")
        .label("Ảnh đại diện")
});

export const resetPassword = Joi.object({
    new_password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label("Mật khẩu"),
});
