import React from 'react';
import {Button, Dropdown, Space} from 'antd';
import {PagesIcon, SortDownIcon, TrashIcon} from '~/public/assets/icon';

const CustomizeEditorLayout = (props) => {
  const {menu, handleCopy, handleRemove, isNullDropdown} = props;
  return (
    <div style={{textAlign: 'left'}}>
      <Space size={0}>
        {!isNullDropdown && (
          <Dropdown overlay={menu}>
            <Button>
              <Space>
                <SortDownIcon /> CUSTOMIZE{' '}
              </Space>
            </Button>
          </Dropdown>
        )}
        <Button onClick={() => handleCopy && handleCopy()}>
          {<PagesIcon />}
        </Button>
        <Button onClick={() => handleRemove && handleRemove()}>
          {<TrashIcon />}
        </Button>
      </Space>
    </div>
  );
};

export const CustomizeLayout = (props) => {
  const {handleRemove, handleCustomize} = props;
  return (
    <div style={{textAlign: 'left'}}>
      <Space size={5}>
        <Button onClick={() => handleCustomize && handleCustomize()}>
          {' '}
          Customize
        </Button>
        <Button onClick={() => handleRemove && handleRemove()}>Delete</Button>
      </Space>
    </div>
  );
};

export default CustomizeEditorLayout;
