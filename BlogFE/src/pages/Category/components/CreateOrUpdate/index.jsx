import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss";
import InputMASQ from "../../../../components/UI/Input";
import ButtonMASQ from "../../../../components/UI/Button";
import _ from "lodash";
import {isValidate} from "../../../../utils/validate";
import {handleCheckValidateConfirm} from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
  setErrorCreateOrUpdateCategory,
  setVisibleModalCreateOrUpdateCategory
} from "../../../../states/modules/category";
import {handleCreateCategory, handleUpdateCategory} from "../../../../api/category";


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

function CreateOrUpdate (props) {
  let { category, configModal } = props
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    name: '',
    description: '',
  })
  const visibleModalCreateOrUpdateCategory = useSelector(state => state.category.visibleModalCreateOrUpdateCategory);
  const isLoadingBtnCreateOrUpdateCategory = useSelector(state => state.category.isLoadingBtnCreateOrUpdateCategory);
  const errorCreateOrUpdateCategory = useSelector(state => state.category.errorCreateOrUpdateCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateCategory])

  useEffect(() => {
    dispatch(setErrorCreateOrUpdateCategory({
      name: '',
      description: '',
      // blogs: [],
    }));
  }, [dataCreateOrUpdate, dispatch])

  useEffect(() => {
    setDataCreateOrUpdate({
      name: category.name,
      description: category.description,
    })
  }, [category])

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      name: '',
      description: '',
      // blogs: [],
    })
  }

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataCreateOrUpdate);
    data[type] = value;
    setDataCreateOrUpdate(data);
  }

  const validateBlur = (type) => {
    let validate = isValidate(dataCreateOrUpdate, type, errorCreateOrUpdateCategory);
    dispatch(setErrorCreateOrUpdateCategory(validate.error));
    return validate.isError;
  }

  const handleConfirmCreateOrUpdateUser = () => {
    let dataValidate = dataCreateOrUpdate;
    if (configModal.type !== "CREATE") {
      dataValidate = {
        name: dataCreateOrUpdate.name,
        description: dataCreateOrUpdate.description,
      }
    }

    let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdateCategory);
    dispatch(setErrorCreateOrUpdateCategory(validate.dataError));
    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateCategory(dataValidate))
      } else {
        dispatch(handleUpdateCategory(dataValidate, category._id))
      }
    }
  }

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateCategory}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateCategory(false))}
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
            error={errorCreateOrUpdateCategory.name}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Description *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter description..."}
            onChange={(e) => handleChangeInput(e, 'description')}
            onBlur={() => validateBlur('description')}
            value={dataCreateOrUpdate.description}
            error={errorCreateOrUpdateCategory.description}
          />
        </div>

        {
          configModal.type === "SHOWANDUPDATE" ?
          <div className={styles.inputWrapper}>
          <div className={styles.label}>Description *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter description..."}
            onChange={(e) => handleChangeInput(e, 'description')}
            onBlur={() => validateBlur('description')}
            value={dataCreateOrUpdate.description}
            error={errorCreateOrUpdateCategory.description}
          />
            </div> : ''
        }
  
        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Save'}
            loading={isLoadingBtnCreateOrUpdateCategory}
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
