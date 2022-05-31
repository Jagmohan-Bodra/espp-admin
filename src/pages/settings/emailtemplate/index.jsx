import React, {useEffect, useState} from 'react';
import {Collapse} from 'antd';
import {
  InputAutoSaveBlock,
  JoditEditorAutoSaveBlock,
} from '~/components/public/FormHelpers';
import '../style.scss';
import {updateSettings, reqIsUpdate} from '~/reduxs/settings/action';
import {useDispatch, useSelector} from 'react-redux';
import {debounce} from '~/helpers/common';

const {Panel} = Collapse;
const func = debounce((func) => func(), 3000);

const EmailProvider = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const loading = useSelector((state) => state.settings.loading);
  const isUpdate = useSelector((state) => state.settings.isUpdate);

  useEffect(() => {
    if (props.data) {
      setData(
        Object.assign(
          {},
          ...props.data.map((item) => ({
            [item.key]: item,
          })),
        ),
      );
    }
    // setData({
    //   ...data,
    //   emailRegisterTitle: (props.data || []).find(
    //     (item) => item.key === 'EMAIL_TEMPLATE_REGISTER_ACCOUNT_TITLE',
    //   ),
    //   emailRegisterTemplate: (props.data || []).find(
    //     (item) => item.key === 'EMAIL_TEMPLATE_REGISTER_ACCOUNT_TEMPLATE',
    //   ),
    //   emailForgotTitle: (props.data || []).find(
    //     (item) => item.key === 'EMAIL_TEMPLATE_FORGOT_PASSWORD_TITLE',
    //   ),
    //   emailForgotTemplate: (props.data || []).find(
    //     (item) => item.key === 'EMAIL_TEMPLATE_FORGOT_PASSWORD_TEMPLATE',
    //   ),
    //   emailInvoiceTitle: (props.data || []).find(
    //     (item) => item.key === 'EMAIL_TEMPLATE_INVOICE_TITLE',
    //   ),
    //   emailInvoiceTemplate: (props.data || []).find(
    //     (item) => item.key === 'EMAIL_TEMPLATE_INVOICE_TEMPLATE',
    //   ),
    //   emailReceiptTitle: (props.data || []).find(
    //     (item) => item.key === 'EMAIL_TEMPLATE_RECEIPT_TITLE',
    //   ),
    //   emailReceiptTemplate: (props.data || []).find(
    //     (item) => item.key === 'EMAIL_TEMPLATE_RECEIPT_ACCOUNT_TEMPLATE',
    //   ),
    //   emailShippingTitle: (props.data || []).find(
    //     (item) => item.key === 'EMAIL_TEMPLATE_SHIPPING_DETAIL_TITLE',
    //   ),
    //   emailShippingTemplate: (props.data || []).find(
    //     (item) => item.key === 'EMAIL_TEMPLATE_SHIPPING_DETAIL_TEMPLATE',
    //   ),
    // });
  }, [props.data]);

  const callUpdate = () => {
    dispatch(reqIsUpdate(false));
  };

  useEffect(() => {
    if (isUpdate) {
      func(callUpdate);
    }
  }, [isUpdate]);

  return (
    <div>
      <Collapse expandIconPosition="right" ghost={true}>
        <Panel header="REGISTER ACCOUNT" key="1">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_REGISTER_ACCOUNT_TITLE']}
            onBlur={true}
            label="Email Title"
            value={(data['EMAIL_TEMPLATE_REGISTER_ACCOUNT_TITLE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_REGISTER_ACCOUNT_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={
              (data['EMAIL_TEMPLATE_REGISTER_ACCOUNT_TEMPLATE'] || {}).value
            }
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>
        <Panel header="REGISTER USER" key="13">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_REGISTER_USER_TITLE']}
            onBlur={true}
            label="Email Title"
            value={(data['EMAIL_TEMPLATE_REGISTER_USER_TITLE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_REGISTER_USER_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={(data['EMAIL_TEMPLATE_REGISTER_USER_TEMPLATE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>
        <Panel header="FORGOT PASSWORD" key="2">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_FORGOT_PASSWORD_TITLE']}
            onBlur={true}
            label="Email Title"
            value={(data['EMAIL_TEMPLATE_FORGOT_PASSWORD_TITLE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_FORGOT_PASSWORD_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={
              (data['EMAIL_TEMPLATE_FORGOT_PASSWORD_TEMPLATE'] || {}).value
            }
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>
        <Panel header="EMAIL INVOICE" key="4">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_INVOICE_TITLE']}
            onBlur={true}
            label="Email Title"
            value={(data['EMAIL_TEMPLATE_INVOICE_TITLE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_INVOICE_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={(data['EMAIL_TEMPLATE_INVOICE_TEMPLATE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>
        <Panel header="EMAIL RECEIPT" key="5">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_RECEIPT_TITLE']}
            onBlur={true}
            label="Email Title"
            value={(data['EMAIL_TEMPLATE_RECEIPT_TITLE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_RECEIPT_ACCOUNT_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={
              (data['EMAIL_TEMPLATE_RECEIPT_ACCOUNT_TEMPLATE'] || {}).value
            }
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>
        <Panel header="EMAIL CONTACT US" key="6">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_CONTACT_US_TITLE']}
            onBlur={true}
            label="Email Title"
            value={(data['EMAIL_TEMPLATE_CONTACT_US_TITLE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_CONTACT_US_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={(data['EMAIL_TEMPLATE_CONTACT_US_TEMPLATE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>

        <Panel header="EMAIL PAYMENT LOCAL BANK TRANSFER" key="7">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_PAYMENT_LOCAL_BANK_TRANSFER_TITLE']}
            onBlur={true}
            label="Email Title"
            value={
              (data['EMAIL_TEMPLATE_PAYMENT_LOCAL_BANK_TRANSFER_TITLE'] || {})
                .value
            }
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_PAYMENT_LOCAL_BANK_TRANSFER_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={
              (
                data['EMAIL_TEMPLATE_PAYMENT_LOCAL_BANK_TRANSFER_TEMPLATE'] ||
                {}
              ).value
            }
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>

        <Panel header="EMAIL PAYMENT PAYNOW" key="8">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_PAYMENT_PAYNOW_TITLE']}
            onBlur={true}
            label="Email Title"
            value={(data['EMAIL_TEMPLATE_PAYMENT_PAYNOW_TITLE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_PAYMENT_PAYNOW_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={(data['EMAIL_TEMPLATE_PAYMENT_PAYNOW_TEMPLATE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>

        <Panel header="EMAIL PAYMENT PAYPAL" key="9">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_PAYMENT_PAYPAL_TITLE']}
            onBlur={true}
            label="Email Title"
            value={(data['EMAIL_TEMPLATE_PAYMENT_PAYPAL_TITLE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_PAYMENT_PAYPAL_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={(data['EMAIL_TEMPLATE_PAYMENT_PAYPAL_TEMPLATE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>

        <Panel header="EMAIL THANK YOU" key="10">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_ORDER_THANK_YOU_TITLE']}
            onBlur={true}
            label="Email Title"
            value={(data['EMAIL_TEMPLATE_ORDER_THANK_YOU_TITLE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_ORDER_THANK_YOU_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={
              (data['EMAIL_TEMPLATE_ORDER_THANK_YOU_TEMPLATE'] || {}).value
            }
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>

        <Panel header="EMAIL PAYMENT REJECT" key="11">
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_ORDER_SORRY_TITLE']}
            onBlur={true}
            label="Email Title"
            value={(data['EMAIL_TEMPLATE_ORDER_SORRY_TITLE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <JoditEditorAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data['EMAIL_TEMPLATE_ORDER_SORRY_TEMPLATE']}
            onBlur={true}
            label="Email Template"
            value={(data['EMAIL_TEMPLATE_ORDER_SORRY_TEMPLATE'] || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default EmailProvider;
