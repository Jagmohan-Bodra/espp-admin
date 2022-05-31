const {formType} = require('../editor_layout/layout-menu/BlockLayoutCollapse');

export const getBlockSelectMenu = (childrenData) => {
  const {blockComponent} = childrenData;
  return {
    key: 'blockId',
    title: 'Block Component',
    children: [blockComponent],
  };
};

export const getMenuDefault = (childrenData) => {
  return [
    getBackgroundImageMenu(childrenData),
    getColorMenu(childrenData),
    getClassNameMenu(childrenData),
    getStyleMenu(childrenData),
  ];
};

export const getColorMenu = (childrenData) => {
  const {backgroundColor, textColor} = childrenData;
  return {
    key: 'style',
    title: 'Color',
    children: [backgroundColor, textColor],
  };
};

export const getSwiperStyleMenu = (childrenData) => {
  const {
    effectSwiper,
    slidesPerViewSwiper,
    spaceBetweenSwiper,
    paginationSwiper,
    scrollbarSwiper,
    navigationSwiper,
  } = childrenData;
  return {
    key: 'componentprops',
    title: 'Swiper',
    children: [
      effectSwiper,
      navigationSwiper,
      paginationSwiper,
      scrollbarSwiper,
      slidesPerViewSwiper,
      spaceBetweenSwiper,
    ],
  };
};

export const getStyleMenu = (childrenData) => {
  const {
    layoutStyle,
    // backgroundColor,
    // padding,
    marginGroup,
    // margin,
    border,
    decorationGroup,
    // borderRadius,
    widthStyle,
    heightStyle,
    paddingGroup,
  } = childrenData;
  return {
    key: 'style',
    title: 'Style',
    children: [
      layoutStyle,
      widthStyle,
      heightStyle,
      // backgroundColor,
      // padding,
      paddingGroup,
      marginGroup,
      // margin,
      border,
      decorationGroup,
      // borderRadius,
    ],
  };
};

export const getFontStyleMenu = (childrenData) => {
  const {
    fontSize,
    color,
    fontWeight,
    lineHeight,
    fontFamily,
    textAlign,
    textDecoration,
    letterSpacing,
  } = childrenData;
  return {
    key: 'style',
    title: 'Font style',
    children: [
      textAlign,
      textDecoration,
      fontWeight,
      fontSize,
      color,
      lineHeight,
      letterSpacing,
      fontFamily,
    ],
  };
};

export const getPositionStyleMenu = (childrenData) => {
  const {position, left, right, top, bottom, zIndex} = childrenData;
  return {
    key: 'style',
    title: 'Position',
    children: [position, left, right, top, bottom, zIndex],
  };
};

export const getFlexboxStyleMenu = (childrenData) => {
  const {
    display,
    flexDirection,
    justifyContent,
    alignItems,
    alignContent,
    flexWrap,
  } = childrenData;
  return {
    key: 'style',
    title: 'Flexbox',
    children: [
      display,
      flexDirection,
      justifyContent,
      alignItems,
      alignContent,
      flexWrap,
    ],
  };
};

export const getBackgroundImageMenu = (childrenData) => {
  const {
    backgroundImage,
    backgroundPosition,
    backgroundRepeat,
    backgroundAttachment,
    backgroundSize,
  } = childrenData;
  return {
    key: 'style',
    title: 'Image',
    children: [
      backgroundImage,
      backgroundRepeat,
      backgroundAttachment,
      backgroundSize,
      backgroundPosition,
    ],
  };
};

export const getClassNameMenu = (childrenData) => {
  const {className} = childrenData;
  return {
    key: 'className',
    title: 'ClassName',
    children: [className],
  };
};

export const getIsContainerMenu = (childrenData) => {
  const {container} = childrenData;
  return {
    key: 'isContainer',
    title: 'Container',
    children: [container],
  };
};

export const getColumnMenu = (childrenData) => {
  const {span} = childrenData;
  return {
    key: 'span',
    title: 'Column',
    children: [span],
  };
};

export const getRowMenu = (childrenData) => {
  const {
    gutterHorizontal,
    gutterVertical,
    alignRow,
    justifyRow,
    title,
  } = childrenData;
  return {
    key: 'componentprops',
    title: 'Row',
    children: [
      title('gutter1', 'Gutter'),
      gutterHorizontal,
      gutterVertical,
      title('row1', 'Customize'),
      alignRow,
      justifyRow,
    ],
  };
};

