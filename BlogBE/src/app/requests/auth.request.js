import Joi from "joi";
import {User} from "../models";
import {MAX_STRING_SIZE, VALIDATE_PHONE_REGEX, VALIDATE_SPECIAL_CHARACTERS} from "@/configs";
import {AsyncValidate, FileUpload} from "@/utils/types";
import {comparePassword} from "@/utils/helpers";

export const login = Joi.object({
    email: Joi.string().trim().max(MAX_STRING_SIZE).lowercase().email().required().label("Email"),
    password: Joi.string().max(MAX_STRING_SIZE).required().label("Mật khẩu"),
});

export const register = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required().label("Họ và tên")
        .pattern(VALIDATE_SPECIAL_CHARACTERS)
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
        .lowercase()
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
    password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label("Mật khẩu"),
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
    avatar: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh đại diện"),
    })
    //binary: kiểm tra có phải fileupload k
    //instance: kiểm tra có phải khởi tạo từ class fileupload, kiểm tra tính hợp lệ 
        .instance(FileUpload)
        .allow("")
        .label("Ảnh đại diện")
        // .required(),

    
    // Upload với nhiều ảnh
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

export const updateProfile = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Họ và tên").pattern(VALIDATE_SPECIAL_CHARACTERS),
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .max(MAX_STRING_SIZE)
        .required()
        .label("Email")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const user = await User.findOne({email: value, _id: {$ne: req.currentUser._id}});
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
                new AsyncValidate(value, async function (req) {
                    const user = await User.findOne({phone: value, _id: {$ne: req.currentUser._id}});
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
        .allow("") //.allow("") được sử dụng trong Joi để chỉ định rằng một chuỗi rỗng là một giá trị hợp lệ cho dữ liệu
        .label("Ảnh đại diện")
        // .required(),
});

export const changePassword = Joi.object({
    password: Joi.string()
        .required()
        .label("Mật khẩu cũ")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, (req) =>
                    comparePassword(value, req.currentUser.password)
                        ? value
                        : helpers.message("{#label} không chính xác"),
                ),
        ),
    new_password: Joi.string()
        .min(6)
        .max(MAX_STRING_SIZE)
        .required()
        .label("Mật khẩu mới")
        .invalid(Joi.ref("password")),
});

export const changeAvatar = Joi.object({
    avatar: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh đại diện"),
    })
        .instance(FileUpload)
        .allow("") //.allow("") được sử dụng trong Joi để chỉ định rằng một chuỗi rỗng là một giá trị hợp lệ cho dữ liệu
        .label("Ảnh đại diện")
});
