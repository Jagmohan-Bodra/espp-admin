import React, {useEffect, useRef, useCallback} from 'react';
import {useNode, useEditor, Element} from '@craftjs/core';
import {
  DeleteCraftIcon,
  ArrowUpCraftIcon,
  MoveCraftIcon,
  EditCraftIcon,
  CopyCraftIcon,
  SettingIcon,
} from '~/public/assets/icon';
import ReactDOM from 'react-dom';
import {ROOT_NODE} from '@craftjs/utils';
import {useSelector} from 'react-redux';
import {components} from '../common/util';
import {setCustomizeStore} from '~/components/craft/re-component/common';
import {Container} from '~/components/craft/re-component/Container';
import {confirmModalData} from '~/components/public/modals/ModalConfirmCommon/confirmModalFunc';
import ItemMenuModal from './component/ItemMenuModal';
import {PAGE_SIZE_OPTION} from '~/constants/master-data';

export const RenderNode = ({render}) => {
  const screenMode = useSelector((state) => state.craft.mode);
  const customize = useSelector((state) => state.craft.customize);
  const {actions, query} = useEditor();
  const {
    id,
    isActive,
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: {drag},
    actions: {setProp},
    parent,
    textSetting,
    props,
  } = useNode((node) => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    textSetting: node.related && node.related.textSetting,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const iframeRef = useSelector((state) => state.craft.iframeRef);
  const currentRef = useRef();
  const {x, y} = (iframeRef || {}).current
    ? (iframeRef || {}).current.getBoundingClientRect()
    : {x: 0, y: 0};

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add('component-selected');
      else dom.classList.remove('component-selected');
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom) => {
    const {top, left, bottom} = dom
      ? dom.getBoundingClientRect()
      : {top: 0, left: 0, bottom: 0};
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const {current: currentDOM} = currentRef;

    if (!currentDOM) return;
    const {top, left} = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom]);

  useEffect(() => {
    var el = document.querySelector('.craftjs-renderer');
    if (el) {
      el.addEventListener('scroll', scroll);
    }

    return () => {
      if (el) {
        el.removeEventListener('scroll', scroll);
      }
    };
  }, [scroll]);

  const genderComponentById = (idNode, parent) => {
    const {
      data: {props, nodes, name, isCanvas, hidden},
    } = query.node(idNode).get();
    const nodeData = query.createNode(
      <Element
        is={components()[name]}
        canvas={isCanvas}
        {...props}
        hidden={hidden}
        key={idNode}
        isNew={true}
      />,
    );
    actions.add(nodeData, parent);
    (nodes || []).map((nodeItem) => genderComponentById(nodeItem, nodeData.id));
  };

  const handleCopy = () => {
    const {
      data: {parent},
    } = query.node(id).get();
    genderComponentById(id, parent);
  };

  const handleCustomize = () => {
    actions.selectNode(id);
    setCustomizeStore(true);
  };

  const addSwiperSlide = () => {
    const {createNode} = query;
    const nodeData = createNode(
      <Element
        is={Container}
        canvas
        isContainer={false}
        style={{PC: {height: '100%'}}}
      />,
    );
    actions.add(nodeData, id);
    // setProp(props => props.isNew = true)
  };

  const itemMenuUpdate = () => {
    const {data} = props;
    confirmModalData(
      {
        header: 'Menu',
        closable: true,
        data: [...data],
        bodycomponent: ItemMenuModal,
      },
      handleItemMenuUpdateSubmit,
    );
  };

  const handleItemMenuUpdateSubmit = (data) => {
    setProp((props) => (props.data = data));
  };

  return (
    <>
      {isActive
        ? ReactDOM.createPortal(
            <div ref={currentRef}>
              {!customize && (
                <div
                  className="px-2 py-2 text-white bg-primary fixed flex items-center strip-select-tool"
                  style={{
                    left: parseInt(getPos(dom).left) + parseInt(x),
                    top: parseInt(getPos(dom).top) + parseInt(y),
                    // top: parseInt(getPos(dom).top) + parseInt(y) + ((dom || {}).offsetHeight || 0),
                    zIndex: 9999,
                    height: '30px',
                    marginTop: '-20px',
                    fontSize: '12px',
                    // lineHeight: "12px",
                  }}>
                  <h2 className="flex-1 mr-4">{name}</h2>
                  {name === 'Swiper' && (
                    <span
                      className="render-node-btn cursor-pointer"
                      onClick={() => addSwiperSlide && addSwiperSlide()}>
                      Add
                    </span>
                  )}

                  {moveable ? (
                    <span
                      className={`render-node-btn mr-2 cursor-move`}
                      ref={drag}>
                      <MoveCraftIcon />
                    </span>
                  ) : null}

                  {(name === 'ItemMenu' || name === 'BasicMenu') && (
                    <span
                      className="render-node-btn cursor-pointer"
                      onClick={() => itemMenuUpdate()}>
                      <EditCraftIcon />
                    </span>
                  )}

                  <span
                    className="render-node-btn cursor-pointer"
                    onClick={() => handleCustomize()}>
                    <SettingIcon />
                  </span>

                  <span
                    className="render-node-btn cursor-pointer"
                    onClick={() => handleCopy()}>
                    <CopyCraftIcon />
                  </span>
                  {id !== ROOT_NODE && (
                    <span
                      className="render-node-btn mr-2 cursor-pointer"
                      onClick={() => {
                        actions.selectNode(parent);
                      }}>
                      <ArrowUpCraftIcon />
                    </span>
                  )}
                  {deletable ? (
                    <span
                      className="render-node-btn cursor-pointer"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        actions.delete(id);
                      }}>
                      <DeleteCraftIcon />
                    </span>
                  ) : null}
                </div>
              )}
              {customize && name === 'Text' && (
                <div
                  className="px-2 py-2 fixed flex items-center"
                  style={{
                    left: parseInt(getPos(dom).left) + parseInt(x),
                    top: parseInt(getPos(dom).top) + parseInt(y) + 70,
                    // zIndex: 1,
                    // marginTop: "-29px",
                    fontSize: '12px',
                    // lineHeight: "12px",
                    width: `${PAGE_SIZE_OPTION[screenMode].size || 100}px`,
                  }}>
                  <div
                    style={{
                      width: '100%',
                      background: 'rgb(255, 255, 255)',
                      // margin: "20px",
                      padding: '20px',
                      border: '1px solid #dadada',
                    }}>
                    {React.createElement(textSetting)}
                  </div>
                </div>
              )}
            </div>,
            document.body,
          )
        : null}
      {render}
    </>
  );
};
