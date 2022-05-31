import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, Input} from 'antd';
import {getRegexFilter} from '~/helpers/queryString';
import {SelectDefault} from '~/components/public/FormHelpers/SelectBlock';
import {BLOCK_STATUS_OPTION} from '~/constants/master-data';

const FilterLayout = ({handleSearchSubmit, dataFilter}) => {
  const [data, setData] = useState({});
  const {name, status} = dataFilter;

  useEffect(() => {
    setData({
      name: name && name.regex,
      status: status && status.equal,
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
        ...getRegexFilter('name', data.name),
        status: data.status ? {equal: data.status} : {},
      });
  };

  const handleReset = () => {
    setData({});
    handleSearchSubmit &&
      handleSearchSubmit({
        name: undefined,
        status: undefined,
      });
  };

  return (
    <div className="layout_filter_component form-control">
      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Tag Name</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({name: e.target.value})}
            value={data.name}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Status</span>
        </Col>
        <Col span={16}>
          <SelectDefault
            data={BLOCK_STATUS_OPTION}
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
