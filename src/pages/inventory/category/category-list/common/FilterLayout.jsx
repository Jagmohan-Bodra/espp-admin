import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, Input} from 'antd';
import {getRegexFilter} from '~/helpers/queryString';
import {BLOCK_STATUS_OPTION} from '~/constants/master-data';
import {SelectDefault} from '~/components/public/FormHelpers/SelectBlock';
const cssClass = 'layout_filter_component';

const FilterLayout = ({handleSearchSubmit, dataFilter, setFilter}) => {
  const [data, setData] = useState({});
  const {name, code, status} = dataFilter;

  useEffect(() => {
    setData({
      name: name && name.regex,
      code: code && code.regex,
      status: status && status.equal,
    });
  }, [dataFilter]);

  const onChangeData = (obj) => {
    setData({
      ...data,
      ...obj,
    });
  };

  // TODO: API
  const handleSubmit = () => {
    setFilter(true);
    handleSearchSubmit &&
      handleSearchSubmit({
        ...data,
        ...getRegexFilter('name', data.name),
        ...getRegexFilter('code', data.code),
        status: data.status ? {equal: data.status} : {},
      });
  };

  // TODO: API
  const handleReset = () => {
    setFilter(false);
    setData({});
    handleSearchSubmit &&
      handleSearchSubmit({
        name: undefined,
        code: undefined,
        status: undefined,
      });
  };

  return (
    <div className={`${cssClass} form-control`}>
      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Name</span>
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
          <span className={'text-title-default'}>Code</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({code: e.target.value})}
            value={data.code}
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
            <Button className={'ant-btn light_default'} onClick={handleReset}>
              Reset
            </Button>
            <Button className={'default'} onClick={handleSubmit}>
              Ok
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default FilterLayout;
