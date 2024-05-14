import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss';
import TableCustom from '../../components/UI/Table'
import InputMASQ from "../../components/UI/Input";
import ButtonMASQ from "../../components/UI/Button";
import SwitchMASQ from "../../components/UI/Switch";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { getListBlog, handleCreateBlog, handleDeleteBlog, handleUpdateBlog } from "../../api/blog";
import { setDataCategorySelect, setErrorCreateOrUpdateBlog, setVisibleModalCreateOrUpdateBlog, setVisibleModalDeleteBlog } from "../../states/modules/blog";
import _ from "lodash";
import BtnFilter from "../../components/ButtonFilter";
import { getListAuthor } from '../../api/author';
import { getListCategory } from '../../api/category';
import ReactHtmlParser from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import { isValidate } from '../../utils/validate';
// import CustomCKEditor from '../../components/UI/CkEditor5';
import { Button, Select, Upload } from 'antd';

import CustomCKEditor from '../../components/UI/CkEditor5';
import { handleCheckValidateConfirm } from '../../utils/helper';

function BlogCreateOrUpdate() {
    // let { blog, configModal } = props
    const param = useParams();

  // const [blog, setBlog] = useState({});
  const data = useSelector(state => state.blog.blogs);
  // const [blog, setBlog] = useState(data);
  // console.log(data);

  const findBlogById = (blogsArray, id) => {
    const foundBlog = blogsArray.find(blog => blog._id === id);
    return foundBlog || null; 
  };
  
  // Sử dụng hàm để tìm đối tượng blog theo _id
  const blog = findBlogById(data, param.id);

  const dispatch = useDispatch();

  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    title: '',
    content: '',
    thumbnail: '',
    author_id: '',
    categories: [],
  })
  const authors = useSelector(state => state.author.authors);
  const categorys = useSelector(state => state.category.categorys);
  const visibleModalCreateOrUpdateBlog = useSelector(state => state.blog.visibleModalCreateOrUpdateBlog);
  const isLoadingBtnCreateOrUpdateBlog = useSelector(state => state.blog.isLoadingBtnCreateOrUpdateBlog);
  const errorCreateOrUpdateBlog = useSelector(state => state.blog.errorCreateOrUpdateBlog);
  const [avatarFileList, setAvatarFileList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const categoryUpdate = useSelector(state => state.blog.category);
  const [configModal, setConfigModal] = useState({
    title: 'Create blog',
    type: 'CREATE',
  })

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateBlog])


  useEffect(() => {
    dispatch(setErrorCreateOrUpdateBlog({
      title: '',
      content: '',
      thumbnail: '',
      author_id: '',
      categories: [],
    }));
  }, [dataCreateOrUpdate, dispatch])

  useEffect(() => {
    setDataCreateOrUpdate({
      title: blog?.title,
      content: blog?.content,
      thumbnail: blog?.thumbnail,
      author_id: blog?.author_id?._id,
      categories: blog?.categories?.map(category => category._id),
    })
    // setSelectedCategory(categoryUpdate?.map(category => category.name))
  }, [blog])

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      title: '',
      content: '',
      thumbnail: '',
      author_id: '',
      categories: [],
    })
  }

  const handleCKEditorChange = (event, editor) => {
    setTimeout(() => {
        if (editor && editor.getData) {
            const data = editor.getData();
            setDataCreateOrUpdate(prevData => ({
                ...prevData,
                content: data
            }));
        }
    }, 100); // Đợi 100ms trước khi thực hiện getData()
};


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
    // Chuyển đổi tệp tin thành dạng Blob hoặc File và lưu vào state
    const avatarFile = fileList[0];
    if (avatarFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: avatarFile.type });
        avatarFile.originFileObj = new File([blob], avatarFile.name, { type: avatarFile.type });
        setAvatarFileList([avatarFile]);
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

  const handleAuthorChange = (value) => {
    handleChangeInput({ target: { value } }, 'author_id'); // Gọi hàm handleChangeInput với giá trị mới
    validateBlur('author_id'); // Gọi hàm validateBlur khi blur
  };

  const handleChangeInputOption = (selectedValues) => {
    // Cập nhật selectedCategory khi thay đổi lựa chọn
    setSelectedCategory(selectedValues);
    // Cập nhật dataCreateOrUpdate.categories dựa trên selectedValues
    setDataCreateOrUpdate(prevData => ({
      ...prevData,
      categories: selectedValues,
    }));
  };


  const validateBlur = (type) => {
    let validate = isValidate(dataCreateOrUpdate, type, errorCreateOrUpdateBlog);
    dispatch(setErrorCreateOrUpdateBlog(validate.error));
    return validate.isError;
  }

  const handleConfirmCreateOrUpdateBlog = () => {
    // console.log(dataCreateOrUpdate)
    let dataValidate = dataCreateOrUpdate;
    let data = new FormData();

    // Thêm các trường thông tin vào FormData
    data.append('title', dataCreateOrUpdate.title);
    data.append('content', dataCreateOrUpdate.content);
    data.append('author_id', dataCreateOrUpdate.author_id);
    data.append('status', 1);

    // Thêm thumbnail vào FormData nếu thumbnailFileList không rỗng
    // Thêm avatar vào FormData nếu avatarFileList không rỗng
    if (avatarFileList.length > 0) {
      const avatarFile = avatarFileList[0]
      data.append(`thumbnail`, avatarFile.originFileObj)
    }

    // Chuyển đổi mảng các ID danh mục thành một chuỗi và thêm vào FormData
    if (Array.isArray(dataCreateOrUpdate.categories)) {
      dataCreateOrUpdate.categories.forEach(categoryId => {
        data.append('categories[]', categoryId); // Sử dụng 'categories[]' để đảm bảo là một mảng
      });
    }


    // Kiểm tra loại modal để xử lý validate
    if (configModal.type !== 'CREATE') {
      dataValidate = {
        title: dataCreateOrUpdate.title,
        content: dataCreateOrUpdate.content,
        thumbnail: dataCreateOrUpdate.thumbnail,
        author_id: dataCreateOrUpdate.author_id,
        categories: dataCreateOrUpdate.categories,
      };
    }

    let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdateBlog);
    dispatch(setErrorCreateOrUpdateBlog(validate.dataError));

    if (!validate.isError) {
      if (configModal.type === 'CREATE') {
        dispatch(handleCreateBlog(data));
      } else {
        dispatch(handleUpdateBlog(data, blog.param._id));
      }
    }
  };

  const optionAuthor = authors?.map((item) => ({ value: item._id, label: item.name }));
  const optionCategory = categorys?.map((item) => ({ value: item._id, label: item.name }));

  return (
    <MainLayout>
    <div className={styles.mainModalWrap}>

    <div className={styles.inputWrapper}>
          <div className={styles.label}>Thumbnail</div>
          <Upload
            beforeUpload={() => false}
            onChange={handleAvatarUpload}
            fileList={avatarFileList}
            value={dataCreateOrUpdate.thumbnail}
          >
            <Button>Click to Upload</Button>
          </Upload>
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Title *</div>
          <InputMASQ
            className={styles.content}
            type={"text"}
            placeholder={"Enter title..."}
            onChange={(e) => handleChangeInput(e, 'title')}
            onBlur={() => validateBlur('title')}
            value={dataCreateOrUpdate.title}
            error={errorCreateOrUpdateBlog.title}
          />
        </div>

        <div>
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Content *</div>
            <CustomCKEditor
              onChange={handleCKEditorChange}
              data={dataCreateOrUpdate.content || ""}
              // onBlur={() => validateBlur('content')}
            />
          </div>

        </div>


        

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Author *</div>
          <Select
            value={dataCreateOrUpdate.author_id}
            onChange={handleAuthorChange}
            onBlur={() => validateBlur('author_id')}
            className={styles.select}
            placeholder={"Select author..."}
            options={optionAuthor}
          />
        </div>


        <div>
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Category *</div>
            <Select
              mode="multiple"
              value={dataCreateOrUpdate.categories}
              onChange={handleChangeInputOption}
              className={styles.select}
              placeholder={"Select categories..."}
              options={optionCategory}
            />
          </div>
        </div>
    

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Save'}
            loading={isLoadingBtnCreateOrUpdateBlog}
            onClick={() => handleConfirmCreateOrUpdateBlog()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default BlogCreateOrUpdate;
