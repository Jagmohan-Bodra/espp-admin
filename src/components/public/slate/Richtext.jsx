import React, {useCallback, useMemo, useState} from 'react';
import {useEffect} from 'react';
import isHotkey from 'is-hotkey';
import {jsx} from 'slate-hyperscript';
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  useSelected,
  useFocused,
} from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Range,
  Point,
  Element as SlateElement,
} from 'slate';
import {withHistory} from 'slate-history';
import {Button, DropdownColorSlate, DropdownSlate, Toolbar} from './components';
import {
  BoldSlateIcon,
  CodeModeSlatejsIcon,
  ItelicSlatejsIcon,
  OrderedListSlagejsIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  UnderlineSlatejsIcon,
  UnorderedLisSlagejsIcon,
  TextSizeIcon,
  FontColorIcon,
  BgColorIcon,
} from '~/public/assets/icon';
// import { debounce } from '~/helpers/common'

// const func = debounce((method) => {
//   method()
// }, 100);

const ELEMENT_TAGS = {
  A: (el) => ({type: 'link', url: el.getAttribute('href')}),
  BLOCKQUOTE: () => ({type: 'quote'}),
  H1: () => ({type: 'heading-one'}),
  H2: () => ({type: 'heading-two'}),
  H3: () => ({type: 'heading-three'}),
  H4: () => ({type: 'heading-four'}),
  H5: () => ({type: 'heading-five'}),
  H6: () => ({type: 'heading-six'}),
  IMG: (el) => ({type: 'image', url: el.getAttribute('src')}),
  LI: () => ({type: 'list-item'}),
  OL: () => ({type: 'numbered-list'}),
  P: () => ({type: 'paragraph'}),
  PRE: () => ({type: 'code'}),
  UL: () => ({type: 'bulleted-list'}),
  // TABLE: () => ({ type: 'table' }),
  // TBODY: () => ({ type: 'table' }),
  // TR: ( ) => ({ type: 'table-row' }),
  // TD: () => ({ type: 'table-cell' }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({code: true}),
  DEL: () => ({strikethrough: true}),
  EM: () => ({italic: true}),
  I: () => ({italic: true}),
  S: () => ({strikethrough: true}),
  STRONG: () => ({bold: true}),
  U: () => ({underline: true}),
};

export const deserialize = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const {nodeName} = el;
  let parent = el;

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0];
  }
  const children = Array.from(parent.childNodes).map(deserialize).flat();

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx('element', attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => jsx('text', attrs, child));
  }

  return children;
};

