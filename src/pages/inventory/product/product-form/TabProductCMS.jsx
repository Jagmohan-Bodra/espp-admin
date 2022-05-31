import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {JoditEditorBur} from '~/components/public/FormHelpers/FormTextBur';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {debounce} from '~/helpers/common';
import PATH from '~/routers/path';
const cssClass = 'inventory-brand-tab';

const TabProductCMS = (props) => {
  const [data, setData] = useState(props.data || {});
  const [onlyForm, setOnlyForm] = useState(true);
  const [editField, setEditField] = useState('');
  const {id} = props.match.params;

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
  }, 2000);

  const hanldeChange = (value) => {
    if (id) {
      funcUpdate(value);
    }
    if (!id) {
      onChangeData(value);
    }
  };

  const handleAlertStatus = (obj) => {
    const fields = Object.keys(obj);
    setEditField(fields[0]);
    setTimeout(() => {
      setEditField('');
    }, 3500);
  };

  const onSave = () => {
    props.onSave && props.onSave(data);
  };

  const onDiscard = () => {
    props.history.push(PATH.INVENTORY_BRAND);
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
        <ColAuto desktop={24} tablet={24}>
          <RowLabelStatus
            label="Content"
            name="content"
            nameActive={editField}
            desktopLabel={4}
            desktopForm={20}>
            <JoditEditorBur
              onlyForm={onlyForm}
              value={data.content}
              setValue={(value) => hanldeChange({content: value})}
            />
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TabProductCMS);
