import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col, Input, Form} from 'antd';

import banner from '~/public/assets/images/branding-banner-login.png';
import {trans, translate} from '~/components/public/Translate';
import {ButtonBlue} from '~/components/public/Button';
import {InputLockIcon, InputUserIcon, LogoIcon} from '~/public/assets/icon';

import {reqSignIn} from '~/reduxs/auth/action';
import {reqGetMe} from '~/reduxs/me/action';
import {push} from '~/reduxs/routing/actions';
import PATH from '~/routers/path';
import {jwtAuth} from '~/apis/utils/fetcher';
import './style.scss';
const cssClass = 'login_page';

const LoginPage = () => {
  const me = useSelector((state) => state.me.data);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = jwtAuth.getToken();
    if (token) {
      dispatch(push(PATH.DASHBOARD));
    }
  }, [me]);

  const onFinish = async () => {
    if ((await dispatch(reqSignIn({email, password}))) === true) {
      dispatch(reqGetMe());
    }
  };

  const fields = [
    {name: ['Email'], value: email},
    {name: ['Password'], value: password},
  ];

  return (
    <div className={`${cssClass}`}>
      <div className={`${cssClass}__block--login`}>
        <Row>
          <Col
            xl={12}
            lg={12}
            md={24}
            sm={24}
            xs={24}
            className={`${cssClass}__col-left`}>
            {/* <img src={logo} className={`${cssClass}__logo`} /> */}
            <LogoIcon className={`${cssClass}__logo`} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 11em',
              }}>
              <Form
                name="basic"
                initialValues={{remember: true}}
                fields={fields}
                onFinish={onFinish}>
                <Row style={{marginBottom: '50px'}}>
                  <Col span={24}>
                    <p className="text-center">
                      {trans(
                        'Please enter your ID and Password to access account.',
                      )}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item name="Email" rules={[{required: true}]}>
                      <Input
                        placeholder={translate('Email')}
                        className={`${cssClass}__content--input`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        prefix={<InputUserIcon />}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="Password" rules={[{required: true}]}>
                      <Input.Password
                        placeholder={translate('Password')}
                        className={`${cssClass}__content--input`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        prefix={<InputLockIcon />}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} className={`${cssClass}__row-link--forget`}>
                    <Link
                      to={PATH.FORGET_PASSWORD}
                      className={`${cssClass}__link--forget`}>
                      {trans('Forgot Your Password?')}
                    </Link>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <ButtonBlue
                      text={'SIGN IN'}
                      className={`${cssClass}__button`}
                      htmlType="submit"
                      block
                    />
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col
            xl={12}
            lg={12}
            md={24}
            sm={24}
            xs={24}
            className={`${cssClass}__col-right`}>
            <img src={banner} className={`${cssClass}__banner`} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginPage;
