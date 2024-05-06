import moment from "moment";

// Hàm chuyển đổi ngày thành timestamp
export function convertToTimestamp(value, helpers) {
    const timestamp = moment(value, "DD/MM/YYYY", true).unix();
    if (isNaN(timestamp)) {
        return helpers.error("any.invalid");
    }
    return timestamp;
}



// import moment from "moment";

// // Hàm chuyển đổi ngày thành timestamp
// export function convertToTimestamp(value, helpers) {
//     const timestamp = moment(value, "DD/MM/YYYY", true).unix();
//     if (isNaN(timestamp)) {
//         return helpers.error("any.invalid");
//     }
//     return timestamp;
// }

// export function convertToTimestamp(value, helpers) {
//     const parts = value.split("-");
//     const year = parseInt(parts[0]);
//     const month = parseInt(parts[1]) - 1; // Giảm đi 1 vì tháng trong đối tượng Date được đếm từ 0 đến 11
//     const day = parseInt(parts[2]);
  
//     const date = new Date(year, month, day);
//     const timestamp = date.getTime() / 1000; // Chia cho 1000 để có giá trị timestamp theo đơn vị giây
  
//     if (isNaN(timestamp)) {
//         return helpers.error("any.invalid");
//     }
//     return timestamp;
// }