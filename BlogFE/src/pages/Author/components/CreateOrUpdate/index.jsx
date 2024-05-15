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
  setErrorCreateOrUpdateAuthor,
  setVisibleModalCreateOrUpdateAuthor
} from "../../../../states/modules/author";
import { getListAuthor, handleCreateAuthor, handleUpdateAuthor } from "../../../../api/author";
import { Button } from 'antd';
import Upload from 'antd/es/upload/Upload';
import DatePickerMSQA from '../../../../components/UI/DatePicker';
import moment from 'moment';
import dayjs from 'dayjs';

import { PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';

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
  let { author, configModal } = props
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    name: '',
    email: '',
    bio: '',
    birthday: '',
    avatar: '',
    status: '',
    certificateName: '',
    certificateTime: '',
  })
  const visibleModalCreateOrUpdateAuthor = useSelector(state => state.author.visibleModalCreateOrUpdateAuthor);
  const isLoadingBtnCreateOrUpdateAuthor = useSelector(state => state.author.isLoadingBtnCreateOrUpdateAuthor);
  const errorCreateOrUpdateAuthor = useSelector(state => state.author.errorCreateOrUpdateAuthor);
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateAuthor])

  useEffect(() => {
    dispatch(setErrorCreateOrUpdateAuthor({
      name: '',
      email: '',
      bio: '',
      birthday: '',
      avatar: '',
      status: '',
      certificateName: '',
      certificateTime: '',
    }));
  }, [dataCreateOrUpdate, dispatch])

  useEffect(() => {
    // Cập nhật state với các thông tin mới
    setDataCreateOrUpdate({
      name: author.name,
      email: author.email,
      bio: author.bio,
      birthday: author.birthday,
      status: author.status,
      certificateName: author?.certificate?.name,
      certificateTime: author?.certificate?.time,
      avatar: author?.avatar
    });
  }, [author]);


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



  // Xử lý ảnh mới
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([])

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );








  const handleDateChange = (date, type) => {
    const formattedDate = moment(date.$d).unix();
    setDataCreateOrUpdate({ ...dataCreateOrUpdate, [type]: formattedDate });
  };



  const handleReloadData = () => {
    setDataCreateOrUpdate({
      name: '',
      email: '',
      bio: '',
      birthday: '',
      avatar: '',
      status: '',
      certificateName: '',
      certificateTime: '',
    })
  }

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataCreateOrUpdate);
    data[type] = value;
    setDataCreateOrUpdate(data);
  }


  const validateBlur = (type) => {
    let validate = isValidate(dataCreateOrUpdate, type, errorCreateOrUpdateAuthor);
    dispatch(setErrorCreateOrUpdateAuthor(validate.error));
    return validate.isError;
  }

  const handleConfirmCreateOrUpdateUser = () => {
    let dataValidate = dataCreateOrUpdate;
    let data = new FormData();

    
    // console.log(data);
    data.append(`name`, dataCreateOrUpdate.name);
    data.append(`email`, dataCreateOrUpdate.email);
    data.append(`bio`, dataCreateOrUpdate.bio);
    data.append(`birthday`, moment.unix(dataCreateOrUpdate.birthday).format("DD/MM/YYYY"));
    // data.append(`avatar`, dataCreateOrUpdate.avatar);
    data.append(`status`, 1);
    data.append(`certificateName`, dataCreateOrUpdate.certificateName);
    data.append(`certificateTime`, moment.unix(dataCreateOrUpdate.certificateTime).format("DD/MM/YYYY"));

    // Thêm avatar vào FormData nếu avatarFileList không rỗng
    if (avatarFileList.length > 0) {
      const avatarFile = avatarFileList[0]; // Chỉ lấy tệp tin đầu tiên nếu có nhiều tệp tin
      data.append(`avatar`, avatarFile.originFileObj);
    }


    if (configModal.type !== "CREATE") {
      dataValidate = {
        name: dataCreateOrUpdate.name,
        email: dataCreateOrUpdate.email,
        bio: dataCreateOrUpdate.bio,
        birthday: dataCreateOrUpdate.birthday,
        avatar: dataCreateOrUpdate.avatar,
        status: dataCreateOrUpdate.status,
        certificateName: dataCreateOrUpdate.certificateName,
        certificateTime: dataCreateOrUpdate.certificateTime,

      }
    }

    // console.log([...data]);
    // } else {
    //   data.append(`password`, dataCreateOrUpdate.password);
    // }

    let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdateAuthor);
    dispatch(setErrorCreateOrUpdateAuthor(validate.dataError));
    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateAuthor(data))
        // dispatch(getListAuthor())
      } else {
        dispatch(handleUpdateAuthor(data, author._id))
        // dispatch(getListAuthor())
      }
    }
  }

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateAuthor}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateAuthor(false))}
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
            error={errorCreateOrUpdateAuthor.name}
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
            error={errorCreateOrUpdateAuthor.email}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Bio *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter bio..."}
            onChange={(e) => handleChangeInput(e, 'bio')}
            onBlur={() => validateBlur('bio')}
            value={dataCreateOrUpdate.bio}
            error={errorCreateOrUpdateAuthor.bio}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Birthday *</div>
          <DatePickerMSQA
            value={dataCreateOrUpdate.birthday ? dayjs.unix(dataCreateOrUpdate.birthday) : undefined}
            onChange={(t) => handleDateChange(t, 'birthday')}
            error={errorCreateOrUpdateAuthor.birthday}
          />{errorCreateOrUpdateAuthor.birthday}
        </div>


        <div className={styles.inputWrapper}>
          <div className={styles.label}>Certificate Name *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter Certificate Name..."}
            onChange={(e) => handleChangeInput(e, 'certificateName')}
            onBlur={() => validateBlur('certificateName')}
            value={dataCreateOrUpdate.certificateName}
            error={errorCreateOrUpdateAuthor.certificateName}
          />
        </div>


        <div className={styles.inputWrapper}>
          <div className={styles.label}>Certificate Time *</div>
          <DatePickerMSQA
            value={dataCreateOrUpdate.certificateTime ? dayjs.unix(dataCreateOrUpdate.certificateTime) : undefined}
            onChange={(t) => handleDateChange(t, 'certificateTime')}
            // error={errorCreateOrUpdateAuthor.certificateDate}
          />
          {/* {errorCreateOrUpdateAuthor.certificateDate && <span className={styles.error}>{errorCreateOrUpdateAuthor.certificateDate}</span>} */}
        </div>


        <div className={styles.inputWrapper}>
          <div className={styles.label}>Avatar</div>
          <Upload
            beforeUpload={() => false}
            listType="picture-circle"
            fileList={avatarFileList}
            onPreview={handlePreview}
            onChange={handleAvatarUpload}
          >
            {avatarFileList.length >= 8 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: 'none',
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}
        
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Save'}
            loading={isLoadingBtnCreateOrUpdateAuthor}
            onClick={() => handleConfirmCreateOrUpdateUser()}
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
