import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getProductList, getProductsListExport} from '~/reduxs/product/action';
import columns from './columns';
import TableData from '~/components/public/TableData';
import Breadcrumb from '~/components/public/Breadcrumb';
import {ButtonBlue, ButtonDropdownIcon} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
  getSortFilter,
} from '~/helpers/queryString';
import FilterDropdown from '~/components/public/filter-dropdown';
import FilterLayout from './common/FilterLayout';
import PATH from '~/routers/path';
import DeleteModal from '../product-delete';
import '../style.scss';
import {exportExcel} from '~/helpers/ExportExcel';
import {
  INVENTORY_PRODUCT_CREATE_PERMISSION_KEY,
  INVENTORY_PRODUCT_DELETE_PERMISSION_KEY,
  INVENTORY_PRODUCT_EDIT_PERMISSION_KEY,
  INVENTORY_PRODUCT_PERMISSION_KEY,
  INVENTORY_PRODUCT_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {Empty} from 'antd';
const cssClass = 'product-list-page';

const ProductList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const products = useSelector((state) => state.product.data);
  const metadata = useSelector((state) => state.product.metadata);
  const loading = useSelector((state) => state.product.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const ACCESS = {
    LIST: isAccess(INVENTORY_PRODUCT_PERMISSION_KEY),
    VIEW: isAccess(INVENTORY_PRODUCT_VIEW_PERMISSION_KEY),
    CREATE: isAccess(INVENTORY_PRODUCT_CREATE_PERMISSION_KEY),
    EDIT: isAccess(INVENTORY_PRODUCT_EDIT_PERMISSION_KEY),
    DELETE: isAccess(INVENTORY_PRODUCT_DELETE_PERMISSION_KEY),
  };
  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    queryBuilder.meta = {...queryBuilder.meta, ...{sort: ['-_id']}};
    delete queryBuilder.reset;
    dispatch(
      getProductList({
        ...queryBuilder,
      }),
    );
  }, [query]);

  const setFilterQueryData = (value = {}) => {
    const queryBuilder = getQueryBuilder(query) || {};
    const data = {
      ...queryBuilder,
      ...value,
      meta: {
        ...(queryBuilder.meta || {}),
        ...(value.meta || {}),
      },
      reset: !(queryBuilder.reset === 'true'),
    };
    const queryParam = stringify(data);
    changeUrlQuery(props, queryParam);
  };

  const onPageChange = (page) => {
    setFilterQueryData({
      ...getPageFilter(page),
    });
  };

  const handleSearchSubmit = (params) => {
    setFilterQueryData({
      ...params,
      meta: {paginate: {page: 1}},
    });
  };

  const onSortChange = (sort) => {
    setFilterQueryData({
      ...getSortFilter(sort),
    });
  };

  const onCreate = () => {
    props.history.push(PATH.INVENTORY_PRODUCT_CREATE);
  };

  const onActionItem = (action) => {
    if (action && action.key == 'EDIT') {
      props.history.push(
        PATH.INVENTORY_PRODUCT_UPDATE.replace(':id', action.id),
      );
    }
    if (action && action.key == 'DELETE') {
      setObj(products.find((item) => item._id == action.id) || {});
      setVisible(true);
    }
  };

  const onItemButton = (value) => {
    if (value.key === 'EXPORT_TO_CSV') {
      exportToCSV();
      return;
    }
  };

  const deleteSuccess = () => {
    setFilterQueryData();
  };

  const exportToCSV = async () => {
    let queryBuilder = getQueryBuilder(query) || {};
    queryBuilder.meta = {
      ...queryBuilder.meta,
      ...{sort: ['-_id']},
      pageSize: 1000,
    };
    delete queryBuilder.reset;
    await getProductsListExport({...queryBuilder}).then((dataEx) => {
      if (dataEx) {
        let dataExport = (dataEx.data || []).reduce((total, item) => {
          let brands = item.brands || [];
          let colors = item.colors || [];
          let tags = item.tags || [];
          let newTotal = total.concat([
            {
              SKU: item.sku,
              'Product Name': item.name,
              Quantity: item.quantity,
              Tax: item.taxApply == '1' ? 'True' : 'False',
              Size: item.size,
              'Item Packing Size': item.itemPackingSize,
              'Qty Per Ctn': item.qtyPerCtn,
              Brand: brands.map((item) => item.name).join(', '),
              Color: colors.map((item) => item.name).join(', '),
              Tags: tags.map((item) => item.name).join(', '),
              Status: item.status,
            },
          ]);
          return newTotal;
        }, []);

        exportExcel('Espp_table_products', dataExport, 'products');
      }
    });
  };

  return ACCESS.LIST ? (
    <div className={`${cssClass} admin-product-list`}>
      <Breadcrumb data={[{name: 'Products', link: '#'}]} />
      <Toolbox className={cssClass}>
        <div style={{flexDirection: 'row', display: 'flex'}}>
          {ACCESS.CREATE && <ButtonBlue text="Create" onClick={onCreate} />}
          <FilterDropdown
            overlay={
              <FilterLayout
                handleSearchSubmit={handleSearchSubmit}
                dataFilter={queryBuilder}
              />
            }
            className={`${cssClass}__btn_filter`}
          />
        </div>
        <ButtonDropdownIcon
          text={'Action'}
          data={menuButtonAction}
          onItem={onItemButton}
        />
        <div style={{marginLeft: '240px'}} />
      </Toolbox>

      <TableData
        onActionItem={onActionItem}
        data={products}
        columns={columns}
        metadata={metadata}
        loading={loading}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.INVENTORY_PRODUCT_UPDATE}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
      <DeleteModal
        obj={obj}
        visible={visible}
        setVisible={setVisible}
        onFinish={deleteSuccess}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(ProductList);

const menuButtonAction = [
  {key: 'IMPORT_BULK_PRODUCTS', name: 'Import Bulk Products'},
  {key: 'EXPORT_TO_CSV', name: 'Export to CSV'},
];
