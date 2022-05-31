import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Form} from 'antd';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {FromCard} from '~/components/public/FormHelpers';
import {InputFormItem} from '~/components/public/FormHelpers/FormCommon';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import Breadcrumb from '~/components/public/Breadcrumb';
import {Tree} from 'antd';
import {
  permissionsData,
  USER_ROLE_DELETE_PERMISSION_KEY,
  USER_ROLE_EDIT_PERMISSION_KEY,
  USER_ROLE_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';

const RoleForm = (props) => {
  const [data, setData] = useState(props.data || {});
  const [isView, setIsView] = useState(true);
  const ACCESS = {
    DELETE: isAccess(USER_ROLE_DELETE_PERMISSION_KEY),
    VIEW: isAccess(USER_ROLE_VIEW_PERMISSION_KEY),
    EDIT: isAccess(USER_ROLE_EDIT_PERMISSION_KEY),
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
    if (props.isCreate) {
      props.onDiscard && props.onDiscard();
      return;
    }
    setIsView(true);
    props.onDiscard && props.onDiscard();
  };

  const onSubmit = () => props.onSubmit(data);
  const onFinish = () => props.onFinish(data);
  const onDelete = () => props.onDelete(data);

  const fields = [
    {name: ['Role Name'], value: data.name},
    {name: ['Description'], value: data.description},
    {name: ['Roles'], value: data.roles},
  ];

  const getBreadcrumb = (id) => {
    let breads = {};
    breads = {name: 'Create', link: '#'};
    if (id) {
      breads = {name: data.name, link: '#'};
    }
    return [{name: 'Roles', link: PATH.ADMIN_ROLE}, {...breads}];
  };

  return (
    <div className="role-form">
      <Breadcrumb data={getBreadcrumb(props.id)} />
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
            <ColAuto desktop={10}>
              <InputFormItem
                label="Role Name"
                isText={isView}
                rules={[{required: true}]}
                value={data.name}
                onChange={(e) => {
                  onChangeData({name: e.target.value});
                }}
              />
              <InputFormItem
                label="Description"
                isText={isView}
                rules={[{max: 240}]}
                value={data.description}
                onChange={(e) => {
                  onChangeData({description: e.target.value});
                }}
              />
            </ColAuto>
            <ColAuto desktop={14}>
              <h2 style={{color: '#727272'}}>Permissions</h2>
              <Tree
                checkable
                disabled={isView}
                treeData={permissionsData}
                checkedKeys={data.roles}
                onCheck={(value) => {
                  onChangeData({roles: value});
                }}
              />
            </ColAuto>
          </RowAuto>
        </FromCard>
      </Form>
    </div>
  );
};

export default withRouter(RoleForm);
