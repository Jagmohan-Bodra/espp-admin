import React from 'react';
import {isEmpty} from 'validate.js';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {ColAuto} from '~/components/public/Grid';
import {ENQUIRY_STATUS} from '~/constants/master-data';
import {formatDateTimeDefault} from '~/helpers/date';

export default ({data}) => {
  return (
    <ColAuto desktop={24} tablet={24}>
      <RowLabelStatus label="Name" name="name" desktopLabel={5}>
        <span>{data.name}</span>
      </RowLabelStatus>

      <RowLabelStatus label="Email" name="email" desktopLabel={5}>
        <span>{data.email}</span>
      </RowLabelStatus>

      <RowLabelStatus label="Contact" name="contact" desktopLabel={5}>
        <span>{data.contact}</span>
      </RowLabelStatus>

      {data.product && (
        <RowLabelStatus label="Product" name="product" desktopLabel={5}>
          <span>{(data.product || {}).name}</span>
        </RowLabelStatus>
      )}

      <RowLabelStatus
        label="Message"
        name="message"
        desktopLabel={5}
        desktopForm={19}>
        <span>{data.message}</span>
      </RowLabelStatus>

      <RowLabelStatus label="Status" name="status" desktopLabel={5}>
        <span>
          {!isEmpty(ENQUIRY_STATUS[data.status])
            ? ENQUIRY_STATUS[data.status]
            : ''}
        </span>
      </RowLabelStatus>

      <RowLabelStatus label="Date Created" name="create" desktopLabel={5}>
        <span>{formatDateTimeDefault(data.createdAt)}</span>
      </RowLabelStatus>
    </ColAuto>
  );
};
