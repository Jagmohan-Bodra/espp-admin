import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, Input} from 'antd';

import {getRegexFilter, getEqualFilter} from '~/helpers/queryString';
import {trans} from '~/components/public/Translate';
import {SelectDefault} from '~/components/public/FormHelpers/SelectBlock';
import {PAGE_TYPE_OPTION} from '~/constants/master-data';

const FilterLayout = ({handleSearchSubmit, dataFilter}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      name: dataFilter.name && dataFilter.name.regex,
      url: dataFilter.url && dataFilter.url.regex,
      pushlish: dataFilter.pushlish && dataFilter.pushlish.equal,
      type: dataFilter.type && dataFilter.type.equal,
      theme: dataFilter.theme && dataFilter.theme.name.regex,
    });
  }, [dataFilter]);

  const onChangeData = (obj) => {
    setData({
      ...data,
      ...obj,
    });
  };

  const handleSubmit = () => {
    let params = {
      ...data,
      ...getRegexFilter('name', data.name),
      ...getRegexFilter('url', data.url),
      ...getEqualFilter('pushlish', data.pushlish),
      ...getEqualFilter('type', data.type),
      theme: {
        name: {
          regex: data.theme,
        },
      },
    };
    if (data.pushlish == '') {
      params.pushlish = '';
    }
    if (data.type == '') {
      params.type = '';
    }
    handleSearchSubmit && handleSearchSubmit(params);
  };

  const handleReset = () => {
    setData({});
    handleSearchSubmit &&
      handleSearchSubmit({
        name: undefined,
        url: undefined,
        pushlish: undefined,
        type: undefined,
        theme: undefined,
      });
  };

  return (
    <div className={`layout_filter_component form-control`}>
      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>{trans('Name')}</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            onChange={(e) => onChangeData({name: e.target.value})}
            value={data.name}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>{trans('URL')}</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            onChange={(e) => onChangeData({url: e.target.value})}
            value={data.url}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>{trans('Published')}</span>
        </Col>
        <Col span={16}>
          <SelectDefault
            data={[
              {key: '1', name: 'True'},
              {key: '0', name: 'False'},
            ]}
            placeholder={`Search`}
            onChange={(value) => onChangeData({pushlish: value})}
            value={data.pushlish}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>{trans('Type')}</span>
        </Col>
        <Col span={16}>
          <SelectDefault
            data={PAGE_TYPE_OPTION}
            placeholder={`Search`}
            onChange={(value) => onChangeData({type: value})}
            value={data.type}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <span className={'text-title-default'}>{trans('Theme')}</span>
        </Col>
        <Col span={16}>
          <Input
            placeholder={`Search`}
            onChange={(e) => onChangeData({theme: e.target.value})}
            value={data.theme}
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
              {trans('Reset')}
            </Button>
            <Button
              className={'btn-quick-filter default'}
              onClick={handleSubmit}>
              {trans('Ok')}
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default FilterLayout;
