import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {Toolbox} from '~/components/public/Toolbox';
import AddressForm from '../address-form';
import DeleteModal from '../address-delete';
import columns from './columns';
import TableData from '~/components/public/TableData';
import {ButtonBlue} from '~/components/public/Button';
import {getCustomerDetail, updateCustomer} from '~/reduxs/customer/action';
import {
  USER_CREATE_PERMISSION_KEY,
  USER_DELETE_PERMISSION_KEY,
  USER_EDIT_PERMISSION_KEY,
  USER_PERMISSION_KEY,
  USER_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {Empty} from 'antd';
import {isAccess} from '~/helpers/utils';
import {alertUpdateSuccessful} from '~/helpers/texts';

const AddressList = (props) => {
  const dispatch = useDispatch();

  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState({});
  const [isCreate, setIsCreate] = useState();
  const [itemUpdate, setItemUpdate] = useState({});
  const {id} = props.match.params;
  const {addressList} = props.customerInfo || [];

  const ACCESS = {
    LIST: isAccess(USER_PERMISSION_KEY),
    VIEW: isAccess(USER_VIEW_PERMISSION_KEY),
    CREATE: isAccess(USER_CREATE_PERMISSION_KEY),
    EDIT: isAccess(USER_EDIT_PERMISSION_KEY),
    DELETE: isAccess(USER_DELETE_PERMISSION_KEY),
  };

  const onDeleteFinish = () => {
    const addressListData = addressList.filter(
      (item) => item._id != itemDelete._id,
    );
    dispatch(updateCustomer(id, {addressList: addressListData})).then(() =>
      dispatch(getCustomerDetail(id)),
    );
    alertUpdateSuccessful();
    props.onReset && props.onReset();
  };

  const onActionItem = (item) => {
    setItemUpdate({});
    setItemDelete(item);
    setVisibleDelete(true);
  };

  const onEditItem = (item) => {
    setItemUpdate(item);
    setIsCreate(false);
    setVisibleForm(true);
  };

  const onDiscard = () => {
    setVisibleForm(false);
  };

  const handleOnFinishForm = (newAddress) => {
    const newAdd = {
      level1: newAddress.firstName,
      level2: newAddress.lastName,
      level3: newAddress.phone,
      level4: newAddress.unitNo,
      level5: newAddress.stresstName,
      level6: newAddress.blockNo,
      level7: newAddress.floor,
      level8: newAddress.buildingName,
      level9: newAddress.state,
      level10: newAddress.city,
      level11: newAddress.country,
      level12: newAddress.postCode,
    };

    if (isCreate) {
      const addressListData = [...addressList, newAdd];
      dispatch(updateCustomer(id, {addressList: addressListData})).then(() =>
        dispatch(getCustomerDetail(id)),
      );
      alertUpdateSuccessful();
    } else {
      const addressListData = addressList.map((item) =>
        item._id == itemUpdate._id ? newAdd : item,
      );
      dispatch(updateCustomer(id, {addressList: addressListData})).then(() =>
        dispatch(getCustomerDetail(id)),
      );
      alertUpdateSuccessful();
    }
  };

  const onAdd = () => {
    setItemUpdate({});
    setIsCreate(true);
    setVisibleForm(true);
  };

  return ACCESS.LIST ? (
    <div>
      <Toolbox pullRight>
        {ACCESS.CREATE && <ButtonBlue text="Add" onClick={onAdd} />}
      </Toolbox>

      <TableData
        data={(addressList || []).map((item) => ({
          firstName: item.level1,
          lastName: item.level2,
          phone: item.level3,
          unitNo: item.level4,
          stresstName: item.level5,
          blockNo: item.level6,
          floor: item.level7,
          buildingName: item.level8,
          state: item.level9,
          city: item.level10,
          country: item.level11,
          postCode: item.level12,
          _id: item._id,
        }))}
        onActionItem={onActionItem}
        edit={onEditItem}
        columns={columns}
        loading={false}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
      <AddressForm
        visible={visibleForm}
        data={itemUpdate}
        setVisible={onDiscard}
        onFinish={handleOnFinishForm}
      />

      <DeleteModal
        id={itemDelete}
        obj={itemDelete}
        visible={visibleDelete}
        setVisible={setVisibleDelete}
        onFinish={onDeleteFinish}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(AddressList);