const withHtml = (editor) => {
  const {insertData, isInline, isVoid} = editor;
  const {deleteBackward, deleteForward, insertBreak} = editor;

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const fragment = deserialize(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  editor.deleteBackward = (unit) => {
    const {selection} = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'table-cell',
      });

      if (cell) {
        const [, cellPath] = cell;
        const start = Editor.start(editor, cellPath);

        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  editor.deleteForward = (unit) => {
    const {selection} = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'table-cell',
      });

      if (cell) {
        const [, cellPath] = cell;
        const end = Editor.end(editor, cellPath);

        if (Point.equals(selection.anchor, end)) {
          return;
        }
      }
    }

    deleteForward(unit);
  };

  editor.insertBreak = () => {
    const {selection} = editor;

    if (selection) {
      const [table] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'table',
      });

      if (table) {
        return;
      }
    }

    insertBreak();
  };

  return editor;
};

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const RichTextExample = (prop) => {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withHtml(withReact(withHistory(createEditor()))),
    [],
  );

  useEffect(() => {
    setValue(prop.value);
  }, [prop.value]);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        prop.setValue(value);
      }}>
      <Toolbar>
        {/* <TestButton  icon="test"/> */}
        {/* <MarkButton format="color" icon="b" /> */}
        <MarkButton format="bold" icon={<BoldSlateIcon />} />
        <MarkButton format="italic" icon={<ItelicSlatejsIcon />} />
        <MarkButton format="underline" icon={<UnderlineSlatejsIcon />} />
        <MarkButton format="code" icon={<CodeModeSlatejsIcon />} />
        <BlockButton format="heading-one" icon="H1" />
        <BlockButton format="heading-two" icon="H2" />
        <BlockButton format="block-quote" icon='"' />
        <BlockButton format="numbered-list" icon={<OrderedListSlagejsIcon />} />
        <BlockButton
          format="bulleted-list"
          icon={<UnorderedLisSlagejsIcon />}
        />
        <DropdownSlate
          keyAction={3}
          data={[
            <StyleButton
              key={0}
              format="textAlignCenter"
              icon={<TextAlignCenterIcon />}
            />,
            <StyleButton
              key={1}
              format="textAlignLeft"
              icon={<TextAlignLeftIcon />}
            />,
            <StyleButton
              key={2}
              format="textAlignRight"
              icon={<TextAlignRightIcon />}
            />,
            <StyleButton
              key={3}
              format="textAlignJustify"
              icon={<TextAlignJustifyIcon />}
            />,
          ]}
        />
        <DropdownSlate
          icon={<TextSizeIcon style={{padding: '10px 3px 10px 10px'}} />}
          data={[
            <MarkButton key={0} format="fontSize" value="8px" icon={'8px'} />,
            <MarkButton key={1} format="fontSize" value="9px" icon={'9px'} />,
            <MarkButton key={2} format="fontSize" value="10px" icon={'10px'} />,
            <MarkButton key={3} format="fontSize" value="11px" icon={'11px'} />,
            <MarkButton key={4} format="fontSize" value="12px" icon={'12px'} />,
            <MarkButton key={5} format="fontSize" value="14px" icon={'14px'} />,
            <MarkButton key={6} format="fontSize" value="16px" icon={'16px'} />,
            <MarkButton key={7} format="fontSize" value="18px" icon={'18px'} />,
            <MarkButton key={8} format="fontSize" value="24px" icon={'24px'} />,
            <MarkButton key={9} format="fontSize" value="30px" icon={'30px'} />,
            <MarkButton
              key={10}
              format="fontSize"
              value="36px"
              icon={'36px'}
            />,
            <MarkButton
              key={11}
              format="fontSize"
              value="48px"
              icon={'48px'}
            />,
            <MarkButton
              key={12}
              format="fontSize"
              value="60px"
              icon={'60px'}
            />,
            <MarkButton
              key={13}
              format="fontSize"
              value="72px"
              icon={'72px'}
            />,
            <MarkButton
              key={14}
              format="fontSize"
              value="96px"
              icon={'96px'}
            />,
          ]}
        />
        <DropdownColorSlate
          style={{marginRight: '5px'}}
          icon={<FontColorIcon style={{padding: '10px 3px 10px 10px'}} />}
          onChange={(editor, value, selection) =>
            handleColorOnChange(editor, 'color', value, selection)
          }
        />
        <DropdownColorSlate
          style={{marginRight: '5px'}}
          icon={<BgColorIcon style={{padding: '10px 3px 10px 10px'}} />}
          onChange={(editor, value, selection) =>
            handleColorOnChange(editor, 'backgroundColor', value, selection)
          }
        />
        {/* <TableButton format="bulleted-list" icon="table" /> */}
        {/* <SizeButton format="bulleted-list" icon="red" /> */}
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

const handleColorOnChange = (editor, format, value) => {
  // func(() => {
  //   ReactEditor.focus(editor);
  //   Transforms.select(editor, selection);
  // });
  toggleMark(editor, format, `rgba(${Object.values(value)})`);
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type,
      ),
    split: true,
  });
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = {type: format, children: []};
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format, value) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, value ? value : true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const Element = (props) => {
  const {attributes, children, element} = props;

  switch (element.type) {
    case 'table':
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case 'table-row':
      return <tr {...attributes}>{children}</tr>;
    case 'table-cell':
      return <td {...attributes}>{children}</td>;
    case 'quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'code':
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      );
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>;
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>;
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'link':
      return (
        <a href={element.url} {...attributes}>
          {children}
        </a>
      );
    case 'image':
      return <ImageElement {...props} />;
    default:
      return (
        <p
          {...attributes}
          style={{
            textAlign: element.textAlign,
          }}>
          {children}
        </p>
      );
  }
};

