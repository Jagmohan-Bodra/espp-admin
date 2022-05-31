import React, {useEffect, useState} from 'react';
import {Col, Input, Row, Switch} from 'antd';
import {trans} from '~/components/public/Translate';
const cssClass = `cms-management-header-page`;

const RowForm = (props) => {
  const {text, form} = props;
  return (
    <Row>
      <Col span={4}>{text}</Col>
      <Col span={20}>{form}</Col>
    </Row>
  );
};

const PagePropertityComponent = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(props.data || {});
  }, [props.data]);

  const onChange = (params) => {
    const newData = {
      ...data,
      ...params,
    };
    setData(newData);
    props.setData && props.setData(newData);
  };
  return (
    <div className={`${cssClass}_page_propertity_form`}>
      <RowForm
        text={trans(`Page name`)}
        form={
          <Input
            value={data.name}
            onChange={(e) => onChange({name: e.target.value})}
          />
        }
      />
      <RowForm
        text={trans(`Page URL`)}
        form={
          <Input
            value={data.url}
            onChange={(e) => onChange({url: e.target.value})}
          />
        }
      />
      <RowForm
        text={trans(`Publish`)}
        form={
          <Switch
            checked={data.pushlish}
            onClick={() => onChange({pushlish: !data.pushlish})}
          />
        }
      />
    </div>
  );
};

export default PagePropertityComponent;
