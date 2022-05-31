import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Form} from 'antd';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {
  InputFormItem,
  SelectDefaultItem,
} from '~/components/public/FormHelpers/FormCommon';
import {FromCard, SwitchBlock} from '~/components/public/FormHelpers';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';
import Breadcrumb from '~/components/public/Breadcrumb';
import PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {
  CMS_PAGE_DELETE_PERMISSION_KEY,
  CMS_PAGE_EDIT_PERMISSION_KEY,
  CMS_PAGE_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const PagePropertiesForm = (props) => {
  const [data, setData] = useState({});
  const [isView, setIsView] = useState(true);
  const ACCESS = {
    VIEW: isAccess(CMS_PAGE_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_PAGE_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CMS_PAGE_DELETE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (!props.id) {
      setIsView(false);
    }
  }, []);

  useEffect(() => {
    setData({
      ...props.data,
      theme: (props.data || {}).theme && (props.data || {}).theme._id,
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

  const onSubmit = () => props.onSubmit(data);
  const onFinish = () => props.onFinish(data);

  const fields = [
    {name: ['Page Name'], value: data.name},
    {name: ['Page URL'], value: data.url},
    {name: ['Pushlish'], value: data.pushlish},
    {name: ['Theme'], value: data.theme},
  ];

  const dataBreadcrumb = [
    {name: 'Pages', link: PATH.CMS_PAGES},
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
                label="Page Name"
                isText={isView}
                rules={[{required: true}]}
                value={data.name}
                onChange={(e) => {
                  onChangeData({name: e.target.value});
                }}
              />
              <InputFormItem
                label="Page URL"
                isText={isView}
                rules={[]}
                value={data.url}
                onChange={(e) => {
                  onChangeData({url: e.target.value});
                }}
              />
              <SelectDefaultItem
                label="Theme"
                data={props.themeData || []}
                onChange={(value) => {
                  onChangeData({theme: value});
                }}
                value={data.theme}
                isText={isView}
                valueText={
                  (
                    (props.themeData || []).find(
                      (item) => item._id === data.theme,
                    ) || {}
                  ).name || ''
                }
              />
              <SwitchBlock
                labelLeft="Publish"
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

export default withRouter(PagePropertiesForm);
