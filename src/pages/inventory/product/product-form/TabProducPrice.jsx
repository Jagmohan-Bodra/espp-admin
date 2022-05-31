import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {trans} from '~/components/public/Translate';
import {notification} from 'antd';
import {getMembershipList} from '~/reduxs/membership/action';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import TableData from '~/components/public/TableData';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {InputAreaBur} from '~/components/public/FormHelpers/FormTextBur';
import {debounce} from '~/helpers/common';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
} from '~/helpers/queryString';
import {CheckIcon} from '~/public/assets/icon';
const cssClass = 'crm-customer-tab';

const TabProducPrice = (props) => {
  const {productPrice, handleSubmitPrice} = props;
  const dispatch = useDispatch();
  const query = getQueryString(props);
  const memberships = useSelector((state) => state.membership.data);
  const metadata = useSelector((state) => state.membership.metadata);
  const [editField, setEditField] = useState('');
  const [publicPrice, setPublicPrice] = useState(props.publicPrice || null);
  const loading = useSelector((state) => state.membership.loading);

  useEffect(() => {
    getListByUrl();
  }, [query]);

  useEffect(() => {
    if (props.publicPrice) {
      setPublicPrice(props.publicPrice);
    }
  }, [props.publicPrice]);

  const getListByUrl = () => {
    let queryBuilder = getQueryBuilder(query) || {};
    queryBuilder.meta = {...queryBuilder.meta, ...{sort: ['-_id']}};
    delete queryBuilder.reset;
    dispatch(
      getMembershipList({
        ...queryBuilder,
      }),
    );
  };

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
    setFilterQueryData({...getPageFilter(page)});
  };

  const hanldeChange = (value) => {
    funcUpdate(value);
    setPublicPrice(value.publicPrice);
  };

  const funcUpdate = debounce((value) => {
    handleAlertStatus();
    props.onSave && props.onSave(value);
  }, 1000);

  const handleAlertStatus = () => {
    setEditField('publicPrice');
    setTimeout(() => {
      setEditField('');
    }, 1500);
  };

  return (
    <div className={`${cssClass} tab-product-price`}>
      <RowAuto>
        <ColAuto desktop={12} tablet={24}>
          <RowLabelStatus
            label="Standard Price"
            name="publicPrice"
            nameActive={editField}
            desktopLabel={12}
            desktopForm={12}>
            <InputAreaBur
              value={publicPrice}
              setValue={(value) => hanldeChange({publicPrice: value})}
            />
          </RowLabelStatus>
        </ColAuto>
        <ColAuto desktop={12} tablet={24}>
          <span>SGD</span>
        </ColAuto>
      </RowAuto>

      <TableData
        data={memberships}
        columns={columns}
        onPageChange={onPageChange}
        metadata={metadata}
        loading={loading}
        publicPrice={publicPrice}
        productPrice={productPrice}
        handleSubmitPrice={handleSubmitPrice}
      />
    </div>
  );
};

export default withRouter(TabProducPrice);

const columns = (props) => {
  const {publicPrice, productPrice, handleSubmitPrice} = props;
  return [
    {
      title: 'Membership',
      dataIndex: 'name',
      ellipsis: true,
      render: (text) => text,
    },
    {
      title: 'Percent (%)',
      dataIndex: 'discountPercent',
      render: (p) => p,
    },
    {
      title: 'Discounted Price',
      dataIndex: 'discountPercent',
      render: (p) =>
        p && publicPrice && (publicPrice - (p * publicPrice) / 100).toFixed(2),
    },
    {
      title: 'Price updated by user',
      ellipsis: true,
      dataIndex: '_id',
      render: (p) => {
        const [isUpdate, setIsUpdate] = useState(false);

        const handleAlertStatus = () => {
          setIsUpdate(true);
          setTimeout(() => {
            setIsUpdate(false);
          }, 1500);
        };

        const onSave = (membershipId, price) => {
          setTimeout(() => {
            if (price > publicPrice) {
              notification.warning({
                message: trans(
                  'Price updated by user must be less than Standard Price',
                ),
              });
              return;
            }
            let dataProductPrice = {
              membershipId: membershipId,
              price: price,
            };
            handleSubmitPrice(dataProductPrice).then(
              (results) => results && handleAlertStatus(),
            );
          }, 1500);
        };
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <InputAreaBur
              isInput={false}
              onBlur={true}
              setValue={(value) => onSave(p, value)}
              value={
                (
                  (productPrice || []).find((item) => item.membership == p) ||
                  {}
                ).price || 0
              }
            />
            {isUpdate && <CheckIcon color="green" className="ml-10" />}
          </div>
        );
      },
    },
    {
      title: 'MOQ updated by user',
      dataIndex: '_id',
      render: (_id) => (
        <ColumnMoq
          membershipId={_id}
          productPrice={productPrice}
          updateProductPrice={handleSubmitPrice}
        />
      ),
    },
  ];
};

const ColumnMoq = (props) => {
  const {membershipId, productPrice, updateProductPrice} = props;
  const [isUpdate, setIsUpdate] = useState(false);

  const handleAlertStatus = () => {
    setIsUpdate(true);
    setTimeout(() => {
      setIsUpdate(false);
    }, 1500);
  };

  const onSave = (value) => {
    setTimeout(() => {
      let price =
        (
          (productPrice || []).find(
            (item) => item.membership == membershipId,
          ) || {}
        ).price || 0;
      let dataProductPrice = {
        membershipId: membershipId,
        moq: value,
        price: price,
      };
      updateProductPrice(dataProductPrice).then(
        (results) => results && handleAlertStatus(),
      );
    }, 1500);
  };

  let moq =
    ((productPrice || []).find((item) => item.membership == membershipId) || {})
      .moq || 0;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <InputAreaBur
        isInput={false}
        onBlur={true}
        setValue={(value) => onSave(value)}
        value={moq}
      />
      {isUpdate && <CheckIcon color="green" className="ml-10" />}
    </div>
  );
};
