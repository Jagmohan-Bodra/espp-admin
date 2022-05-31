import React, {useState, useEffect} from 'react';
import {Form} from 'antd';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {ModalDefault} from '~/components/public/modals/ModalDefault';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {
  InputFormItem,
  SelectDefaultItem,
} from '~/components/public/FormHelpers/FormCommon';
import countryJson from '~/resource/country-region-data.json';

const AddressFormModal = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const updateVisible = (value) => {
    props.setVisible && props.setVisible(value);
    setVisible(value);
  };

  const onDiscard = () => {
    updateVisible(false);
  };

  const onAddFinish = async (params) => {
    props.onFinish && props.onFinish(params);
    updateVisible(false);
  };

  return (
    <ModalDefault
      visible={visible}
      setVisible={onDiscard}
      width={1000}
      title={`Create Address`}>
      <AddressForm
        onDiscard={onDiscard}
        onFinish={onAddFinish}
        data={props.data}
      />
    </ModalDefault>
  );
};

const AddressForm = (props) => {
  const {onFinish, onDiscard, data} = props;
  const [params, setParams] = useState({});

  useEffect(() => {
    data && setParams(data);
  }, [data]);

  const fields = [
    {name: ['First Name'], value: params.firstName},
    {name: ['Last Name'], value: params.lastName},
    {name: ['Phone'], value: params.phone},
    {name: ['Block No.'], value: params.blockNo},
    {name: ['Street Name'], value: params.stresstName},
    {name: ['Floor'], value: params.floor},
    {name: ['Unit Number'], value: params.unitNo},
    {name: ['Building Name'], value: params.buildingName},
    {name: ['State'], value: params.state},
    {name: ['Post Code'], value: params.postCode},
    {name: ['Country'], value: params.country},
    {name: ['City'], value: params.city},
    {name: ['Default'], value: params.default},
  ];

  const onChangeValue = (value) => {
    setParams({
      ...params,
      ...value,
    });
  };

  const citys =
    (countryJson.find((item) => item.value == params.country) || {}).regions ||
    [];

  return (
    <Form scrollToFirstError onFinish={() => onFinish(params)} fields={fields}>
      <div className={`address-form`}>
        <div className={`address-form_input`}>
          <FormGroup
            left={
              <InputFormItem
                label="First Name"
                rules={[{required: true}]}
                value={params.firstName}
                onChange={(e) => {
                  onChangeValue({firstName: e.target.value});
                }}
              />
            }
            right={
              <InputFormItem
                label="Last Name"
                rules={[{required: true}]}
                value={params.lastName}
                onChange={(e) => {
                  onChangeValue({lastName: e.target.value});
                }}
              />
            }
          />
          <FormGroup
            left={
              <InputFormItem
                label="Phone"
                rules={[{required: true}]}
                value={params.phone}
                onChange={(e) => {
                  onChangeValue({phone: e.target.value});
                }}
              />
            }
            right={
              <InputFormItem
                label="Block No."
                value={params.blockNo}
                onChange={(e) => {
                  onChangeValue({blockNo: e.target.value});
                }}
              />
            }
          />
          <FormGroup
            left={
              <InputFormItem
                label="Street Name"
                rules={[{required: true}]}
                value={params.stresstName}
                onChange={(e) => {
                  onChangeValue({stresstName: e.target.value});
                }}
              />
            }
            right={
              <InputFormItem
                label="Floor"
                value={params.floor}
                onChange={(e) => {
                  onChangeValue({floor: e.target.value});
                }}
              />
            }
          />
          <FormGroup
            left={
              <InputFormItem
                label="Unit Number"
                value={params.unitNo}
                onChange={(e) => {
                  onChangeValue({unitNo: e.target.value});
                }}
              />
            }
            right={
              <InputFormItem
                label="Building Name"
                value={params.buildingName}
                onChange={(e) => {
                  onChangeValue({buildingName: e.target.value});
                }}
              />
            }
          />
          <FormGroup
            left={
              <InputFormItem
                label="State"
                value={params.state}
                onChange={(e) => {
                  onChangeValue({state: e.target.value});
                }}
              />
            }
            right={
              <InputFormItem
                label="Post Code"
                value={params.postCode}
                onChange={(e) => {
                  onChangeValue({postCode: e.target.value});
                }}
              />
            }
          />
          <FormGroup
            left={
              <SelectDefaultItem
                label="Country"
                data={countryJson}
                keyoption="value"
                nameoption="text"
                value={params.country}
                onChange={(value) => {
                  onChangeValue({country: value, city: ''});
                }}
              />
            }
            right={
              <SelectDefaultItem
                label="City"
                keyoption="value"
                nameoption="text"
                data={citys}
                value={params.city}
                onChange={(value) => {
                  onChangeValue({city: value});
                }}
              />
            }
          />
        </div>
      </div>
      <Toolbox pullRight className="mt-20">
        <ButtonBlue text="Save" htmlType="submit" />
        <ButtonGray text="Discard" onClick={onDiscard} />
      </Toolbox>
    </Form>
  );
};

const FormGroup = (props) => {
  const {left, right} = props;
  return (
    <RowAuto>
      <ColAuto desktop={12} tablet={24}>
        {left}
      </ColAuto>
      <ColAuto desktop={{span: 11, offset: 1}} tablet={24}>
        {right}
      </ColAuto>
    </RowAuto>
  );
};

export default AddressFormModal;
