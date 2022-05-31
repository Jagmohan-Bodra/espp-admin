import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, Input} from 'antd';
const cssClass = 'layout_filter_component';
import {getRegexFilter} from '~/helpers/queryString';

const FilterLayout = ({handleSearchSubmit, dataFilter}) => {
  const [data, setData] = useState({});
  const {name, description} = dataFilter;

  useEffect(() => {
    setData({
      name: name && name.regex,
      description: description && description.regex,
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
    handleSearchSubmit &&
      handleSearchSubmit({
        ...data,
        ...getRegexFilter('name', data.name),
        ...getRegexFilter('description', data.description),
      });
  };

  // TODO: API
  const handleReset = () => {
    setData({});
    handleSearchSubmit &&
      handleSearchSubmit({
        name: undefined,
        description: undefined,
      });
  };

  return (
    <div className={`${cssClass} form-control`}>
      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Role</span>
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
          <span className={'text-title-default'}>Description</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({description: e.target.value})}
            value={data.description}
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
