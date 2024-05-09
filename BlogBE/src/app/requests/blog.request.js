import Joi from "joi";
import { MAX_STRING_SIZE, SUPER_STRING} from "@/configs";
import { AsyncValidate, FileUpload} from "@/utils/types";
import { tryValidateOrDefault } from "@/utils/helpers";
import { Category } from "../models";
// import { isUndefined } from "lodash";

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("created_at", "title", "categories"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "desc"),
    authorId: tryValidateOrDefault(Joi.string().trim(), ""),
    categoryId: tryValidateOrDefault(Joi.string().trim(), "")
}).unknown(true);

export const createItem = Joi.object({
    title: Joi.string().max(MAX_STRING_SIZE).required().label("Tiêu đề"),
    // .custom(
    //     (value, helpers) =>
    //         new AsyncValidate(value, async function () { //req: được lấy ra từ middle trước đó
    //         // console.log(req.currentUser);            // chỉ req mới được truyền lần lượt theo các middleware
    //             const blog = await Blog.findOne({title: value});
    //             return !blog ? value : helpers.error("any.exists");
    //         }),
    // ),
    thumbnail: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh nền"),
    })
        .instance(FileUpload)
        .allow("")
        .label("Ảnh nền"),
    


    content: Joi.string()
        .trim()
        .max(SUPER_STRING)
        // .required()
        .label("Nội dung"),

    author_id: Joi.string()
        .trim()
        .allow("")//chỉ được phép có giá trị
        .required()
        .label("Tác giả"),
    categories: Joi.array().allow("").max(MAX_STRING_SIZE).label("Danh mục")
    // .custom(
    //     (value, helpers) =>
    //         new AsyncValidate(value, async function () { //req: được lấy ra từ middle trước đó
    //         // console.log(req.currentUser);            // chỉ req mới được truyền lần lượt theo các middleware
    //             // const categories = await Category.find({ _id: value});
    //             // return !categories ? value : helpers.error("any.exists");
    //             // const uniqueArray = [...new Set(value)];

    //             // return uniqueArray;
                   
    //             //lấy ra tất cả các id của 1 bảng
    //             const allCategory = await Category.find({}, "_id");
    //             const allCategorys = allCategory.map(category => category._id);

    //             // lấy ra các category trùng vs category có trong csdl
    //             const categories = allCategorys.filter(e => value.includes(e.toString()));

    //             return categories.length > 0 ? categories : helpers.error("any.invalid");

        //         }),
        // ),
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const categories = await Category.find({_id: {$in: value}});
                    return categories.length === value.length ? value : helpers.error("any.notExistsCategory");
                }),
        ),

        
});

export const updateItem = Joi.object({
    title: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Tiêu đề"),
    thumbnail: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().label("Ảnh nền"),
    })
        .instance(FileUpload)
        .allow("")
        .label("Ảnh nền"),


    content: Joi.string()
        .trim()
        .max(SUPER_STRING)
        .required()
        .label("Nội dung"),

    author_id: Joi.string()
        .trim()
        .allow("")
        .required()
        .label("Tác giả"),
    
    categories: Joi.array().allow("").max(MAX_STRING_SIZE).label("Danh mục")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const categories = await Category.find({_id: {$in: value}});
                    return categories.length === value.length ? value : helpers.error("any.notExistsCategory");
                }),
        ),
});

// export const resetPassword = Joi.object({
//     new_password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label("Mật khẩu"),
// });
