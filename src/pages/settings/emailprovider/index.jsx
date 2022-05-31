import React, {useEffect, useState} from 'react';
import {Collapse} from 'antd';
import {
  InputAreaAutoSaveBlock,
  InputAutoSaveBlock,
} from '~/components/public/FormHelpers';
import '../style.scss';
import {updateSettings, reqIsUpdate} from '~/reduxs/settings/action';
import {useDispatch, useSelector} from 'react-redux';
import {debounce} from '~/helpers/common';
import {isMultiEmail} from '~/helpers/validate';

const {Panel} = Collapse;
const func = debounce((func) => func(), 3000);

const EmailTemplate = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const loading = useSelector((state) => state.settings.loading);
  const isUpdate = useSelector((state) => state.settings.isUpdate);
  useEffect(() => {
    setData({
      ...data,
      emailList: (props.data || []).find(
        (item) => item.key === 'EMAIL_PROVIDER_APPRAISER_LIST',
      ),
      emailOrder: (props.data || []).find(
        (item) => item.key === 'EMAIL_PROVIDER_NOTIFICATION_ORDER_EVENT',
      ),
      emailContact: (props.data || []).find(
        (item) => item.key === 'EMAIL_PROVIDER_NOTIFICATION_CONTACT_EVENT',
      ),
      emailHost: (props.data || []).find(
        (item) => item.key === 'EMAIL_PROVIDER_MAILER_HOST',
      ),
      emailPort: (props.data || []).find(
        (item) => item.key === 'EMAIL_PROVIDER_MAILER_PORT',
      ),
      emailPublicName: (props.data || []).find(
        (item) => item.key === 'EMAIL_PROVIDER_MAILER_PUBLIC_NAME',
      ),
      emailSenderName: (props.data || []).find(
        (item) => item.key === 'EMAIL_PROVIDER_MAILER_SENDER_NAME',
      ),
      emailUserName: (props.data || []).find(
        (item) => item.key === 'EMAIL_PROVIDER_MAILER_USERNAME',
      ),
      emailPassword: (props.data || []).find(
        (item) => item.key === 'EMAIL_PROVIDER_MAILER_PASSWORD',
      ),
    });
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
        <Panel header="INCOMING EMAIL SETTINGS:" key="1">
          <InputAreaAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.emailList}
            onBlur={true}
            label="Upon Sign-up approved<br /> send email to:"
            value={(data.emailList || {}).value}
            loading={loading}
            isUpdate={isUpdate}
            rules={[
              {
                check: isMultiEmail,
                message: 'Is not a valid email',
              },
            ]}
          />
          <br />
          <InputAreaAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.emailOrder}
            onBlur={true}
            label="Upon Order created<br /> send email to:"
            value={(data.emailOrder || {}).value}
            loading={loading}
            isUpdate={isUpdate}
            rules={[
              {
                check: isMultiEmail,
                message: 'Is not a valid email',
              },
            ]}
          />
          <br />
          <InputAreaAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.emailContact}
            onBlur={true}
            label="Upon Contact Form submitted<br /> send email to:"
            value={(data.emailContact || {}).value}
            loading={loading}
            isUpdate={isUpdate}
            rules={[
              {
                check: isMultiEmail,
                message: 'Is not a valid email',
              },
            ]}
          />
        </Panel>
        <Panel header="OUTGOING EMAIL SETTINGS:" key="2">
          <InputAreaAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.emailHost}
            onBlur={true}
            label="Email Host"
            value={(data.emailHost || {}).value}
            loading={loading}
            isUpdate={isUpdate}
            // rules={[
            //   {
            //     check: isMultiEmail,
            //     message: 'Is not a valid email',
            //   },
            // ]}
          />
          <br />
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.emailPort}
            onBlur={true}
            label="Email Port"
            value={(data.emailPort || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.emailPublicName}
            onBlur={true}
            label="Public Name"
            value={(data.emailPublicName || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
          <br />
          <InputAreaAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.emailSenderName}
            onBlur={true}
            label="Sender Name"
            value={(data.emailSenderName || {}).value}
            loading={loading}
            isUpdate={isUpdate}
            rules={[
              {
                check: isMultiEmail,
                message: 'Is not a valid email',
              },
            ]}
          />
          <br />
          <InputAreaAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.emailUserName}
            onBlur={true}
            label="Email Username"
            value={(data.emailUserName || {}).value}
            loading={loading}
            isUpdate={isUpdate}
            rules={[
              {
                check: isMultiEmail,
                message: 'Is not a valid email',
              },
            ]}
          />
          <br />
          <InputAutoSaveBlock
            isInput={false}
            func={updateSettings}
            data={data.emailPassword}
            onBlur={true}
            label="Email Password"
            value={(data.emailPassword || {}).value}
            loading={loading}
            isUpdate={isUpdate}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default EmailTemplate;
