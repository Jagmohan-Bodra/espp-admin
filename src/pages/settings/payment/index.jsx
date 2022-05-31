import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import columns from './columns';
import TableData from '~/components/public/TableData';
import ModalUpdate from './ModalUpdate';
import PaynowModal from './PaynowModal';
import {getSettings, updateSettings} from '~/reduxs/settings/action';
import BankTransfer from './BankTransfer';
import CashOnDelivery from './CashOnDelivery';

const Payment = (props) => {
  const dispatch = useDispatch();
  const metadata = {meta: {page: 1, pageSize: 90}};
  const loading = useSelector((state) => state.settings.loading);
  const [data, setData] = useState({});
  const [id, setId] = useState({});
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visiblePaynow, setVisiblePaynow] = useState(false);
  const [visibleBankTransfer, setVisibleBankTransfer] = useState(false);
  const [visibleCashOnDelivery, setVisibleCashOnDelivery] = useState(false);

  useEffect(() => {
    setData({
      ...data,
      payment: (props.data || []).find(
        (item) => item.key === 'PAYMENT_SETTING',
      ),
    });
  }, [props.data]);

  const onActionItem = (action) => {
    if (action && action.key == 'EDIT_PAYMENT') {
      setId(action.id);
      if (action.id == 1) {
        setVisibleUpdate(true);
      }
      if (action.id == 2) {
        setVisiblePaynow(true);
      }
      if (action.id == 3) {
        setVisibleBankTransfer(true);
      }
      if (action.id == 4) {
        setVisibleCashOnDelivery(true);
      }
    }
  };

  const onPutUpdate = (id, value) => {
    let date = new Date();
    let pos = (data.payment || {}).options.map((item) => item.id).indexOf(id);
    (data.payment || {}).options[pos] = value;
    dispatch(
      updateSettings({
        data: [
          {
            ...data.payment,
            options: (data.payment || {}).options,
            uppdate: date,
          },
        ],
      }),
    ).then(() => dispatch(getSettings(metadata)));
    setVisibleUpdate(false);
    setVisiblePaynow(false);
    setVisibleBankTransfer(false);
    setVisibleCashOnDelivery(false);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px',
        }}>
        <label style={{color: '#4B5B79', fontWeight: 600}}>
          Total Payments: {((data.payment || {}).options || []).length}
        </label>
      </div>
      <TableData
        data={(data.payment || {}).options}
        onActionItem={onActionItem}
        columns={columns}
        loading={loading}
      />
      <ModalUpdate
        id={id}
        data={(data.payment || {}).options}
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        handleSave={onPutUpdate}
      />
      <PaynowModal
        id={id}
        data={(data.payment || {}).options}
        visible={visiblePaynow}
        setVisible={setVisiblePaynow}
        handleSave={onPutUpdate}
      />
      <BankTransfer
        id={id}
        data={(data.payment || {}).options}
        visible={visibleBankTransfer}
        setVisible={setVisibleBankTransfer}
        handleSave={onPutUpdate}
      />
      <CashOnDelivery
        id={id}
        data={(data.payment || {}).options}
        visible={visibleCashOnDelivery}
        setVisible={setVisibleCashOnDelivery}
        handleSave={onPutUpdate}
      />
    </div>
  );
};

export default Payment;
