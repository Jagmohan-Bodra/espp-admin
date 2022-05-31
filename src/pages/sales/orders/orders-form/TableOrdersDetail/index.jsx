import React from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import columns from './columns';
import TableData from '~/components/public/TableData';
import '../../../style.scss';
const cssClass = 'sales-orders-tab-detail';

export const TableTotal = (props) => {
  const {subTotal, discount, GST, total} = props;
  return (
    <div className={`${cssClass}__table-total`}>
      <div className={`${cssClass}__table-total-left`}>
        <b>
          <span>Sub Total</span>
        </b>
        <br />
        <span>Membership Discount</span>
        <br />
        <span>GST Payable</span>
        <br />
        <b>
          <span>Grand Total</span>
        </b>
      </div>
      <div className={`${cssClass}__table-total-right`}>
        <b>
          <span>{Math.round(subTotal * 100) / 100}</span>
        </b>
        <br />
        <span>{Math.round(discount * 100) / 100}</span>
        <br />
        <span>{Math.round(GST * 100) / 100}</span>
        <br />
        <b>
          <span>{Math.round(total * 100) / 100}</span>
        </b>
      </div>
    </div>
  );
};

const OrdersDetail = (props) => {
  const {data, loading} = props;

  return (
    <div className={`${cssClass}`}>
      <RowAuto>
        <ColAuto desktop={12} tablet={24}>
          <RowLabelStatus label="Order No." name="orderNo">
            <span>{data.orderNo}</span>
          </RowLabelStatus>

          <RowLabelStatus label="Total Weight (kg)" name="totalWeight">
            <span>{data.totalWeight}</span>
          </RowLabelStatus>

          <RowLabelStatus label="Discount Code" name="discountCode">
            <span>{data.discountCode}</span>
          </RowLabelStatus>

          <RowLabelStatus label="Discount Value" name="discountValue">
            <span>{data.discountValue}</span>
          </RowLabelStatus>

          <RowLabelStatus label="Discount Name" name="discountName">
            <span>{data.discountName}</span>
          </RowLabelStatus>

          <RowLabelStatus label="Notes" name="notes">
            <span>{data.notes}</span>
          </RowLabelStatus>
        </ColAuto>
        <ColAuto desktop={12} tablet={24}>
          <RowLabelStatus label="Purchase Order" name="purchaseOrder">
            <span>{data.purchaseOrder}</span>
          </RowLabelStatus>
          <RowLabelStatus label="Tax (%)" name="tax">
            <span>{data.tax}</span>
          </RowLabelStatus>

          <RowLabelStatus label="Shipping Fee (SGD)" name="shipping">
            <span>{data.shippingFee}</span>
          </RowLabelStatus>

          <RowLabelStatus label="Handling Fee (SGD)" name="handling">
            <span>{data.HandlingFee}</span>
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
      <TableData
        data={data.orderProducts}
        columns={columns}
        loading={loading}
      />
      <TableTotal
        subTotal={data.subTotal}
        discount={data.membershipDiscount}
        GST={data.gstPayable}
        total={data.grandTotal}
      />
    </div>
  );
};

export default withRouter(OrdersDetail);