export const getSpaceMenu = (childrenData) => {
  const {directionSpace, sizeSpace, alignRow} = childrenData;
  return {
    key: 'componentprops',
    title: 'Space',
    children: [directionSpace, sizeSpace, alignRow],
  };
};

export const getButtonMenu = (childrenData) => {
  const {sizeButton, hrefButton, typeButton, blockButton} = childrenData;
  return {
    key: 'componentprops',
    title: 'Button',
    children: [sizeButton, typeButton, blockButton, hrefButton],
  };
};

export const getTextMenu = (childrenData) => {
  const {text} = childrenData;
  return {
    key: 'text',
    title: 'Field',
    children: [text],
  };
};

export const getAvatarUrlMenu = (childrenData) => {
  const {
    backgroundImageAvatar,
    shapeAvatar,
    altAvatar,
    hrefButton,
  } = childrenData;
  return {
    key: 'componentprops',
    title: 'Image Avatar',
    children: [backgroundImageAvatar, shapeAvatar, altAvatar, hrefButton],
  };
};

export const getHeaderCollapseMenu = (propsNode) => {
  return {
    key: 'header',
    title: 'Header',
    children: [
      {
        formType: formType.INPUT_TEXT,
        keyItem: 'header',
        text: 'Header',
        value: propsNode.header,
      },
    ],
  };
};

export const getTitleSubMenuMenu = (propsNode) => {
  return {
    key: 'title',
    title: 'Title',
    children: [
      {
        formType: formType.INPUT_TEXT,
        keyItem: 'title',
        text: 'Title',
        value: propsNode.title,
      },
    ],
  };
};

export const getPropsMenuMenu = (propsNode) => {
  return {
    key: 'componentprops',
    title: 'Menu',
    children: [
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'mode',
        text: 'Mode',
        value: propsNode.componentprops,
        children: [
          {
            value: 'vertical',
            text: 'Vertical',
          },
          {
            value: 'horizontal',
            text: 'Horizontal',
          },
          {
            value: 'inline',
            text: 'Inline',
          },
        ],
      },
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'theme',
        text: 'Theme',
        value: propsNode.componentprops,
        children: [
          {
            value: 'light',
            text: 'Light',
          },
          {
            value: 'dark',
            text: 'Dark',
          },
        ],
      },
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'triggerSubMenuAction',
        text: 'Trigger',
        value: propsNode.componentprops,
        children: [
          {
            value: 'hover',
            text: 'Hover',
          },
          {
            value: 'click',
            text: 'Click',
          },
        ],
      },
      // {
      //   formType: formType.SUB_CHECKBOX,
      //   keyItem: "inlineCollapsed",
      //   text: "collapsed",
      //   value: propsNode.componentprops,
      //   children: [
      //     {
      //       value: true,
      //       text: "True",
      //     },
      //     {
      //       value: false,
      //       text: "false",
      //     },
      //   ]
      // },
      {
        formType: formType.INPUT,
        keyItem: 'expandIcon',
        text: 'Expand Icon',
        value: propsNode.componentprops,
      },
      {
        formType: formType.INPUT,
        keyItem: 'unExpandIcon',
        text: 'UnExpand Icon',
        value: propsNode.componentprops,
      },
    ],
  };
};

export const getPropsTabsMenu = (propsNode) => {
  return {
    key: 'componentprops',
    title: 'Tabs',
    children: [
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'tabPosition',
        text: 'Position',
        value: propsNode.componentprops,
        children: [
          {
            value: 'top',
            text: 'Top',
          },
          {
            value: 'left',
            text: 'Left',
          },
          {
            value: 'bottom',
            text: 'Bottom',
          },
          {
            value: 'right',
            text: 'Right',
          },
        ],
      },
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'typeprops',
        text: 'Type',
        value: propsNode.componentprops,
        children: [
          {
            value: 'line',
            text: 'Line',
          },
          {
            value: 'card',
            text: 'Card',
          },
          {
            value: 'editable-card',
            text: 'Editable',
          },
        ],
      },
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'size',
        text: 'Size',
        value: propsNode.componentprops,
        children: [
          {
            value: 'large',
            text: 'Large',
          },
          {
            value: 'default',
            text: 'Default',
          },
          {
            value: 'small',
            text: 'Small',
          },
        ],
      },
    ],
  };
};

