import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Layers} from '@craftjs/layers';
import lz from 'lzutf8';

import {Toolbox} from '~/components/craft/tool-component/Toolbox';
import EditCode from '~/components/craft/tool-component/EditCode';
import CraftFrame from './CraftFrame';
import CraftEditor from './CraftEditor';
import CraftHeaderEdit from './CraftHeaderEdit';
import {SettingsPanel} from '~/components/craft/tool-component/SettingPanel';
import {setCustomizeStore} from '~/components/craft/re-component/common';
import {
  clean,
  convertToCssString,
  decode,
  encode,
  isEmptyObj,
} from '~/components/craft/common/util';
import {PAGE_SIZE_OPTION, PAGE_SIZE_TYPE} from '~/constants/master-data';
import './style.scss';

const tabOption = {
  LAYER: 'LAYER',
  BLOCK: 'BLOCK',
  CODE: 'CODE',
};

const CraftForm = (props) => {
  const {blockContents, themeData, themeStyle} = props;
  const [enabled, setEnabled] = useState(false);
  const [json, setJson] = useState(null);
  const [themeJson, setThemeJson] = useState(null);
  const [reset, setReset] = useState(false);
  const [style, setStyle] = useState({});
  const [styleCustomize, setStyleCustomize] = useState('');
  const [tab, setTab] = useState(tabOption.BLOCK);
  const customize = useSelector((state) => state.craft.customize);
  const styles = useSelector((state) => state.craft.styles);
  const styleCustomizeBlockData = useSelector(
    (state) => state.craft.styleCustomizeBlock,
  );

  useEffect(() => {
    styles && handleStyleOnChange(styles);
  }, [styles]);

  useEffect(() => {
    styleCustomizeBlockData &&
      handleStyleCustomizeBlockData(styleCustomizeBlockData);
  }, [styleCustomizeBlockData]);

  useEffect(() => {
    setEnabled(props.enabled);
  }, [props.enabled]);

  useEffect(() => {
    if (props.styles) {
      props.styles.object && setStyle(JSON.parse(decode(props.styles.object)));
      props.styles.styleCustomize &&
        setStyleCustomize(decode(props.styles.styleCustomize));
    }
  }, [props.styles]);

  useEffect(() => {
    if (props.json) {
      const jsonData = lz.decompress(lz.decodeBase64(props.json));
      setJson(jsonData);
    }
    if (themeData) {
      const jsonData = lz.decompress(lz.decodeBase64(themeData));
      setThemeJson(jsonData);
    }
  }, [props.json, themeData]);

  const handleCancelClick = () => {
    setCustomizeStore(false);
    setEnabled(false);
    setReset(!reset);
    props.cancel && props.cancel();
    props.setEnabled && props.setEnabled(false);
  };

  const handleSaveClick = (jsonData) => {
    const encodeJsonData = lz.encodeBase64(lz.compress(jsonData));
    setCustomizeStore(false);
    setEnabled(false);
    props.handleSubmitClick &&
      props.handleSubmitClick({
        content: encodeJsonData,
        styles: {
          object: encode(JSON.stringify(style)),
          style: encode(convertStyle(style)),
          styleCustomize: encode(styleCustomize),
        },
      });
    // props.setEnabled && props.setEnabled(false);
  };

  const handleStyleOnChange = (newStyle) => {
    setStyle((oldStyle) => {
      return clean({
        ...oldStyle,
        ...newStyle,
      });
    });
  };

  const handleStyleCustomizeBlockData = (newData) => {
    setStyleCustomize((oldData) => {
      return oldData.includes(newData) ? oldData : `${oldData}\n${newData}`;
    });
  };

  const handleCodeClick = () => {
    setTab(tabOption.CODE);
  };

  const handleBlockClick = () => {
    setTab(tabOption.BLOCK);
  };

  const handleLayerClick = () => {
    setTab(tabOption.LAYER);
  };

  const convertStyle = (styleData) => {
    const {LAPTOP, PC, TABLET, MOBILE} = PAGE_SIZE_TYPE;
    let pc = '';
    let laptop = '';
    let tablet = '';
    let moblie = '';
    const style = clean(styleData);
    Object.keys(style || {}).map((styleKey) => {
      if (style[styleKey] && Object.values(style[styleKey]).length > 0) {
        if (!isEmptyObj(style[styleKey][PC])) {
          pc = pc.concat(
            ' ',
            ` #${styleKey} ${convertToCssString(style[styleKey][PC])}`,
          );
        }
        if (!isEmptyObj(style[styleKey][LAPTOP])) {
          laptop = laptop.concat(
            ' ',
            ` #${styleKey} ${convertToCssString(style[styleKey][LAPTOP])}`,
          );
        }
        if (!isEmptyObj(style[styleKey][TABLET])) {
          tablet = tablet.concat(
            ' ',
            ` #${styleKey} ${convertToCssString(style[styleKey][TABLET])}`,
          );
        }
        if (!isEmptyObj(style[styleKey][MOBILE])) {
          moblie = moblie.concat(
            ' ',
            ` #${styleKey} ${convertToCssString(style[styleKey][MOBILE])}`,
          );
        }
      }
    });

    return ` ${pc} 
      @media (min-width: ${PAGE_SIZE_OPTION[MOBILE].size}px) { ${moblie} } 
      @media (min-width: ${PAGE_SIZE_OPTION[TABLET].size}px) { ${tablet} }
      @media (min-width: ${PAGE_SIZE_OPTION[LAPTOP].size}px ) { ${laptop} }
      @media (min-width: ${PAGE_SIZE_OPTION[PC].size}px ) { ${pc} } `;
  };

  return (
    <div>
      <CraftEditor>
        {enabled && (
          <>
            <CraftHeaderEdit
              handleCancelClick={handleCancelClick}
              handleSaveClick={handleSaveClick}
              handleCodeClick={handleCodeClick}
              handleBlockClick={handleBlockClick}
              handleLayerClick={handleLayerClick}
            />

            <div
              className={`sidebar_component true craft_edit ${
                tab === tabOption.CODE ? 'w-300px' : ''
              }`}>
              <div
                className={`${
                  tab === tabOption.LAYER ? 'craft-show' : 'craft-hidden'
                }`}>
                <Layers expandRootOnLoad />
              </div>
              <div
                className={`${
                  tab === tabOption.BLOCK ? 'craft-show' : 'craft-hidden'
                }`}>
                {tab === tabOption.BLOCK && (
                  <Toolbox blockContents={blockContents} />
                )}
              </div>
              {tab === tabOption.CODE && (
                <EditCode
                  value={styleCustomize}
                  hanleChange={setStyleCustomize}
                />
              )}
            </div>
            {customize && (
              <div
                className={`sidebar_component true craft_edit craft_edit_customize w-300px `}>
                <SettingsPanel />
              </div>
            )}
          </>
        )}
        <div
          className={enabled ? `edit_craft_form_enable` : 'craft_form_enable'}>
          <CraftFrame
            themeJson={themeJson}
            data={json}
            enabled={enabled}
            reset={reset}
            style={`${convertStyle(style)} ${styleCustomize}`}
            isBlock={props.isBlock}
            blockContents={blockContents}
            themeStyle={themeStyle}
          />
        </div>
      </CraftEditor>
    </div>
  );
};

export default CraftForm;
