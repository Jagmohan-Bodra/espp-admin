import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import {Slider} from '@material-ui/core';
import {Col, Input, Row, Collapse, Select, Radio} from 'antd';
import UploadImage from '~/components/public/UploadImage/UploadImage';
import PositionImage from '~/components/craft/tool-component/component/PositionImage';
import {uploadImageData} from '~/reduxs/upload/action';
import {debounce} from '~/helpers/common';
import './style.scss';
import {ChromePicker} from 'react-color';
import {withStyles} from '@material-ui/styles';
import blockApi from '../../../../apis/api/block';
import {getPageFilter} from '~/helpers/queryString';

const {Panel} = Collapse;
const {Option} = Select;
const cssClass = 'block_layout_collapse';
const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
const SliderStyled = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '5px 0',
    width: '100%',
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -7,
    marginLeft: -7,
    '&:focus,&:hover,&$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

const BlockLayoutCollapse = (props) => {
  const {menu, handleSubmit} = props;
  const screenMode = useSelector((state) => state.craft.mode);
  const [reset, setReset] = useState(true);
  useEffect(() => {
    setReset(!reset);
  }, [screenMode]);

  return (
    <Collapse
      mode="vertical"
      ghost
      defaultActiveKey={(menu || []).map(
        (item, index) => `${item.key}_${index}`,
      )}
      className={`${cssClass}`}
      key={reset}>
      {(menu || []).map((item, index) => (
        <Panel key={`${item.key}_${index}`} header={`${item.title}`}>
          {(item.children || []).map((childrenItem) =>
            (formTypeOption[childrenItem.formType] || (() => {}))({
              defaultValue: item.defaultValue,
              ...childrenItem,
              handleSubmit,
              key: item.key,
            }),
          )}
        </Panel>
      ))}
    </Collapse>
  );
};

export default BlockLayoutCollapse;

const radioLayout = (props) => {
  const {children, handleSubmit, key, defaultValue} = props;
  const handleChange = (e) => {
    handleSubmit && handleSubmit(key, e.target.value);
  };
  return (
    <Radio.Group
      onChange={handleChange}
      defaultValue={defaultValue}
      key={`checkbox_${key}`}>
      {(children || []).map((childrenItem, index) => (
        <Radio
          value={childrenItem.value}
          key={`checkbox_${key}_${index}`}
          style={{width: '100%'}}>
          {childrenItem.text}
        </Radio>
      ))}
    </Radio.Group>
  );
};

const checkBoxLayout = (props) => {
  const {children, handleSubmit, key, defaultValue} = props;
  const handleChange = (value) => {
    handleSubmit && handleSubmit(key, value);
  };
  return (
    <Select
      style={{width: '100%'}}
      onChange={handleChange}
      defaultValue={defaultValue}
      key={`checkbox_${key}`}>
      {(children || []).map((childrenItem, index) => (
        <Option value={childrenItem.value} key={`checkbox_${key}_${index}`}>
          {childrenItem.text}
        </Option>
      ))}
    </Select>
  );
};

const subMenuCheckBoxLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value, children} = props;

  const func = debounce((_, valueData) => {
    handleSubmit(key, {
      ...(value || {}),
      [keyItem]: valueData,
    });
  }, 100);

  return (
    <Row key={`sub_${keyItem}_${keyItem}`}>
      <Col span={8}>{`${text}`}</Col>
      <Col span={16}>
        {checkBoxLayout({
          children,
          handleSubmit: func,
          key: key + keyItem,
          defaultValue: (value || {})[keyItem],
        })}
      </Col>
    </Row>
  );
};

const subMenuRadioLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value, children} = props;

  const func = debounce((_, valueData) => {
    handleSubmit(key, {
      ...(value || {}),
      [keyItem]: valueData,
    });
  }, 100);

  return (
    <div key={`sub_${keyItem}`}>
      <Row>
        <Col span={24}>{`${text}`}</Col>
      </Row>
      <Row key={`sub_${keyItem}_${keyItem}`}>
        <Col span={2}></Col>
        <Col span={22}>
          {radioLayout({
            children,
            handleSubmit: func,
            key: key + keyItem,
            defaultValue: (value || {})[keyItem],
          })}
        </Col>
      </Row>
    </div>
  );
};

const InputLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value} = props;

  const func = debounce((valueData) => {
    handleSubmit(key, {
      ...(value || {}),
      [keyItem]: valueData,
    });
  }, 500);

  return (
    <div key={`${keyItem}_`}>
      <Row>
        <Col span={8}>
          <div style={{lineHeight: '2.4em'}}>{text}</div>
        </Col>
        <Col span={16}>
          <Input
            defaultValue={(value || {})[keyItem] || ''}
            onChange={(e) => func(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

const InputTextLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value} = props;

  const func = debounce((valueData) => {
    handleSubmit(key, valueData);
  }, 500);

  return (
    <div key={`${keyItem}_`}>
      <Row>
        <Col span={8}>
          <div style={{lineHeight: '2.4em'}}>{text}</div>
        </Col>
        <Col span={16}>
          <Input defaultValue={value} onChange={(e) => func(e.target.value)} />
        </Col>
      </Row>
    </div>
  );
};

const GroupText = (props) => {
  const {keyItem, text} = props;
  return (
    <div key={`${keyItem}_`}>
      <Row>
        <Col span={24}>
          <div
            style={{lineHeight: '2.4em', fontSize: '14px', fontWeight: 'bold'}}>
            {text}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const ImageForm = (props) => {
  const dispatch = useDispatch();
  const {handleSubmit, key, keyItem, text, value} = props;

  const func = debounce((valueData) => {
    handleSubmit(key, {
      ...(value || {}),
      ...valueData,
    });
  }, 500);

  const onChangeImage = async (fileImage) => {
    if (fileImage) {
      let url = await dispatch(uploadImageData([fileImage]));
      func({[keyItem]: url});
    }
  };

  return (
    <div key={`${keyItem}_`}>
      <Row>
        <Col span={8}>
          <div>{text}</div>
        </Col>
        <Col span={16}>
          <Input
            defaultValue={value[keyItem] || ''}
            onChange={(e) => func({[keyItem]: e.target.value})}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div>Upload Image</div>
        </Col>
        <Col span={16}>
          <UploadImage
            labelButton="Upload Image"
            imageUrl={value[keyItem] || ''}
            onChange={(file) => {
              onChangeImage(file);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

const ImagePositionLayout = (props) => {
  const {handleSubmit, key, keyItem, value, backgroundImage} = props;

  const setPosition = (position) => {
    handleSubmit(key, {
      ...(value || {}),
      [keyItem]: position,
    });
  };
  return (
    <div key={`${keyItem}_`}>
      <PositionImage
        defaultPosition={(value || {})[keyItem]}
        setPosition={setPosition}
        backgroundImage={backgroundImage}
      />
    </div>
  );
};

const HeaderInputLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value} = props;

  const func = debounce((vIndex, valueData) => {
    let newValue = [...value];
    newValue[vIndex] = valueData;
    handleSubmit(key, newValue);
  }, 500);

  return (
    <div key={`${keyItem}_`}>
      {(value || []).map((item, vIndex) => (
        <Row key={vIndex}>
          <Col span={8}>
            <div style={{lineHeight: '2.4em'}}>{`${text} ${vIndex + 1}`}</div>
          </Col>
          <Col span={16}>
            <Input
              defaultValue={item}
              onChange={(e) => func(vIndex, e.target.value)}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const ColorLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value} = props;
  const [active, setActive] = useState(false);
  const [internalValue, setInternalValue] = useState('');

  const func = (valueData) => {
    handleSubmit(key, {
      ...(value || {}),
      [keyItem]: valueData,
    });
  };

  useEffect(() => {
    if (value[keyItem]) {
      let val = value[keyItem] || '';
      val = val.replace('rgba(', '');
      val = val.replace(')', '');
      val = val.split('//<').map((item) => parseInt(item));
      val = {r: val[0] || 0, g: val[1] || 0, b: val[2] || 0, a: val[3] || 1};
      setInternalValue(val);
    }
  }, [value]);

  return (
    <div onClick={() => setActive(true)} key={`${keyItem}_`}>
      <div
        style={{
          position: 'absolute',
          left: '16%',
          marginTop: '35px',
          zIndex: '99999',
          display: active ? 'block' : 'none',
        }}>
        <div
          style={{
            width: '100%',
            left: 0,
            top: 0,
            position: 'fixed',
            height: '100%',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActive(false);
          }}></div>
        <ChromePicker
          color={internalValue}
          onChange={(color) => {
            func(`rgba(${Object.values(color.rgb).join(' //<')})`);
            setInternalValue(color.rgb);
          }}
        />
      </div>
      <Row>
        <Col span={8}>
          <div>{text}</div>
        </Col>
        <Col span={16}>
          <Input
            value={
              internalValue
                ? `rgba(${Object.values(internalValue).join(' ,')})`
                : ''
            }
            onChange={(e) => {
              setInternalValue(e.target.value);
              func(e.target.value);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

const SliderGroupLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value} = props;
  const [internalValue, setInternalValue] = useState([0, 0, 0, 0]);
  const [active, setActive] = useState(false);

  const func = (valueData) => {
    handleSubmit(key, {
      ...(value || {}),
      [keyItem]: valueData,
    });
  };

  const handleOnChane = (index, value) => {
    const newData = [...internalValue];
    newData[index] = value;
    setInternalValue(newData);
    func(newData.map((item) => `${item}px`).join(' '));
  };

  useEffect(() => {
    if (value[keyItem]) {
      let val = value[keyItem] || '';
      val = val.replace('px', '');
      val = val.split(' ').map((item) => parseInt(item));
      setInternalValue(val);
    } else {
      setInternalValue([0, 0, 0, 0]);
    }
  }, [value]);

  return (
    <div key={`${keyItem}_`}>
      <Row onClick={() => setActive(!active)}>
        <Col span={8}>{text}</Col>
        <Col span={16}>
          {internalValue.map((item) => `${item}px`).join(' ')}
        </Col>
      </Row>
      <div style={{display: active ? 'block' : 'none'}}>
        <Row>
          <h4 className="text-sm text-light-gray-2">{`Top`}</h4>
          <SliderStyled
            value={internalValue[0]}
            onChange={(_, value) => handleOnChane(0, value)}
          />
        </Row>
        <Row>
          <h4 className="text-sm text-light-gray-2">{`Right`}</h4>
          <SliderStyled
            value={internalValue[1]}
            onChange={(_, value) => handleOnChane(1, value)}
          />
        </Row>
        <Row>
          <h4 className="text-sm text-light-gray-2">{`Bottom`}</h4>
          <SliderStyled
            value={internalValue[2]}
            onChange={(_, value) => handleOnChane(2, value)}
          />
        </Row>
        <Row>
          <h4 className="text-sm text-light-gray-2">{`Left`}</h4>
          <SliderStyled
            value={internalValue[3]}
            onChange={(_, value) => handleOnChane(3, value)}
          />
        </Row>
      </div>
    </div>
  );
};

const DecorationSliderGroupLayout = (props) => {
  const {handleSubmit, key, keyItem, text, value, children} = props;
  const [internalValue, setInternalValue] = useState({});
  const [active, setActive] = useState(false);

  const func = (keyItem, valueData) => {
    handleSubmit(key, {
      ...(value || {}),
      [keyItem]: valueData,
    });
  };

  const handleOnChane = (key, value) => {
    const newData = {...internalValue};
    newData[key] = value;
    setInternalValue(newData);
    if (key == 'border-radius') {
      func(key, `${value}px`);
    }
    if (key == 'box-shadow') {
      func(key, `rgba(0, 0, 0, 0.13) 0px 3px 100px ${value}px`);
    }
  };

  useEffect(() => {
    let newData;
    if (value['border-radius']) {
      let val = value['border-radius'];
      val = val.replace('px', '');
      newData = {
        ...newData,
        'border-radius': parseInt(val),
      };
    }
    if (value['box-shadow']) {
      let val = value['border-radius'];
      val = val.replace('rgba(0, 0, 0, 0.13) 0px 3px 100px ', '');
      val = val.replace('px ', '');

      newData = {
        ...newData,
        'box-shadow': parseInt(val),
      };
    }
    if (newData) {
      setInternalValue(newData);
    }
  }, [value]);

  return (
    <div key={`${keyItem}_`}>
      <Row onClick={() => setActive(!active)}>
        <Col span={8}>{text}</Col>
        <Col span={16}>
          <div style={{textAlign: 'right'}}>
            {!active && <DownOutlined style={{fontSize: '8px'}} />}
            {active && <UpOutlined style={{fontSize: '8px'}} />}
          </div>
        </Col>
      </Row>
      <div style={{display: active ? 'block' : 'none'}}>
        {children.map((item, index) => (
          <Row key={index}>
            <h4 className="text-sm text-light-gray-2">{`${item.text}`}</h4>
            <SliderStyled
              value={internalValue[item.key]}
              onChange={(_, value) => handleOnChane(item.key, value)}
            />
          </Row>
        ))}
      </div>
    </div>
  );
};

const BlockSelect = (props) => {
  const {handleSubmit, key, defaultValue} = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    blockApi
      .getBlockList(getPageFilter(1, true))
      .then((results) => setData(results.data));
  }, []);
  const handleChange = (value) => {
    handleSubmit && handleSubmit(key, value);
  };

  return (
    <Select
      style={{width: '100%'}}
      onChange={handleChange}
      defaultValue={defaultValue}
      key={`BlockSelect_${key}`}>
      {(data || []).map((childrenItem, index) => (
        <Option value={childrenItem._id} key={`BlockSelect_${key}_${index}`}>
          {childrenItem.name}
        </Option>
      ))}
    </Select>
  );
};

export const formType = {
  CHECKBOX: 'CHECKBOX',
  SUB_CHECKBOX: 'SUB_CHECKBOX',
  SUB_RADIO: 'SUB_RADIO',
  INPUT: 'INPUT',
  INPUT_TEXT: 'INPUT_TEXT',
  GROUP_TEXT: 'GROUP_TEXT',
  IMAGE_FORM: 'IMAGE_FORM',
  IMAGE_POSTION: 'IMAGE_POSTION',
  HEADER_INPUT: 'HEADER_INPUT',
  COLOR_PICKER: 'COLOR_PICKER',
  SLIDER_GROUP: 'SLIDER_GROUP',
  DECORATION_SLIDER_GROUP: 'DECORATION_SLIDER_GROUP',
  BLOCK_SELECT: 'BLOCK_SELECT',
};

export const formTypeOption = {
  [formType.CHECKBOX]: checkBoxLayout,
  [formType.INPUT]: InputLayout,
  [formType.INPUT_TEXT]: InputTextLayout,
  [formType.GROUP_TEXT]: GroupText,
  [formType.IMAGE_FORM]: ImageForm,
  [formType.SUB_CHECKBOX]: subMenuCheckBoxLayout,
  [formType.SUB_RADIO]: subMenuRadioLayout,
  [formType.IMAGE_POSTION]: ImagePositionLayout,
  [formType.HEADER_INPUT]: HeaderInputLayout,
  [formType.COLOR_PICKER]: ColorLayout,
  [formType.SLIDER_GROUP]: SliderGroupLayout,
  [formType.DECORATION_SLIDER_GROUP]: DecorationSliderGroupLayout,
  [formType.BLOCK_SELECT]: BlockSelect,
};
