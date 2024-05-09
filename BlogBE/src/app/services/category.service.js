import {Blog, Category} from "../models";
import {LINK_STATIC_URL} from "@/configs";
// import {generatePassword} from "@/utils/helpers";
// import * as blogService from "../services/blog.service";


export async function create({name, description, blogs}) {
    const category = new Category({
        name,
        description,
        blogs
    });
    await category.save();
    return category;
}

// Hàm tìm kiếm và lấy ra tất cả các category đưa vào các trang và sắp 
// xếp theo điều kiện

export async function filter({q, page, per_page, field, sort_order}) {
    q = q ? {$regex: q, $options: "i"} : null;

    // kiểm tra xem tham số q có giá trị (khác null hoặc undefined) hay không.
    //  Nếu có, nó tạo một object truy vấn biểu thức chính quy với khớp không phân
    //  biệt chữ hoa chữ thường và gán nó vào biến q. Nếu không, nó gán null cho q.
    const filter = {
        ...(q && {$or: [{name: q}]}),
    };

    const categorys = (
        // Tìm tát cả các tài liệu phù hợp với filter
        // loại trừ password, sau đó áp dụng phân trang
        await Category.find(filter, {password: 0})
            // .populate("blogs" , "title content thumbnails")
            // .populate({
            //     path: "blogs.author_id",
            //     select: "name bio"
            // })
            .skip((page - 1) * per_page) //chuyển trang
            .limit(per_page) //giới hạn số bản ghi trên 1 trang
            .sort({[field]: sort_order}) // sắp xếp kết quả truy vấn theo 1 trường cụ thể
    ).map((category) => { // sửa đổi mỗi đối tượng ng dùng nếu có avatar
        if (category.thumbnail) {
            category.thumbnail = LINK_STATIC_URL + category.thumbnail;
        }
        return category;
    });

    // Đếm số lượng tài liệu khớp với filter
    const total = await Category.countDocuments(filter);
    return {total, page, per_page, categorys};
}

export async function details(categoryId) {
    // const category = await Category.findById(categoryId)
    //     .populate("blogs" , "_id title content thumbnail author_id");

    // return category;
    const categoryDetails = await Category.aggregate([
        {
            $match: { _id: categoryId._id }, // Tìm bài viết cụ thể
        },
        {
            $lookup: {
                from: "blogs", // Tên bảng chứa danh mục
                localField: "blogs", // Trường tham chiếu trong bảng Blog
                foreignField: "_id", // Trường tham chiếu trong bảng Category
                as: "blogs", // Tên của mảng kết quả
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                blogs: {
                    $map: {
                        input: "$blogs",
                        as: "blog",
                        in: {
                            _id: "$$blog._id",
                            title: "$$blog.title",
                            content: "$$blog.content",
                            thumbnail: { $concat: [LINK_STATIC_URL, "$$blog.thumbnail"] },
                            categories: "$$blog.categories",
                            author_id: "$$blog.author_id",
                            status: "$$blog.status",
                            created_at: "$$blog.created_at",
                            updated_at: "$$blog.updated_at",
                        },
                    },
                },
            },
        }
    ]);
    
    return categoryDetails[0];
}

export async function update(category, {name, description}) {
    category.name = name;
    category.description = description;
    await category.save();
    return category;
}



export async function updateCategory(category_id, blog_id) {
    // Tìm danh mục theo category_id
    const category = await Category.findById(category_id);
    // Lọc bỏ blog_id khỏi mảng blogs của danh mục
    category.blogs = category.blogs.filter(blog => blog.toString() !== blog_id);
    console.log(category.blogs);
    // Lưu lại danh mục đã được cập nhật

    const blog = await Blog.findById(blog_id);
    // Lọc bỏ blog_id khỏi mảng blogs của danh mục
    blog.categories = blog.categories.filter(category => category.toString() !== category_id);
    console.log(blog.categories);

    await category.save();
    await blog.save();

    return {category, blog};

}



export async function remove(category) {
    await Category.deleteOne({_id: category._id});
    const blogs = category.blogs;
    for (const e of blogs) {
        await Blog.findByIdAndUpdate(
            e, {
                $pull: {
                    categories: category._id
                }
            }
        );
    }
}
