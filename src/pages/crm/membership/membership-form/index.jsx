import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Form} from 'antd';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {FromCard} from '~/components/public/FormHelpers';
import {
  InputFormItem,
  AreaFormItem,
} from '~/components/public/FormHelpers/FormCommon';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import Breadcrumb from '~/components/public/Breadcrumb';
import PATH from '~/routers/path';
import {
  CRM_MEMBERSHIP_DELETE_PERMISSION_KEY,
  CRM_MEMBERSHIP_EDIT_PERMISSION_KEY,
  CRM_MEMBERSHIP_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const MembershipForm = (props) => {
  const [data, setData] = useState(props.data || {});
  const [isView, setIsView] = useState(true);
  const {id} = props.match.params;
  const ACCESS = {
    VIEW: isAccess(CRM_MEMBERSHIP_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CRM_MEMBERSHIP_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CRM_MEMBERSHIP_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    if (!props.id) {
      setIsView(false);
    }
  }, []);

  useEffect(() => {
    setData({...props.data});
  }, [props.data]);

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const onEdit = () => {
    setIsView(false);
  };

  const onDiscard = () => {
    setIsView(true);
    props.onDiscard && props.onDiscard();
  };

  const onSubmit = () => props.onSubmit(data);
  const onFinish = () => props.onFinish(data);
  const onDelete = () => props.onDelete(data);

  const fields = [
    {name: ['Name'], value: data.name},
    {name: ['Discount Percent'], value: data.discountPercent},
    {name: ['Description'], value: data.description},
  ];

  const getBreadcrumb = () => {
    let breads = id ? data.name : 'Create';
    return [
      {name: 'Memberships', link: PATH.CRM_MEMBERSHIP},
      {name: breads, link: '#'},
    ];
  };

  return (
    <div className="membership-form">
      <Breadcrumb data={getBreadcrumb()} />
      <Form scrollToFirstError onFinish={onFinish} fields={fields}>
        <Toolbox>
          {isView && (
            <>
              {ACCESS.EDIT && <ButtonBlue text="Edit" onClick={onEdit} />}
              {ACCESS.DELETE && <ButtonGray text="Delete" onClick={onDelete} />}
            </>
          )}
          {!isView && (
            <>
              <ButtonBlue text="Save" htmlType="submit" onClick={onSubmit} />
              <ButtonGray text="Discard" onClick={onDiscard} />
            </>
          )}
        </Toolbox>

        <FromCard>
          <RowAuto>
            <ColAuto desktop={15}>
              <InputFormItem
                label="Name"
                isText={isView}
                rules={[{required: true}]}
                value={data.name}
                onChange={(e) => {
                  onChangeData({name: e.target.value});
                }}
              />
              <InputFormItem
                label="Discount Percent"
                isText={isView}
                rules={[{required: true}]}
                value={data.discountPercent}
                onChange={(e) => {
                  onChangeData({discountPercent: e.target.value});
                }}
              />
              <AreaFormItem
                label="Description"
                isText={isView}
                rules={[]}
                value={data.description}
                onChange={(e) => {
                  onChangeData({description: e.target.value});
                }}
              />
            </ColAuto>
          </RowAuto>
        </FromCard>
      </Form>
    </div>
  );
};

export default withRouter(MembershipForm);
