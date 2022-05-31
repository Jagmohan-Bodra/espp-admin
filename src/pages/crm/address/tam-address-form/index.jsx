import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form} from 'antd';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue, ButtonGray} from '~/components/public/Button';
import {SelectDefaultItem} from '~/components/public/FormHelpers/FormCommon';
import {ModalDefault} from '~/components/public/modals/ModalDefault';
import {alertCreateSuccessful} from '~/helpers/texts';
import {reqIsCreate, createAddress} from '~/reduxs/address/action';

const AddressFormModal = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const {students, classId} = props;
  const [studentId, setStudentId] = useState('');
  const isCreate = useSelector((state) => state.address.isCreate);

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

  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      alertCreateSuccessful();
      props.onFinish && props.onFinish();
    }
  }, [isCreate]);

  const onChangeStudent = (value) => {
    setStudentId(value);
  };

  const onSubmit = () => {};

  const onAddFinish = async () => {
    let data = {class: classId, student: studentId};
    dispatch(createAddress(data));
    updateVisible(false);
    setStudentId('');
  };

  return (
    <ModalDefault
      visible={visible}
      setVisible={onDiscard}
      title={`Add Student`}>
      <AddressForm
        students={students || []}
        studentId={studentId}
        onChange={(value) => onChangeStudent(value)}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
        onFinish={onAddFinish}
      />
    </ModalDefault>
  );
};

const AddressForm = (props) => {
  const {students, studentId, onChange, onSubmit, onFinish, onDiscard} = props;
  const fields = [{name: ['Students'], value: studentId}];

  return (
    <Form scrollToFirstError onFinish={onFinish} fields={fields}>
      <SelectDefaultItem
        label={`Students (${students.length})`}
        isText={false}
        data={students || []}
        value={studentId}
        valueText={studentId}
        onChange={onChange}
        rules={[{required: true}]}
      />
      <Toolbox pullRight className="mt-20">
        <ButtonBlue text="Save" htmlType="submit" onClick={onSubmit} />
        <ButtonGray text="Discard" onClick={onDiscard} />
      </Toolbox>
    </Form>
  );
};

export default AddressFormModal;
