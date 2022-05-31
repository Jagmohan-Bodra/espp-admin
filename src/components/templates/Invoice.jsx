import React from 'react';
import {formatDateFull} from '~/helpers/date';
import './style.scss';

export default ({propsRefs, obj, title}) => {
  const customer = obj.customer || {};
  const user = obj.customer || {};
  return (
    <div ref={propsRefs}>
      <div className="invoicecomponent">
        <table className="invoice">
          <tbody>
            <tr>
              <td width="50%" className="shop_details">
                <img src="/images/logo.png" width="150" className="logo" />
                <br />
                Ee Sin Paper Products (Pte) Ltd
                <br />
                14 Arumugam Road
                <br />
                #08-01
                <br />
                LTC Building C<br />
                Singapore 409959
                <br />
                https://www.espp.com.sg/
              </td>
              <td>
                <h3 className="title">{title || ''}</h3>
                <table className="details fright">
                  <tbody>
                    <tr>
                      <td className="td1">Order Date :</td>
                      <td>{formatDateFull(obj.orderDateTime)}</td>
                    </tr>
                    <tr>
                      <td className="td1">Order No :</td>
                      <td>{obj.orderNo || ''}</td>
                    </tr>
                    <tr>
                      <td className="td1">Order Status :</td>
                      <td>{obj.status || ''}</td>
                    </tr>
                    <tr>
                      <td className="td1">Payment Status :</td>
                      <td>{obj.payment || ''}</td>
                    </tr>
                    <tr>
                      <td className="td1">GST Number :</td>
                      <td>{`1234`}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>{` `}</td>
            </tr>
            <tr>
              <td>
                <table className="details" style={{marginTop: '30px'}}>
                  <tbody>
                    <tr>
                      <td>
                        <h5>Billing Information</h5>
                        {`${user.firstName} ${user.lastName}`}
                        <br />#{obj.shippingLocation} <br />
                        {obj.shippingLocation} <br />
                        {customer.addressCountry}, {customer.addressCountry},{' '}
                        <br />
                        {customer.addressCountry}, {customer.addressPostCode}
                        <br />
                        Tel : {customer.contactNo}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />

        <table className="order">
          <thead>
            <tr>
              <th style={{width: '100px', textAlign: 'center'}}>SKU</th>
              <th className="left" style={{width: '130px'}}>
                Product Name
              </th>
              <th className="right" style={{width: '106px'}}>
                Unit Price (SGD)
              </th>
              <th className="right" style={{width: '60px'}}>
                Quantity
              </th>
              <th className="right" style={{width: '80px'}}>
                Total (SGD)
              </th>
              <th className="right" style={{width: '30px'}}></th>
            </tr>
          </thead>
          <tbody>
            {(obj.orderProducts || []).map((item, index) => (
              <tr className="listitem" key={index}>
                <td className="ctr">{(item.product || {}).sku || ''}</td>
                <td>
                  <strong>{(item.product || {}).name || ''}</strong>
                  <div className="small">Option - no option</div>
                </td>

                <td className="right">{item.price}</td>

                <td className="right">{item.quantity}</td>
                <td className="right">
                  {parseFloat(item.price) * parseInt(item.quantity)}
                </td>
                <td className="right" width="20">
                  (S)
                </td>
              </tr>
            ))}

            <tr className="border">
              <td colSpan={4} className="right">
                <strong>Sub Total</strong>
              </td>
              <td className="right">
                <strong>{obj.subTotal}</strong>
              </td>
              <td></td>
            </tr>
            <tr id="cart_membership">
              <td colSpan={4} className="right">
                Membership Discount
              </td>
              <td className="right">({obj.membershipDiscount})</td>
              <td></td>
            </tr>

            <tr>
              <td colSpan={4} className="right">
                GST Payable
              </td>
              <td className="right">{obj.gstPayable}</td>
              <td></td>
            </tr>

            <tr className="border total">
              <td colSpan={4} className="right">
                Grand Total
              </td>
              <td className="right" id="grandTotal">
                {obj.grandTotal}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="gst_caption">
          <b>S</b> : Standard Rated @ 7%
          <br />
          <b>Z</b> : Zero Rated @ 0%
        </div>
      </div>
    </div>
  );
};
