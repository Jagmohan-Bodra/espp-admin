import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Form} from 'antd';
import moment from 'moment';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {FromCard, SwitchBlock} from '~/components/public/FormHelpers';
import {
  InputFormItem,
  SelectDefaultItem,
} from '~/components/public/FormHelpers/FormCommon';
import Breadcrumb from '~/components/public/Breadcrumb';
import {getRoleList} from '~/reduxs/role/action';
import PATH from '~/routers/path';
import {USER_STATUS} from '~/constants/master-data';
import '../style.scss';
import {
  USER_DELETE_PERMISSION_KEY,
  USER_EDIT_PERMISSION_KEY,
} from '~/constants/permissions';
import {getFullPath, isAccess} from '~/helpers/utils';
import {UploadImageOne} from '~/components/public/UploadImage/UploadImageOne';

const UserForm = (props) => {
  const {id} = props.match.params;
  const [data, setData] = useState({});
  const [isView, setIsView] = useState(true);
  const roles = useSelector((state) => state.role.data);
  const dispatch = useDispatch();
  const ACCESS = {
    DELETE: isAccess(USER_DELETE_PERMISSION_KEY),
    EDIT: isAccess(USER_EDIT_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getRoleList());
  }, []);

  useEffect(() => {
    if (!props.id) {
      setIsView(false);
    }
    if (props.me) {
      setIsView(true);
    }
  }, []);

  useEffect(() => {
    setData({
      ...props.data,
      birthday: (props.data || {}).birthday
        ? moment((props.data || {}).birthday)
        : undefined,
    });
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
    }
    if (props.me) {
      setData({
        ...props.data,
        birthday: (props.data || {}).birthday
          ? moment((props.data || {}).birthday)
          : undefined,
      });
    }
    setIsView(true);
    props.onDiscard && props.onDiscard();
  };

  const onShowChangePass = () => {
    props.setVisible && props.setVisible(true);
  };

  const onSubmit = () => {
    props.onSubmit({
      ...data,
      birthday: data.birthday ? moment(data.birthday).toISOString() : undefined,
    });
  };
  const onFinish = () => {
    props.onFinish({
      ...data,
      birthday: data.birthday ? moment(data.birthday).toISOString() : undefined,
    });
  };
  const onDelete = () =>
    props.onDelete({
      ...data,
      birthday: data.birthday ? moment(data.birthday).toISOString() : undefined,
    });

  const fields = [
    {name: ['First Name'], value: data.firstName},
    {name: ['Last Name'], value: data.lastName},
    {name: ['Phone'], value: data.phone},
    {name: ['Email'], value: data.email},
    {name: ['Role'], value: data.userGroup},
    {name: ['Address'], value: data.address},
  ];

  const getBreadcrumb = () => {
    const label = id ? data.firstName + ' ' + data.lastName : 'Create';
    if (props.me) {
      return [{name: 'Profile', link: '#'}];
    }
    return [
      {name: 'Users', link: PATH.ADMIN_USER},
      {name: label, link: '#'},
    ];
  };

  const handleChangeEmailClick = () => {
    props.handleChangeEmailClick && props.handleChangeEmailClick();
  };

  return (
    <div className="user-form">
      <Breadcrumb data={getBreadcrumb()} />
      <Form scrollToFirstError onFinish={onFinish} fields={fields}>
        <Toolbox>
          {isView && (
            <>
              {ACCESS.EDIT && <ButtonBlue text="Edit" onClick={onEdit} />}
              {!props.me && ACCESS.DELETE && (
                <ButtonGray text="Delete" onClick={onDelete} />
              )}
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
            <ColAuto desktop={20}>
              <FormGroup
                left={
                  <InputFormItem
                    label="First Name"
                    isText={isView}
                    rules={[{required: true}]}
                    value={data.firstName}
                    onChange={(e) => {
                      onChangeData({firstName: e.target.value});
                    }}
                  />
                }
                right={
                  <InputFormItem
                    label="Last Name"
                    isText={isView}
                    rules={[{required: true}]}
                    value={data.lastName}
                    onChange={(e) => {
                      onChangeData({lastName: e.target.value});
                    }}
                  />
                }
              />
              <FormGroup
                left={
                  <InputFormItem
                    label="Phone"
                    isText={isView}
                    rules={[{required: true, min: 7, max: 12}]}
                    value={data.phone}
                    onChange={(e) => {
                      onChangeData({phone: e.target.value});
                    }}
                  />
                }
                right={
                  <InputFormItem
                    label="Email"
                    isText={isView}
                    rules={id ? [] : [{type: 'email'}, {required: true}]}
                    value={data.email}
                    onChange={(e) => {
                      onChangeData({email: e.target.value});
                    }}
                    disabled={id || props.me ? true : false}
                  />
                }
              />
              <FormGroup
                left={
                  <InputFormItem
                    label="Address"
                    isText={isView}
                    value={data.address}
                    onChange={(e) => {
                      onChangeData({address: e.target.value});
                    }}
                  />
                }
                right={
                  <SelectDefaultItem
                    label="Role"
                    isText={isView}
                    data={roles || []}
                    value={data.userGroup}
                    valueText={data.userGroupName}
                    onChange={(value) => {
                      onChangeData({userGroup: value});
                    }}
                    disabled={props.me}
                  />
                }
              />
              {!props.me && (
                <FormGroup
                  left={
                    <SwitchBlock
                      labelRight={
                        data.active ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE
                      }
                      isDisabled={isView}
                      checked={data.active}
                      onChange={(value) => {
                        onChangeData({active: value});
                      }}
                    />
                  }
                />
              )}
              {props.me && (
                <p>
                  <a type="button" onClick={onShowChangePass}>
                    Click to change password
                  </a>
                </p>
              )}
              {props.me && (
                <p>
                  <a type="button" onClick={handleChangeEmailClick}>
                    Click to change Email
                  </a>
                </p>
              )}
            </ColAuto>
            <ColAuto desktop={4}>
              <div className="box-avatar">
                <UploadImageOne
                  disabled={isView}
                  labelButton="Upload Avatar"
                  style={{textAlign: 'left'}}
                  imageUrl={getFullPath(data.avatarPath)}
                  onChange={(link) => onChangeData({avatarPath: link})}
                />
                <br />
                <h3 className="title-name">
                  {(data.firstName || '') + ' ' + (data.lastName || '')}
                </h3>
              </div>
            </ColAuto>
          </RowAuto>
        </FromCard>
      </Form>
    </div>
  );
};

export default withRouter(UserForm);

const FormGroup = (props) => {
  const {left, right} = props;
  return (
    <RowAuto>
      <ColAuto desktop={12} tablet={24}>
        {left}
      </ColAuto>
      <ColAuto desktop={{span: 10, offset: 2}} tablet={24}>
        {right}
      </ColAuto>
    </RowAuto>
  );
};
