import multer from "multer";
import {isArray} from "lodash";
import {FileUpload} from "@/utils/types";


// Khởi tạo một phiên bản Multer với cấu hình mặc định.
// Trong trường hợp này, sử dụng multer.memoryStorage() 
// để lưu trữ tệp tin tạm thời trong bộ nhớ.
const defaultMulter = multer({
    storage: multer.memoryStorage(),
});

export function upload(req, res, next) {
    const newNext = function (err) {
        if (err) {
            return next(err);
        }

        try {
            const files = req.files; //Gán giá trị của các tệp tin đã được tải lên từ request (req.files) vào biến files.

            if (files) {
                for (let file of files) {
                    const fieldname = file.fieldname;
                    file = new FileUpload(file);  //Tạo một phiên bản mới của lớp FileUpload với thông tin tệp tin đã tải lên.

                    if (req.body[fieldname]) { 
                        if (isArray(req.body[fieldname])) {
                            req.body[fieldname].push(file);
                        } else {
                            req.body[fieldname] = [req.body[fieldname], file]; //Tạo một mảng mới chứa trường fieldname hiện có và tệp tin mới và gán lại vào req.body[fieldname].
                        }
                    } else {
                        req.body[fieldname] = file;
                    }
                }

                delete req.files;
            }

            next();
        } catch (error) {
            next(error);
        }
    };

    defaultMulter.any()(req, res, newNext);
}
