import {Col, Row, Table, Checkbox, Space, Input} from 'antd';
import React, {useEffect, useState} from 'react';
import {confirmModalData} from '~/components/public/modals/ModalConfirmCommon/confirmModalFunc';
import {debounce} from '~/helpers/common';
import {DownArrowIcon, TrashIcon, UpArrowIcon} from '~/public/assets/icon';
import {getPostListService} from '~/reduxs/post/action';

const func = debounce((method) => method(), 500);

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const PostTemplate = (props) => {
  const {name, avatar, pushlish, postCategory} = props.item || {};
  return (
    <div className={`post-template`} onClick={() => props.onChange()}>
      <div className={`post-template_image_group`}>
        <div className={`post-template_image_group_image`}>
          <img src={avatar} />
        </div>
        <span className={`post-template_image_group_checkbox`}>
          <Checkbox
            checked={props.checked}
            // onChange={(e) => props.onChange(e.target.value)}
          />
        </span>
      </div>
      <div className={`post-template_body`}>
        <h5 className={`post-template_body_title`}>{name}</h5>
        <div className={`post-template_body_category`}>
          {(postCategory || []).map((item) => item.name).join(' - ')}
        </div>
        <div className={`post-template_body_status`}>
          Status: {pushlish}
          {/* <strong class="text-success">Available</strong>  */}
        </div>
      </div>
    </div>
  );
};

const VariantPostForm = (props) => {
  const {items} = props;
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getPostList();
    props.setData && props.setData([]);
  }, []);

  const getPostList = (query) => {
    getPostListService({
      _id: items && {ninObjectId: items},
      meta: {
        pageSize: 50,
        page: 1,
      },
      ...query,
    }).then((results) => setData(results));
  };

  const handleOnChange = (item) => {
    const newData = [...selected];
    const index = selected.findIndex((select) => select == item._id);
    if (index == -1) {
      newData.push(item._id);
    } else {
      newData.splice(index, 1);
    }
    setSelected(newData);
    props.setData && props.setData(newData);
  };

  const handleSearch = (e) => {
    const value = e.target.value || '';
    func(() =>
      getPostList({
        name: {regex: value},
      }),
    );
  };

  return (
    <div className={`variant-post-form`}>
      <div className={`variant-post-form_search`}>
        <Space>
          <Input onChange={handleSearch} />
        </Space>
      </div>
      <div className={`variant-post-form_body`}>
        <Row>
          {data.map((item, index) => (
            <Col span={6} key={index} style={{padding: '15px'}}>
              <PostTemplate
                item={item}
                checked={selected.includes(item._id)}
                onChange={(value) => handleOnChange(item, value)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const VariantPost = (props) => {
  const {value, onChangeData} = props;
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (value && value.length > 0) {
      if (results.length == (value || []).length) {
        const newData = (value || [])
          .map((item) => (results || []).find((post) => post._id == item))
          .filter((item) => item);
        if ((value || []).length == newData.length) {
          setData(newData);
          return;
        }
      }
      getPostListService({
        _id: {inObjectId: value || []},
        meta: {
          pageSize: 1000,
        },
      }).then((results) => {
        const newData = (value || [])
          .map((item) => (results || []).find((post) => post._id == item))
          .filter((item) => item);
        setResults(results);
        setData(newData);
      });
    } else {
      setData([]);
    }
  }, [value]);

  const add = () => {
    confirmModalData(
      {
        header: 'Add New',
        closable: true,
        data: {},
        items: value,
        bodycomponent: VariantPostForm,
        width: 1000,
      },
      handleCreate,
    );
  };

  const handleCreate = (results) => {
    onChangeData([...(value || []), ...results].filter(onlyUnique));
  };

  const deleted = (index) => {
    confirmModalData(
      {
        header: 'Delete',
        closable: true,
        body: 'Do you want to delete!',
      },
      () => {
        const newData = [...(value || [])];
        newData.splice(index, 1);
        onChangeData(newData);
      },
    );
  };

  const handleUp = (index) => {
    if (index > 0) {
      const newData = [...(value || [])];
      const fromIndex = index;
      const toIndex = index - 1;
      newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
      onChangeData([...newData]);
    }
  };

  const handleDown = (index) => {
    if (index < data.length - 1) {
      const newData = [...(value || [])];
      const fromIndex = index;
      const toIndex = index + 1;
      newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
      onChangeData([...newData]);
    }
  };

  return (
    <Table
      columns={[
        {
          title: 'Image',
          dataIndex: 'avatar',
          render: (avatar) => <img src={avatar} height={50} />,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          render: (name) => name,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          render: (description) => description,
        },
        {
          title: 'Categories',
          dataIndex: 'postCategory',
          render: (postCategory) =>
            (postCategory || []).map((item) => item.name).join(' - '),
        },
        {
          title: 'Action',
          render: (_, record, index) => (
            <Space>
              <UpArrowIcon
                className={`up-arrow-icon`}
                onClick={() => handleUp(index)}
              />
              <DownArrowIcon
                className={`down-arrow-icon`}
                onClick={() => handleDown(index)}
              />
              <TrashIcon
                color={`red`}
                style={{fontSize: '18px', cursor: 'pointer'}}
                onClick={() => deleted(index)}
              />
            </Space>
          ),
        },
      ]}
      dataSource={data || []}
      rowKey={(row) => row._id}
      footer={() => (
        <a onClick={add} style={{textAlign: 'center', display: 'block'}}>
          Add post items
        </a>
      )}
    />
  );
};

export default VariantPost;
