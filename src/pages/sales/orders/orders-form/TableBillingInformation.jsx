import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import PATH from '~/routers/path';
import {ORDERS_STATUS} from '~/constants/master-data';
import {isEmpty} from '~/helpers/validate';
import {formatDateTimeDefault} from '~/helpers/date';
const cssClass = 'inventory-category-tab';

const TabCategoryDetail = (props) => {
  const [data, setData] = useState(props.data || {});
  // const [editField, setEditField] = useState('');
  const {customer} = data;
  const {id} = props.match.params;

  useEffect(() => {
    setData({...props.data});
  }, [props.data]);

  const onSave = () => {
    props.onSave && props.onSave(data);
  };

  const onDiscard = () => {
    props.history.push(PATH.SALES_ORDERS);
  };

  return (
    <div className={`${cssClass}`}>
      {!id && (
        <Toolbox className="pr-25" pullRight>
          <ButtonBlue text="Save" htmlType="submit" onClick={onSave} />
          <ButtonGray text="Discard" onClick={onDiscard} />
        </Toolbox>
      )}

      <RowAuto>
        <ColAuto desktop={24} tablet={24}>
          <RowLabelStatus
            label="Name"
            name="name"
            // nameActive={editField}
            desktopLabel={5}>
            <span>
              {((customer || {}).user || {}).firstName +
                ' ' +
                ((customer || {}).user || {}).firstName}
            </span>
          </RowLabelStatus>

          <RowLabelStatus
            label="Email"
            name="email"
            // nameActive={editField}
            desktopLabel={5}>
            <span>{((customer || {}).user || {}).email}</span>
          </RowLabelStatus>

          <RowLabelStatus
            label="Address"
            name="address"
            // nameActive={editField}
            desktopLabel={5}
            desktopForm={19}>
            <span>
              {(customer || {}).addressUnitNo +
                ', ' +
                (customer || {}).addressStresstName +
                ', ' +
                (customer || {}).addressBuildingName +
                ', ' +
                (customer || {}).addressStresstName +
                ', ' +
                (customer || {}).addressCity +
                ', ' +
                (customer || {}).addressCountry +
                ', ' +
                (customer || {}).addressPostCode}
            </span>
          </RowLabelStatus>

          <RowLabelStatus
            label="Postcode"
            name="name"
            // nameActive={editField}
            desktopLabel={5}>
            <span>{(customer || {}).addressPostCode}</span>
          </RowLabelStatus>

          <RowLabelStatus
            label="State"
            name="name"
            // nameActive={editField}
            desktopLabel={5}>
            <span>{(customer || {}).addressState}</span>
          </RowLabelStatus>

          <RowLabelStatus
            label="Country"
            name="name"
            // nameActive={editField}
            desktopLabel={5}>
            <span>{(customer || {}).addressCountry}</span>
          </RowLabelStatus>

          <RowLabelStatus
            label="Contact No."
            name="name"
            // nameActive={editField}
            desktopLabel={5}>
            <span>{(customer || {}).contactNo}</span>
          </RowLabelStatus>

          <RowLabelStatus
            label="Membership"
            name="membership"
            // nameActive={editField}
            desktopLabel={5}>
            <span>{((customer || {}).membership || {}).name}</span>
          </RowLabelStatus>

          <RowLabelStatus
            label="Shipping Location"
            name="shippingLocation"
            // nameActive={editField}
            desktopLabel={5}>
            <span>{(data || {}).shippingLocation}</span>
          </RowLabelStatus>

          <RowLabelStatus
            label="Order Date Time"
            name="createdAt"
            // nameActive={editField}
            desktopLabel={5}>
            <span>{formatDateTimeDefault((data || {}).createdAt)}</span>
          </RowLabelStatus>

          <RowLabelStatus
            label="Status"
            name="status"
            // nameActive={editField}
            desktopLabel={5}>
            <span>
              {!isEmpty(ORDERS_STATUS[(data || {}).status])
                ? ORDERS_STATUS[(data || {}).status]
                : ''}
            </span>
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TabCategoryDetail);
