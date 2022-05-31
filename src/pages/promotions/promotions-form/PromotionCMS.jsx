import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {JoditEditorBur} from '~/components/public/FormHelpers/FormTextBur';
import {debounce} from '~/helpers/common';
import {isEmpty} from '~/helpers/validate';
import {SwitchBlock} from '~/components/public/FormHelpers';
const cssClass = 'inventory-brand-tab';

const TablePaymentMethod = (props) => {
  const {data} = props;
  const [meta, setMeta] = useState({});
  const [editField, setEditField] = useState('');

  useEffect(() => {
    if (data && !isEmpty(data.seoProps)) {
      const obj = JSON.parse(data.seoProps);
      setMeta(obj);
    }
  }, [data]);

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
        <ColAuto desktop={24} tablet={24}>
          <SwitchBlock
            labelRight="Published on Website"
            checked={data.pushlish}
            onChange={(value) => onChangeMeta({pushlish: value})}
          />
          <br />
          <RowLabelStatus
            label="Content"
            name="totalWeight"
            nameActive={editField}
            desktopLabel={3}
            desktopForm={21}>
            <JoditEditorBur
              onlyForm={true}
              value={data.content}
              setValue={(value) => onChangeMeta({content: value})}
            />
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TablePaymentMethod);
