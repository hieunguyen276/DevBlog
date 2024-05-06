import {isValidObjectId} from "mongoose";
import {responseError} from "@/utils/helpers";
import {Blog} from "@/app/models";

export const checkBlogId = async function (req, res, next) {
    const _id = req.params.id;

    if (isValidObjectId(_id)) {
        const blog = await Blog.findOne({_id});
        if (blog) {
            req.blog = blog;
            return next();
        }
    }

    return responseError(res, 404, "Bài viết không tồn tại hoặc đã bị xóa");
};
