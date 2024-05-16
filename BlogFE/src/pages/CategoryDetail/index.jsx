import _ from "lodash";
import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import TableCustom from '../../components/UI/Table'
import IconDeleteTable from "../../assets/images/icon/table/delete_14x14.svg";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { getACategory, handleDeleteCategory, handleUpdateCategoryBlog } from "../../api/category";
import GroupContext from "antd/es/checkbox/GroupContext";
import { setVisibleModalDeleteBlog } from "../../states/modules/blog";
import { handleDeleteBlog } from "../../api/blog";
import { getDetailCategory, setVisibleModalRemoveBlogFromCategory } from "../../states/modules/categoryDetail";
import { getNotification } from "../../utils/helper";


function CategoryDetail() {

  const param = useParams();

  const categoryDetails = useSelector(state => state.categoryDetails.categoryDetails);
  const allBlogs = categoryDetails.blogs

  // console.log('aaaaaa', allBlogs)


  const navigate = useNavigate();
  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text, record) =>
        <div className={styles.imgWrap}>
          <img src={record.thumbnail} alt="" />
        </div>,
      // sorter: true,
      width: 200,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <span className={styles.customTitle}>{record.title}</span>,
      // sorter: true,
      width: 500,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => <span className={styles.customContent}>{record.content}</span>,
      // sorter: true,
    },
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: '80px',
      render: (text, record) => (
        <div className={styles.btnAction}>
          <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
            <img src={IconDeleteTable} alt="Delete" />
          </div>
        </div>
      ),
    },
  ];
  const isLoadingDetailCategory = useSelector(state => state.categoryDetails.isLoadingDetailCategory);
  const paginationListBlog = useSelector(state => state.blog.paginationListBlog);
  const blogs = useSelector(state => state.blog.blogs);
  const visibleModalRemoveBlogFromCategory = useSelector(state => state.categoryDetails.visibleModalRemoveBlogFromCategory);
  const [category, setCategory] = useState({});
  const [blog, setBlog] = useState({});
  const [configModal, setConfigModal] = useState({
    title: 'Create Category',
    type: 'CREATE',
  })
  const [dataFilter, setDataFilter] = useState({
    keySearch: '',
    status: '',
    perPage: 10,
    page: 1,
    order: null,
    column: null
  })
  const dispatch = useDispatch();

  useEffect(() => {
    if (param.id) {
      dispatch(getACategory(param.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleShowConfirmDelete = (blog) => {
    let blogSelect = _.cloneDeep(blog)
    setBlog(blogSelect)
    dispatch(setVisibleModalRemoveBlogFromCategory(true))
  }

  const handleConfirmDeleteBlog = () => {
    dispatch(handleUpdateCategoryBlog(param.id, blog._id))
      .then(() => dispatch(getACategory(param.id)))
  }

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page: page });
  }


  const onChange = (pagination, filters, sorter) => {
    if (sorter.order && sorter.field) {
      setDataFilter({ ...dataFilter, order: sorter.order === "descend" ? "desc" : "asc", column: sorter.field });
    } else {
      setDataFilter({ ...dataFilter, order: null, column: null });
    }
  };

  // const handleChangeStatus = (value) => {
  //   setDataFilter({ ...dataFilter, status: value.toString() });
  // }

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            {categoryDetails.name}
          </div>
          <div className={styles.contentMainWrap}>
            {categoryDetails.description}
          </div>

          <TableCustom
            loading={isLoadingDetailCategory}
            columns={columns}
            dataSource={allBlogs}
            rowKey={'_id'}
            pagination={paginationListBlog}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <ModalConfirm
          isModalOpen={visibleModalRemoveBlogFromCategory}
          title={`Remove ${blog.title}?`}
          description={`Are you sure you want to remove ${blog.title}? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalRemoveBlogFromCategory(false))}
          onConfirm={() => handleConfirmDeleteBlog()}
        />
      </div>
    </MainLayout>
  );
}

export default CategoryDetail;
