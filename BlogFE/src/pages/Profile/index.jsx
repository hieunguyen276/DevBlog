import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './styles.module.scss'
import './styles.scss';
import { Col, Row, Tabs } from "antd";
import User from '../../assets/images/user/6.jpg';
import EditProfile from "./components/EditProfile";
import Handle from '../../layouts/MainLayout/Header/components/PopoverProfile/handle';
// import Order from "./components/Order";
import _ from "lodash";
import { useDispatch } from 'react-redux';

import { setVisibleModalUpdateAvatar } from "../../states/modules/profile";
import UpdateAvatar from './components/Order/components/EditAvatar';
// import UpdateAvatar from './components/Order/components/EditAvatar';

function Profile() {
  const [keyTable, setKeyTable] = useState('1')

  const {
    isShowInformation, setIsShowInformation, authUser,
    handleConfirmLogout, handleShowProfile, handleResetError
  } = Handle();

  const items = [
    {
      key: '1',
      label: 'Edit profile',
    },
    // {
    //   key: '2',
    //   label: 'Order',
    // },
  ];

  const onChange = (key) => {
    setKeyTable(key)
  };

  const [avatar, setAvatar] = useState({});
  const dispatch = useDispatch();
  const [configModal, setConfigModal] = useState({
    title: 'Update Avatar',
    type: 'UPDATE',
  })

  const handleEditAvatar = (authUser) => {
    let authSelect = _.cloneDeep(authUser)
    setAvatar(authSelect)
    dispatch(setVisibleModalUpdateAvatar(true))
    setConfigModal({
      title: 'Update Avatar',
      type: 'UPDATE',
    })
  }


  return (
    <MainLayout>
      <div className={styles.profileWrap}>
        <Row gutter={20}>
          <Col span={24}>
            <div className={`${styles.profileItem}`}>
              <div className={styles.informationWrap}>
                <div className={styles.avatarWrap}>
                  <div onClick={() => handleEditAvatar(authUser)} className={styles.btnChangeAvatar}>
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="13" height="13">
                      <path fill="currentColor" d="M3.656 7.313c0-1.571 1.272-2.844 2.844-2.844s2.844 1.272 2.844 2.844-1.272 2.844-2.844 2.844-2.844-1.273-2.844-2.844zM6.5 5.688c-.896 0-1.625.729-1.625 1.625S5.604 8.938 6.5 8.938s1.625-.729 1.625-1.625S7.396 5.688 6.5 5.688zm2.715-4.041.264.791h1.896c.896 0 1.625.729 1.625 1.625v6.5c0 .896-.729 1.625-1.625 1.625h-9.75A1.625 1.625 0 0 1 0 10.563v-6.5a1.625 1.625 0 0 1 1.625-1.625h1.896l.264-.791A1.216 1.216 0 0 1 4.942.813H8.06a1.216 1.216 0 0 1 1.155.834zm-7.59 2.009a.407.407 0 0 0-.406.406v6.5a.406.406 0 0 0 .406.406h9.75a.408.408 0 0 0 .406-.406V4.063a.408.408 0 0 0-.406-.406H8.599l-.541-1.625H4.942l-.541 1.625H1.625z" />
                    </svg>
                  </div>
                  <img src={authUser.avatar || User} alt="" />
                </div>
                <div className={styles.infoWrap}>
                  <div className={styles.name}>
                    {/* Elena Gilbert */}
                    {authUser.name}
                  </div>
                  <div className={styles.bod}>
                    {/* Member Since: November 2020 */}
                    {authUser.email}
                  </div>
                  <div className={styles.btnWrap}>

                  </div>
                </div>
              </div>
              <div className={`${styles.tabWrap} tab-custom`}>
                <Tabs defaultActiveKey={keyTable} items={items} onChange={onChange} />
              </div>
            </div>
          </Col>

          
          {
            keyTable === '1' ?
              <Col span={24}>
                <EditProfile />
              </Col> : ''
          }


          <UpdateAvatar
             authUser={authUser}
             configModal={configModal}
          />




          {/*{*/}
          {/*  keyTable === '2' ?*/}
          {/*  <Col span={24}>*/}
          {/*    <Order />*/}
          {/*  </Col> : ''*/}
          {/*}*/}

        </Row>
      </div>
    </MainLayout>
  );
}

export default Profile;
