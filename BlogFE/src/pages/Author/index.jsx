import React, {useEffect, useState} from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss';
import TableCustom from '../../components/UI/Table'
import InputMASQ from "../../components/UI/Input";
import ButtonMASQ from "../../components/UI/Button";
import IconDeleteTable from "../../assets/images/icon/table/delete_14x14.svg";
import IconEditTable from "../../assets/images/icon/table/edit_12x12.svg";
import SwitchMASQ from "../../components/UI/Switch";
import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import {useDispatch, useSelector} from "react-redux";
import {getListAuthor, handleDeleteAuthor} from "../../api/author";
import {setVisibleModalCreateOrUpdateAuthor, setVisibleModalDeleteAuthor} from "../../states/modules/author";
import _ from "lodash";
import User from '../../assets/images/user/6.jpg';
import Filter from './components/Filter';
import BtnFilter from "../../components/ButtonFilter";
import { formatDate } from '../../utils/helper';

function Authors () {
  // const authors = useSelector(state => state.author.authors);
  // const authAuthor = useSelector(state => state.author.authAuthor);

  // function changeTime(timestamp) {
  //   const date = new Date(timestamp * 1000); // Nhân 1000 để chuyển đổi timestamp thành mili giây
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   return `${day}/${month}/${year}`;
  // }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <div className={styles.nameWrap}>
        <div className={styles.imgWrap}>
          <img src={record.avatar} alt=""/>
        </div>
        <span>{record.name}</span>
      </div>,
      defaultSortOrder: '',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => <span>{record.email}</span>,
      defaultSortOrder: '',
      sorter: true,
    },
    {
      title: 'Bio',
      dataIndex: 'bio',
      key: 'bio',
      render: (text, record) =>  <span className={styles.limitedHeight}>{record.bio}</span>,
      defaultSortOrder: '',
      sorter: true,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (text, record) => 
    //     <span>
    //       {record.status == 1 ? 'Active': 'Unactive'}
    //     </span>,
    //   defaultSortOrder: '',
    //   sorter: true,
    // },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (text, record) => <span>{formatDate(record.birthday)}</span>,
      defaultSortOrder: '',
      sorter: true,
    },
    {
      title: 'Certificate Name',
      dataIndex: 'certificate',
      key: 'certificate',
      render: (certificate) => (
        <span>
          {certificate && certificate.name ? certificate.name : "Tên chứng chỉ không có sẵn"}
        </span>
      ),
      defaultSortOrder: '',
      showSorterTooltip: false,
      sorter: true,
    },    
    {
      title: 'CertificatesDate',
      dataIndex: 'certificate',
      key: 'certificate',
      render: (field) => <span>{field && field.time ? formatDate(field.time * 1000) : "Đang cập nhật"}</span>,
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
            // authAuthor.id !== record.id ?
            // authAuthor.id === record.id ?
            <div className={styles.btnAction}>
              <div onClick={() => handleEdit(record)} className={styles.btnWrap}>
                <img src={IconEditTable} alt=""/>
              </div>
              {
                // authAuthor.id === record.id ?
                
                  <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
                    {/* {console.log(record.id)} */}
                    <img src={IconDeleteTable} alt=""/>
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
  const authors = useSelector(state => state.author.authors);
  // console.log('dt employyee',authors)
  const isLoadingTableAuthor = useSelector(state => state.author.isLoadingTableAuthor);
  const paginationListAuthor = useSelector(state => state.author.paginationListAuthor);
  const visibleModalDeleteAuthor = useSelector(state => state.author.visibleModalDeleteAuthor);
  const [author, setAuthor] = useState({});
  const [configModal, setConfigModal] = useState({
    title: 'Create author',
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
    dispatch(getListAuthor(dataFilter))
  }, [dataFilter, dispatch])

  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateAuthor(true))
    setConfigModal({
      title: "Create author",
      type: "CREATE"
    })
  }

  const handleEdit = (author) => {
    let authorSelect = _.cloneDeep(author)
    setAuthor(authorSelect)
    dispatch(setVisibleModalCreateOrUpdateAuthor(true))
    setConfigModal({
      title: "Update author",
      type: "UPDATE"
    })
  }

  const handleShowConfirmDelete = (author) => {
    let authorSelect = _.cloneDeep(author)
    setAuthor(authorSelect)
    dispatch(setVisibleModalDeleteAuthor(true))
  }

  const handleConfirmDeleteAuthor = () => {
    dispatch(handleDeleteAuthor(author._id))
  }

  const changeCurrentPage = (page) => {
    setDataFilter({...dataFilter, page: page});
  }

  const handleSearch = (e) => {
    setDataFilter({...dataFilter, keySearch: e.target.value});
  }

  const onChange = (pagination, filters, sorter) => {
    if (sorter.order && sorter.field) {
      setDataFilter({...dataFilter, order: sorter.order === "descend" ? "desc" : "asc", column: sorter.field});
    } else {
      setDataFilter({...dataFilter, order: null, column: null});
    }
  };

  const handleChangeStatus = (value) => {
    setDataFilter({...dataFilter, status: value.toString()});
  }

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span
              className={styles.title}>Total records ({paginationListAuthor.totalRecord})</span>
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
                    fill="#3D4667"/>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h12v12H0z"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <BtnFilter
              content={
                <Filter
                  statusAuthor={dataFilter.status}
                  onChangeStatus={handleChangeStatus}
                />
              }
            />
          </div>

          <TableCustom
            loading={isLoadingTableAuthor}
            columns={columns}
            dataSource={authors}
            rowKey={'_id'}
            pagination={paginationListAuthor}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <CreateOrUpdate
          author={author}
          configModal={configModal}
        />

        <ModalConfirm
          isModalOpen={visibleModalDeleteAuthor}
          title={`Delete ${author.name}?`}
          description={`Are you sure you want to delete ${author.name}? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalDeleteAuthor(false))}
          onConfirm={() => handleConfirmDeleteAuthor()}
        />
      </div>
    </MainLayout>
  );
}

export default Authors;
