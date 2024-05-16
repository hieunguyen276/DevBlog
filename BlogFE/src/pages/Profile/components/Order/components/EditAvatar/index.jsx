import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorCreateOrUpdateCategory } from "../../../../../../states/modules/category";
import ModalGeneral from "../../../../../../components/UI/Modal/ModalGeneral";
import { isValidate } from "../../../../../../utils/validate";
import styles from "./styles.module.scss";
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import InputMASQ from "../../../../../../components/UI/Input";
import ButtonMASQ from "../../../../../../components/UI/Button";
import { setErrorUpdateAvatar, setVisibleModalUpdateAvatar } from "../../../../../../states/modules/profile";
import { handleCheckValidateConfirm } from "../../../../../../utils/helper";
import { handleChangeAvatar } from "../../../../../../api/profile";
import { get } from "lodash";
import { getMe } from "../../../../../../api/auth";


function UpdateAvatar(props) {
  let { authUser, configModal } = props
  const [dataUpdate, setDataUpdate] = useState({
    avatar: '',
  })
  const visibleModalUpdateAvatar = useSelector(state => state.profile.visibleModalUpdateAvatar);
  const isLoadingBtnUpdateAvatar = useSelector(state => state.profile.isLoadingBtnUpdateAvatar);
  const errorCreateOrUpdateAvatar = useSelector(state => state.profile.errorCreateOrUpdateAvatar);
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalUpdateAvatar])

  useEffect(() => {
    dispatch(setErrorUpdateAvatar({
      avatar: ''
    }));
  }, [setDataUpdate, dispatch])

  useEffect(() => {
    setDataUpdate({
      avatar: authUser.avatar,
    })
  }, [authUser])

  const handleReloadData = () => {
    setDataUpdate({
      avatar: '',
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






  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataUpdate);
    data[type] = value;
    setDataUpdate(data);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDataUpdate((prevState) => ({
      ...prevState,
      avatar: file || null // Lưu tệp tin vào biến avatar
    }));
  };

  const validateBlur = (type) => {
    let validate = isValidate(dataUpdate, type, errorCreateOrUpdateAvatar);
    dispatch(setErrorUpdateAvatar(validate.error));
    return validate.isError;
  }

  const handleConfirmUpdateAvatar = () => {
    let dataValidate = dataUpdate;
    let data = new FormData();

    // Thêm avatar vào FormData nếu avatarFileList không rỗng
    if (avatarFileList.length > 0) {
      const avatarFile = avatarFileList[0]; // Chỉ lấy tệp tin đầu tiên nếu có nhiều tệp tin
      data.append(`avatar`, avatarFile.originFileObj);
    }

    if (configModal.type !== "CREATE") {
      dataValidate = {
        avatar: dataUpdate.avatar,
      }
    } 

    let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdateAvatar);
    dispatch(setErrorUpdateAvatar(validate.dataError));
    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateEmployee(data))
      } else {
        dispatch(handleChangeAvatar(data, authUser._id))
        // .then(() => dispatch(setVisibleModalUpdateAvatar(false)))
        // .then(() => dispatch(getMe()))
      }
    }
  }

  return (
    <ModalGeneral
      isModalOpen={visibleModalUpdateAvatar}
      onClose={() => dispatch(setVisibleModalUpdateAvatar(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>



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
            loading={isLoadingBtnUpdateAvatar}
            onClick={() => handleConfirmUpdateAvatar()}
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

export default UpdateAvatar;
