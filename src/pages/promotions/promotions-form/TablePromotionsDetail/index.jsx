import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {DatePicker, Radio, Input, Form} from 'antd';
import {localeDatePicker} from '~/config';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {
  InputAreaBur,
  SelectTextBur,
} from '~/components/public/FormHelpers/FormTextBur';
import columns from './columns';
import moment from 'moment';
import {Toolbox} from '~/components/public/Toolbox';
import ModalCreate from './ModalCreate';
import {
  PROMOTIONS_TYPE_OPTION,
  PROMOTION_APPLYFOR_OPTION,
  STATUS_OPTION,
} from '~/constants/master-data';
import '../../style.scss';
import TableData from '~/components/public/TableData';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import path from '~/routers/path';
import {isEmpty} from '~/helpers/validate';

const cssClass = 'sales-orders-tab-detail';
const {RangePicker} = DatePicker;

const OrdersDetail = (props) => {
  const [data, setData] = useState(props.data || {});
  const [products, setProducts] = useState([]);
  const [check, setCheck] = useState();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('PERCENTAGE');
  const [apply, setApply] = useState('ALL_PRODUCTS');
  const [onlyForm, setOnlyForm] = useState(true);
  const {id} = props.match.params;

  useEffect(() => {
    if (id) {
      setOnlyForm(false);
    }
  }, [props.match.params]);

  useEffect(() => {
    setData({...props.data});
    setType((props.data || {}).type);
    setApply((props.data || {}).applyFor);
    setCheck((props.data || {}).isFullShippingFee);
    setProducts((props.data || []).product || []);
  }, [props.data]);

  //   useEffect(() => {
  //     let queryBuilder = getQueryBuilder(query) || {};
  //     delete queryBuilder.reset;
  //     dispatch(getOrdersList({
  //         meta: {pageSize: 1000, page: 1},
  //         ...queryBuilder,
  //     }));
  // }, [query])

  // const setFilterQueryData = (value = {}) => {
  //   const queryBuilder = getQueryBuilder(query) || {};
  //   const data = {
  //       ...queryBuilder,
  //       ...value,
  //       meta: {
  //           ...(queryBuilder.meta || {}),
  //           ...(value.meta || {}),
  //       },
  //       reset: !(queryBuilder.reset === 'true'),
  //   }
  //   const queryParam = stringify(data);
  //   changeUrlQuery(props, queryParam)
  // }

  // const handleSearchSubmit = (params) => {
  //   setFilterQueryData({
  //   ...params,
  //   meta: {page: "1"}
  //   })
  // }
  const isInArray = (arr, obj) => {
    return (arr || []).findIndex((item) => item._id == obj._id) !== -1;
  };

  const handleSearchSubmit = (results) => {
    const newProducts = [...products];
    (results || []).map((item) => {
      if (!isInArray(newProducts, item)) {
        newProducts.unshift(item);
      }
    });
    setProducts(newProducts);
  };

  const onChangeType = (value) => {
    setType(value);
    if (value === 'PERCENTAGE') {
      setData({
        ...data,
        cashRebateValue: '',
        freeShippingMaximum: '',
        isFullShippingFee: 'false',
      });
      return;
    }
    if (value === 'CASH_REBATE') {
      setData({
        ...data,
        percentageValue: '',
        freeShippingMaximum: '',
        isFullShippingFee: 'false',
      });
      return;
    }
    setData({
      ...data,
      cashRebateValue: '',
      percentageValue: '',
      freeShippingMaximum: '',
      isFullShippingFee: 'false',
    });
  };

  const onChangeCheck = (value) => {
    setCheck(value);
    value ? setData({...data, freeShippingMaximum: ''}) : null;
  };

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const onSave = () => {
    props.onSave &&
      props.onSave({
        ...data,
        type: type,
        applyFor: apply,
        isFullShippingFee: check,
        startDate: !isEmpty(data.date) ? data.date[0] : data.startDate,
        endDate: !isEmpty(data.date) ? data.date[1] : data.endDate,
        product: (products || []).map((item) => item._id),
      });
  };

  const onDiscard = () => {
    props.history.push(path.PROMOTIONS);
  };

  const handleRemove = (id) => {
    setProducts(products.filter((item) => item._id !== id));
  };

  const fields = [
    {name: ['Promotion Type'], value: type},
    {name: ['Promotion Value'], value: check || data.cashRebateValue},
    {name: ['Promotion Value(%)'], value: data.percentageValue},
  ];

  return (
    <div className={`${cssClass}`}>
      <Form
        name="basic"
        initialValues={{remember: true}}
        fields={fields}
        onFinish={onSave}>
        <Toolbox className="pr-25" pullRight>
          <ButtonBlue text="Save" htmlType="submit" />
          <ButtonGray text="Discard" onClick={onDiscard} />
        </Toolbox>

        <RowAuto>
          <ColAuto desktop={24} tablet={24}>
            <RowLabelStatus
              label="Promotion Type"
              name="type"
              desktopLabel={4}
              desktopForm={20}>
              <Form.Item
                style={{width: '100%'}}
                name="Promotion Type"
                rules={[{required: true}]}>
                <SelectTextBur
                  onlyForm={true}
                  data={PROMOTIONS_TYPE_OPTION}
                  value={type}
                  setValue={(value) => onChangeType(value)}
                  hidePlaceholder={true}
                  className={`${cssClass}__text-select`}
                />
              </Form.Item>
            </RowLabelStatus>
          </ColAuto>
          <ColAuto desktop={24} tablet={24}>
            <RowLabelStatus
              label={
                type == 'PERCENTAGE' ? 'Promotion Value(%)' : 'Promotion Value'
              }
              name="value"
              desktopLabel={4}
              desktopForm={20}>
              {type == 'FREE_SHIPPING' ? (
                <Form.Item
                  style={{width: '100%'}}
                  name="Promotion Value"
                  rules={[{required: true}]}>
                  <Radio.Group
                    className={`radio-group-promotion`}
                    onChange={(e) => onChangeCheck(e.target.value)}
                    value={check}>
                    <Radio value={true}>Full Shipping Free</Radio>
                    <Radio value={false}>
                      Maximum
                      {check === false ? (
                        <Input
                          onChange={(e) =>
                            onChangeData({freeShippingMaximum: e.target.value})
                          }
                          value={data.freeShippingMaximum}
                          style={{width: 100, marginLeft: 10}}
                        />
                      ) : null}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              ) : data.cashRebateValue || type == 'CASH_REBATE' ? (
                <Form.Item
                  style={{width: '100%'}}
                  name="Promotion Value"
                  rules={[{required: true}]}>
                  <InputAreaBur
                    onlyForm={onlyForm}
                    value={data.cashRebateValue || ''}
                    setValue={(value) => onChangeData({cashRebateValue: value})}
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  style={{width: '100%'}}
                  name="Promotion Value(%)"
                  rules={[{required: true}]}>
                  <InputAreaBur
                    onlyForm={onlyForm}
                    value={data.percentageValue || ''}
                    setValue={(value) => onChangeData({percentageValue: value})}
                  />
                </Form.Item>
              )}
            </RowLabelStatus>
          </ColAuto>
          <ColAuto desktop={12} tablet={24}>
            <RowLabelStatus
              label="Promotion Name"
              name="name"
              desktopLabel={8}
              desktopForm={16}>
              <InputAreaBur
                onlyForm={onlyForm}
                value={data.name}
                setValue={(value) => onChangeData({name: value})}
              />
            </RowLabelStatus>
          </ColAuto>
          <ColAuto desktop={12} tablet={24}>
            <RowLabelStatus
              label="Status"
              name="status"
              desktopLabel={7}
              desktopForm={13}>
              <SelectTextBur
                onlyForm={onlyForm}
                data={STATUS_OPTION}
                value={data.status}
                setValue={(value) => onChangeData({status: value})}
              />
            </RowLabelStatus>
          </ColAuto>
          <ColAuto desktop={24} tablet={24}>
            <RowLabelStatus
              label="Event Date"
              name="date"
              desktopLabel={4}
              desktopForm={20}>
              <RangePicker
                showTime
                className={'input-default range-picker-detail'}
                locale={localeDatePicker}
                defaultValue={[moment(data.startDate), moment(data.endDate)]}
                onChange={(dates) => onChangeData({date: dates})}
              />
            </RowLabelStatus>
            <RowLabelStatus
              label="Apply For"
              name="type"
              desktopLabel={4}
              desktopForm={20}>
              <SelectTextBur
                onlyForm={true}
                data={PROMOTION_APPLYFOR_OPTION}
                value={apply}
                setValue={(value) => setApply(value)}
                hidePlaceholder={true}
                className={`${cssClass}__text-select`}
              />
            </RowLabelStatus>
            <RowLabelStatus
              label="Capacity"
              name="handling"
              desktopLabel={4}
              desktopForm={20}>
              <InputAreaBur
                onlyForm={onlyForm}
                value={data.capacity}
                setValue={(value) => onChangeData({capacity: value})}
              />
            </RowLabelStatus>
          </ColAuto>
        </RowAuto>
      </Form>
      {apply == 'SPECIAL_PRODUCTS' && (
        <>
          <div style={{textAlign: '-webkit-right', marginRight: '50px'}}>
            <ButtonBlue text="Add Product" onClick={() => setVisible(true)} />
          </div>
          <TableData
            data={products || []}
            columns={columns}
            loading={false}
            handleRemove={handleRemove}
            paginationCheck={true}
          />
        </>
      )}
      <ModalCreate
        handleSearchSubmit={handleSearchSubmit}
        visible={visible}
        setVisible={setVisible}
        // handleSave={onPutCreate}
      />
    </div>
  );
};

export default withRouter(OrdersDetail);
