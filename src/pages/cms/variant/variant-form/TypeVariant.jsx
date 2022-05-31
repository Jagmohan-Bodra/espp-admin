import React from 'react';
import CkEditor from '~/components/public/ckeditor';
import {UploadImageOne} from '~/components/public/UploadImage/UploadImageOne';
import {VARIANT_TYPE} from '~/constants/master-data';
import {getFullPath} from '~/helpers/utils';
import VariantGalery from './VariantGalery';
import VariantPost from './VariantPost';
import VariantProduct from './VariantProduct';
import VarianTree from './VarianTree';

const VariantImage = (props) => {
  const {value, onChangeData} = props;
  return (
    <div>
      <UploadImageOne
        labelButton=""
        imageUrl={getFullPath(value)}
        style={{textAlign: 'left'}}
        onChange={(link) => onChangeData && onChangeData(link)}
      />
    </div>
  );
};

const VarianRichtext = (props) => {
  const {value, onChangeData} = props;
  return (
    <div>
      <CkEditor
        value={value || ''}
        onChange={(text) => onChangeData && onChangeData(text)}
      />
      {/* <JoditEditor
        value={value || ''}
        onChange={(text) => onChangeData && onChangeData(text)}
      /> */}
    </div>
  );
};

const getVariantComponent = (type, value, onChangeData) => {
  switch (type) {
    case VARIANT_TYPE.PHOTO:
      return <VariantImage value={value} onChangeData={onChangeData} />;
    case VARIANT_TYPE.GALLERY:
      return <VariantGalery value={value} onChangeData={onChangeData} />;
    case VARIANT_TYPE.POST_LIST:
      return <VariantPost value={value} onChangeData={onChangeData} />;
    case VARIANT_TYPE.PRODUCT_LIST:
      return <VariantProduct value={value} onChangeData={onChangeData} />;
    case VARIANT_TYPE.RICHTEXT:
      return <VarianRichtext value={value} onChangeData={onChangeData} />;
    case VARIANT_TYPE.TREE:
      return <VarianTree value={value} onChangeData={onChangeData} />;
  }
  return null;
};

const TypeVariant = (props) => {
  const {label, value, type, order} = props.item || {};
  return (
    <div className={`type-variant`}>
      <div className={`type-variant-group`}>
        <div className={`type-variant-group_label`}>{label}</div>
        <div className={`type-variant-group_order`}>Order: {order}</div>
      </div>

      <div>{getVariantComponent(type, value, props.onChangeData)}</div>
    </div>
  );
};

export default TypeVariant;