export const ImageElement = ({attributes, children, element}) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <img
        src={element.url}
        className={`image-default`}
        style={{
          boxShadow: `${selected && focused ? '0 0 0 2px blue;' : 'none'}`,
        }}
      />
    </div>
  );
};

export const Leaf = ({attributes, children, leaf}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.color) {
    children = <span style={{color: leaf.color}}>{children}</span>;
  }

  if (leaf.backgroundColor) {
    children = (
      <span style={{backgroundColor: leaf.backgroundColor}}>{children}</span>
    );
  }

  if (leaf.fontSize) {
    children = <span style={{fontSize: leaf.fontSize}}>{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};

const styleOption = () => [
  {
    key: 'textAlignCenter',
    style: {textAlign: 'center'},
  },
  {
    key: 'textAlignLeft',
    style: {textAlign: 'left'},
  },
  {
    key: 'textAlignRight',
    style: {textAlign: 'right'},
  },
  {
    key: 'textAlignJustify',
    style: {textAlign: 'justify'},
  },
];

// const getActiceKey = async() => {
//   const editor = await Promise.resolve().then(() => useSlate()).catch(() => false);
//   if(!editor) {
//     return 0;
//   }
//   styleOption.forEach((item, index) => {
//     if(isBlockActive(editor, item.key)) {
//       return index;
//     }
//   });
//   return 0;
// }

const StyleButton = ({icon, format, value}) => {
  const editor = useSlate();
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        const newProperties =
          styleOption(value).find((item) => item.key == format) || {};
        Transforms.setNodes(editor, newProperties.style || {});
      }}>
      {icon}
    </Button>
  );
};

// const TableButton = ({ format, icon }) => {
//   const editor = useSlate()
//   return (
//     <Button
//       onMouseDown={event => {
//         event.preventDefault()
//         Transforms.insertNodes(editor, {
//           type: 'table',
//           children: [
//             {
//               type: 'table-row',
//               children: [
//                 {
//                   type: 'table-cell',
//                   children: [{ text: '' }],
//                 },
//                 {
//                   type: 'table-cell',
//                   children: [{ text: 'Human', bold: true }],
//                 },
//                 {
//                   type: 'table-cell',
//                   children: [{ text: 'Dog', bold: true }],
//                 },
//                 {
//                   type: 'table-cell',
//                   children: [{ text: 'Cat', bold: true }],
//                 },
//               ],
//             },
//             {
//               type: 'table-row',
//               children: [
//                 {
//                   type: 'table-cell',
//                   children: [{ text: '# of Feet', bold: true }],
//                 },
//                 {
//                   type: 'table-cell',
//                   children: [{ text: '2' }],
//                 },
//                 {
//                   type: 'table-cell',
//                   children: [{ text: '4' }],
//                 },
//                 {
//                   type: 'table-cell',
//                   children: [{ text: '4' }],
//                 },
//               ],
//             },
//             {
//               type: 'table-row',
//               children: [
//                 {
//                   type: 'table-cell',
//                   children: [{ text: '# of Lives', bold: true }],
//                 },
//                 {
//                   type: 'table-cell',
//                   children: [{ text: '1' }],
//                 },
//                 {
//                   type: 'table-cell',
//                   children: [{ text: '1' }],
//                 },
//                 {
//                   type: 'table-cell',
//                   children: [{ text: '9' }],
//                 },
//               ],
//             },
//           ],
//         })
//       }}
//     >
//       <Icon>{icon}</Icon>
//     </Button>
//   )
// }

const BlockButton = ({format, icon}) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format) ? 1 : 0}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}>
      {icon}
    </Button>
  );
};

const MarkButton = ({format, icon, value}) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format) ? 1 : 0}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format, value);
      }}>
      {icon}
    </Button>
  );
};

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: '...',
      },
    ],
  },
];

export default RichTextExample;
