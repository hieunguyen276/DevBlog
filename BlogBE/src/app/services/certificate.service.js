import { Author, Certificate } from "../models";
import { LINK_STATIC_URL } from "@/configs";
// import {generatePassword} from "@/utils/helpers";
// import * as authorService from "../services/author.service";


export async function create({ name, time, author_id }) {
    const certificate = new Certificate({
        name,
        time,
        author_id
    });
    await certificate.save();
    return certificate;
}

// Hàm tìm kiếm và lấy ra tất cả các certificate đưa vào các trang và sắp 
// xếp theo điều kiện

export async function filter({ q, page, per_page, field, sort_order }) {
    q = q ? { $regex: q, $options: "i" } : null;

    // kiểm tra xem tham số q có giá trị (khác null hoặc undefined) hay không.
    //  Nếu có, nó tạo một object truy vấn biểu thức chính quy với khớp không phân
    //  biệt chữ hoa chữ thường và gán nó vào biến q. Nếu không, nó gán null cho q.
    const filter = {
        ...(q && { $or: [{ name: q }] }),
    };

    const certificates = (
        // Tìm tát cả các tài liệu phù hợp với filter
        // loại trừ password, sau đó áp dụng phân trang
        await Certificate.find(filter)
            .skip((page - 1) * per_page) //bỏ qua số phần tử chỉ định => chuyển trang
            .limit(per_page) //giới hạn số bản ghi trên 1 trang
            .sort({ [field]: sort_order }) // sắp xếp kết quả truy vấn theo 1 trường cụ thể
    ).map((certificate) => { // sửa đổi mỗi đối tượng ng dùng nếu có avatar
        if (certificate.thumbnail) {
            certificate.thumbnail = LINK_STATIC_URL + certificate.thumbnail;
        }
        return certificate;
    });

    // Đếm số lượng tài liệu khớp với filter
    const total = await Certificate.countDocuments(filter);
    return { total, page, per_page, certificates };
}

export async function details(certificateId) {
    const certificate = await Certificate.findById(certificateId);
    // certificate.thumbnail = LINK_STATIC_URL + certificate.thumbnail;

    // Lấy thông tin chi tiết về tác giả
    const author = await Author.findById(certificate.author_id);

    // Gán thông tin chi tiết về danh mục vào đối tượng blog
    certificate.author_id = author;

    return certificate;
}

export async function update(certificate, { name, description, blogs }) {
    certificate.name = name;
    certificate.description = description;
    certificate.blogs = blogs;
    await certificate.save();
    return certificate;
}

export async function remove(certificate) {
    await Certificate.deleteOne({ _id: certificate._id });
}
