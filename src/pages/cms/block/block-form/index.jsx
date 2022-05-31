import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Form} from 'antd';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {InputFormItem} from '~/components/public/FormHelpers/FormCommon';
import {FromCard, SwitchBlock} from '~/components/public/FormHelpers';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';
import Breadcrumb from '~/components/public/Breadcrumb';
import PATH from '~/routers/path';
// import UploadImageOne from '~/components/public/upload-image/UploadImageOne';
import {UploadImageLink} from '~/components/public/UploadImage';
import {isAccess} from '~/helpers/utils';
import {
  CMS_BLOCK_DELETE_PERMISSION_KEY,
  CMS_BLOCK_EDIT_PERMISSION_KEY,
  CMS_BLOCK_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const BlockForm = (props) => {
  const [data, setData] = useState(props.data || {});
  const [isView, setIsView] = useState(true);
  const ACCESS = {
    VIEW: isAccess(CMS_BLOCK_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_BLOCK_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CMS_BLOCK_DELETE_PERMISSION_KEY),
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
  const onDelete = () =>
    props.onDelete({...data, status: data.status ? 'ENABLED' : 'DISABLED'});

  const fields = [
    {name: ['Block Name'], value: data.name},
    {name: ['Description'], value: data.description},
    {name: ['Group'], value: data.groupCode},
  ];

  const dataBreadcrumb = [
    {name: 'Block', link: PATH.CMS_BLOCKS},
    {name: props.id ? data.name : 'Create', link: '#'},
  ];

  return (
    <div className="craft-page-properties-form">
      <Breadcrumb data={dataBreadcrumb} />
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
            <ColAuto desktop={12}>
              <InputFormItem
                label="Block Name"
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
                rules={[{required: true}]}
                value={data.description}
                onChange={(e) => {
                  onChangeData({description: e.target.value});
                }}
              />
              <InputFormItem
                label="Group"
                isText={isView}
                rules={[{required: true}]}
                value={data.groupCode}
                onChange={(e) => {
                  onChangeData({groupCode: e.target.value});
                }}
              />

              <RowAuto>
                <ColAuto desktop={7} tablet={24}>
                  <label className={`form-control-row_label`}>Avatar</label>
                </ColAuto>
                <ColAuto desktop={14} tablet={24}>
                  <div>
                    {/* <UploadImageOne
                      isDisabled={isView}
                      imageUrl={data.avatar}
                      setImageUrl={(avatar) => { onChangeData({ avatar }) }}
                    /> */}
                    <UploadImageLink
                      disabled={isView}
                      labelButton="Upload Avatar"
                      imageUrl={data.avatar}
                      onChange={(avatar) => {
                        onChangeData({avatar});
                      }}
                    />
                  </div>
                </ColAuto>
              </RowAuto>

              <SwitchBlock
                labelLeft={data.status ? 'Enabled' : 'Disabled'}
                checked={data.status}
                isDisabled={isView}
                onChange={(value) => onChangeData({status: value})}
              />
            </ColAuto>
          </RowAuto>
        </FromCard>
      </Form>
    </div>
  );
};

export default withRouter(BlockForm);
