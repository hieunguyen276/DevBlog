import moment from "moment";
import jwt from "jsonwebtoken";
import {User} from "../models";
import {cache, JWT_EXPIRES_IN, LINK_STATIC_URL, TOKEN_TYPE} from "@/configs";
import {FileUpload} from "@/utils/types";
import {comparePassword, generatePassword, generateToken} from "@/utils/helpers";

export const tokenBlocklist = cache.create("token-block-list");

export async function checkValidLogin({email, password}) {
    const user = await User.findOne({
        email: email,
        deleted_at: null,
    });

    if (user) {
        const verified = comparePassword(password, user.password); // giải mã mật khẩu
        if (verified) {
            return user;
        }
    }

    return false;
}

// Hàm jwt.decode() được sử dụng để giải mã mã thông báo xác thực (access_token).
// Kết quả giải mã được gán vào biến decode để sử dụng sau này.
//  Hàm tạo token

export function authToken(user_id) {
    const access_token = generateToken(TOKEN_TYPE.AUTHORIZATION, {user_id}, JWT_EXPIRES_IN);
    const decode = jwt.decode(access_token);
    const expire_in = decode.exp - decode.iat;
    return {
        access_token,
        expire_in,
        auth_type: "Bearer Token",
    };
}

export async function register({name, email, password, phone, avatar}) {
    if (avatar) {
        avatar = avatar.save();
    }

    // Lưu với nhiều ảnh

    // if (Array.isArray(avatar)) {
    //     for (let i = 0; i < avatar.length; i++) {
    //         avatar[i] = avatar[i].save();
    //     }
    // } else {
    //     avatar = avatar.save();
    // }

    const user = new User({
        name,
        email,
        password: generatePassword(password),
        phone,
        avatar,
    });
    return await user.save();
}


// Hàm jwt.decode() được sử dụng để giải mã mã thông báo xác thực (access_token).
// Kết quả giải mã được gán vào biến decode để sử dụng sau này.
export async function blockToken(token) {
    const decoded = jwt.decode(token);
    const expiresIn = decoded.exp;
    const now = moment().unix();

    // Tham số đầu tiên là mã thông báo (token), tham số thứ hai là giá trị (1)
    //  để chỉ định rằng mã thông báo đã bị chặn, và tham số thứ ba là thời gian 
    //  còn lại trước khi mã thông báo hết hạn (expiresIn - now).
    await tokenBlocklist.set(token, 1, expiresIn - now);  
}

export async function profile(user_id) {
    const user = await User.findOne({_id: user_id}, {password: 0});
    if (user.avatar) {
        user.avatar = LINK_STATIC_URL + user.avatar;
    }

    return user;
}

export async function updateProfile(currentUser, {name, email, phone, avatar}) {
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    if (avatar) {
        if (currentUser.avatar) {
            FileUpload.remove(currentUser.avatar);
        }
        avatar = avatar.save("images");
        currentUser.avatar = avatar;
    }

    return await currentUser.save();
}


// export async function resetPassword(currentUser, {new_password, confirmPassword}) {
//     if (new_password === confirmPassword) {
//         currentUser.password = generatePassword(new_password);
//         await currentUser.save();
//     }
    
//     return currentUser;
// }