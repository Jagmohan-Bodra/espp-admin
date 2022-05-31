import React, {useEffect, useState} from 'react';
import {Col, Input, Row} from 'antd';
import {trans} from '~/components/public/Translate';
const cssClass = `cms-management-header-page`;

const RowForm = (props) => {
  const {text, form} = props;
  return (
    <Row>
      <Col span={6}>
        <label style={{color: '#727272'}}>{text}</label>
      </Col>
      <Col span={18}>{form}</Col>
    </Row>
  );
};

const BlockFormComponent = (props) => {
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
        text={trans(`Block name`)}
        form={
          <Input
            value={data.componentName}
            onChange={(e) => onChange({componentName: e.target.value})}
          />
        }
      />
      <br />
      <RowForm
        text={trans(`Description`)}
        form={
          <Input
            value={data.description}
            onChange={(e) => onChange({description: e.target.value})}
          />
        }
      />
      <br />
      <RowForm
        text={trans(`Avatar`)}
        form={
          <Input
            value={data.avatar}
            onChange={(e) => onChange({avatar: e.target.value})}
          />
        }
      />
      <br />
      <RowForm
        text={trans(`Group`)}
        form={
          <Input
            value={data.groupCode}
            onChange={(e) => onChange({groupCode: e.target.value})}
          />
        }
      />
    </div>
  );
};

export default BlockFormComponent;
