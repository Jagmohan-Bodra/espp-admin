import React, {useEffect, useState} from 'react';
import {Row, Col, Empty} from 'antd';
import BreadcrumbBasic from '~/components/public/Breadcrumb';
import {ButtonGray} from '~/components/public/Button';
import Currency from './currency';
import Order from './order';
import Payment from './payment';
import EmailProvider from './emailprovider';
import EmailTemplate from './emailtemplate';
import './style.scss';
import {getSettings, updateSettings} from '~/reduxs/settings/action';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeUrlQuery,
  getQueryBuilder,
  getQueryString,
  stringify,
} from '~/helpers/queryString';
import {SETTING_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
const cssClass = 'settings-pages';

const kEY_OPTION = [
  {
    name: 'currency',
    text: 'Currency',
    Component: Currency,
  },
  {
    name: 'order',
    text: 'Order',
    Component: Order,
  },
  {
    name: 'payment',
    text: 'Payment',
    Component: Payment,
  },
  {
    name: 'emailprovider',
    text: 'Email Provider',
    Component: EmailProvider,
  },
  {
    name: 'emailtemplate',
    text: 'Email Template',
    Component: EmailTemplate,
  },
];

const Settings = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(kEY_OPTION[0].name);
  const data = useSelector((state) => state.settings.data);
  const phone = 24;
  const ACCESS = {
    LIST: isAccess(SETTING_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getSettings({meta: {page: 1, pageSize: 90}}));
  }, []);

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    queryBuilder.visible && setVisible(queryBuilder.visible);
  }, [query]);

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

  const func = (data) => {
    dispatch(updateSettings(data));
  };

  return ACCESS.LIST ? (
    <div>
      <BreadcrumbBasic data={[{name: 'Settings', link: '#'}]} />
      <div className={`${cssClass}`}>
        <Row>
          <Col
            className={`${cssClass}__col-left`}
            xl={5}
            lg={5}
            md={phone}
            sm={phone}
            xs={phone}>
            {kEY_OPTION.map((item, index) => (
              <ButtonGray
                key={index}
                onClick={() => setFilterQueryData({visible: item.name})}
                className={`${cssClass}__button ${
                  visible == item.name ? 'active' : ''
                }`}
                text={item.text}
              />
            ))}
          </Col>
          <Col
            className={`${cssClass}__col-right`}
            xl={19}
            lg={19}
            md={phone}
            sm={phone}
            xs={phone}>
            {kEY_OPTION.map((item, index) => (
              <div
                style={{display: visible === item.name ? 'block' : 'none'}}
                key={index}>
                <item.Component data={data || []} func={func} />
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  ) : (
    <Empty />
  );
};

export default Settings;
