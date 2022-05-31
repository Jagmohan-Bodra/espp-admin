import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Select} from 'antd';

import {Toolbox} from '~/components/public/Toolbox';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {FromCard} from '~/components/public/FormHelpers';
import Breadcrumb from '~/components/public/Breadcrumb';
import '../../style.scss';
import {
  ENQUIRY_STATUS_OPTION,
  ENQUIRY_STATUS_MASTERDATA,
} from '~/constants/master-data';
import LostModal from './LostModal';
import {ButtonGray} from '~/components/public/Button';
import {
  changeUrlQuery,
  getQueryBuilder,
  getQueryString,
  stringify,
} from '~/helpers/queryString';
import BillingInformationForm from './BillingInformationForm';
import TabInternalNotes from './TabInternalNotes';

const cssClass = 'sales-orders-form';
const {Option} = Select;

const TABS = {
  BILLING_INFORMATION: 'BILLING_INFORMATION',
  INTERNAL_NOTES: 'INTERNAL_NOTES',
};

const TAB_OPTIONS = [
  {
    key: TABS.BILLING_INFORMATION,
    value: 'Billing Information',
    Component: BillingInformationForm,
  },
  {
    key: TABS.INTERNAL_NOTES,
    value: 'Internal Notes',
    Component: TabInternalNotes,
  },
];

const EnquiryForm = (props) => {
  const [data, setData] = useState(props.data || {});
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(false);
  const query = getQueryString(props);
  const {id} = props.match.params;
  const tab = (getQueryBuilder(query) || {}).tab || TABS.BILLING_INFORMATION;

  useEffect(() => {
    setData({...props.data});
  }, [props.data]);

  const setFilterQueryData = (value = {}) => {
    const queryBuilder = getQueryBuilder(query) || {};
    const data = {
      ...queryBuilder,
      ...value,
      reset: !(queryBuilder.reset === 'true'),
    };
    const queryParam = stringify(data);
    changeUrlQuery(props, queryParam);
  };

  const handleChange = (value) => {
    if (ENQUIRY_STATUS_MASTERDATA.LOST == value) {
      setVisible(true);
      setStatus(value);
      return;
    }
    props.onSave && props.onSave({status: value});
  };

  const onTabClick = (key) => {
    setFilterQueryData({tab: key});
  };

  return (
    <div className={`${cssClass}`}>
      <Breadcrumb data={getBreadcrumb(id, data)} />
      <Toolbox>
        <div>
          <span style={{marginRight: '10px', color: '#4B5B79'}}>
            Enquiry Status
          </span>
          <Select
            style={{width: 'auto'}}
            className={`${cssClass}__enquiry_status_select`}
            value={data.status}
            onChange={handleChange}>
            {ENQUIRY_STATUS_OPTION.map((item, index) => (
              <Option key={index} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
      </Toolbox>
      <FromCard>
        <RowAuto>
          <ColAuto desktop={5} className={`${cssClass}__col-left`}>
            {TAB_OPTIONS.map((item) => (
              <ButtonGray
                key={item.key}
                onClick={() => onTabClick(item.key)}
                className={`${cssClass}__button ${
                  item.key == tab ? 'active' : ''
                }`}
                text={item.value}
              />
            ))}
          </ColAuto>
          <ColAuto desktop={19} className={`${cssClass}__col-right`}>
            {TAB_OPTIONS.map((item, index) => (
              <div
                style={{display: item.key === tab ? 'block' : 'none'}}
                key={index}>
                <item.Component
                  data={data}
                  internalNote={data.internalNote || []}
                  user={props.me}
                  handleCreateInternalNote={props.handleCreateInternalNote}
                />
              </div>
            ))}
          </ColAuto>
        </RowAuto>
      </FromCard>
      <LostModal
        visible={visible}
        handleCancel={() => setVisible(false)}
        handleSubmit={(message) => {
          props.onSave && props.onSave({reason: message, status});
          setVisible(false);
        }}
      />
    </div>
  );
};

export default withRouter(EnquiryForm);

const getBreadcrumb = (id, data) => {
  let {name} = data || {};
  let nameOrders = id ? name : 'Create';
  return [{name: 'Enquiry'}, {name: nameOrders, link: '#'}];
};
