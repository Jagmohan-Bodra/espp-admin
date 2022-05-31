import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, Input} from 'antd';

import {getRegexFilter, getEqualFilter} from '~/helpers/queryString';
import {trans} from '~/components/public/Translate';
import {SelectDefault} from '~/components/public/FormHelpers/SelectBlock';

const FilterLayout = ({handleSearchSubmit, dataFilter}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      name: dataFilter.name && dataFilter.name.regex,
      url: dataFilter.url && dataFilter.url.regex,
      pushlish: dataFilter.pushlish && dataFilter.pushlish.equal,
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
    };
    if (data.pushlish == null) {
      params.pushlish = undefined;
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
