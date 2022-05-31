import React, {useState, useEffect} from 'react';
import {Row, Col, Form} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Breadcrumb from '~/components/public/Breadcrumb';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray, ButtonLink} from '~/components/public/Button';
import {getPostCategoryList} from '~/reduxs/post-category/action';
import {UploadImageLink} from '~/components/public/UploadImage';

import {
  FromCard,
  RowForm,
  FormControl,
  SwitchBlock,
  CheckBoxListBlock,
  InputBlock,
  JoditEditorBlock,
} from '~/components/public/FormHelpers';
import PATH from '~/routers/path';
import {getFullPath, isAccess} from '~/helpers/utils';
import {
  CMS_POST_DELETE_PERMISSION_KEY,
  CMS_POST_EDIT_PERMISSION_KEY,
  CMS_POST_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
const cssClass = 'craft-page-properties-form';

const PostForm = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(props.data || {});
  const listCategory = useSelector((state) => state.postCategory.data);
  const metadata = {meta: {page: 1, pageSize: 90}};
  const phone = 24;
  const [isView, setIsView] = useState(true);
  const [content, setContent] = useState('');
  const ACCESS = {
    VIEW: isAccess(CMS_POST_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_POST_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CMS_POST_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getPostCategoryList(metadata));
  }, []);

  useEffect(() => {
    setData({...props.data});
  }, [props.data]);

  useEffect(() => {
    setIsView(props.isView);
  }, [props.isView]);

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const onEdit = () => {
    setIsView(false);
  };

  const onSubmit = () => props.onSubmit({...data, content: content});
  const onFinish = () => props.onFinish(data);
  const onDelete = () => props.onDelete(data);

  const fields = [
    {name: ['Name'], value: data.name},
    {name: ['Description'], value: data.description},
  ];

  const getBreadcrumb = (id) => {
    let breads = {};
    breads = {name: 'Create New Post', link: '#'};
    if (id) {
      breads = {name: data.name, link: '#'};
    }
    return [{name: 'Posts', link: PATH.CMS_POSTS}, {...breads}];
  };

  return (
    <div className={`${cssClass}`}>
      <Form scrollToFirstError onFinish={onFinish} fields={fields}>
        <Breadcrumb data={getBreadcrumb(props.id)} />
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
              <ButtonGray
                text="Discard"
                onClick={() =>
                  props.id
                    ? setIsView(true)
                    : props.history.push(PATH.CMS_POSTS)
                }
              />
            </>
          )}
        </Toolbox>

        <FromCard>
          <Row gutter={[24, 24]}>
            <Col xl={18} lg={18} md={phone} sm={phone} xs={phone}>
              <InputBlock
                label="Title"
                nameItem="Name"
                isInput={isView}
                rules={[{required: true}]}
                value={data.name}
                onChange={(e) => {
                  onChangeData({name: e.target.value});
                }}
              />
              <br />
              <InputBlock
                label="Description"
                nameItem="Description"
                isInput={isView}
                rules={[{required: true}]}
                value={data.name}
                onChange={(e) => {
                  onChangeData({description: e.target.value});
                }}
              />
              <br />
              <JoditEditorBlock
                label="Content"
                isInput={isView}
                value={data.content || content}
                onChange={(value) => {
                  setContent(value);
                }}
              />
              <br />
              <RowForm
                column={1}
                col1={
                  <SwitchBlock
                    labelRight="Active"
                    isDisabled={isView}
                    checked={data.pushlish || ''}
                    onChange={(value) => {
                      onChangeData({pushlish: value});
                    }}
                  />
                }
              />
            </Col>
            <Col xl={6} lg={6} md={phone} sm={phone} xs={phone}>
              <CheckBoxListBlock
                span2={24}
                data={listCategory}
                isDisabled={isView}
                value={data.postCategory}
                onChange={(value) => {
                  onChangeData({postCategoryId: value});
                }}
                labelTop="Category"
              />
              <FormControl labelTop="Image">
                <UploadImageLink
                  disabled={isView}
                  labelButton="Upload Avatar"
                  imageUrl={getFullPath(data.avatarPath)}
                  onChange={(link) => onChangeData({avatarPath: link})}
                />
              </FormControl>
              {!isView && (
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <ButtonLink
                    text="Remove "
                    onClick={() => onChangeData({avatar: ''})}
                  />
                </div>
              )}
            </Col>
          </Row>
        </FromCard>
      </Form>
    </div>
  );
};

export default withRouter(PostForm);
