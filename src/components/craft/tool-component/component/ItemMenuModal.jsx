import React, {useEffect, useState} from 'react';
import {Button, Col, Input, Row, Tree} from 'antd';

const {DirectoryTree} = Tree;

const RowForm = (props) => {
  const {text, form} = props;
  return (
    <Row>
      <Col span={4}>{text}</Col>
      <Col span={20}>{form}</Col>
    </Row>
  );
};

const ItemMenuModal = (props) => {
  const [data, setData] = useState([]);
  const [param, setParam] = useState({});

  useEffect(() => {
    if (Array.isArray(props.data) && props.data) {
      const newData = JSON.parse(JSON.stringify(props.data));
      setData(newData);
    }
    //  && setData([
    //   ...props.data.map(item => ({
    //     ...item,
    //     children: [...(item.children || []).map(abc => abc)],
    //   }))
    // ])
  }, [props.data]);

  const onChange = (params) => {
    const newParams = {
      ...param,
      ...params,
    };
    setParam(newParams);
  };

  const handleAddParams = () => {
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          callback(data[i], i, data);
          return true;
        }
        if (data[i].children) {
          if (loop(data[i].children, key, callback)) {
            return true;
          }
        }
      }
      return false;
    };
    const newParams = {...param};
    let newData = [...data];
    const check = loop(newData, newParams.key, (item, index, arr) => {
      arr[index] = newParams;
    });
    if (!check) {
      delete newParams.children;
      newData.push(newParams);
    }
    setData(newData);
    setParam({});
    props.setData && props.setData(newData);

    // const index = newData.findIndex(item => item.key == newParams.key);
    // if (index > -1) {
    //   newData[index] = newParams;
    // } else {
    //   let check = false;
    //   newData.forEach((item, newDataIndex) => {
    //     let childrenIndex = (item.children || []).findIndex((childrenItem) => childrenItem.key == newParams.key);
    //     if(childrenIndex > -1) {
    //       newData[newDataIndex].children[childrenIndex] = newParams;
    //       check = true;
    //     }
    //   })
    //   if(!check) {
    //     delete newParams.children;
    //     newData.push(newParams);
    //   }
    // }
    // setData(newData);
    // setParam({});
    // props.setData && props.setData(newData);
  };

  const onDrop = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const dataNew = [...data];

    let dragObj;
    loop(dataNew, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(dataNew, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1
    ) {
      loop(dataNew, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(dataNew, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setData(dataNew);
    props.setData && props.setData(dataNew);
  };

  const handleDeleteNode = (item) => {
    let newData = [...data];
    newData = newData.filter((itemData) => itemData.key != item.key);
    newData = newData.map((newDataItem) => ({
      ...newDataItem,
      children: (newDataItem.children || []).filter(
        (itemData) => itemData.key != item.key,
      ),
    }));

    setData(newData);
    props.setData && props.setData(newData);
  };

  const onSelect = (_, info) => {
    if (Array.isArray(info.selectedNodes) && info.selectedNodes.length > 0) {
      setParam(info.selectedNodes[0]);
    }
  };

  return (
    <div>
      <DirectoryTree
        className="draggable-tree"
        defaultExpandAll
        defaultExpandParent
        draggable
        titleRender={(item) => (
          <span>
            <b>{item.key}</b> - <b>{item.title}</b> - <b>{item.path}</b> -{' '}
            <Button size={`small`} onClick={() => handleDeleteNode(item)}>
              {' '}
              Del{' '}
            </Button>
          </span>
        )}
        // multiple
        treeData={[...data]}
        onDrop={onDrop}
        height={350}
        style={{minHeight: '350px'}}
        onSelect={onSelect}
      />
      <RowForm
        text={`Key`}
        form={
          <Input
            value={param.key}
            onChange={(e) => onChange({key: e.target.value})}
          />
        }
      />
      <RowForm
        text={`Title`}
        form={
          <Input
            value={param.title}
            onChange={(e) => onChange({title: e.target.value})}
          />
        }
      />
      <RowForm
        text={`Path`}
        form={
          <Input
            value={param.path}
            onChange={(e) => onChange({path: e.target.value})}
          />
        }
      />
      <RowForm
        text={`Icon`}
        form={
          <Input
            value={param.iconData}
            onChange={(e) => onChange({iconData: e.target.value})}
          />
        }
      />
      <Row className={`row__space-mid`}>
        <Col></Col>
        <Col>
          <Button onClick={() => handleAddParams()}> Save </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ItemMenuModal;
