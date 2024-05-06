import { Blog, Category } from "../models";
import { LINK_STATIC_URL } from "@/configs";
// import {generatePassword} from "@/utils/helpers";
// import * as authorService from "../services/author.service";
// import * as categoryService from "../services/category.service";
import { FileUpload } from "@/utils/types";
// import { binary } from "joi";
// import { isArray } from "lodash";



export async function create({ title, content, thumbnail, author_id, categories }) {
    if (thumbnail) {
        thumbnail = thumbnail.save();
    }

    const blog = new Blog({
        title,
        content,
        thumbnail,
        author_id,
        categories
    });

    const saveBlog = await blog.save();

    // for (const e of categories) {
    //     await Category.findByIdAndUpdate(
    //         e, {
    //             $push: {
    //                 blogs: saveBlog._id
    //             }
    //         }
    //     );
    // }

    // return blog;

    return categories
        ? Promise.all(
            categories.map((categoryId) =>
                Category.findByIdAndUpdate(categoryId, { $push: { blogs: saveBlog._id } }),
            ),
        )
        : null;

    // if(category_ids) {
    //     for (const categoryId of category_ids) {
    //         await Category.findByIdAndUpdate(categoryId, {
    //             $push: {
    //                 post_ids: newPost._id,
    //             },
    //         });
    //     }
    //     return category_ids;
    // } else {
    //     return null;
    // }


}

// Hàm tìm kiếm và lấy ra tất cả các blog đưa vào các trang và sắp 
// xếp theo điều kiện

export async function filter({ q, page, per_page, field, sort_order, categoryId, authorId }) {
    q = q ? { $regex: q, $options: "i" } : null;

    // kiểm tra xem tham số q có giá trị (khác null hoặc undefined) hay không.
    //  Nếu có, nó tạo một object truy vấn biểu thức chính quy với khớp không phân
    //  biệt chữ hoa chữ thường và gán nó vào biến q. Nếu không, nó gán null cho q.
    const filter = {
        ...(q && { title: q }),
        ...(authorId && !categoryId && { author_id: authorId }),
        ...(categoryId && !authorId && { categories: categoryId }),
        ...(authorId && categoryId && { $or: [{ categories: categoryId }, { author_id: authorId }] })
    };

    const blogs = (
        // Tìm tát cả các tài liệu phù hợp với filter
        // loại trừ password, sau đó áp dụng phân trang
        await Blog.find(filter)
            .populate("author_id", "name email avatar bio birthday status") // Lấy thông tin chi tiết của trường author_id
            // .populate("author_id", "name email avatar bio birthday status", (err, author) => {
            //     if (author && author.avatar) {
            //         author.avatar = LINK_STATIC_URL + author.avatar;
            //     }
            //     return author;
            // })
            .populate("categories", "name description") // Lấy thông tin chi tiết của trường categories
            .skip((page - 1) * per_page)
            .limit(per_page) //giới hạn số bản ghi trên 1 trang
            .sort({ [field]: sort_order }) // sắp xếp kết quả truy vấn theo 1 trường cụ thể
    ).map((blog) => { // sửa đổi mỗi đối tượng ng dùng nếu có avatar
        if (blog.thumbnail) {
            blog.thumbnail = LINK_STATIC_URL + blog.thumbnail;
        }
        return blog;
    });

    // Đếm số lượng tài liệu khớp với filter
    const total = await Blog.countDocuments(filter);
    return { total, page, per_page, blogs };
}

