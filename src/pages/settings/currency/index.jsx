import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonBlue} from '~/components/public/Button';
import columns from './columns';
import TableData from '~/components/public/TableData';
import {getSettings, updateSettings} from '~/reduxs/settings/action';
import ModalCreate from './ModalCreate';
import ModalUpdate from './ModalUpdate';

const Currency = (props) => {
  const dispatch = useDispatch();
  const metadata = {meta: {page: 1, pageSize: 90}};
  const loading = useSelector((state) => state.settings.loading);
  const [data, setData] = useState({});
  const [id, setId] = useState({});
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  useEffect(() => {
    setData({
      ...data,
      currency: (props.data || []).find(
        (item) => item.key === 'CURRENCY_SETTING',
      ),
    });
  }, [props.data]);

  const onActionItem = (action) => {
    if (action && action.key == 'EDIT_CURRENCY') {
      setId(action.id);
      setVisibleUpdate(true);
    }
    if (action && action.key == 'DELETE') {
      dispatch(
        updateSettings({
          data: [
            {
              ...data.currency,
              options: (data.currency || {}).options.filter(
                (item) => item.id !== action.id,
              ),
            },
          ],
        }),
      );
      dispatch(getSettings(metadata));
    }
  };

  const onPutCreate = (value) => {
    let d = new Date();
    let newValue = {...value, id: d.getTime()};
    dispatch(
      updateSettings({
        data: [
          {
            ...data.currency,
            options: [...((data.currency || {}).options || []), newValue],
          },
        ],
      }),
    );
    dispatch(getSettings(metadata));
    setVisibleCreate(false);
  };

  const onPutUpdate = (id, value) => {
    let pos = (data.currency || {}).options.map((item) => item.id).indexOf(id);
    (data.currency || {}).options[pos] = value;
    dispatch(
      updateSettings({
        data: [{...data.currency, options: (data.currency || {}).options}],
      }),
    );
    dispatch(getSettings(metadata));
    setVisibleUpdate(false);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px',
        }}>
        <span style={{color: '#4B5B79', fontWeight: 600}}>
          Total Currencies: {((data.currency || {}).options || []).length}
        </span>
        <ButtonBlue
          onClick={() => setVisibleCreate(true)}
          text="Add New Currency"
        />
      </div>
      <TableData
        data={(data.currency || {}).options}
        onActionItem={onActionItem}
        columns={columns}
        loading={loading}
      />
      <ModalCreate
        visible={visibleCreate}
        setVisible={setVisibleCreate}
        handleSave={onPutCreate}
      />
      <ModalUpdate
        id={id}
        data={(data.currency || {}).options}
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        handleSave={onPutUpdate}
      />
    </div>
  );
};

export default Currency;
