import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss';
import TableCustom from '../../components/UI/Table'
import InputMASQ from "../../components/UI/Input";
import ButtonMASQ from "../../components/UI/Button";
import IconDeleteTable from "../../assets/images/icon/table/delete_14x14.svg";
import IconEditTable from "../../assets/images/icon/table/edit_12x12.svg";
import SwitchMASQ from "../../components/UI/Switch";
// import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { getListBlog, handleDeleteBlog } from "../../api/blog";
import { setDataCategorySelect, setVisibleModalCreateOrUpdateBlog, setVisibleModalDeleteBlog } from "../../states/modules/blog";
import _ from "lodash";
import User from '../../assets/images/user/6.jpg';
import Filter from './components/Filter';
import BtnFilter from "../../components/ButtonFilter";
import { getListAuthor } from '../../api/author';
import { getListCategory } from '../../api/category';
import ReactHtmlParser from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import BlogCreateOrUpdate from '../BlogCreateOrUpdate';

function Blogs() {

  const navigate = useNavigate();
  // const authUser = useSelector(state => state.auth.authUser);
  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text, record) =>
        <div className={styles.imgWrap}>
          <img src={record.thumbnail} alt="" />
        </div>,
      defaultSortOrder: '',
      // sorter: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <div className={styles.titleWrap}>
        <span>{record.title}</span>
      </div>,
      defaultSortOrder: '',
      sorter: true,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => (
        <span className={styles.limitedHeight}>{ReactHtmlParser(record.content)}</span>
      ),
      defaultSortOrder: '',
      // sorter: true,
    },
    {
      title: 'Author Name',
      dataIndex: 'author_id',
      key: 'author_id',
      render: (author_id) => (
        <span>
          {author_id && author_id.name ? author_id.name : "Tên tác giả không có sẵn"}
        </span>
      ),
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: 'Category Name',
      dataIndex: 'categories',
      key: 'categories',
      render: (categories) => (
        <span>
          {categories && categories.map(category => (
            <span key={category._id}>{category.name}<br/></span>
          ))}
        </span>
      ),
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: '80px',
      render: (text, record) => (
        <>
          {
            // authUser.id !== record.id ?
            // authUser.id === record.id ?
            <div className={styles.btnAction}>
              <div onClick={() => navigate(`/blogCreateOrUpdate/${record._id}`)} className={styles.btnWrap}>
                <img src={IconEditTable} alt="" />
              </div>
              {
                // authUser.id === record.id ?

                <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
                  {/* {console.log(record.id)} */}
                  <img src={IconDeleteTable} alt="" />
                </div>
                // : ''
              }
              {/* <div className={`switch-table-style-custom ${styles.btnWrap}`}>
                <SwitchMASQ
                  disabled={true}
                  status={record.status}
                />
              </div> */}
            </div>
            // : ''
          }
        </>

      ),
    },
  ];
  const blogs = useSelector(state => state.blog.blogs);
  // console.log('dt employyee',blogs)
  const isLoadingTableBlog = useSelector(state => state.blog.isLoadingTableBlog);
  const paginationListBlog = useSelector(state => state.blog.paginationListBlog);
  const visibleModalDeleteBlog = useSelector(state => state.blog.visibleModalDeleteBlog);
  const [blog, setBlog] = useState({});
  const [configModal, setConfigModal] = useState({
    title: 'Create blog',
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
    dispatch(getListBlog(dataFilter))
  }, [dataFilter, dispatch])

  const handleCreate = () => {
    
    dispatch(getListAuthor())
      .then(() => dispatch(getListCategory()))
      // .then(() => dispatch(setVisibleModalCreateOrUpdateBlog(true)))
    setConfigModal({
      title: "Create blog",
      type: "CREATE"
    })
  }

  const handleEdit = (blog) => {
    let blogSelect = _.cloneDeep(blog)
    setBlog(blogSelect)
    dispatch(getListAuthor());
    dispatch(getListCategory())
    dispatch(setVisibleModalCreateOrUpdateBlog(true))
    setConfigModal({
      title: "Update blog",
      type: "UPDATE"
    })
    dispatch(setDataCategorySelect(blog.categories))
  }

  // const handleEdit = (blog) => {
  //   let blogSelect = _.cloneDeep(blog)
  //   setBlog(blogSelect)
  //   dispatch(getListAuthor());
  //   dispatch(getListCategory())
  //   dispatch(setVisibleModalCreateOrUpdateBlog(true))
  //   setConfixBlog({
  //     ...project,
  //     author_id: authors._id,
  //     categories: categorys?.map((item) => item._id),
  //   })
  //   setConfigModal({
  //     title: "Update blog",
  //     type: "UPDATE"
  //   })
  // }

  const handleShowConfirmDelete = (blog) => {
    let blogSelect = _.cloneDeep(blog)
    setBlog(blogSelect)
    dispatch(setVisibleModalDeleteBlog(true))
  }

  const handleConfirmDeleteBlog = () => {
    dispatch(handleDeleteBlog(blog._id))
  }

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page: page });
  }

  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, keySearch: e.target.value });
  }

  const onChange = (pagination, filters, sorter) => {
    if (sorter.order && sorter.field) {
      setDataFilter({ ...dataFilter, order: sorter.order === "descend" ? "desc" : "asc", column: sorter.field });
    } else {
      setDataFilter({ ...dataFilter, order: null, column: null });
    }
  };

  const handleChangeStatus = (value) => {
    setDataFilter({ ...dataFilter, status: value.toString() });
  }

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span
              className={styles.title}>Total records ({paginationListBlog.totalRecord})</span>
            <div className={styles.btnWrap}>
              <ButtonMASQ
                // onClick={() => handleCreate()}
                onClick={() => navigate(`/blogCreateOrUpdate`)} className={styles.btnWrap}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={'+ Create'}>
              </ButtonMASQ>
            </div>
          </div>

          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputMASQ
                placeholder="Search by title"
                value={dataFilter.keySearch}
                onChange={(e) => handleSearch(e)}
              />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path
                    d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
                    fill="#3D4667" />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h12v12H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {/* <BtnFilter
              content={
                <Filter
                  statusUser={dataFilter.status}
                  onChangeStatus={handleChangeStatus}
                />
              }
            /> */}
          </div>

          <TableCustom
            loading={isLoadingTableBlog}
            columns={columns}
            dataSource={blogs}
            rowKey={'_id'}
            pagination={paginationListBlog}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        {/* <BlogCreateOrUpdate
          // blog={blog}
          // configModal={configModal}
        /> */}

        <ModalConfirm
          isModalOpen={visibleModalDeleteBlog}
          title={`Delete ${blog.title}?`}
          description={`Are you sure you want to delete ${blog.title}? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalDeleteBlog(false))}
          onConfirm={() => handleConfirmDeleteBlog()}
        />
      </div>
    </MainLayout>
  );
}

export default Blogs;
