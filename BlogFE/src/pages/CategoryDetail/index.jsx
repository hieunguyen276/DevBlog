import _ from "lodash";
import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import TableCustom from '../../components/UI/Table'
import IconDeleteTable from "../../assets/images/icon/table/delete_14x14.svg";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { getACategory,handleDeleteCategory } from "../../api/category";
import { setVisibleModalCreateOrUpdateCategory, setVisibleModalDeleteCategory } from "../../states/modules/category";


function CategoryDetail() {

  const param = useParams();

  const authCategory = useSelector(state => state.category.authCategory);
  const categoryDetails = useSelector(state => state.categoryDetails.categoryDetails);
  console.log('data chi tiet', categoryDetails)

  const navigate = useNavigate();
  const columns = [
    {
      title: 'Name phong',
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
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: '80px',
      render: (text, record) => (
        <>
          {
            <div className={styles.btnAction}>
              {
                <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
                  <img src={IconDeleteTable} alt="" />
                </div>
              }
            </div>
          }
        </>

      ),
    },
  ];
  const categorys = useSelector(state => state.category.categorys);
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
    if (param.categoryId) {
      console.log('sdjhsdjhsjdhs')
      dispatch(getACategory(param.categoryId))
    }
  }, [])

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

            Tên danh mục
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

export default CategoryDetail;
