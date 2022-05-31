import React, {useEffect} from 'react';
import {Empty, notification} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  getEnquiryDetail,
  updateEnquiry,
  reqIsUpdate,
  postEnquiryInternalNote,
} from '~/reduxs/enquiry/action.js';
import EnquiryForm from '../enquiry-form';
import {trans} from '~/components/public/Translate';
import {
  SALE_ENQUIRY_EDIT_PERMISSION_KEY,
  SALE_ENQUIRY_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
// import DeleteModal from '../enquiry-delete'
const EnquiryUpdate = (props) => {
  const dispatch = useDispatch();
  // const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.enquiry.loading);
  const obj = useSelector((state) => state.enquiry.obj);
  const {id} = props.match.params;
  const isUpdate = useSelector((state) => state.enquiry.isUpdate);
  const me = useSelector((state) => state.me.data.data);
  const ACCESS = {
    VIEW: isAccess(SALE_ENQUIRY_VIEW_PERMISSION_KEY),
    EDIT: isAccess(SALE_ENQUIRY_EDIT_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getEnquiryDetail(id));
  }, []);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({
        message: 'Update status successful',
        description: '',
        placement: 'topRight',
      });
      dispatch(getEnquiryDetail(id));
    }
  }, [isUpdate]);

  const onDelete = () => {
    // setVisible(true);
  };

  // const onCancel = () => {
  //     props.history.push(PATH.SALES_ORDERS);
  // };

  const onDiscard = () => {
    dispatch(getEnquiryDetail(id));
  };

  const onSave = async (dataForm) => {
    ACCESS.EDIT && dispatch(updateEnquiry(id, dataForm));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  // const deleteSuccess = () => {
  //     props.history.push(PATH.SALES_ORDERS);
  // };

  const handleCreateInternalNote = (data) => {
    if (ACCESS.EDIT) {
      return postEnquiryInternalNote(id, data).then((results) => {
        if (results) {
          notification.success({
            message: trans('Update successful'),
            description: '',
            placement: 'topRight',
          });
          dispatch(getEnquiryDetail(id));
          return true;
        }
      });
    }
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <EnquiryForm
        id={id}
        data={obj}
        onDelete={onDelete}
        onDiscard={onDiscard}
        onSave={onSave}
        loading={loading}
        me={me}
        handleCreateInternalNote={handleCreateInternalNote}
      />
      {/* <DeleteModal
                obj={obj}
                visible={visible}
                setVisible={setVisible}
                onSubmit={onCancel}
                onFinish={deleteSuccess}
            /> */}
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(EnquiryUpdate);
