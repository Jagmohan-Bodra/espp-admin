import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {InputAreaBur} from '~/components/public/FormHelpers/FormTextBur';
const cssClass = 'crm-customer-tab';

const TabCompany = (props) => {
  const {onChangeCustomer, editField, editFieldFalse, customer} = props;
  const [onlyForm] = useState(false);

  return (
    <div className={`${cssClass}`}>
      <RowAuto>
        <ColAuto desktop={15} tablet={24}>
          <RowLabelStatus
            label="Company Name"
            name="companyName"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.companyName}
              setValue={(value) => onChangeCustomer({companyName: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Company Reg No."
            name="companyRegNo"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.companyRegNo}
              setValue={(value) => onChangeCustomer({companyRegNo: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Company Contact No."
            name="companyContactNo"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.companyContactNo}
              setValue={(value) => onChangeCustomer({companyContactNo: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Company Fax"
            name="companyFax"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.companyFax}
              setValue={(value) => onChangeCustomer({companyFax: value})}
            />
          </RowLabelStatus>
          <RowLabelStatus
            label="Company Nature of Business"
            name="companyNatureOfBusiness"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.companyNatureOfBusiness}
              setValue={(value) =>
                onChangeCustomer({companyNatureOfBusiness: value})
              }
            />
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TabCompany);
