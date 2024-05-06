import {generatePassword} from "@/utils/helpers";
import {User} from "@/app/models";

export default async function userSeeder() {
    let EMAIL = process.env.SUPER_ADMIN_EMAIL;
    let PASSWORD = process.env.SUPER_ADMIN_PASSWORD;
    if (!EMAIL || !PASSWORD) {
        EMAIL = "admin@zent.vn";
        PASSWORD = "Zent@123.edu.vn";
        console.warn("---------------------------------------------------------------");
        console.warn('"Super Admin" is not configured. Using the default account:');
        console.warn(`Email: ${EMAIL}`);
        console.warn(`Password: ${PASSWORD}`);
        console.warn("---------------------------------------------------------------");
    }
    const superAdmin = {
        name: "Super Admin",
        email: EMAIL,
        password: generatePassword(PASSWORD),
    };

    // {$set: superAdmin}: Đây là phần cập nhật, nó chỉ ra rằng chúng ta muốn cập nhật bản ghi bằng giá trị của superAdmin. 
    // Trong trường hợp này, superAdmin là một đối tượng chứa các thuộc tính mới mà chúng ta muốn cập nhật vào bản ghi tìm thấy.

    // {upsert: true}: Đây là một tùy chọn, nó chỉ ra rằng nếu không tìm thấy bản ghi phù hợp với điều kiện tìm kiếm, 
    // thì hãy tạo một bản ghi mới với giá trị được chỉ định. Khi upsert được đặt thành true,
    //  nếu không có bản ghi nào được tìm thấy, một bản ghi mới sẽ được tạo ra và cập nhật với giá trị của superAdmin.

    await User.findOneAndUpdate(
        {email: superAdmin.email},
        {$set: superAdmin}, 
        {upsert: true}
    );
}
