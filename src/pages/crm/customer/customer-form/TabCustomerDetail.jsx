import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Form} from 'antd';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {
  InputAreaBur,
  SelectTextBur,
} from '~/components/public/FormHelpers/FormTextBur';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {formatDateTimeDefault} from '~/helpers/date';
import {
  SALUTATIONS,
  CUSTOMER_STATUS_OPTION,
  ACCOUNT_TYPES,
  CURRENCY_COUNTRIES,
} from '~/constants/master-data';
import {isEmpty} from '~/helpers/validate';
import PATH from '~/routers/path';
import formrules from './formrules';
const cssClass = 'crm-customer-tab';
const {Item} = Form;

const TabCustomerDetail = (props) => {
  const {
    onChangeUser,
    onChangeCustomer,
    editField,
    editFieldFalse,
    customer,
    user,
  } = props;
  const [onlyForm, setOnlyForm] = useState(true);
  const {id} = props.match.params;

  useEffect(() => {
    if (id) {
      setOnlyForm(false);
    }
  }, [props.match.params]);

  const onFinish = () => {
    props.onCreate && props.onCreate();
  };

  const onDiscard = () => {
    props.history.push(PATH.CRM_CUSTOMER);
  };

  const fields = [
    {name: ['Personal Email'], value: customer.personalEmail},
    {name: ['Login Email'], value: user.email},
    {name: ['First Name'], value: user.firstName},
    {name: ['Last Name'], value: user.lastName},
  ];

  return (
    <div className={`${cssClass} tab-customer-detail`}>
      <Form scrollToFirstError onFinish={onFinish} fields={fields}>
        {!id && (
          <Toolbox className="pr-25" pullRight>
            <ButtonBlue text="Save" htmlType="submit" />
            <ButtonGray text="Discard" onClick={onDiscard} />
          </Toolbox>
        )}

        <RowAuto>
          <ColAuto desktop={12} tablet={24}>
            <RowLabelStatus
              label="Customer Code"
              name="userCode"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              {!id && (
                <Item
                  name="Customer Code"
                  rules={formrules.userCode}
                  style={{width: '100%'}}>
                  <InputAreaBur
                    onlyForm={onlyForm}
                    value={user.userCode}
                    setValue={(value) => onChangeUser({userCode: value})}
                  />
                </Item>
              )}
              {id && (
                <InputAreaBur
                  onlyForm={onlyForm}
                  value={user.userCode}
                  setValue={(value) => onChangeUser({userCode: value})}
                />
              )}
            </RowLabelStatus>
            <RowLabelStatus
              label="Salutation"
              name="salutation"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              <SelectTextBur
                onlyForm={onlyForm}
                data={SALUTATIONS}
                value={user.salutation}
                setValue={(value) => onChangeUser({salutation: value})}
              />
            </RowLabelStatus>
            <RowLabelStatus
              label="First Name"
              name="firstName"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              {!id && (
                <Item
                  name="First Name"
                  rules={formrules.firstName}
                  style={{width: '100%'}}>
                  <InputAreaBur
                    onlyForm={onlyForm}
                    value={user.firstName}
                    setValue={(value) => onChangeUser({firstName: value})}
                  />
                </Item>
              )}
              {id && (
                <InputAreaBur
                  onlyForm={onlyForm}
                  value={user.firstName}
                  setValue={(value) => onChangeUser({firstName: value})}
                />
              )}
            </RowLabelStatus>

            <RowLabelStatus
              label="Last Name"
              name="lastName"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              {!id && (
                <Item
                  name="Last Name"
                  rules={formrules.lastName}
                  style={{width: '100%'}}>
                  <InputAreaBur
                    onlyForm={onlyForm}
                    value={user.lastName}
                    setValue={(value) => onChangeUser({lastName: value})}
                  />
                </Item>
              )}
              {id && (
                <InputAreaBur
                  onlyForm={onlyForm}
                  value={user.lastName}
                  setValue={(value) => onChangeUser({lastName: value})}
                />
              )}
            </RowLabelStatus>
            <RowLabelStatus
              label="Email"
              name="email"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              {!id && (
                <Item
                  name="Email"
                  rules={formrules.email}
                  style={{width: '100%'}}>
                  <InputAreaBur
                    onlyForm={onlyForm}
                    value={user.email}
                    setValue={(value) => onChangeUser({email: value})}
                  />
                </Item>
              )}
              {id && <span className="form-input-value">{user.email}</span>}
            </RowLabelStatus>

            <RowLabelStatus
              label="Telephone No."
              name="phone"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              <InputAreaBur
                onlyForm={onlyForm}
                value={user.phone}
                setValue={(value) => onChangeUser({phone: value})}
              />
            </RowLabelStatus>

            <RowLabelStatus
              label="Membership"
              name="membership"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              <SelectTextBur
                onlyForm={onlyForm}
                data={props.memberships || []}
                value={customer.membership}
                setValue={(value) => onChangeCustomer({membership: value})}
              />
            </RowLabelStatus>

            <br />
            {id && (
              <>
                <RowLabelStatus label="Date Created">
                  {!isEmpty(customer.createdAt) && (
                    <span className="form-no-input-value">
                      {formatDateTimeDefault(customer.createdAt)}
                    </span>
                  )}
                </RowLabelStatus>

                <RowLabelStatus label="Date Modified">
                  {!isEmpty(customer.updatedAt) && (
                    <span className="form-no-input-value">
                      {formatDateTimeDefault(customer.updatedAt)}
                    </span>
                  )}
                </RowLabelStatus>

                <RowLabelStatus label="Last Login">
                  {!isEmpty(customer.lastLogin) && (
                    <span className="form-no-input-value">
                      {formatDateTimeDefault(customer.lastLogin)}
                    </span>
                  )}
                </RowLabelStatus>
              </>
            )}
          </ColAuto>

          <ColAuto desktop={12} tablet={24}>
            <RowLabelStatus
              label="Designation"
              name="designation"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              <InputAreaBur
                isTextArea={true}
                onlyForm={onlyForm}
                value={customer.designation}
                setValue={(value) => onChangeCustomer({designation: value})}
              />
            </RowLabelStatus>

            <RowLabelStatus
              label="Personal Contact"
              name="personalContact"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              <InputAreaBur
                onlyForm={onlyForm}
                value={customer.personalContact}
                setValue={(value) => onChangeCustomer({personalContact: value})}
              />
            </RowLabelStatus>

            <RowLabelStatus
              label="Sales Executive"
              name="salesExecutive"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              <InputAreaBur
                onlyForm={onlyForm}
                value={customer.salesExecutive}
                setValue={(value) => onChangeCustomer({salesExecutive: value})}
              />
            </RowLabelStatus>

            <RowLabelStatus
              label="Credit Terms"
              name="creditTerms"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              <InputAreaBur
                onlyForm={onlyForm}
                value={customer.creditTerms}
                setValue={(value) => onChangeCustomer({creditTerms: value})}
              />
            </RowLabelStatus>

            <RowLabelStatus
              label="Account Type"
              name="accountType"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              <SelectTextBur
                onlyForm={onlyForm}
                data={ACCOUNT_TYPES}
                value={customer.accountType}
                setValue={(value) => onChangeCustomer({accountType: value})}
              />
            </RowLabelStatus>

            <RowLabelStatus
              label="Currency"
              name="currency"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              <SelectTextBur
                onlyForm={onlyForm}
                data={CURRENCY_COUNTRIES}
                value={customer.currency}
                setValue={(value) => onChangeCustomer({currency: value})}
              />
            </RowLabelStatus>

            <RowLabelStatus
              label="Status"
              name="status"
              nameActive={editField}
              nameUnActive={editFieldFalse}>
              <SelectTextBur
                onlyForm={onlyForm}
                data={CUSTOMER_STATUS_OPTION}
                value={customer.status}
                setValue={(value) => onChangeCustomer({status: value})}
              />
            </RowLabelStatus>
          </ColAuto>
        </RowAuto>
      </Form>
    </div>
  );
};

export default withRouter(TabCustomerDetail);
