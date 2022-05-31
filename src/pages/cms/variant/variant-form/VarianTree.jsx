import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Input, Tree, Row, Col, Space} from 'antd';
import {confirmModalData} from '~/components/public/modals/ModalConfirmCommon/confirmModalFunc';
import {TrashIcon, EditCraftIcon} from '~/public/assets/icon';

const VarianTreeForm = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(props.data || {});
  }, [props.data]);

  const onChange = (value) => {
    const newData = {
      ...data,
      ...value,
    };
    setData(newData);
    props.setData && props.setData(newData);
  };

  return (
    <div className={`variant-form`}>
      <Row>
        <Col span={6}>Title</Col>
        <Col span={18}>
          <Input
            value={data.title}
            onChange={(e) => onChange({title: e.target.value})}
          />
        </Col>
      </Row>

      <Row>
        <Col span={6}>Url</Col>
        <Col span={18}>
          <Input
            value={data.url}
            onChange={(e) => onChange({url: e.target.value})}
          />
        </Col>
      </Row>
    </div>
  );
};

const VarianTree = (props) => {
  const {value, onChangeData} = props;
  const [param, setParam] = useState({});
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
    const dataNew = [...(value || [])];

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
    onChangeData && onChangeData(dataNew);
  };

  const onSelect = (_, info) => {
    if (Array.isArray(info.selectedNodes) && info.selectedNodes.length > 0) {
      setParam(info.selectedNodes[0]);
    } else {
      setParam({});
    }
  };

  const handleAddParams = (param) => {
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
    let newData = [...(value || [])];
    const check = loop(newData, newParams.key, (item, index, arr) => {
      arr[index] = newParams;
    });
    if (!check) {
      delete newParams.children;
      newData.push(newParams);
    }
    setParam({});
    onChangeData && onChangeData(newData);
  };

  const edit = (item) => {
    confirmModalData(
      {
        header: 'Edit',
        closable: true,
        data: item,
        bodycomponent: VarianTreeForm,
      },
      handleUpdate,
    );
  };

  const handleUpdate = (data) => {
    handleAddParams(data);
  };

  const handleDelete = (item) => {
    confirmModalData(
      {
        header: 'Delete',
        body: 'Do you want to delete!',
        closable: true,
      },
      () => {
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
        let newData = [...value];
        loop(newData, item.key, (item, index, arr) => {
          arr.splice(index, 1);
        });
        setParam({});
        onChangeData && onChangeData(newData);
      },
    );
  };

  const handleAdd = () => {
    confirmModalData(
      {
        header: 'Add new a item',
        closable: true,
        data: {key: param.key},
        bodycomponent: VarianTreeForm,
      },
      handleCreate,
    );
  };

  const handleCreate = (param) => {
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
    let newData = [...(value || [])];
    const check = loop(newData, newParams.key, (item, index, arr) => {
      if (arr[index].children) {
        arr[index].children.push({
          ...newParams,
          key: moment().format('x'),
        });
      } else {
        arr[index].children = [
          {
            ...newParams,
            key: moment().format('x'),
          },
        ];
      }
    });
    if (!check) {
      delete newParams.children;
      newData.push({
        ...newParams,
        key: moment().format('x'),
      });
    }
    setParam({});
    onChangeData && onChangeData(newData);
  };

  return (
    <div>
      <a onClick={() => handleAdd()}>Add new a item</a>
      <Tree
        className="draggable-tree"
        defaultExpandAll
        defaultExpandParent
        draggable
        titleRender={(item) => (
          <Space>
            <b>{item.title}</b>
            {` `}
            {!item.isDemo && (
              <Space>
                {/* <a onClick={() => edit(item)} style={{ color: "green" }}>Edit</a> */}
                <EditCraftIcon
                  onClick={() => edit(item)}
                  style={{color: 'green'}}
                />
                <TrashIcon
                  color={`red`}
                  style={{fontSize: '18px', cursor: 'pointer'}}
                  onClick={() => handleDelete(item)}
                />
              </Space>
            )}
          </Space>
        )}
        // multiple
        treeData={
          value || [
            {
              title: 'Empty',
              key: '0-0',
              isDemo: true,
            },
          ]
        }
        onDrop={onDrop}
        height={350}
        style={{minHeight: '350px'}}
        onSelect={onSelect}
      />
    </div>
  );
};

export default VarianTree;
