import React from 'react';
import {Dropdown, Menu, Space} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {ChromePicker} from 'react-color';
import {useSlate} from 'slate-react';
import {useState} from 'react';

export const Button = React.forwardRef((_a, ref) =>
  // <span ref={ref}>
  //   {_a.children}
  // </span>
  React.createElement('span', {
    ..._a,
    ref,
    className: `${_a.className} jodit-toolbar-button`,
    style: {
      backgroundColor: _a.active == 1 && 'hsla(0,0%,86.3%,0.4)',
      cursor: 'pointer',
      userSelect: 'none',
    },
  }),
);

const menuDropdown = (props) => (
  <Menu
  // onClick={({ item, key, keyPath, domEvent }) => console.log({ item, key, keyPath, domEvent })}
  >
    {(props.data || []).map((item, index) => (
      <Menu.Item key={index}> {item} </Menu.Item>
    ))}
  </Menu>
);

export const DropdownSlate = (props) => {
  const {keyAction, data, icon} = props;
  return (
    <Dropdown
      overlay={menuDropdown(props)}
      placement="bottomRight"
      // trigger={['click']}
      overlayStyle={{
        maxHeight: '300px',
        overflowY: 'scroll',
        userSelect: 'none',
      }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space align="start" size={0}>
          {data[keyAction] ? data[keyAction] : icon}
          <DownOutlined style={{fontSize: '8px', marginTop: '13px'}} />
        </Space>
      </a>
    </Dropdown>
  );
};

const pickColorComponent = ({onChange}) => {
  const [value, setValue] = useState();

  return (
    <ChromePicker
      color={value}
      onChange={(color) => {
        onChange(color.rgb);
        setValue(color);
      }}
    />
  );
};

export const DropdownColorSlate = (props) => {
  const {icon} = props;
  const editor = useSlate();
  const {selection} = editor;

  return (
    <Dropdown
      overlay={pickColorComponent({
        onChange: (value) => props.onChange(editor, value, {...selection}),
      })}
      placement="bottomRight"
      // trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()} style={props.style}>
        <Space align="start" size={0}>
          {icon}
          <DownOutlined style={{fontSize: '8px', marginTop: '13px'}} />
        </Space>
      </a>
    </Dropdown>
  );
};

// export const Button = React.forwardRef((_a, ref) => {
//   var { className, active, reversed } = _a, props = __rest(_a, ["className", "active", "reversed"]);
//   return (React.createElement("span", Object.assign({}, props, {
//     ref: ref, className: cx(className, css`
//         cursor: pointer;
//         color: ${reversed
//         ? active
//           ? 'white'
//           : '#aaa'
//         : active
//           ? 'black'
//           : '#ccc'};
//       `)
//   })));
// });

export const Toolbar = React.forwardRef((_a, ref) =>
  React.createElement('span', {
    ref: ref,
    ..._a,
    style: {
      position: 'relative',
      padding: '1px 0px 17px',
      margin: '0 - 20px',
      borderBottom: '2px solid #eee',
      marginBottom: '20px',
      display: 'inline-flex',
    },
  }),
);