export async function details(blogId) {
    // const blog = await Blog.findById(blogId);
    //     .populate("author_id", "name email avatar bio birthday status")
    //     .populate("categories", "name description");

    // blog.thumbnail = LINK_STATIC_URL + blog.thumbnail;

    // return blog;


    // blog.thumbnail = LINK_STATIC_URL + blog.thumbnail;

    // // Lấy thông tin chi tiết về tác giả từ author_id
    // if(blog.author_id) {
    //     const author = await Author.findById(blog.author_id);
    //     // Gán thông tin chi tiết về tác giả vào đối tượng blog
    //     blog.author_id = author;
    // } else {
    //     blog.author_id = null;
    // }

    
    // // Lấy thông tin chi tiết về danh mục từ mảng categories
    // const categoriesDetails = await Promise.all(blog.categories.map(async (categoryId) => {
    //     return await categoryService.details(categoryId);
    // }));
    // // Gán thông tin chi tiết về danh mục vào đối tượng blog
    // blog.categories = categoriesDetails;



    const blogDetails = await Blog.aggregate([
        {
            $match: { _id: blogId._id }, // Tìm bài viết cụ thể
        },
        {
            $lookup: {
                from: "categories", // Tên bảng chứa danh mục
                localField: "categories", // Trường tham chiếu trong bảng Blog
                foreignField: "_id", // Trường tham chiếu trong bảng Category
                as: "categories", // Tên của mảng kết quả
            },
        },
        {
            $lookup: {
                from: "authors", // Tên bảng chứa tác giả
                localField: "author_id", // Trường tham chiếu trong bảng Blog
                foreignField: "_id", // Trường tham chiếu trong bảng Author
                as: "author_id", // Tên của mảng kết quả
            },
        },
        {
            $project: {
                _id: 1,
                title: 1,
                content: 1,
                thumbnail: {$concat: [LINK_STATIC_URL, "$thumbnail"]}, // Thêm đường link tĩnh vào avatar
                categories: 1,
                author_id: {
                    _id: 1,
                    name: 1,
                    bio: 1,
                    avatar: { $concat: [LINK_STATIC_URL, { $arrayElemAt: ["$author_id.avatar", 0] }] }, // gán vào phần tử đầu tiên trong mảng
                    birthday: 1,
                    email: 1,
                    status: 1,
                    created_at: 1,
                    updated_at: 1,
                },
                created_at: 1,
                updated_at: 1
            },
        }
    ]);
    
    return blogDetails;

}

//----update kiểu cũ---------------------------

// export async function update(blog, { title, content, thumbnail, author_id, categories }) {
//     if (thumbnail) {
//         if (blog.thumbnail) {
//             FileUpload.remove(blog.thumbnail);
//         }
//         thumbnail = thumbnail.save("images");
//         blog.thumbnail = thumbnail;
//     }
//     blog.title = title;
//     blog.content = content;
//     blog.author_id ? (blog.author_id = author_id) : null;

//     // Lấy post cũ và category_ids cũ
//     const oldBlog = await Blog.findById(blog._id);
//     const oldCategoryIds = oldBlog.categories;

//     // Xóa post_ids cũ từ các danh mục hiện tại
//     for (const categoryId of oldCategoryIds) {
//         await Category.findByIdAndUpdate(categoryId, {
//             $pull: { blogs: blog._id },
//         });
//     }

//     // Cập nhật categories
//     blog.categories = categories;
//     await blog.save();

//     // Thêm post_ids mới vào các danh mục mới
//     for (const categoryId of categories) {
//         await Category.findByIdAndUpdate(categoryId, {
//             $addToSet: { blogs: blog._id },
//         });
//     }


    
// }

export async function update(blog, {title, content, thumbnail, author_id, categories}) {
    if (thumbnail && blog.thumbnail) {
        FileUpload.remove(blog.thumbnail);
    }
    if (thumbnail) {
        blog.thumbnail = thumbnail.save("images");
    }

    blog.title = title;
    blog.content = content;
    blog.author_id = author_id;
    blog.categories = categories;
    await blog.save();

    // const currentCategoryIds = blog.categories;

    // $in:Khớp với bất kỳ giá trị nào được chỉ định trong một mảng.
    // $pull	Loại bỏ tất cả các phần tử mảng khớp với một truy vấn 
    //$addToSet: Chỉ thêm khi không tồn tại
    // chọn bài viết ko nằm trong mảng danh mục truyền lên, xóa nó khỏi mảng post_ids


    // Lấy ra mảng tất cả các danh mục có chứa blog _id truyền lên, sau đó xóa tất cả các _id blog truyền lên
    // không nằm trong mảng danh mục 

    // $nin	Không khớp với giá trị nào được chỉ định trong một mảng.
    await Category.updateMany(
        {blogs: blog._id, _id: {$nin: categories}},
        {$pull: {blogs: blog._id}},
    );

    // Thêm blogs vào các danh mục mới

    // thêm blog_id vào mảng các danh mục truyền lên
    await Category.updateMany(
        {_id: {$in: categories}},
        {$addToSet: {blogs: blog._id}},
    );
}







// export async function resetPassword(blog, new_password) {
//     blog.password = generatePassword(new_password);
//     await blog.save();
//     return blog;
// }

export async function remove(blog) {
    await Blog.deleteOne({ _id: blog._id });
    const categories = blog.categories;
    for (const e of categories) {
        await Category.findByIdAndUpdate(
            e, {
                $pull: {
                    blogs: blog._id
                }
            }
        );
    }
}
