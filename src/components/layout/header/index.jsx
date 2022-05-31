import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Col, Row} from 'antd';

import HeaderLeft from './HeaderLeft';
import UserDropdown from '~/components/public/UserDropdown';
import {reqGetMe} from '~/reduxs/me/action';
import './style.scss';

const cssClass = `cms-management-header-page`;

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.me.data);
  const {data} = me || {};

  useEffect(() => {
    me && dispatch(reqGetMe());
  }, []);

  return (
    <div className={`${cssClass}`}>
      <Row className={`row__space-mid`}>
        <Col>
          <HeaderLeft />
        </Col>
        <Col>
          <UserDropdown userInfo={data} />
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(HeaderComponent);
