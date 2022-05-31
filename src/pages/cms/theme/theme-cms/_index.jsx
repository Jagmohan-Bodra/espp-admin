import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {notification} from 'antd';

// import CraftHeader from '~/components/craft/craft-header';
import CraftForm from '~/components/craft/craft-form';
import {getThemeDetail, updateTheme, reqIsUpdate} from '~/reduxs/theme/action';
import {getBlockList} from '~/reduxs/block/action';
import PATH from '~/routers/path';
import {trans} from '~/components/public/Translate';
import {BLOCK_TYPE} from '~/constants/master-data';
import {isAccess} from '~/helpers/utils';
import {
  CMS_THEME_EDIT_PERMISSION_KEY,
  CMS_THEME_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const ThemeUpdateUI = (props) => {
  const dispatch = useDispatch();
  const themeObj = useSelector((state) => state.theme.obj);
  const blockList = useSelector((state) => state.block.data);
  const {id} = props.match.params;
  const themeIsUpdate = useSelector((state) => state.theme.isUpdate);
  const ACCESS = {
    VIEW: isAccess(CMS_THEME_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_THEME_EDIT_PERMISSION_KEY),
  };
  useEffect(() => {
    dispatch(getThemeDetail(id));
    dispatch(
      getBlockList({
        type: {
          in: [
            BLOCK_TYPE.THEME,
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
    if (themeIsUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({message: trans('Update successfully')});
      props.history.push(PATH.CMS_THEMES);
    }
  }, [themeIsUpdate]);

  const handleSubmitClick = (data) => {
    ACCESS.EDIT && dispatch(updateTheme(id, data));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };
  return (
    (ACCESS.VIEW || ACCESS.EDIT) && (
      <div>
        {
          <CraftForm
            enabled={true}
            setEnabled={() => props.history.push(PATH.CMS_THEMES)}
            handleSubmitClick={handleSubmitClick}
            json={themeObj.content}
            styles={themeObj.styles}
            blockContents={blockList}
          />
        }
      </div>
    )
  );
};

export default withRouter(ThemeUpdateUI);
