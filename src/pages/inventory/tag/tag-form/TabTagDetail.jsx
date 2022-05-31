import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';

import {RowAuto, ColAuto} from '~/components/public/Grid';
import {RowLabelStatus} from '~/components/public/FormHelpers/FormCommon';
import {
  InputAreaBur,
  SelectTextBur,
} from '~/components/public/FormHelpers/FormTextBur';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {debounce} from '~/helpers/common';
import {formatDateTimeDefault} from '~/helpers/date';
import {STATUS_OPTION} from '~/constants/master-data';
import PATH from '~/routers/path';
const cssClass = 'inventory-tag-tab';

const TabTagDetail = (props) => {
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
    props.history.push(PATH.INVENTORY_TAG);
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
          <RowLabelStatus label="Tag Name" name="name" nameActive={editField}>
            <InputAreaBur
              onlyForm={onlyForm}
              value={data.name}
              setValue={(value) => hanldeChange({name: value})}
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
        </ColAuto>
        <ColAuto desktop={12} tablet={24}>
          <RowLabelStatus label="Status" name="status" nameActive={editField}>
            <SelectTextBur
              onlyForm={onlyForm}
              data={STATUS_OPTION}
              value={data.status}
              setValue={(value) => hanldeChange({status: value})}
            />
          </RowLabelStatus>

          <RowLabelStatus label="Date Created">
            <span style={{paddingLeft: '10px', color: '#4B5B79'}}>
              {formatDateTimeDefault(data.createdAt)}
            </span>
          </RowLabelStatus>

          <RowLabelStatus label="Date Modified">
            <span style={{paddingLeft: '10px', color: '#4B5B79'}}>
              {formatDateTimeDefault(data.updatedAt)}
            </span>
          </RowLabelStatus>
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TabTagDetail);
