import React from 'react';
import {withRouter} from 'react-router-dom';
import {Col, Menu, Row, Space} from 'antd';
import {useEditor} from '@craftjs/core';
import {trans} from '~/components/public/Translate';
import {SaveIcon, TimesIcon} from '~/public/assets/icon';

const {Item} = Menu;
const cssClass = `cms-management-header-page`;

const CraftHeaderEdit = (props) => {
  const {
    handleCancelClick,
    handleSaveClick,
    handleCodeClick,
    handleBlockClick,
    handleLayerClick,
  } = props;
  const {query} = useEditor();

  return (
    <div className={`${cssClass} fixed-top craft_header`}>
      <Row className={`row__space-mid`}>
        <Col>
          <Menu
            mode="horizontal"
            theme="dark"
            className={`${cssClass}_menu`}
            defaultSelectedKeys={['Discard']}>
            <Item
              key="layers"
              onClick={() => handleLayerClick && handleLayerClick()}>
              <Space>{trans('Layer')}</Space>
            </Item>
            <Item
              key="discard"
              onClick={() => handleBlockClick && handleBlockClick()}>
              <Space>{trans('Block')}</Space>
            </Item>
            <Item
              key="save"
              onClick={() =>
                handleCodeClick && handleCodeClick(query.serialize())
              }>
              <Space>{trans('Code')}</Space>
            </Item>
          </Menu>
        </Col>
        <Col>
          <Menu mode="horizontal" theme="dark" className={`${cssClass}_menu`}>
            <Item
              key="discard"
              onClick={() => handleCancelClick && handleCancelClick()}>
              <Space>
                <TimesIcon />
                {trans('Discard')}
              </Space>
            </Item>
            <Item
              key="save"
              onClick={() =>
                handleSaveClick && handleSaveClick(query.serialize())
              }>
              <Space>
                <SaveIcon /> {trans('Save')}
              </Space>
            </Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(CraftHeaderEdit);
