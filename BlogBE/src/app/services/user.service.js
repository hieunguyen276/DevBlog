import {User} from "../models";
import {LINK_STATIC_URL} from "@/configs";
import {generatePassword} from "@/utils/helpers";
import { FileUpload } from "@/utils/types";

export async function create({name, email, password, phone, avatar}) {

    if (avatar) {
        avatar = avatar.save();
    }

    const user = new User({
        name,
        email,
        phone,
        avatar,
        password: generatePassword(password),
    });
    await user.save();
    return user;
}

// Hàm tìm kiếm và lấy ra tất cả các user đưa vào các trang và sắp 
// xếp theo điều kiện

export async function filter({q, page, per_page, field, sort_order}) {
    q = q ? {$regex: q, $options: "i"} : null;

    // kiểm tra xem tham số q có giá trị (khác null hoặc undefined) hay không.
    //  Nếu có, nó tạo một object truy vấn biểu thức chính quy với khớp không phân
    //  biệt chữ hoa chữ thường và gán nó vào biến q. Nếu không, nó gán null cho q.
    const filter = {
        ...(q && {$or: [{name: q}, {email: q}]}),
    };

    const users = (
        // Tìm tát cả các tài liệu phù hợp với filter
        // loại trừ password, sau đó áp dụng phân trang
        await User.find(filter, {password: 0})
            .skip((page - 1) * per_page) //chuyển trang
            .limit(per_page) //giới hạn số bản ghi trên 1 trang
            .sort({[field]: sort_order})) // sắp xếp kết quả truy vấn theo 1 trường cụ thể
        .map((user) => { // sửa đổi mỗi đối tượng ng dùng nếu có avatar
            if (user.avatar) {
                user.avatar = LINK_STATIC_URL + user.avatar;
            }
            return user;
        });


    //-----------Lấy với nhiều ảnh--------------------------

    // .map(user => {
    //     if (Array.isArray(user.avatar)) { 
    //         for( let i=0; i<user.avatar.length; i++ ) {
    //             user.avatar[i] = LINK_STATIC_URL + user.avatar[i];
    //         }
    //     }
    //     return user;
    // });

    // Đếm số lượng tài liệu khớp với filter
    const total = await User.countDocuments(filter);
    return {total, page, per_page, users};
}

export async function details(userId) {
    // check avatar
    const user = await User.findById(userId, {password: 0});
    user.avatar = LINK_STATIC_URL + user.avatar;
    return user;
}

export async function update(user, {name, email, phone, avatar}) {
    user.name = name;
    user.email = email;
    user.phone = phone;
    

    if (avatar) {
        if (user.avatar) {
            FileUpload.remove(user.avatar);
        }
        avatar = avatar.save("images");
        user.avatar = avatar;
    }
    await user.save();
    return user;
}


export async function resetPassword(user, new_password) {
    user.password = generatePassword(new_password);
    await user.save();
    return user;
}

export async function remove(user) {
    await User.deleteOne({_id: user._id});
}
