import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, Input} from 'antd';
import {getRegexFilter, getBetweenFilter} from '~/helpers/queryString';
import {SelectDefault} from '~/components/public/FormHelpers/SelectBlock';
import {BLOCK_STATUS_OPTION} from '~/constants/master-data';

const FilterLayout = ({dataFilter, handleSearchSubmit}) => {
  const [data, setData] = useState({});
  const {sku, name, quantity, taxApply, status} = dataFilter;

  useEffect(() => {
    setData({
      sku: sku && sku.regex,
      name: name && name.regex,
      quantity: quantity && quantity.lte,
      taxApply: taxApply && taxApply.equal,
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
        ...getRegexFilter('sku', data.sku),
        ...getRegexFilter('name', data.name),
        ...getBetweenFilter('quantity', [data.quantity, data.quantity]),
        taxApply: data.taxApply ? {regex: data.taxApply} : {},
        status: data.status ? {equal: data.status} : {},
      });
  };

  const handleReset = () => {
    setData({});
    handleSearchSubmit &&
      handleSearchSubmit({
        sku: undefined,
        name: undefined,
        quantity: undefined,
        taxApply: undefined,
        status: undefined,
      });
  };

  return (
    <div className="layout_filter_component form-control">
      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>SKU</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({sku: e.target.value})}
            value={data.sku}
          />
        </Col>
      </Row>

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
          <span className={'text-title-default'}>Quantity</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            className={'input-default'}
            onChange={(e) => onChangeData({quantity: e.target.value})}
            value={data.quantity}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>Tax</span>
        </Col>
        <Col span={16}>
          <SelectDefault
            data={[
              {key: '1', name: 'True'},
              {key: '0', name: 'False'},
            ]}
            placeholder={`Search`}
            onChange={(value) => onChangeData({taxApply: value})}
            value={data.taxApply}
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
