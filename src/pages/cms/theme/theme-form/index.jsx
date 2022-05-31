import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Form} from 'antd';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {
  InputFormItem,
  AreaFormItem,
} from '~/components/public/FormHelpers/FormCommon';
import {FromCard, SwitchBlock} from '~/components/public/FormHelpers';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';
import Breadcrumb from '~/components/public/Breadcrumb';
import PATH from '~/routers/path';
import {
  CMS_THEME_DELETE_PERMISSION_KEY,
  CMS_THEME_EDIT_PERMISSION_KEY,
  CMS_THEME_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const ThemeForm = (props) => {
  const [data, setData] = useState(props.data || {});
  const [isView, setIsView] = useState(true);
  const ACCESS = {
    VIEW: isAccess(CMS_THEME_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_THEME_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CMS_THEME_DELETE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (!props.id) {
      setIsView(false);
    }
  }, []);

  useEffect(() => {
    setData({
      ...props.data,
      status: (props.data || {}).status == 'ENABLED',
    });
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

  const onSubmit = () =>
    props.onSubmit({...data, status: data.status ? 'ENABLED' : 'DISABLED'});

  const onFinish = () =>
    props.onFinish({...data, status: data.status ? 'ENABLED' : 'DISABLED'});

  const fields = [
    {name: ['Theme Name'], value: data.name},
    {name: ['Description'], value: data.description},
  ];

  const dataBreadcrumb = [
    {name: 'Theme', link: PATH.CMS_THEMES},
    {name: props.id ? data.name : 'Create', link: '#'},
  ];

  return (
    <div className="craft-page-properties-form">
      <Breadcrumb data={dataBreadcrumb} />
      <Form scrollToFirstError onFinish={onFinish} fields={fields}>
        <Toolbox>
          {isView && (
            <>{ACCESS.EDIT && <ButtonBlue text="Edit" onClick={onEdit} />}</>
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
            <ColAuto desktop={12}>
              <InputFormItem
                label="Theme Name"
                isText={isView}
                rules={[{required: true}]}
                value={data.name}
                onChange={(e) => {
                  onChangeData({name: e.target.value});
                }}
              />
              <AreaFormItem
                label="Description"
                isText={isView}
                rules={[{required: true}]}
                value={data.description}
                onChange={(e) => {
                  onChangeData({description: e.target.value});
                }}
              />

              <SwitchBlock
                labelLeft={data.pushlish ? 'Published' : 'Unpublished'}
                checked={data.pushlish}
                isDisabled={isView}
                onChange={(value) => onChangeData({pushlish: value})}
              />
            </ColAuto>
          </RowAuto>
        </FromCard>
      </Form>
    </div>
  );
};

export default withRouter(ThemeForm);
