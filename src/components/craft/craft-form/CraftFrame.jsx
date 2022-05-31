import React, {useRef, useState, useEffect} from 'react';
import {Col, Row, Button} from 'antd';
import {Frame, Element, useEditor} from '@craftjs/core';
import {useSelector} from 'react-redux';

import {PageContainer} from '~/components/craft/re-component/PageContainer';
import {Block} from '~/components/craft/re-component/Block';
import {IFrame} from './IFrame';
import {
  antdStyle,
  defaultStyle,
  editStyle,
  joditStyle,
  swiperBundleStyle,
  swiperNavigationStyle,
  swiperScrollbarStyle,
} from './style.css';
import {PAGE_SIZE_OPTION} from '~/constants/master-data';
import {
  setCreenModeStore,
  setSetIframeRefStore,
} from '~/components/craft/re-component/common';
import {decode, replaceAll} from '../common/util';
import {componentsBuild} from '../build-component/common';
const pageSizeOption = Object.values(PAGE_SIZE_OPTION);

export const genderComponentById = (
  jsonData,
  styleCustomize = '',
  id = 'ROOT',
) => {
  const {type, props, hidden, nodes} = jsonData[id];
  const Component = componentsBuild()[type.resolvedName];
  return (
    <Component
      {...props}
      hidden={hidden}
      key={id}
      isNew={true}
      styleCustomize={styleCustomize}
      id={id}>
      {(nodes || []).map((nodeItem) =>
        genderComponentById(jsonData, '', nodeItem),
      )}
    </Component>
  );
};

const ResizeButton = (props) => {
  const {onClick, classnamebutton, text} = props;
  return (
    <div className={`btn-mod-edit`}>
      <Button className={classnamebutton} onClick={onClick}>
        {' '}
        {text}{' '}
      </Button>
    </div>
  );
};

const CraftFrame = (props) => {
  const {style, themeJson, themeStyle} = props;
  const {actions} = useEditor();
  const [selectPageSize, setSelectPageSize] = useState(pageSizeOption[0]);
  const screenMode = useSelector((state) => state.craft.mode);
  const iframeDom = useRef(null);

  useEffect(() => {
    iframeDom && setSetIframeRefStore(iframeDom);
  }, [iframeDom]);

  useEffect(() => {
    screenMode && setSelectPageSize(PAGE_SIZE_OPTION[screenMode] || {});
  }, [screenMode]);

  useEffect(() => {
    if (props.isBlock && props.data) {
      setTimeout(
        () =>
          actions.deserialize(
            replaceAll(props.data, `"isNew":false`, `"isNew":true`),
          ),
        500,
      );
      return;
    }
    props.data && setTimeout(() => actions.deserialize(props.data), 500);
  }, [props.data, props.reset]);

  useEffect(() => {
    actions.setOptions((options) => (options.enabled = props.enabled));
  }, [props.enabled]);

  const hanleScreenModeClick = (item) => {
    setSelectPageSize(item);
    setCreenModeStore(item.id);
  };
  const themeStyleData = themeStyle && {
    object: decode(themeStyle.object),
    style: decode(themeStyle.style),
    styleCustomize: decode(themeStyle.styleCustomize),
  };

  return (
    <span className={props.enabled ? 'craft_edit_enabled' : ''}>
      {props.enabled ? (
        <>
          <Row style={{marginBottom: '15px', width: '100%', height: '20px'}}>
            <Col span={24}>
              <div style={{position: 'relative', width: '100%'}}>
                {pageSizeOption.map((item, index) => (
                  <ResizeButton
                    key={index}
                    classnamebutton={`${item.classNameButton} ${
                      selectPageSize.size >= item.size ? 'bg-b' : ''
                    }`}
                    text={selectPageSize.text || ''}
                    onClick={() => hanleScreenModeClick(item)}
                  />
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className={`center-flex`}>
                <div
                  className={`center-div ${selectPageSize.classNameButton}`}
                  ref={iframeDom}>
                  <IFrame
                    styles={`
                  ${antdStyle} ${defaultStyle} ${editStyle} ${joditStyle} 
                  ${swiperScrollbarStyle} ${swiperNavigationStyle} ${swiperBundleStyle} 
                  ${(themeStyleData || {}).style || ''} ${
                      (themeStyleData || {}).styleCustomize || ''
                    }
                  ${style} 
                  `}>
                    {themeJson ? (
                      genderComponentById(JSON.parse(themeJson))
                    ) : (
                      // ? <Element is={Block}/>
                      <div className={`craft_edit_enabled`}>
                        <Frame>
                          <Element
                            is={props.isBlock ? Block : PageContainer}
                            canvas
                          />
                        </Frame>
                      </div>
                    )}
                  </IFrame>
                </div>
              </div>
            </Col>
          </Row>
          <style>{`${style}`} </style>
        </>
      ) : (
        <IFrame
          styles={`${antdStyle} ${defaultStyle} ${swiperScrollbarStyle} ${swiperNavigationStyle} ${swiperBundleStyle} ${style} `}>
          <Frame {...props}>
            <Element is={props.isBlock ? Block : PageContainer} canvas />
          </Frame>
        </IFrame>
      )}
    </span>
  );
};

export default CraftFrame;
