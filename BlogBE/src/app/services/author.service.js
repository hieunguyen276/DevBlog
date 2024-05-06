import { FileUpload } from "@/utils/types";
import { Author, Blog, Certificate } from "../models";
import { LINK_STATIC_URL } from "@/configs";
// import { remove  } from "../controllers/certificate.controller";


// Nhận thông tin của tác giả và Certificate từ body của request
export async function create({ name, email, avatar, bio, birthday, status, certificateName, certificateTime  }) {

    if (avatar) {
        avatar = avatar.save();
    }

    // Tạo tác giả
    const author = new Author({
        name,
        email,
        bio,
        birthday,
        avatar,
        status,
    });

    // Lưu thông tin tác giả vào cơ sở dữ liệu
    const savedAuthor = await author.save();

    // Tạo Certificate sử dụng thông tin của tác giả đã tạo
    const certificate = new Certificate({
        name: certificateName,
        time: certificateTime,
        author_id: savedAuthor._id, // Sử dụng _id của tác giả đã tạo
    });

    // Lưu Certificate vào cơ sở dữ liệu
    await certificate.save();

}



// Hàm tìm kiếm và lấy ra tất cả các author đưa vào các trang và sắp 
// xếp theo điều kiện

export async function filter({ q, page, per_page, field, sort_order }) {
    q = q ? { $regex: q, $options: "i" } : null;

    // kiểm tra xem tham số q có giá trị (khác null hoặc undefined) hay không.
    //  Nếu có, nó tạo một object truy vấn biểu thức chính quy với khớp không phân
    //  biệt chữ hoa chữ thường và gán nó vào biến q. Nếu không, nó gán null cho q.


    // filter sẽ chứa các điều kiện truy vấn tùy thuộc vào giá trị của q, 
    // authorId và categoryId. Điều kiện truy vấn này có thể được sử dụng để 
    // tìm kiếm dữ liệu phù hợp trong một tác vụ tìm kiếm.
    const filter = {
        ...(q && { $or: [{ name: q }, { email: q }] }),
    };

    // const authors = (
    //     // Tìm tát cả các tài liệu phù hợp với filter
    //     // loại trừ password, sau đó áp dụng phân trang
    //     await Author.find(filter)
    //         .skip((page - 1) * per_page) 
    //         .limit(per_page) 
    //         .sort({ [field]: sort_order }) 
    // ).map((author) => { // sửa đổi mỗi đối tượng ng dùng nếu có avatar

    
    //     if (author.avatar) {
    //         author.avatar = LINK_STATIC_URL + author.avatar;
    //     }

    //     return author;
    // });


    //     const authors = await Author.aggregate([
    //         {
    //             $match: filter,
    //         },
    //         {
    //             $lookup: {
    //                 from: "certificates",
    //                 localField: "_id",
    //                 foreignField: "author_id",
    //                 as: "certificates",
    //             },
    //         },
    //         {
    //             $project: {
    //                 _id: 1,
    //                 name: 1,
    //                 email: 1,
    //                 bio: 1,
    //                 birthday: 1,
    //                 avatar: {$concat: [LINK_STATIC_URL, "$avatar"]}, // Thêm đường link tĩnh vào avatar
    //                 status: 1,
    //                 certificates: 1,
    //                 created_at: 1,
    //                 updated_at: 1,
    //             },
    //         },
    //         {
    //             $skip: (page - 1) * per_page,
    //         },
    //         {
    //             $limit: per_page,
    //         },
    //         {
    //             $sort: {[field]: sort_order === "desc" ? -1 : 1},
    //         },
    //     ]);

    //     // Đếm số lượng tài liệu khớp với filter
    //     const total = await Author.countDocuments(filter);
    //     return { total, page, per_page, authors };
    // }

    const authors = await Author.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "certificates",
                localField: "_id",
                foreignField: "author_id",
                as: "certificate",
            },
        },
        {
            $unwind: {
                path: "$certificate",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                bio: 1,
                birthday: 1,
                // avatar: {
                //     $concat: [LINK_STATIC_URL, "$avatar"],
                // },
                avatar: {
                    $cond: {
                        if: { $ne: ["$avatar", ""] }, // Nếu avatar không rỗng
                        then: { $concat: [LINK_STATIC_URL, "$avatar"] }, // Gắn LINK_STATIC_URL vào trước avatar
                        else: "" // Trả về chuỗi rỗng nếu không có avatar
                    }
                },
                status: 1,
                // certificates: 1,
                certificate: {
                    _id: 1,
                    name: 1,
                    time: 1,
                },
            // created_at: 1,
            // updated_at: 1,
            },
        },
        {
            $skip: (page - 1) * per_page,
        },
        {
            $limit: per_page,
        },
        {
            $sort: { [field]: sort_order === "desc" ? -1 : 1 },
        },
    ]);

    const total = await Author.countDocuments(filter);
    return { total, page, per_page, authors };
}

