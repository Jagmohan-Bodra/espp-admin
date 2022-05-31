const columns = () => {
  return [
    {
      title: 'No.',
      dataIndex: '_id',
      algin: 'center',
      ellipsis: true,
      width: 80,
      render: (text, data, index) => index + 1,
    },
    {
      title: 'Product Name',
      dataIndex: 'product',
      algin: 'center',
      render: (text) => (text || {}).name,
    },
    {
      title: 'SKU',
      dataIndex: 'product',
      algin: 'center',
      render: (text) => (text || {}).sku,
    },
    {
      title: 'Unit Price (SGD)',
      dataIndex: 'price',
      algin: 'center',
      render: (text) => text,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      algin: 'center',
      render: (text) => text,
    },
    {
      title: 'Total (SGD)',
      dataIndex: 'quantity',
      algin: 'center',
      render: (text, data) => Math.round(text * data.price * 100) / 100,
    },
  ];
};

export default columns;
