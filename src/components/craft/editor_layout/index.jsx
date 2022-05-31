import {Button, Space} from 'antd';
import React from 'react';
import CustomizeEditorLayout from './CustomizeEditorLayout';

const EditorLayout = (props) => {
  return (
    <div style={{position: 'relative', width: '100%'}}>
      <div className={`editor_layout`} style={{minWidth: '700px'}}>
        {props.children}
      </div>
    </div>
  );
};

export const EditorMenuLayout = (props) => {
  return (
    <div style={{position: 'relative'}}>
      <div className={`editor_layout`}>
        <CustomizeEditorLayout {...props} />
        {props.children}
      </div>
    </div>
  );
};

export const EditorInlineLayout = (props) => {
  const {handleRemove, handleCustomize, handleCopy} = props;
  return (
    <div style={{position: 'relative'}}>
      <div className={`editor_layout`}>
        <div style={{textAlign: 'left'}}>
          <Space size={5}>
            <Button onClick={() => handleCustomize && handleCustomize()}>
              {' '}
              Customize
            </Button>
            <Button onClick={() => handleCopy && handleCopy()}>Copy</Button>
            <Button onClick={() => handleRemove && handleRemove()}>
              Delete
            </Button>
          </Space>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default EditorLayout;
