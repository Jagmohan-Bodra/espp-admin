import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {InputAreaBur} from '~/components/public/FormHelpers/FormTextBur';
import {debounce} from '~/helpers/common';
import {isEmpty} from '~/helpers/validate';
const cssClass = 'inventory-color-tab';

const TabProductSEO = (props) => {
  const {data} = props;
  const [meta, setMeta] = useState({});
  const [onlyForm, setOnlyForm] = useState(true);
  const [editField, setEditField] = useState('');
  const {id} = props.match.params;

  useEffect(() => {
    if (id) {
      setOnlyForm(false);
    }
  }, [props.match.params]);

  useEffect(() => {
    if (data && !isEmpty(data.seoProps)) {
      const obj = JSON.parse(data.seoProps);
      setMeta(obj);
    }
  }, [data]);
  //TODO: switch tab

  const onChangeMeta = (value) => {
    let metaData = {...meta, ...value};
    setMeta(metaData);
    funcUpdate({seoProps: JSON.stringify(metaData)}, value);
  };

  const funcUpdate = debounce((seoProps, value) => {
    handleAlertStatus(value);
    return props.onSave && props.onSave(seoProps);
  }, 2000);

  const handleAlertStatus = (obj) => {
    const fields = Object.keys(obj);
    setEditField(fields[0]);
    setTimeout(() => {
      setEditField('');
    }, 3500);
  };

  return (
    <div className={`${cssClass}`}>
      <RowAuto>
        <ColAuto desktop={12} tablet={24}>
          <RowLabelStatus
            label="Browser Title"
            name="seoTitle"
            nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={meta.seoTitle}
              setValue={(value) => onChangeMeta({seoTitle: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Meta Keyword"
            name="metaKeyword"
            nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={meta.metaKeyword}
              setValue={(value) => onChangeMeta({metaKeyword: value})}
              isTextArea
            />
          </RowLabelStatus>

          <RowLabelStatus
            label="Meta Description"
            name="metaDescription"
            nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={meta.metaDescription}
              setValue={(value) => onChangeMeta({metaDescription: value})}
              isTextArea
            />
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TabProductSEO);
