import React from 'react';
import {withRouter} from 'react-router-dom';
import {Spin, Table, Row} from 'antd';
import Pagination from '~/components/public/Pagination';
import {META_DATA} from '~/config';
import './style.scss';
const {PAGE_SIZE} = META_DATA.PAGINATION;
const cssClass = 'p_table_component';

const TableData = (props) => {
  const {
    data,
    columns,
    metadata,
    loading,
    pageSize,
    onPageChange,
    path,
    paginationCheck,
    isEdit,
    isView,
  } = props;
  const pagination = (metadata || {}).paginate || {} || {};
  return (
    <div className={`${cssClass}`}>
      <Row>
        <Spin spinning={loading}>
          <Table
            pagination={paginationCheck || false}
            columns={columns(props)}
            dataSource={data || []}
            rowKey={(row) => row._id || row.id}
            size={'small'}
            showSorterTooltip={false}
            onRow={(record) => {
              return {
                onDoubleClick: () =>
                  (isEdit || isView) &&
                  path &&
                  props.history.push(path.replace(':id', record._id)),
              };
            }}
          />
        </Spin>
      </Row>
      <Row>
        {metadata && parseInt(pagination.total) !== 0 && (
          <Pagination
            onChange={onPageChange}
            pageSize={pagination.pageSize || pageSize || PAGE_SIZE}
            current={pagination.page ? parseInt(pagination.page) : 1}
            total={pagination.total || 0}
            // showTotal={(total, range) => `${range[0]} -> ${range[1]} of ${total} items`}
          />
        )}
      </Row>
    </div>
  );
};

export default withRouter(TableData);
