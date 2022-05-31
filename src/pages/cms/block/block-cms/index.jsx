import React, {useEffect} from 'react';
import {Empty, notification} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBlockList,
  updateBlock,
  getBlockDetail,
  reqIsUpdate,
} from '~/reduxs/block/action';
import {withRouter} from 'react-router-dom';
import CraftForm from '~/components/craft/craft-form';
import PATH from '~/routers/path';
import {trans} from '~/components/public/Translate';
import {getPageFilter} from '~/helpers/queryString';
import {BLOCK_TYPE} from '~/constants/master-data';
import {isAccess} from '~/helpers/utils';
import {
  CMS_BLOCK_EDIT_PERMISSION_KEY,
  CMS_BLOCK_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const BlockCms = (props) => {
  const dispatch = useDispatch();
  // const [isEdit, setIsEdit] = useState(false);
  const blockObj = useSelector((state) => state.block.obj);
  const blockList = useSelector((state) => state.block.data);
  const {id} = props.match.params;
  const blockIsUpdate = useSelector((state) => state.block.isUpdate);
  const ACCESS = {
    VIEW: isAccess(CMS_BLOCK_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_BLOCK_EDIT_PERMISSION_KEY),
  };
  useEffect(() => {
    dispatch(
      getBlockList({
        type: {
          in: [
            BLOCK_TYPE.BASIC,
            BLOCK_TYPE.CUSTOMIZE,
            BLOCK_TYPE.FIXED,
            BLOCK_TYPE.FOR_BLOCK,
          ],
        },
        ...getPageFilter(1, true),
      }),
    );
    dispatch(getBlockDetail(id));
  }, []);

  useEffect(() => {
    if (blockIsUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({message: trans('Update successfully')});
      props.history.push(PATH.CMS_BLOCKS);
    }
  }, [blockIsUpdate]);

  const handleSubmitClick = (data = {}) => {
    ACCESS.EDIT && dispatch(updateBlock(id, data));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      {
        <CraftForm
          enabled={true}
          handleSubmitClick={handleSubmitClick}
          json={blockObj.content}
          styles={blockObj.styles}
          blockContents={blockList}
          isBlock={true}
          cancel={() => props.history.push(PATH.CMS_BLOCKS)}
        />
      }
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(BlockCms);
