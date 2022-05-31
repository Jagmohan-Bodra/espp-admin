import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, Input} from 'antd';
import {getRegexFilter} from '~/helpers/queryString';

const FilterLayout = ({handleSearchSubmit, dataFilter}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const {firstName, lastName, phone, email, addressGroup} = dataFilter;
    setData({
      firstName: firstName && firstName.regex,
      lastName: lastName && lastName.regex,
      phone: phone && phone.regex,
      email: email && email.regex,
      addressGroup: ((addressGroup || {}).name || {}).regex,
    });
  }, [dataFilter]);

  const onChangeData = (obj) => {
    setData({
      ...data,
      ...obj,
    });
  };

  const handleSubmit = () => {
    handleSearchSubmit &&
      handleSearchSubmit({
        ...data,
        ...getRegexFilter('firstName', data.firstName),
        ...getRegexFilter('lastName', data.lastName),
        ...getRegexFilter('phone', data.phone),
        ...getRegexFilter('email', data.email),
        addressGroup: {
          name: {
            regex: data.addressGroup,
          },
        },
      });
  };

  const handleReset = () => {
    setData({});
    handleSearchSubmit &&
      handleSearchSubmit({
        firstName: undefined,
        lastName: undefined,
        phone: undefined,
        email: undefined,
        addressGroup: undefined,
      });
  };

  return (
    <div className="layout_filter_component form-control">
      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>First name</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({firstName: e.target.value})}
            value={data.firstName}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Last name</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({lastName: e.target.value})}
            value={data.lastName}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Email</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({email: e.target.value})}
            value={data.email}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Phone</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({phone: e.target.value})}
            value={data.phone}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Group Name</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({addressGroup: e.target.value})}
            value={data.addressGroup}
          />
        </Col>
      </Row>

      <Row className={'row__space-mid mr-20'}>
        <Col></Col>
        <Col>
          <Space>
            <Button
              className={'btn-quick-filter ant-btn light_default'}
              onClick={handleReset}>
              Reset
            </Button>
            <Button
              className={'btn-quick-filter default'}
              onClick={handleSubmit}>
              Ok
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default FilterLayout;
