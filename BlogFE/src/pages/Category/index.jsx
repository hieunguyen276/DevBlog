import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss';
import TableCustom from '../../components/UI/Table'
import InputMASQ from "../../components/UI/Input";
import ButtonMASQ from "../../components/UI/Button";
import IconDeleteTable from "../../assets/images/icon/table/delete_14x14.svg";
import IconEditTable from "../../assets/images/icon/table/edit_12x12.svg";
import IconShowTable from "../../assets/images/icon/show_password.svg";
import SwitchMASQ from "../../components/UI/Switch";
import CreateOrUpdate from "./components/CreateOrUpdate";
// import ShowAndUpdate from './components/ShowAndUpdate';
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { getACategory, getListCategory, handleCreateCategory, handleDeleteCategory } from "../../api/category";
import { setVisibleModalCreateOrUpdateCategory, setVisibleModalDeleteCategory, setVisibleModalShowAndUpdateCategory } from "../../states/modules/category";
import _ from "lodash";
import User from '../../assets/images/user/6.jpg';
import Filter from './components/Filter';
import BtnFilter from "../../components/ButtonFilter";
// import ShowCategory from './components/ShowCategory';
import { Tooltip } from 'antd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

function Category() {
  const authCategory = useSelector(state => state.category.authCategory);
  // const categoryId = useParams();
  // console.log('Bjhjdghfdjg', categoryId)

  const navigate = useNavigate();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <div className={styles.nameWrap}>
        <span>{record.name}</span>
      </div>,
      defaultSortOrder: '',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => <span>{record.description}</span>,
      defaultSortOrder: '',
      sorter: true,
    },
    // {
    //   title: 'Blog',
    //   dataIndex: 'blogs',
    //   key: 'blogs',
    //   render: (text, record) => <span>{record.blogs}</span>,
    //   defaultSortOrder: '',
    //   sorter: true,
    // },
    {
      title: 'Show',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: '80px',
      render: (text, record) => (
        <>
          {
            // authUser.id !== record.id ?
            // authCategory.id === record.id ?
            // <div className={styles.btnAction}>
            //   <div onClick={() => handleShowEdit(record)} className={styles.btnWrap}>
            //     <img src={IconShowTable} alt=""/>
            //   </div>
            // </div>
            //  : ''s
            <Tooltip title="DetailCategory">
              <div onClick={() => navigate(`/categories/${record._id}`)} className={styles.btnWrap}>
                <img src={IconShowTable} alt=""/>
              </div>
            </Tooltip>
          }
        </>

        // {/* <div onClick={() => navigate('/posts/:postId')} className={styles.btnWrap}>
        // <EyeOutlined />
        // </div> */}

      ),
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
            // authCategory.id === record.id ?
            <div className={styles.btnAction}>
              <div onClick={() => handleEdit(record)} className={styles.btnWrap}>
                <img src={IconEditTable} alt="" />
              </div>
              {
                // authCategory.id === record.id ?

                <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
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
            //  : ''
          }
        </>

      ),
    },
  ];
  const categorys = useSelector(state => state.category.categorys);
  // console.log('dt categorys 22',categorys)
  const isLoadingTableCategory = useSelector(state => state.category.isLoadingTableCategory);
  const paginationListCategory = useSelector(state => state.category.paginationListCategory);
  const visibleModalDeleteCategory = useSelector(state => state.category.visibleModalDeleteCategory);
  const [category, setCategory] = useState({});
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
    dispatch(getListCategory(dataFilter))
  }, [dataFilter, dispatch])

  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateCategory(true))
    setConfigModal({
      title: "Create Category",
      type: "CREATE"
    })
  }

  const handleEdit = (category) => {
    let categorySelect = _.cloneDeep(category)
    setCategory(categorySelect)
    dispatch(setVisibleModalCreateOrUpdateCategory(true))
    setConfigModal({
      title: "Update Category",
      type: "UPDATE"
    })
  }

  // const handleShowEdit = (category) => {
  //   let categorySelect = _.cloneDeep(category)
  //   setCategory(categorySelect)
  //   dispatch(getACategory(category._id))
  //   // setConfigModal({
  //   //   title: "Show And Update",
  //   //   type: "SHOWANDUPDATE"
  //   // })
  //   // {
  //   // <Tooltip title="DetailPost">
  //   //   <div onClick={() => navigate('/posts/:postId')} className={styles.btnWrap}>
  //   //     <EyeOutlined />
  //   //   </div>
  //   // </Tooltip>
  //   // }
  // }

  const handleShowConfirmDelete = (category) => {
    let categorySelect = _.cloneDeep(category)
    setCategory(categorySelect)
    dispatch(setVisibleModalDeleteCategory(true))
  }

  const handleConfirmDeleteCategory = () => {
    dispatch(handleDeleteCategory(category._id))
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
              className={styles.title}>Total records ({paginationListCategory.totalRecord})</span>
            <div className={styles.btnWrap}>
              <ButtonMASQ
                onClick={() => handleCreate()}
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
                placeholder="Search by name, email or phone"
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
            <BtnFilter
              content={
                <Filter
                  statusUser={dataFilter.status}
                  onChangeStatus={handleChangeStatus}
                />
              }
            />
          </div>

          <TableCustom
            loading={isLoadingTableCategory}
            columns={columns}
            dataSource={categorys}
            rowKey={'_id'}
            pagination={paginationListCategory}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <CreateOrUpdate
          category={category}
          configModal={configModal}
        />

        <ModalConfirm
          isModalOpen={visibleModalDeleteCategory}
          title={`Delete ${category.name}?`}
          description={`Are you sure you want to delete ${category.name}? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalDeleteCategory(false))}
          onConfirm={() => handleConfirmDeleteCategory()}
        />
      </div>
    </MainLayout>
  );
}

export default Category;
