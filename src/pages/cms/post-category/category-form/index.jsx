import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Form} from 'antd';
import {withRouter} from 'react-router-dom';
import Breadcrumb from '~/components/public/Breadcrumb';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray, ButtonLink} from '~/components/public/Button';
import {
  FromCard,
  InputBlock,
  RowForm,
  FormControl,
  SwitchBlock,
  SelectDefaultBlock,
  InputAreaBlock,
} from '~/components/public/FormHelpers';
import {UploadImageLink} from '~/components/public/UploadImage';
import {getPostCategoryList} from '~/reduxs/post-category/action';
import PATH from '~/routers/path';
import {findChildrenTree} from '~/helpers/common';
import {isAccess} from '~/helpers/utils';
import {
  CMS_POST_CATEGORY_DELETE_PERMISSION_KEY,
  CMS_POST_CATEGORY_EDIT_PERMISSION_KEY,
  CMS_POST_CATEGORY_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
const cssClass = 'craft-page-properties-form';

const CategoryForm = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(props.data || {});
  const [obj, setObj] = useState({});
  const [isView, setIsView] = useState(true);
  const listCategory = useSelector((state) => state.postCategory.data);
  const metadata = {meta: {page: 1, pageSize: 90}};
  const phone = 24;
  let newListCategory = findChildrenTree(listCategory || [], props.id);
  const ACCESS = {
    VIEW: isAccess(CMS_POST_CATEGORY_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_POST_CATEGORY_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CMS_POST_CATEGORY_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getPostCategoryList(metadata));
    setIsView(props.isView);
  }, []);

  useEffect(() => {
    setData({...props.data});
    setObj((props.data || {}).seoProps || {});
  }, [props.data]);

  const onChangeObj = (value) => {
    setObj({
      ...obj,
      ...value,
    });
  };
  const onChangeData = (value) => {
    setData({
      ...data,
      ...value,
    });
  };

  const onEdit = () => {
    setIsView(false);
  };
  const onSubmit = () =>
    props.onSubmit({
      ...data,
      seoProps: obj,
      parent: (data.parent || {})._id || data.parent,
    });
  const onFinish = () => props.onFinish();
  const onDelete = () => props.onDelete(data);

  const fields = [
    {name: ['Name'], value: data.name},
    {name: ['URL'], value: data.url},
    {name: ['Content'], value: data.content},
    {name: ['Category'], value: data.postCategory},
    {name: ['Description'], value: data.description},
    {name: ['Browser Title'], value: obj.title || (data.seoProps || {}).title},
    {
      name: ['Meta Keyword'],
      value: obj.keywords || (data.seoProps || {}).keywords,
    },
  ];

  const getBreadcrumb = (id) => {
    let breads = {};
    breads = {name: 'Create', link: '#'};
    if (id) {
      breads = {name: data.name, link: '#'};
    }
    return [
      {name: 'Posts Category', link: PATH.CMS_CATEGORY_POSTS},
      {...breads},
    ];
  };
  return (
    <Form scrollToFirstError onFinish={onFinish} fields={fields}>
      <div className={`${cssClass}`}>
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
                    : props.history.push(PATH.CMS_CATEGORY_POSTS)
                }
              />
            </>
          )}
        </Toolbox>

        <FromCard>
          <Row gutter={[24, 24]}>
            <Col xl={12} lg={12} md={phone} sm={phone} xs={phone}>
              <RowForm
                column={1}
                col1={
                  <SelectDefaultBlock
                    label="Category"
                    data={props.id ? newListCategory : listCategory}
                    isInput={isView}
                    value={
                      (
                        (listCategory || []).find(
                          (item) => item._id == data.parent,
                        ) || {}
                      ).name
                    }
                    onChange={(value) => {
                      onChangeData({parent: value});
                    }}
                  />
                }
              />
              <RowForm
                column={1}
                col1={
                  <InputBlock
                    isInput={isView}
                    onBlur={false}
                    label="Name"
                    value={data.name}
                    nameItem="Name"
                    rules={true}
                    onChange={(e) => {
                      onChangeData({name: e.target.value});
                    }}
                  />
                }
              />
              <RowForm
                column={1}
                col1={
                  <InputBlock
                    isInput={isView}
                    onBlur={false}
                    label="URL"
                    value={data.url}
                    nameItem="URL"
                    rules={true}
                    onChange={(e) => {
                      onChangeData({url: e.target.value});
                    }}
                  />
                }
              />
              <RowForm
                column={1}
                col1={
                  <InputAreaBlock
                    isInput={isView}
                    onBlur={false}
                    label="Description"
                    value={data.description}
                    nameItem="Description"
                    onChange={(e) => {
                      onChangeData({description: e.target.value});
                    }}
                  />
                }
              />
              <RowForm
                column={1}
                col1={
                  <SwitchBlock
                    labelRight={
                      data.status === 'ENABLED' ? 'Active' : 'Inactive'
                    }
                    checked={data.status === 'ENABLED' ? true : false}
                    isDisabled={isView}
                    onChange={(value) => {
                      onChangeData({
                        status: value == true ? 'ENABLED' : 'DISABLED',
                      });
                    }}
                  />
                }
              />
            </Col>
            <Col xl={12} lg={12} md={phone} sm={phone} xs={phone}>
              <RowForm
                column={1}
                col1={
                  <InputBlock
                    isInput={isView}
                    onBlur={false}
                    label="Browser Title"
                    nameItem="Browser Title"
                    value={obj.title || (data.seoProps || {}).title}
                    onChange={(e) => {
                      onChangeObj({title: e.target.value});
                    }}
                  />
                }
              />
              <RowForm
                column={1}
                col1={
                  <InputBlock
                    isInput={isView}
                    onBlur={false}
                    label="Meta Keyword"
                    dicrection="*Note: Each keyword seperated by comma ( , )"
                    nameItem="Meta Keyword"
                    value={obj.keywords || (data.seoProps || {}).keywords}
                    onChange={(e) => {
                      onChangeObj({keywords: e.target.value});
                    }}
                  />
                }
              />
              <RowForm
                column={1}
                col1={
                  <InputBlock
                    isInput={isView}
                    onBlur={false}
                    label="Meta Description"
                    dicrection="*Note: Meta keyword & meta description is important for search engine optimization(SEO).<br />
                                            Therefore, it is advisable not to input any special character such as single quote( ‘ ), double quote( “ ) etc."
                    value={obj.description || (data.seoProps || {}).description}
                    onChange={(e) => {
                      onChangeObj({description: e.target.value});
                    }}
                  />
                }
              />
              <FormControl labelTop="Image">
                <UploadImageLink
                  disabled={isView}
                  labelButton="Upload Avatar"
                  imageUrl={obj.images || (data.seoProps || {}).images}
                  onChange={(link) => {
                    onChangeObj({images: link});
                  }}
                />
              </FormControl>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <ButtonLink
                  text="Remove"
                  onClick={() => onChangeObj({images: ''})}
                />
              </div>
            </Col>
          </Row>
        </FromCard>
      </div>
    </Form>
  );
};

export default withRouter(CategoryForm);
