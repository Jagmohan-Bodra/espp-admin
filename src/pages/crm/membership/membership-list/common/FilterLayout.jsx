import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, Input, Menu} from 'antd';
import {getRegexFilter, getBetweenFilter} from '~/helpers/queryString';
const cssClass = 'layout_filter_component';

const FilterLayout = ({handleSearchSubmit, dataFilter}) => {
  const [data, setData] = useState({});
  const {name, description, discountPercent} = dataFilter;

  useEffect(() => {
    setData({
      name: name && name.regex,
      description: description && description.regex,
      discountPercent: discountPercent && discountPercent.gte,
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
        ...getBetweenFilter('discountPercent', [
          data.discountPercent,
          data.discountPercent,
        ]),
      });
  };

  // TODO: API
  const handleReset = () => {
    setData({});
    handleSearchSubmit &&
      handleSearchSubmit({
        name: undefined,
        description: undefined,
        discountPercent: undefined,
      });
  };

  return (
    <Menu className={`${cssClass} form-control`}>
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

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Discount Percent</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({discountPercent: e.target.value})}
            value={data.discountPercent}
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
    </Menu>
  );
};

export default FilterLayout;
