import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {notification} from 'antd';

// import CraftHeader from '~/components/craft/craft-header';
import CraftForm from '~/components/craft/craft-form';
import {getPageDetail, updatePage, reqIsUpdate} from '~/reduxs/page/action';
import {getBlockList} from '~/reduxs/block/action';
import PATH from '~/routers/path';
import {trans} from '~/components/public/Translate';
import {BLOCK_TYPE} from '~/constants/master-data';
import {isAccess} from '~/helpers/utils';
import {
  CMS_PAGE_EDIT_PERMISSION_KEY,
  CMS_PAGE_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const PageUpdateUI = (props) => {
  const dispatch = useDispatch();
  const pageObj = useSelector((state) => state.page.obj);
  const blockList = useSelector((state) => state.block.data);
  const {id} = props.match.params;
  const pageIsUpdate = useSelector((state) => state.page.isUpdate);
  const ACCESS = {
    VIEW: isAccess(CMS_PAGE_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_PAGE_EDIT_PERMISSION_KEY),
  };
  useEffect(() => {
    dispatch(getPageDetail(id));
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
        meta: {
          pageSize: 10000,
          page: 1,
          sort: ['position'],
        },
      }),
    );
  }, [id]);

  useEffect(() => {
    if (pageIsUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({message: trans('Update successfully')});
      props.history.push(PATH.CMS_PAGES);
    }
  }, [pageIsUpdate]);

  const handleSubmitClick = (data) => {
    ACCESS.EDIT && dispatch(updatePage(id, data));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  return (
    (ACCESS.VIEW || ACCESS.EDIT) && (
      <div>
        {
          <CraftForm
            enabled={true}
            setEnabled={() => props.history.push(PATH.CMS_PAGES)}
            handleSubmitClick={handleSubmitClick}
            json={pageObj.content}
            styles={pageObj.styles}
            blockContents={blockList}
            themeData={(pageObj.theme || {}).content}
            themeStyle={(pageObj.theme || {}).styles}
          />
        }
      </div>
    )
  );
};

export default withRouter(PageUpdateUI);
