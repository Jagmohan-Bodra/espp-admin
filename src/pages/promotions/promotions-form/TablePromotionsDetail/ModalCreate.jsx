import React, {useState, useEffect} from 'react';
import {Modal, Row, Col, Divider} from 'antd';
import {RowForm} from '~/components/public/FormHelpers';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
// import { SelectTextBur } from '~/components/public/FormHelpers/FormTextBur';
import {SelectMultipleBlock} from '~/components/public/FormHelpers/SelectBlock';
import {getCategoryList} from '~/reduxs/category/action';
import {getBrandList} from '~/reduxs/brand/action';
import {getTagList} from '~/reduxs/tag/action';
import {useDispatch, useSelector} from 'react-redux';
import {getProductList, getProductListService} from '~/reduxs/product/action';

const cssClass = `optimize-seo-page`;

const ModelCreate = (props) => {
  const dispatch = useDispatch();
  // const { category, brand, tag, product } = props;
  const category = useSelector((state) => state.category.data);
  const brand = useSelector((state) => state.brand.data);
  const tag = useSelector((state) => state.tag.data);
  const product = useSelector((state) => state.product.data);
  const [visible, setVisible] = useState(props.visible || false);
  const [data, setData] = useState({});
  const phone = 24;

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getBrandList());
    dispatch(getTagList());
    dispatch(getProductList());
  }, []);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const getProductListFilter = (newData) => {
    let query = {};
    if ((newData.category || []).length > 0) {
      query.productCategories = {in: newData.category};
    }
    if ((newData.brand || []).length > 0) {
      query.brands = {in: newData.brand};
    }
    if ((newData.tag || []).length > 0) {
      query.tags = {in: newData.tag};
    }
    dispatch(getProductList({...query, meta: {pageSize: 10000, page: 1}}));
  };

  const handleCancel = () => {
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  const onChangeData = (obj) => {
    const newData = {
      ...data,
      ...obj,
    };
    setData(newData);
    getProductListFilter(newData);
  };

  const handleSubmit = async () => {
    let query = {};
    if ((data.category || []).length > 0) {
      query.productCategories = {in: data.category};
    }
    if ((data.brand || []).length > 0) {
      query.brands = {in: data.brand};
    }
    if ((data.tag || []).length > 0) {
      query.tags = {in: data.tag};
    }
    if ((data.product || []).length > 0) {
      query._id = {in: data.product};
    }
    const results = await getProductListService({
      ...query,
      meta: {pageSize: 10000, page: 1},
    });
    props.handleSearchSubmit && props.handleSearchSubmit(results);
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  return (
    <Modal
      title={
        <div className={`optimize-seo__modal_header`}>Add New Product</div>
      }
      visible={visible}
      onCancel={handleCancel}
      wrapClassName={`optimize-seo__modal_warehouse`}
      width={'40%'}
      footer={null}>
      <div className={`${cssClass}`}>
        <Row gutter={[24]}>
          <Col xl={24} lg={24} md={phone} sm={phone} xs={phone}>
            <RowForm
              column={1}
              col1={
                <SelectMultipleBlock
                  span2="24"
                  value={data.category || []}
                  data={category}
                  labelTop="Product Category"
                  onChange={(value) => {
                    onChangeData({category: value});
                  }}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <SelectMultipleBlock
                  span2="24"
                  value={data.brand || []}
                  labelTop="Product Brand"
                  data={brand}
                  onChange={(value) => {
                    onChangeData({brand: value});
                  }}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <SelectMultipleBlock
                  span2="24"
                  value={data.tag || []}
                  labelTop="Product Tag"
                  data={tag}
                  onChange={(value) => {
                    onChangeData({tag: value});
                  }}
                />
              }
            />
            <RowForm
              column={1}
              col1={
                <SelectMultipleBlock
                  span2="24"
                  value={data.product || []}
                  labelTop="Product Name"
                  data={product}
                  onChange={(value) => {
                    onChangeData({product: value});
                  }}
                />
              }
            />
          </Col>
        </Row>
        <Divider className={'line-default'} />
        <div>
          <Toolbox>
            <ButtonBlue text="Add" onClick={handleSubmit} />
            <ButtonGray text="Discard" onClick={handleCancel} />
          </Toolbox>
        </div>
      </div>
    </Modal>
  );
};

export default ModelCreate;
