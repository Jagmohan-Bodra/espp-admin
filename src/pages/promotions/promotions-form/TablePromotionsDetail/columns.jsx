import React from 'react';
const columns = ({handleRemove}) => {
  return [
    {
      title: 'No.',
      dataIndex: 'brands',
      algin: 'center',
      ellipsis: true,
      width: 80,
      render: () => '1',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      algin: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      algin: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Product Category',
      dataIndex: 'productCategories',
      algin: 'center',
      render: (arr) => (
        <span>{(arr || []).map((item) => item.name).join(' ,')}</span>
      ),
    },
    {
      title: 'Product Brand',
      dataIndex: 'brands',
      algin: 'center',
      render: (arr) => (
        <span>{(arr || []).map((item) => item.name).join(' ,')}</span>
      ),
    },
    {
      title: 'Product Tag',
      dataIndex: 'tags',
      algin: 'center',
      render: (arr) => (
        <span>{(arr || []).map((item) => item.name).join(' ,')}</span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      algin: 'center',
      render: (id) => (
        <a onClick={() => handleRemove && handleRemove(id)}>Remove</a>
      ),
    },
  ];
};

export default columns;