export const getCollapseMenu = (propsNode) => {
  return {
    key: 'componentprops',
    title: 'Collapse',
    children: [
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'accordion',
        text: 'Accordion',
        value: propsNode.componentprops,
        children: [
          {
            value: true,
            text: 'True',
          },
          {
            value: false,
            text: 'false',
          },
        ],
      },
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'expand',
        text: 'Expand',
        value: propsNode.componentprops,
        children: [
          {
            value: true,
            text: 'Expand',
          },
          {
            value: false,
            text: 'Unexpand',
          },
        ],
      },
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'bordered',
        text: 'Bordered',
        value: propsNode.componentprops,
        children: [
          {
            value: true,
            text: 'True',
          },
          {
            value: false,
            text: 'False',
          },
        ],
      },
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'expandIconPosition',
        text: 'Icon Position',
        value: propsNode.componentprops,
        children: [
          {
            value: 'left',
            text: 'Left',
          },
          {
            value: 'right',
            text: 'Right',
          },
        ],
      },
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'ghost',
        text: 'Ghost',
        value: propsNode.componentprops,
        children: [
          {
            value: true,
            text: 'True',
          },
          {
            value: false,
            text: 'False',
          },
        ],
      },
      {
        formType: formType.SUB_CHECKBOX,
        keyItem: 'showArrow',
        text: 'Show arrow',
        value: propsNode.componentprops,
        children: [
          {
            value: true,
            text: 'True',
          },
          {
            value: false,
            text: 'False',
          },
        ],
      },
    ],
  };
};

