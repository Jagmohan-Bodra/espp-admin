import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, Input} from 'antd';
import {getRegexFilter} from '~/helpers/queryString';
import {SelectDefault} from '~/components/public/FormHelpers/SelectBlock';
import {CUSTOMER_STATUS_OPTION} from '~/constants/master-data';

const FilterLayout = ({dataFilter, handleSearchSubmit, memberships}) => {
  const [data, setData] = useState({});
  const {user} = dataFilter;

  useEffect(() => {
    setData({
      firstName: ((user || {}).firstName || {}).regex,
      lastName: ((user || {}).lastName || {}).regex,
      email: ((user || {}).email || {}).regex,
      phone: ((user || {}).phone || {}).regex,
      membership: (((dataFilter || {}).membership || {}).name || {}).regex,
      status: ((dataFilter || {}).status || {}).regex,
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
        user: {
          ...getRegexFilter('firstName', data.firstName),
          ...getRegexFilter('lastName', data.lastName),
          ...getRegexFilter('email', data.email),
          ...getRegexFilter('phone', data.phone),
        },
        membership: {
          name: {
            regex:
              (memberships.find((item) => item._id == data.membership) || {})
                .name || undefined,
          },
        },
        ...getRegexFilter('status', data.status),
      });
  };

  const handleReset = () => {
    setData({});
    handleSearchSubmit &&
      handleSearchSubmit({
        status: undefined,
        membership: undefined,
        user: {
          firstName: undefined,
          lastName: undefined,
          email: undefined,
          phone: undefined,
        },
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
          <span className={'text-title-default'}>Membership</span>
        </Col>
        <Col span={16}>
          <SelectDefault
            data={memberships}
            placeholder={`Search`}
            onChange={(value) => onChangeData({membership: value})}
            value={data.membership}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Status</span>
        </Col>
        <Col span={16}>
          <SelectDefault
            data={CUSTOMER_STATUS_OPTION}
            placeholder={`Search`}
            onChange={(value) => onChangeData({status: value})}
            value={data.status}
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
