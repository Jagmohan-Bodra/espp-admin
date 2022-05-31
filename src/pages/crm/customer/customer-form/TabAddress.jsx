import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {
  InputAreaBur,
  SelectTextBur,
} from '~/components/public/FormHelpers/FormTextBur';
import countries from '~/constants/country';
const cssClass = 'crm-customer-tab';

const TabAddress = (props) => {
  const {onChangeCustomer, editField, customer, editFieldFalse} = props;
  const [onlyForm] = useState(false);

  return (
    <div className={`${cssClass}`}>
      <RowAuto>
        <ColAuto desktop={12} tablet={24}>
          <RowLabelStatus
            label="Address Block No."
            name="addressBlockNo"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.addressBlockNo}
              setValue={(value) => onChangeCustomer({addressBlockNo: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Address Street name"
            name="addressStresstName"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.addressStresstName}
              setValue={(value) =>
                onChangeCustomer({addressStresstName: value})
              }
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Address Floor"
            name="addressFloor"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.addressFloor}
              setValue={(value) => onChangeCustomer({addressFloor: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Address Unit No."
            name="lastNaddressUnitNoame"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.addressUnitNo}
              setValue={(value) => onChangeCustomer({addressUnitNo: value})}
            />
          </RowLabelStatus>
          <RowLabelStatus
            label="Address Building Name"
            name="addressBuildingName"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.addressBuildingName}
              setValue={(value) =>
                onChangeCustomer({addressBuildingName: value})
              }
            />
          </RowLabelStatus>
        </ColAuto>

        <ColAuto desktop={12} tablet={24}>
          <RowLabelStatus
            label="Post Code"
            name="addressPostCode"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.addressPostCode}
              setValue={(value) => onChangeCustomer({addressPostCode: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="City"
            name="addressCity"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.addressCity}
              setValue={(value) => onChangeCustomer({addressCity: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="State"
            name="addressState"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={customer.addressState}
              setValue={(value) => onChangeCustomer({addressState: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Country"
            name="addressCountry"
            nameActive={editField}
            nameUnActive={editFieldFalse}>
            <SelectTextBur
              onlyForm={onlyForm}
              data={countries}
              keyOption="code"
              valueOption="name"
              value={customer.addressCountry}
              setValue={(value) => onChangeCustomer({addressCountry: value})}
            />
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TabAddress);
