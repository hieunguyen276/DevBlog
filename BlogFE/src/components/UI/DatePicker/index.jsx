import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

DatePickerMSQA.propTypes = {
  onChange: PropTypes.func.isRequired,
};

DatePickerMSQA.defaultProps = {
  onChange: () => { }
}

function DatePickerMSQA({value, onChange, onBlur, error}) {
  return (
    <div>
      <DatePicker
      format="DD/MM/YYYY" // Định dạng ngày tháng hiển thị trên DatePicker
      placeholder="Select certificate date..." // Placeholder cho DatePicker
      allowClear={false} // Không cho phép xóa giá trị
      onChange={onChange} // Sự kiện onChange
      onBlur={onBlur} // Sự kiện onBlur
      value={value} // Giá trị của DatePicker
      className={`input-custom ${error ? 'inputError' : ''}`} // Thêm class inputError nếu có lỗi
      />
    </div>
  );
}

export default DatePickerMSQA;