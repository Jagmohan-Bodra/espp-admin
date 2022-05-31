import {Input, Space, Table, Row, Col} from 'antd';
import React, {useEffect, useState} from 'react';
import CkEditor from '~/components/public/ckeditor';
import {confirmModalData} from '~/components/public/modals/ModalConfirmCommon/confirmModalFunc';
import {UploadImageOne} from '~/components/public/UploadImage/UploadImageOne';
import {getFullPath} from '~/helpers/utils';
import {EditCraftIcon, TrashIcon} from '~/public/assets/icon';

const VariantGaleryForm = (props) => {
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
        <Col span={6}>Image</Col>
        <Col span={18}>
          <UploadImageOne
            labelButton=""
            imageUrl={getFullPath(data.imagePath)}
            style={{textAlign: 'left'}}
            onChange={(link) => onChange({imagePath: link})}
          />
        </Col>
      </Row>
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
        <Col span={6}>Content</Col>
        <Col span={18}>
          <CkEditor
            value={data.content}
            onChange={(value) => onChange({content: value})}
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

const VariantGalery = (props) => {
  const {value, onChangeData} = props;
  const add = () => {
    confirmModalData(
      {
        header: 'Add New',
        closable: true,
        data: {},
        width: 1000,
        bodycomponent: VariantGaleryForm,
      },
      handleCreate,
    );
  };

  const handleCreate = (data) => {
    onChangeData([...(value || []), data]);
  };

  const edit = (index) => {
    confirmModalData(
      {
        header: 'Edit',
        closable: true,
        data: value[index],
        width: 1000,
        bodycomponent: VariantGaleryForm,
      },
      handleEdit(index),
    );
  };

  const handleEdit = (index) => (params) => {
    const newData = [...(value || [])];
    newData[index] = params;
    onChangeData(newData);
  };

  const deleted = (index) => {
    confirmModalData(
      {
        header: 'Delete',
        closable: true,
        body: 'Do you want to delete!',
      },
      () => {
        const newData = [...value];
        newData.splice(index, 1);
        onChangeData(newData);
      },
    );
  };

  return (
    <Table
      columns={[
        {
          title: 'Image',
          dataIndex: 'imagePath',
          render: (src) => <img src={getFullPath(src)} height={50} />,
        },
        {
          title: 'Title',
          dataIndex: 'title',
          render: (title) => title,
        },
        {
          title: 'Content',
          dataIndex: 'content',
          render: (content) => (
            <div dangerouslySetInnerHTML={{__html: content}}></div>
          ),
        },
        {
          title: 'Url',
          dataIndex: 'url',
          render: (url) => url,
        },
        {
          title: 'Action',
          render: (_, record, index) => (
            <Space>
              <EditCraftIcon
                onClick={() => edit(index)}
                style={{color: 'green'}}
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
      dataSource={value || []}
      rowKey={(row, index) => index}
      footer={() => (
        <a onClick={add} style={{textAlign: 'center', display: 'block'}}>
          Add Record
        </a>
      )}
    />
  );
};

export default VariantGalery;
