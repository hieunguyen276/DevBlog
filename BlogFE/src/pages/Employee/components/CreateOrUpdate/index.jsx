import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import InputMASQ from "../../../../components/UI/Input";
import ButtonMASQ from "../../../../components/UI/Button";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCreateOrUpdateEmployee,
  setVisibleModalCreateOrUpdateEmployee
} from "../../../../states/modules/employee";
import { handleCreateEmployee, handleUpdateEmployee } from "../../../../api/employee";
import { Button, Upload } from 'antd';

CreateOrUpdate.prototype = {
  isModalOpen: PropTypes.bool.isRequired,
  configModal: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
}

CreateOrUpdate.defaultProps = {
  isModalOpen: false,
  textBtnConfirm: 'OK',
  configModal: {
    title: 'Title',
    type: 'CREATE',
  }
}

function CreateOrUpdate(props) {
  let { employee, configModal } = props
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    password: '',
    confirmPassword: ''
  })
  const visibleModalCreateOrUpdateEmployee = useSelector(state => state.employee.visibleModalCreateOrUpdateEmployee);
  const isLoadingBtnCreateOrUpdateEmployee = useSelector(state => state.employee.isLoadingBtnCreateOrUpdateEmployee);
  const errorCreateOrUpdateEmployee = useSelector(state => state.employee.errorCreateOrUpdateEmployee);
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateEmployee])

  useEffect(() => {
    dispatch(setErrorCreateOrUpdateEmployee({
      name: '',
      email: '',
      phone: '',
      avatar: '',
      password: '',
      confirmPassword: ''
    }));
  }, [dataCreateOrUpdate, dispatch])

  useEffect(() => {
    setDataCreateOrUpdate({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      avatar: employee.avatar,
    })
  }, [employee])

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      name: '',
      email: '',
      phone: '',
      avatar: '',
      password: '',
      confirmPassword: ''
    })
  }

//===================================

const [avatarFileList, setAvatarFileList] = useState([]);

const handleAvatarUpload = (info) => {
  let fileList = [...info.fileList];
  fileList = fileList.slice(-1); // Giới hạn chỉ chọn một tệp tin
  setAvatarFileList(fileList);

  // Xử lý khi tệp tin đã được chọn
  fileList = fileList.map(file => {
    if (file.response) {
      file.url = file.response.url; // Lưu trữ URL của tệp tin tải lên
    }
    return file;
  });

  // Chuyển đổi tệp tin thành dạng Blob hoặc File và lưu vào state
  const avatarFile = fileList[0]; // Lấy tệp tin đầu tiên nếu có
  if (avatarFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([reader.result], { type: avatarFile.type });
      avatarFile.originFileObj = new File([blob], avatarFile.name, { type: avatarFile.type });
      setAvatarFileList([avatarFile]); // Cập nhật avatarFileList với tệp tin đã được chuyển đổi
    };
    reader.readAsArrayBuffer(avatarFile.originFileObj);
  }
};





  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataCreateOrUpdate);
    data[type] = value;
    setDataCreateOrUpdate(data);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDataCreateOrUpdate((prevState) => ({
      ...prevState,
      avatar: file || null // Lưu tệp tin vào biến avatar
    }));
  };

  const validateBlur = (type) => {
    let validate = isValidate(dataCreateOrUpdate, type, errorCreateOrUpdateEmployee);
    dispatch(setErrorCreateOrUpdateEmployee(validate.error));
    return validate.isError;
  }

  const handleConfirmCreateOrUpdateEmployee = () => {
    let dataValidate = dataCreateOrUpdate;
    let data = new FormData();
    data.append(`name`, dataCreateOrUpdate.name);
    data.append(`email`, dataCreateOrUpdate.email);
    data.append(`phone`, dataCreateOrUpdate.phone);
    // data.append(`avatar`, dataCreateOrUpdate.avatar);
    data.append(`status`, 1);

    // Thêm avatar vào FormData nếu avatarFileList không rỗng
    if (avatarFileList.length > 0) {
      const avatarFile = avatarFileList[0]; // Chỉ lấy tệp tin đầu tiên nếu có nhiều tệp tin
      data.append(`avatar`, avatarFile.originFileObj);
    }


    if (configModal.type !== "CREATE") {
      dataValidate = {
        name: dataCreateOrUpdate.name,
        email: dataCreateOrUpdate.email,
        phone: dataCreateOrUpdate.phone,
        avatar: dataCreateOrUpdate.avatar,
      }
    } else {
      data.append(`password`, dataCreateOrUpdate.password);
    }

    let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdateEmployee);
    dispatch(setErrorCreateOrUpdateEmployee(validate.dataError));
    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateEmployee(data))
      } else {
        dispatch(handleUpdateEmployee(data, employee._id))
      }
    }
  }

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateEmployee}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateEmployee(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Name *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter name..."}
            onChange={(e) => handleChangeInput(e, 'name')}
            onBlur={() => validateBlur('name')}
            value={dataCreateOrUpdate.name}
            error={errorCreateOrUpdateEmployee.name}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter email..."}
            onChange={(e) => handleChangeInput(e, 'email')}
            onBlur={() => validateBlur('email')}
            value={dataCreateOrUpdate.email}
            error={errorCreateOrUpdateEmployee.email}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Phone *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter phone..."}
            onChange={(e) => handleChangeInput(e, 'phone')}
            onBlur={() => validateBlur('phone')}
            value={dataCreateOrUpdate.phone}
            error={errorCreateOrUpdateEmployee.phone}
          />
        </div>

        {/* <div className={styles.inputWrapper}>
          <div className={styles.label}>Avatar *</div>
          <input
            type="file"
            onChange={handleFileChange}
            onBlur={() => validateBlur('avatar')}
            accept="images/*"
            // value={dataCreateOrUpdate.avatar}
            error={errorCreateOrUpdateEmployee.avatar}
          />
        </div> */}

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Avatar</div>
          <Upload
            beforeUpload={() => false}
            onChange={handleAvatarUpload}
            fileList={avatarFileList}
          >
            <Button>Click to Upload</Button>
          </Upload>
          {errorCreateOrUpdateEmployee.avatar && <span className={styles.error}>{errorCreateOrUpdateEmployee.avatar}</span>}
        </div>

        {
          configModal.type === "CREATE" ?
            <div className={styles.inputWrapper}>
              <div className={styles.label}>Password *</div>
              <InputMASQ
                type={"password"}
                placeholder={"Enter password..."}
                onChange={(e) => handleChangeInput(e, 'password')}
                onBlur={() => validateBlur('password')}
                value={dataCreateOrUpdate.password}
                error={errorCreateOrUpdateEmployee.password}
              />
            </div> : ''
        }

        {
          configModal.type === "CREATE" ?
            <div className={styles.inputWrapper}>
              <div className={styles.label}>Confirm password *</div>
              <InputMASQ
                type={"password"}
                placeholder={"Enter password..."}
                onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                onBlur={() => validateBlur('confirmPassword')}
                value={dataCreateOrUpdate.confirmPassword}
                error={errorCreateOrUpdateEmployee.confirmPassword}
              />
            </div> : ''
        }

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Save'}
            loading={isLoadingBtnCreateOrUpdateEmployee}
            onClick={() => handleConfirmCreateOrUpdateEmployee()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </div>
      </div>
    </ModalGeneral>
  );
}

export default CreateOrUpdate;
