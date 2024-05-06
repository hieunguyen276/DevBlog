// sử dụng module moment, winston và các module khác để tạo ra một đối tượng logger cho việc ghi log trong ứng dụng
// Winston là một thư viện logger mạnh mẽ trong Node.js.
import moment from "moment";
import {createLogger, format, transports} from "winston";
import {LOG_DIR} from "./constants";

class Logger {
    #logger;
    constructor() {
        // Trong constructor, chúng ta sử dụng phương thức createLogger của module winston để tạo 
        // ra một đối tượng logger. Đối tượng logger này được cấu hình để sử dụng một định dạng log
        //  tùy chỉnh, bao gồm thêm thông tin về thời gian vào mỗi log và định dạng JSON cho log.
        this.#logger = createLogger({
            format: format.combine(
                format((info) => ({...info, _date: moment().format("dddd DD-MM-YYYY, HH:mm:ss")}))(),
                format.json({space: 4}),
            ),
        });
        return new Proxy(this, {
            get: function (target, prop) {
                const fileLog = `node-${moment().format("YYYY-MM-DD")}.log`;
                if (
                    target.#logger.transports.length < 1 ||
                    target.#logger.transports[0].filename !== fileLog
                ) {
                    target.#logger.configure({
                        transports: new transports.File({
                            filename: fileLog,
                            dirname: LOG_DIR,
                        }),
                    });
                }

                return target.#logger[prop];
            },
        });
    }
}

export const logger = new Logger();