export const getChildrenData = (propsNode) => ({
  text: {
    formType: formType.INPUT_TEXT,
    keyItem: 'text',
    text: 'Text',
    value: propsNode.text,
  },

  //col
  span: {
    formType: formType.INPUT_TEXT,
    keyItem: 'span',
    text: 'Column',
    value: propsNode.span,
  },

  //isContainer
  container: {
    formType: formType.CHECKBOX,
    defaultValue: propsNode.isContainer,
    children: [
      {
        value: true,
        text: 'Container',
      },
      {
        value: false,
        text: 'Container fluid',
      },
    ],
  },

  //className
  className: {
    formType: formType.INPUT_TEXT,
    keyItem: 'className',
    text: 'Class name',
    value: propsNode.className,
  },

  //backgroupImage
  backgroundImage: {
    formType: formType.IMAGE_FORM,
    keyItem: 'background-image',
    text: 'Image url',
    value: propsNode.style,
  },

  //backgroupImage avatar
  backgroundImageAvatar: {
    formType: formType.IMAGE_FORM,
    keyItem: 'background-image',
    text: 'Image url',
    value: propsNode.componentprops,
  },

  backgroundRepeat: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'background-repeat',
    text: 'Repeat',
    value: propsNode.style,
    children: [
      {
        value: 'repeat',
        text: 'Repeat',
      },
      {
        value: 'repeat-x',
        text: 'Repeat x',
      },
      {
        value: 'repeat-y',
        text: 'Repeat y',
      },
      {
        value: 'no-repeat',
        text: 'No repeat',
      },
      {
        value: 'space',
        text: 'Space',
      },
      {
        value: 'round',
        text: 'Round',
      },
    ],
  },

  backgroundAttachment: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'background-attachment',
    text: 'Attachment',
    value: propsNode.style,
    children: [
      {
        value: 'scroll',
        text: 'Scroll',
      },
      {
        value: 'fixed',
        text: 'Fixed',
      },
      {
        value: 'local',
        text: 'Local',
      },
      {
        value: 'initial',
        text: 'Initial',
      },
      {
        value: 'inherit',
        text: 'Inherit',
      },
    ],
  },

  backgroundSize: {
    formType: formType.INPUT,
    keyItem: 'background-size',
    text: 'Size',
    value: propsNode.style,
  },

  //backgroundSize avatar
  backgroundSizeAvatar: {
    formType: formType.INPUT,
    keyItem: 'background-size',
    text: 'Size',
    value: propsNode.componentprops,
  },

  backgroundPosition: {
    formType: formType.IMAGE_POSTION,
    keyItem: 'background-position',
    value: propsNode.style,
    backgroundImage: (propsNode.style || {})['background-image'],
  },

  // style
  widthStyle: {
    formType: formType.INPUT,
    keyItem: 'width',
    text: 'Width',
    value: propsNode.style,
  },
  heightStyle: {
    formType: formType.INPUT,
    keyItem: 'height',
    text: 'Height',
    value: propsNode.style,
  },
  layoutStyle: {
    formType: formType.GROUP_TEXT,
    keyItem: 'layout_style',
    text: 'Layout style',
  },

  // backgroundColor: {
  //   formType: formType.INPUT,
  //   keyItem: 'background-color',
  //   text: 'Bg Color',
  //   value: propsNode.style,
  // },

  padding: {
    formType: formType.INPUT,
    keyItem: 'padding',
    text: 'Padding',
    value: propsNode.style,
  },

  margin: {
    formType: formType.INPUT,
    keyItem: 'margin',
    text: 'Margin',
    value: propsNode.style,
  },

  border: {
    formType: formType.INPUT,
    keyItem: 'border',
    text: 'Border',
    value: propsNode.style,
  },

  borderRadius: {
    formType: formType.INPUT,
    keyItem: 'border-radius',
    text: 'Border radius',
    value: propsNode.style,
  },

  //font - text
  fontSize: {
    formType: formType.INPUT,
    keyItem: 'font-size',
    text: 'Font size',
    value: propsNode.style,
  },

  color: {
    formType: formType.INPUT,
    keyItem: 'color',
    text: 'Color Style',
    value: propsNode.style,
  },

  fontWeight: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'font-weight',
    text: 'Font weight',
    value: propsNode.style,
    children: [
      {
        value: 'normal',
        text: 'Normal',
      },
      {
        value: 'bold',
        text: 'Bold',
      },
      {
        value: 'lighter',
        text: 'Lighter',
      },
      {
        value: 'initial',
        text: 'Initial',
      },
    ],
  },

  lineHeight: {
    formType: formType.INPUT,
    keyItem: 'line-height',
    text: 'Line height',
    value: propsNode.style,
  },
  letterSpacing: {
    formType: formType.INPUT,
    keyItem: 'letter-spacing',
    text: 'Spacing',
    value: propsNode.style,
  },
  fontFamily: {
    formType: formType.INPUT,
    keyItem: 'font-family',
    text: 'Font family',
    value: propsNode.style,
  },

  textAlign: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'text-align',
    text: 'Text align',
    value: propsNode.style,
    children: [
      {
        value: 'left',
        text: 'Left',
      },
      {
        value: 'right',
        text: 'Right',
      },
      {
        value: 'center',
        text: 'Center',
      },
      {
        value: 'justify',
        text: 'Justify',
      },
      {
        value: 'initial',
        text: 'Initial',
      },
    ],
  },

  textDecoration: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'text-decoration',
    text: 'Decoration',
    value: propsNode.style,
    children: [
      {
        value: 'overline',
        text: 'Overline',
      },
      {
        value: 'line-through',
        text: 'line through;',
      },
      {
        value: 'underline',
        text: 'Underline',
      },
      {
        value: 'underline overline',
        text: 'Underline Overline',
      },
    ],
  },

  //title
  title: (key, text) => ({
    formType: formType.GROUP_TEXT,
    keyItem: key,
    text: text,
  }),

  //row
  gutterHorizontal: {
    formType: formType.INPUT,
    keyItem: 'gutterHorizontal',
    text: 'Gutter horizontal',
    value: propsNode.componentprops,
  },

  gutterVertical: {
    formType: formType.INPUT,
    keyItem: 'gutterVertical',
    text: 'Gutter vertical',
    value: propsNode.componentprops,
  },

  alignRow: {
    formType: formType.INPUT,
    keyItem: 'align',
    text: 'Align',
    value: propsNode.componentprops,
  },

  justifyRow: {
    formType: formType.INPUT,
    keyItem: 'justify',
    text: 'Justify',
    value: propsNode.componentprops,
  },

  //Space
  directionSpace: {
    formType: formType.INPUT,
    keyItem: 'direction',
    text: 'Direction',
    value: propsNode.componentprops,
  },

  sizeSpace: {
    formType: formType.INPUT,
    keyItem: 'size',
    text: 'Size',
    value: propsNode.componentprops,
  },

  //button
  sizeButton: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'size',
    text: 'Size',
    value: propsNode.componentprops,
    children: [
      {
        value: 'large',
        text: 'Large',
      },
      {
        value: 'middle',
        text: 'Middle',
      },
      {
        value: 'small',
        text: 'Small',
      },
    ],
  },
  hrefButton: {
    formType: formType.INPUT,
    keyItem: 'herf',
    text: 'Link',
    value: propsNode.componentprops,
  },
  typeButton: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'typeButton',
    text: 'Type',
    value: propsNode.componentprops,
    children: [
      {
        value: 'primary',
        text: 'Primary',
      },
      {
        value: 'ghost',
        text: 'Ghost',
      },
      {
        value: 'dashed',
        text: 'Dashed',
      },
      {
        value: 'link',
        text: 'Link',
      },
      {
        value: 'default',
        text: 'Default',
      },
      {
        value: 'text',
        text: 'Text',
      },
    ],
  },
  blockButton: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'block',
    text: 'Block',
    value: propsNode.componentprops,
    children: [
      {
        value: true,
        text: 'Block',
      },
      {
        value: false,
        text: 'Unblock',
      },
    ],
  },

  // Swiper
  effectSwiper: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'effect',
    text: 'Effect',
    value: propsNode.componentprops,
    children: [
      {
        value: undefined,
        text: 'undefined',
      },
      {
        value: 'cube',
        text: 'Cube',
      },
      {
        value: 'fade',
        text: 'Fade',
      },
      {
        value: 'coverflow',
        text: 'Coverflow',
      },
      {
        value: 'flip',
        text: 'Flip',
      },
    ],
  },

  scrollbarSwiper: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'scrollbar',
    text: 'Scrollbar',
    value: propsNode.componentprops,
    children: [
      {
        value: true,
        text: 'True',
      },
      {
        value: false,
        text: 'False',
      },
    ],
  },

  paginationSwiper: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'pagination',
    text: 'Pagination',
    value: propsNode.componentprops,
    children: [
      {
        value: true,
        text: 'True',
      },
      {
        value: false,
        text: 'False',
      },
    ],
  },

  navigationSwiper: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'navigation',
    text: 'Navigation',
    value: propsNode.componentprops,
    children: [
      {
        value: true,
        text: 'True',
      },
      {
        value: false,
        text: 'False',
      },
    ],
  },

  spaceBetweenSwiper: {
    formType: formType.INPUT,
    keyItem: 'spaceBetween',
    text: 'Space',
    value: propsNode.componentprops,
  },

  slidesPerViewSwiper: {
    formType: formType.INPUT,
    keyItem: 'slidesPerView',
    text: 'perView',
    value: propsNode.componentprops,
  },

  //antd avatar
  shapeAvatar: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'shape',
    text: 'Shape',
    value: propsNode.componentprops,
    children: [
      {
        value: 'circle',
        text: 'Circle',
      },
      {
        value: 'square',
        text: 'Square',
      },
    ],
  },
  altAvatar: {
    formType: formType.INPUT,
    keyItem: 'alt',
    text: 'Alt',
    value: propsNode.componentprops,
  },
  // position
  position: {
    formType: formType.SUB_CHECKBOX,
    keyItem: 'position',
    text: 'Position',
    value: propsNode.style,
    children: [
      {
        value: 'static',
        text: 'static',
      },
      {
        value: 'absolute',
        text: 'absolute',
      },
      {
        value: 'fixed',
        text: 'fixed',
      },
      {
        value: 'relative',
        text: 'relative',
      },
      {
        value: 'sticky',
        text: 'sticky',
      },
      {
        value: 'initial',
        text: 'initial',
      },
      {
        value: 'inherit',
        text: 'inherit',
      },
    ],
  },
  left: {
    formType: formType.INPUT,
    keyItem: 'left',
    text: 'Left',
    value: propsNode.style,
  },
  right: {
    formType: formType.INPUT,
    keyItem: 'right',
    text: 'Right',
    value: propsNode.style,
  },
  top: {
    formType: formType.INPUT,
    keyItem: 'top',
    text: 'Top',
    value: propsNode.style,
  },
  bottom: {
    formType: formType.INPUT,
    keyItem: 'bottom',
    text: 'Bottom',
    value: propsNode.style,
  },
  zIndex: {
    formType: formType.INPUT,
    keyItem: 'z-index',
    text: 'Z-index',
    value: propsNode.style,
  },
  // Flexbox
  display: {
    formType: formType.SUB_RADIO,
    keyItem: 'display',
    text: 'Display',
    value: propsNode.style,
    children: [
      {
        value: 'block',
        text: 'Block',
      },
      {
        value: 'flex',
        text: 'Flex',
      },
      {
        value: 'none',
        text: 'None',
      },
      // {
      //   value: 'initial',
      //   text: 'initial',
      // },
      // {
      //   value: 'inherit',
      //   text: 'inherit',
      // },
    ],
  },
  flexDirection: {
    formType: formType.SUB_RADIO,
    keyItem: 'flex-direction',
    text: 'Flex direction',
    value: propsNode.style,
    children: [
      {
        value: 'row',
        text: 'Row',
      },
      // {
      //   value: 'row-reverse',
      //   text: 'row-reverse',
      // },
      {
        value: 'column',
        text: 'Column',
      },
      // {
      //   value: 'column-reverse',
      //   text: 'column-reverse',
      // },
      // {
      //   value: 'sticky',
      //   text: 'sticky',
      // },
      // {
      //   value: 'initial',
      //   text: 'initial',
      // },
      // {
      //   value: 'inherit',
      //   text: 'inherit',
      // },
    ],
  },
  justifyContent: {
    formType: formType.SUB_RADIO,
    keyItem: 'justify-content',
    text: 'Justify content',
    value: propsNode.style,
    children: [
      {
        value: 'flex-start',
        text: 'Flex start',
      },
      {
        value: 'flex-end',
        text: 'Flex end',
      },
      {
        value: 'center',
        text: 'Center',
      },
      {
        value: 'space-between',
        text: 'Space between',
      },
      // {
      //   value: 'space-around',
      //   text: 'space-around',
      // },
      // {
      //   value: 'space-evenly',
      //   text: 'space-evenly',
      // },
      // {
      //   value: 'initial',
      //   text: 'initial',
      // },
      // {
      //   value: 'inherit',
      //   text: 'inherit',
      // },
    ],
  },
  alignItems: {
    formType: formType.SUB_RADIO,
    keyItem: 'align-items',
    text: 'Align items',
    value: propsNode.style,
    children: [
      {
        value: 'flex-start',
        text: 'Flex start',
      },
      {
        value: 'flex-end',
        text: 'Flex end',
      },
      {
        value: 'center',
        text: 'Center',
      },
      // {
      //   value: 'stretch',
      //   text: 'stretch',
      // },
      // {
      //   value: 'initial',
      //   text: 'initial',
      // },
      // {
      //   value: 'inherit',
      //   text: 'inherit',
      // },
    ],
  },
  alignContent: {
    formType: formType.SUB_RADIO,
    keyItem: 'align-content',
    text: 'Align content',
    value: propsNode.style,
    children: [
      {
        value: 'flex-start',
        text: 'Flex start',
      },
      {
        value: 'flex-end',
        text: 'Flex end',
      },
      {
        value: 'center',
        text: 'Center',
      },
      {
        value: 'space-between',
        text: 'Space between',
      },
      // {
      //   value: 'space-around',
      //   text: 'space-around',
      // },
      // {
      //   value: 'stretch',
      //   text: 'stretch',
      // },
      // {
      //   value: 'initial',
      //   text: 'initial',
      // },
      // {
      //   value: 'inherit',
      // //   text: 'inherit',
      // },
    ],
  },
  flexWrap: {
    formType: formType.SUB_RADIO,
    keyItem: 'flex-wrap',
    text: 'Flex wrap',
    value: propsNode.style,
    children: [
      {
        value: 'nowrap',
        text: 'nowrap',
      },
      {
        value: 'wrap',
        text: 'wrap',
      },
      {
        value: 'wrap-reverse',
        text: 'Wrap reverse',
      },
      {
        value: 'stretch',
        text: 'Stretch',
      },
      // {
      //   value: 'initial',
      //   text: 'initial',
      // },
      // {
      //   value: 'inherit',
      //   text: 'inherit',
      // },
    ],
  },
  backgroundColor: {
    formType: formType.COLOR_PICKER,
    keyItem: 'background-color',
    text: 'bg color',
    value: propsNode.style,
  },
  textColor: {
    formType: formType.COLOR_PICKER,
    keyItem: 'color',
    text: 'color',
    value: propsNode.style,
  },
  marginGroup: {
    formType: formType.SLIDER_GROUP,
    keyItem: 'margin',
    text: 'Margin',
    value: propsNode.style,
  },
  paddingGroup: {
    formType: formType.SLIDER_GROUP,
    keyItem: 'padding',
    text: 'Padding',
    value: propsNode.style,
  },
  decorationGroup: {
    formType: formType.DECORATION_SLIDER_GROUP,
    keyItem: 'decoration',
    text: 'Decoration',
    value: propsNode.style,
    children: [
      {
        text: 'Radius',
        key: 'border-radius',
      },
      {
        text: 'Shadow',
        key: 'box-shadow',
      },
    ],
  },
  blockComponent: {
    formType: formType.BLOCK_SELECT,
    defaultValue: propsNode.blockId,
  },
});
