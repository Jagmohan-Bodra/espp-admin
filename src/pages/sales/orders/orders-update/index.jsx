import React, {useEffect, useRef, useState} from 'react';
import {Empty, notification} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  getOrdersDetail,
  updateOrders,
  reqIsUpdate,
  reqIsSend,
  sendInvoiceEmail,
} from '~/reduxs/orders/action';
import OrdersForm from '../orders-form';
import Invoice from '~/components/templates/Invoice';
import {useReactToPrint} from 'react-to-print';
import {debounce} from '~/helpers/common';
import {
  SALE_ORDER_EDIT_PERMISSION_KEY,
  SALE_ORDER_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {trans} from '~/components/public/Translate';

const func = debounce((method) => method(), 200);

const OrdersUpdate = (props) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [title, setTitle] = useState('');
  const loading = useSelector((state) => state.orders.loading);
  const obj = useSelector((state) => state.orders.obj);
  const isUpdate = useSelector((state) => state.orders.isUpdate);
  const isSend = useSelector((state) => state.orders.isSend);
  const {id} = props.match.params;
  const ACCESS = {
    VIEW: isAccess(SALE_ORDER_VIEW_PERMISSION_KEY),
    EDIT: isAccess(SALE_ORDER_EDIT_PERMISSION_KEY),
  };
  useEffect(() => {
    dispatch(getOrdersDetail(id));
  }, []);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({
        message: 'Update status successful',
        description: '',
        placement: 'topRight',
      });
      dispatch(getOrdersDetail(id));
    }
  }, [isUpdate]);

  useEffect(() => {
    if (isSend) {
      dispatch(reqIsSend(false));
      notification.success({
        message: 'Send email successful',
        description: '',
        placement: 'topRight',
      });
    }
  }, [isSend]);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    pageStyle: `@page {size: 210mm 297mm;}`,
  });

  const onActionKey = (key, e) => {
    switch (key) {
      case 'PRINT_ORDER_SLIP':
        setTitle('ORDER SLIP');
        func(() => handlePrint(e));
        return;
      case 'PRINT_INVOICE':
        setTitle('INVOICE');
        func(() => handlePrint(e));
        return;
      case 'PRINT_RECEIPT':
        setTitle('RECEIPT');
        func(() => handlePrint(e));
        return;
      case 'EMAIL_RECEIPT':
        return dispatch(sendInvoiceEmail(id));
      case 'EMAIL_INVOICE':
        return dispatch(sendInvoiceEmail(id));
      case 'EMAIL_SHIPPING_DETAILS':
        return dispatch(sendInvoiceEmail(id));
    }
  };

  const onDiscard = () => {
    dispatch(getOrdersDetail(id));
  };

  const onSave = async (dataForm) => {
    ACCESS.EDIT && dispatch(updateOrders(id, dataForm));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };
  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <OrdersForm
        id={id}
        data={obj}
        onActionKey={onActionKey}
        onDiscard={onDiscard}
        onSave={onSave}
        loading={loading}
      />
      <div style={{display: 'none'}}>
        <Invoice propsRefs={ref} obj={obj} title={title} />
      </div>
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(OrdersUpdate);
