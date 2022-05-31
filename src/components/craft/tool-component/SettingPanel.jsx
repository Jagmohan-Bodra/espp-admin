import React from 'react';
import {useEditor} from '@craftjs/core';
import {TimesIcon} from '~/public/assets/icon';
import {setCustomizeStore} from '~/components/craft/re-component/common';
import {Row, Col} from 'antd';
const cssClass = 'setting-panel-craft';

export const SettingsPanel = () => {
  const {selected} = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  const handleClose = () => {
    setCustomizeStore(false);
  };

  return selected ? (
    <div className={`${cssClass}`}>
      <div className={`${cssClass}_header`}>
        <Row className={`row__space-mid`}>
          <Col
            onClick={handleClose}
            className={`${cssClass}_header_close`}
            span={3}>
            {' '}
            <TimesIcon />{' '}
          </Col>
          <Col span={21}>
            <div className={`${cssClass}_header_title`}> {selected.name} </div>
          </Col>
        </Row>
      </div>
      <div className={`${cssClass}_body`}>
        {selected.settings && React.createElement(selected.settings)}
      </div>
    </div>
  ) : null;
};
