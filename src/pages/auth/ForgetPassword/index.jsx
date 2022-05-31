import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Row, Col, Input, Form} from 'antd';
import {Link} from 'react-router-dom';
import qs from 'qs';

import {ButtonBlue} from '~/components/public/Button';
import {reqForgetPassword} from '~/reduxs/auth/action';
import logo from '~/public/assets/images/branding-logo.svg';
import './style.scss';

const cssClass = 'page-forget-password';
const ForgetPassword = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const querys = qs.parse(props.location.search, {ignoreQueryPrefix: true});
  const name = querys.name;
  const handleForgetPassword = () => {
    dispatch(reqForgetPassword({email}));
  };
  return (
    <div className={`${cssClass}`}>
      <div className={`${cssClass}__block--forget-password`}>
        <Form name="basic" initialValues={{remember: true}}>
          <Row>
            <Col span={24}>
              <img src={logo} className={`${cssClass}__logo`} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <br />
              <h3 className={`${cssClass}__text-forgot-password`}>
                Forgot your password?
              </h3>
              <p className={`${cssClass}__content-forgot-password`}>
                Please enter the email you registered to ESPP
              </p>
              <br />
              <br />
            </Col>
          </Row>
          <Row>
            <Col span={24} className={`${cssClass}__form-forgot-password`}>
              <Input
                placeholder={`Your email`}
                className={`${cssClass}__content--input`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ButtonBlue
                text={'SEND'}
                onClick={handleForgetPassword}
                className={`${cssClass}__button`}
                htmlType="submit"
                block
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className={`${cssClass}__back-to-login`}>
              <Link
                to={`/${name}/sign-in`}
                className={`${cssClass}__link--forget`}>
                Back to Login
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
