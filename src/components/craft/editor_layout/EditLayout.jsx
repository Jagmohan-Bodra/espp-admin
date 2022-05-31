import React from 'react';
import {EditorInlineLayout} from '.';
import {useEditor, useNode, Element} from '@craftjs/core';
import {setCustomizeStore} from '~/components/craft/re-component/common';
import {components} from '../common/util';

const EditLayout = ({children}) => {
  const {id} = useNode();
  const {actions, query} = useEditor();
  const {createNode, node} = query;
  const handleRemove = () => {
    actions.delete(id);
  };

  const handleCustomize = () => {
    setCustomizeStore(true);
  };

  const genderComponentById = (idNode, parent) => {
    const {
      data: {props, nodes, name, isCanvas, hidden},
    } = node(idNode).get();
    const nodeData = createNode(
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
    } = node(id).get();
    genderComponentById(id, parent);
  };

  return (
    <EditorInlineLayout
      handleRemove={handleRemove}
      handleCustomize={handleCustomize}
      handleCopy={handleCopy}>
      {children}
    </EditorInlineLayout>
  );
};

export default EditLayout;
