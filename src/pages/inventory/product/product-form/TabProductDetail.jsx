import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {
  InputAreaBur,
  SelectTextBur,
  SelectBur,
  TreeSelectBur,
} from '~/components/public/FormHelpers/FormTextBur';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {UploadImageLinkMulti} from '~/components/public/UploadImage';
import {debounce, treeArray} from '~/helpers/common';
import {formatDateTimeDefault} from '~/helpers/date';
import {STATUS_OPTION} from '~/constants/master-data';
import PATH from '~/routers/path';
import '../style.scss';
import {getFullPath} from '~/helpers/utils';
const cssClass = 'inventory-brand-tab';

const TabBrandDetail = (props) => {
  const [data, setData] = useState(props.data || {});
  const [onlyForm, setOnlyForm] = useState(true);
  const [editField, setEditField] = useState('');
  const {id} = props.match.params;
  const categories = treeArray(props.categories || []);
  const brands = treeArray(props.brands || []);
  const colors = treeArray(props.colors || []);
  const tags = treeArray(props.tags || []);
  useEffect(() => {
    if (id) {
      setOnlyForm(false);
    }
  }, [props.match.params]);

  useEffect(() => {
    setData({...props.data});
  }, [props.data]);

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const funcUpdate = debounce((value) => {
    handleAlertStatus(value);
    props.onSave && props.onSave(value);
  }, 1000);

  const hanldeChange = (value) => {
    if (id) {
      funcUpdate(value);
    }
    if (!id) {
      onChangeData(value);
    }
  };

  const onRemove = (url) => {
    const newImages = data.images.filter((item) => item !== url);
    hanldeChange({images: newImages});
  };

  const handleAlertStatus = (obj) => {
    const fields = Object.keys(obj);
    setEditField(fields[0]);
    setTimeout(() => {
      setEditField('');
    }, 1500);
  };

  const onSave = () => {
    props.onSave && props.onSave(data);
  };

  const onDiscard = () => {
    props.history.push(PATH.INVENTORY_PRODUCT);
  };

  return (
    <div className={`${cssClass}`}>
      {!id && (
        <Toolbox className="pr-25" pullRight>
          <ButtonBlue text="Save" htmlType="submit" onClick={onSave} />
          <ButtonGray text="Discard" onClick={onDiscard} />
        </Toolbox>
      )}

      <RowAuto>
        <ColAuto desktop={12} tablet={24}>
          <RowLabelStatus
            label="Product Name"
            name="name"
            nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.name}
              setValue={(value) => hanldeChange({name: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus label="SKU" name="sku" nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.sku}
              setValue={(value) => hanldeChange({sku: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Description"
            name="description"
            nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.description}
              setValue={(value) => hanldeChange({description: value})}
              isTextArea
            />
          </RowLabelStatus>

          <RowLabelStatus label="Size" name="size" nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.size}
              setValue={(value) => hanldeChange({size: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Type and Material"
            name="typeAndMaterial"
            nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.typeAndMaterial}
              setValue={(value) => hanldeChange({typeAndMaterial: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus label="UOM" name="uom" nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.uom}
              setValue={(value) => hanldeChange({uom: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Item Packing Size"
            name="itemPackingSize"
            nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.itemPackingSize}
              setValue={(value) => hanldeChange({itemPackingSize: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Qty Per Ctn"
            name="qtyPerCtn"
            nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.qtyPerCtn}
              setValue={(value) => hanldeChange({qtyPerCtn: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Images"
            name="imagePaths"
            nameActive={editField}>
            <UploadImageLinkMulti
              size={25}
              imageUrl={(data.imagePaths || []).map(getFullPath)}
              onChange={(link) =>
                hanldeChange({imagePaths: [...(data.imagePaths || []), link]})
              }
              className={`${cssClass}__image-upload`}
              remove={onRemove}
            />
          </RowLabelStatus>

          <RowLabelStatus label="Date Created">
            <span style={{color: '#4B5B79', paddingLeft: '10px'}}>
              {data.createdAt && formatDateTimeDefault(data.createdAt)}
            </span>
          </RowLabelStatus>

          <RowLabelStatus label="Date Modified">
            <span style={{color: '#4B5B79', paddingLeft: '10px'}}>
              {data.updatedAt && formatDateTimeDefault(data.updatedAt)}
            </span>
          </RowLabelStatus>
        </ColAuto>

        <ColAuto desktop={12} tablet={24}>
          <RowLabelStatus
            label="Quantity"
            name="quantity"
            nameActive={editField}>
            <div style={{display: 'block'}}>
              <InputAreaBur
                onlyForm={onlyForm}
                value={data.quantity}
                setValue={(value) => hanldeChange({quantity: value})}
              />
              {data.quantity <= data.inventoryThreshold && (
                <div style={{color: 'red', fontSize: '10px'}}>Out of stock</div>
              )}
            </div>
          </RowLabelStatus>
          <RowLabelStatus label="MOQ" name="moq" nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.moq}
              setValue={(value) => hanldeChange({moq: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Inventory threshold "
            name="inventoryThreshold"
            nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.inventoryThreshold}
              setValue={(value) => hanldeChange({inventoryThreshold: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Tax Apply"
            name="taxApply"
            nameActive={editField}>
            <SelectBur
              onlyForm={onlyForm}
              data={[
                {key: '1', name: 'True'},
                {key: '0', name: 'False'},
              ]}
              value={data.taxApply}
              setValue={(value) => hanldeChange({taxApply: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus label="Status" name="status" nameActive={editField}>
            <SelectTextBur
              onlyForm={onlyForm}
              data={STATUS_OPTION}
              value={data.status}
              setValue={(value) => hanldeChange({status: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Categories"
            name="productCategories"
            nameActive={editField}>
            <TreeSelectBur
              data={props.categories || []}
              onlyForm={onlyForm}
              treeData={categories}
              value={data.productCategories}
              setValue={(value) => hanldeChange({productCategories: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus label="Brands" name="brands" nameActive={editField}>
            <TreeSelectBur
              data={props.brands || []}
              onlyForm={onlyForm}
              treeData={brands}
              value={data.brands}
              setValue={(value) => hanldeChange({brands: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus label="Colors" name="colors" nameActive={editField}>
            <TreeSelectBur
              data={props.colors || []}
              onlyForm={onlyForm}
              treeData={colors}
              value={data.colors}
              setValue={(value) => hanldeChange({colors: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus label="Tags" name="tags" nameActive={editField}>
            <TreeSelectBur
              data={props.tags || []}
              onlyForm={onlyForm}
              treeData={tags}
              value={data.tags}
              setValue={(value) => hanldeChange({tags: value})}
            />
          </RowLabelStatus>

          {/* <RowLabelStatus label="Barcode"></RowLabelStatus> */}
          <RowLabelStatus label="Barcode" name="barcode" nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.barcode}
              setValue={(value) => hanldeChange({barcode: value})}
            />
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TabBrandDetail);
