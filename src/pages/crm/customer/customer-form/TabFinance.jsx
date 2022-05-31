import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {InputAreaBur} from '~/components/public/FormHelpers/FormTextBur';
const cssClass = 'crm-customer-tab';

const TabFinance = (props) => {
  const {onChangeCustomer, editField, editFieldFalse, customer} = props;
  const [onlyForm] = useState(false);

  return (
    <div className={`${cssClass}`}>
      <RowAuto>
        <ColAuto desktop={15} tablet={24}>
          <RowLabelStatus
            label="Finance Salutation"
            name="financeSalutation"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.financeSalutation}
              setValue={(value) => onChangeCustomer({financeSalutation: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Finance First Name"
            name="financeFirstName"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.financeFirstName}
              setValue={(value) => onChangeCustomer({financeFirstName: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Finance Last Name"
            name="financeLastName"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.financeLastName}
              setValue={(value) => onChangeCustomer({financeLastName: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Finance Contact No."
            name="financeContactNo"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.financeContactNo}
              setValue={(value) => onChangeCustomer({financeContactNo: value})}
            />
          </RowLabelStatus>
          <RowLabelStatus
            label="Finance Email"
            name="financeEmail"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.financeEmail}
              setValue={(value) => onChangeCustomer({financeEmail: value})}
            />
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TabFinance);
