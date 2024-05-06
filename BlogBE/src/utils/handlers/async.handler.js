// asyncHandler được thiết kế để xử lý các lỗi xảy ra trong hàm fn và 
// chuyển chúng cho middleware tiếp theo trong chuỗi middleware Express.
export function asyncHandler(fn) {
    return function asyncUtilWrap(...args) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(next);
        // Chúng ta trả về một Promise được giải quyết với giá trị fnReturn. Nếu không có lỗi, Promise sẽ được giải quyết với kết quả của hàm fn.
        // Nếu có lỗi xảy ra, Promise sẽ bị từ chối. Chúng ta sử dụng catch để bắt lỗi và chuyển nó cho middleware tiếp theo (next).
    };
}