export async function details(authorId) {
    const author = await Author.aggregate([
        {
            $match: {_id: authorId._id},
        },
        {
            $lookup: {
                from: "certificates",
                localField: "_id",
                foreignField: "author_id",
                as: "certificates",
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                bio: 1,
                birthday: 1,
                avatar: {$concat: [LINK_STATIC_URL, "$avatar"]}, // Thêm đường link tĩnh vào avatar
                status: 1,
                certificates: 1,
                created_at: 1,
                updated_at: 1,
            },
        },

    ]);

    return author;
}

export async function update(author, { name, email, avatar, bio, birthday, status, certificateName, certificateTime }) {
    author.name = name;
    author.email = email;
    author.bio = bio;
    author.birthday = birthday;
    author.status = status;

    if (avatar) {
        if (author.avatar) {
            FileUpload.remove(author.avatar);
        }
        avatar = avatar.save("images");
        author.avatar = avatar;
    }


    // Trong trường hợp này, { new: true } là một tùy chọn trong phương thức findOneAndUpdate của Mongoose.
    //  Khi bạn đặt { new: true }, nó sẽ yêu cầu phương thức trả về tài liệu đã được cập nhật, sau khi cập 
    //  nhật đã được áp dụng. Điều này có nghĩa là sau khi cập nhật, biến certificate sẽ chứa tài liệu đã được 
    //  cập nhật, và bạn có thể truy cập vào thông tin mới của nó.
    // const certificate = await Certificate.findOneAndUpdate(
    //     { author_id: author.id },
    //     { name: certificateName, time: certificateTime },
    //     { new: true }
    // );

    // await certificate.save();


    const certificate = await Certificate.findOne({ author_id: author.id });
    if (certificate) {
        certificate.name = certificateName;
        certificate.time = certificateTime;
        await certificate.save();
    }

    
    //---------------Dùng với aggregate --------------------------------------------

    // await Certificate.aggregate([
    //     {
    //         // lọc ra certificate có author_id tương ứng với author._id
    //         $match: {author_id: author._id},
    //     },
    //     {
    //         // thiết lập trường name và date cho các documents kết quả
    //         $set: {
    //             name: certificate,
    //             date: date,
    //         },
    //     },
    //     {
    //         // thêm các documents kết quả vào collection certificates và thay thế document đích
    //         $merge: {
    //             into: "certificates", // Tên collection muốn merge
    //             on: "_id", // Trường trong collection đích để so khớp với _id của documents kết quả
    //             whenMatched: "replace", // Thay thế document đích nếu tìm thấy
    //         },
    //     },
    // ]);



    return await author.save();
}

export async function remove(author) {
    const authors = Author.deleteOne({ _id: author._id });
    const certificates = Certificate.deleteOne({ author_id: author._id });
    const updateBlogs = Blog.updateMany({author_id: author._id}, {$set: {author_id: null}});
    await Promise.all([authors, certificates, updateBlogs]);
}
