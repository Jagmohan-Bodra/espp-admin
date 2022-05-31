import React from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
const cssClass = 'inventory-brand-tab';

const TablePaymentMethod = (props) => {
  const {data} = props;

  return (
    <div className={`${cssClass}`}>
      <RowAuto>
        <ColAuto desktop={24} tablet={24}>
          <RowLabelStatus
            label="Form of Payment"
            name="totalWeight"
            desktopLabel={5}>
            <span>{data.payment}</span>
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TablePaymentMethod);
