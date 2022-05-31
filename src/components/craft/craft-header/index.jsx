import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Col, Menu, notification, Row, Space, Switch} from 'antd';

import {confirmModalData} from '~/components/public/modals/ModalConfirmCommon/confirmModalFunc';
import {trans} from '~/components/public/Translate';
import HeaderLeft from '~/components/layout/header/HeaderLeft';
import PagePropertityComponent from './PagePropertityComponent';
import SeoPageForm from './SeoPageForm';

import {
  updatePage,
  reqIsUpdate,
  getPageDetail,
  createPage,
  reqIsCreate,
} from '~/reduxs/page/action';
import path from '~/routers/path';
import {EditIcon, PlusIcon} from '~/public/assets/icon';
import './style.scss';

const {Item} = Menu;
const cssClass = `cms-management-header-page`;
const pageContentDefault =
  'eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IlBhZ2VDb250YWluZXIifSwiaXNDYW52YXMiOnRydWUsInByb3BzxDlzdHlsxUJiYWNrZ3JvdW5kIjoiI2ZmZiIsInBhZGRpbmciOiIwcHgiLCJtaW5IZWlnaHQiOiIxMDB2aMYUV2lkdGjGEyUifX0sImRpc3BsYXnnAI1wZSIsImN1c3RvbSI6e30sImhpZGRlbiI6ZmFsc2UsIm5vZGVzIjpbXSwibGlua2VkTsYRe319fQ==';
// const blockContentDefault = "eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IkJsb2NrIn0sImlzQ2FudmFzIjp0cnVlLCJwcm9wc8QxY2xhc3PHLmRlZmF1bHQtY3JhZnQixDVOZXciOmZhbHNlLCJzdHlsxGR9fSwiZGlzcGxhecc4cGUiLCJjdXN0b23EICwiaGlkZGVuyTpub2RlcyI6W10sImxpbmtlZE7GEXt9fX0=";

const CraftHeader = (props) => {
  const {reset, setReset} = props;
  const pathCurrent = props.match.path;
  const clsPageEdit =
    pathCurrent != path.CMS_PAGES_UPDATE &&
    pathCurrent != path.CMS_BLOCKS_UPDATE
      ? 'hidden2'
      : 'unhidden';

  const {onEditClick, isPage, idPage} = props;
  const dispatch = useDispatch();
  const pageObj = useSelector((state) => state.page.obj);
  const pageIsUpdate = useSelector((state) => state.page.isUpdate);
  const pageIsCreate = useSelector((state) => state.page.isCreate);

  useEffect(() => {
    if (pageIsUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({message: trans('Update successfully')});
      idPage && dispatch(getPageDetail(idPage));
    }
  }, [pageIsUpdate]);

  useEffect(() => {
    if (pageIsCreate) {
      dispatch(reqIsCreate(false));
      notification.success({message: trans('Create successfully')});
      setReset(!reset);
    }
  }, [pageIsCreate]);

  useEffect(() => {
    idPage && dispatch(getPageDetail(idPage));
  }, [idPage]);

  const handleNewPageClick = () => {
    confirmModalData(
      {
        header: trans('New Page'),
        closable: true,
        bodycomponent: PagePropertityComponent,
      },
      handleNewPageSubmit,
    );
  };

  const handleNewPageSubmit = (data) => {
    dispatch(
      createPage({
        siteId: pageObj.siteId,
        ...data,
        contents: pageContentDefault,
      }),
    ).then((data) => {
      data && props.history.push(path.CMS_PAGES_UPDATE.replace(':id', data.id));
    });
  };

  const handleEditClick = () => {
    onEditClick && onEditClick();
  };

  // const footer () => {
  //   <div className={`${cssClass}__form_footer`}>
  //                   <Toolbox>
  //                       <ButtonBlue text='Save' />
  //                       <ButtonGray text='Discard'
  //                           onClick={handleCancel}
  //                       />
  //                   </Toolbox>
  //               </div>
  // }

  const handleSeoOptimizeClick = () => {
    confirmModalData(
      {
        header: trans('Optimize SEO'),
        closable: true,
        data: pageObj.seoProps || {},
        width: 1000,
        className: 'modal-optimize-seo',
        // footer: (<div className={`${cssClass}__form_footer`}>
        //           <Toolbox>
        //               <ButtonBlue text='Save' onClick={handleSeoPageSubmit}/>
        //               <ButtonGray text='Discard'
        //                   // onClick={handleCancel}
        //               />
        //           </Toolbox>
        //       </div>),
        bodycomponent: SeoPageForm,
      },
      handleSeoPageSubmit,
    );
  };

  const handleSeoPageSubmit = (data) => {
    dispatch(updatePage(idPage, {seoProps: data}));
  };

  // const handleNewBlockClick = () => {
  //   confirmModalData({
  //     header: trans('New Block'),
  //     closable: true,
  //     bodycomponent: BlockFormComponent,
  //   }, handleNewBlockSubmit)
  // }

  // const handleNewBlockSubmit = (data) => {
  //   dispatch(createBlock({ ...data, defaultContent: blockContentDefault })).then((data) => {
  //     data && props.history.push(path.CMS_BLOCKS_UPDATE.replace(':id', data.id))
  //   })
  // }

  return (
    <div className={`${cssClass} fixed-top`}>
      <Row className={`row__space-mid`}>
        <Col>
          <HeaderLeft
          // menuItemExtra={(
          //   <>
          //     <SubMenu key="blocks" title="Block">
          //       <Item key="blocks_new" onClick={handleNewBlockClick}><Space><PlusIcon />{trans('New')}</Space></Item>
          //     </SubMenu>
          //     {/* {isPage && (
          //       <SubMenu key="seo" title="SEO">
          //         <Item key="seo_optimize" onClick={handleSeoOptimizeClick}>{trans('Optimize this page')}</Item>
          //       </SubMenu>
          //     )} */}
          //   </>
          // )}
          />
        </Col>
        <Col>
          <Menu
            mode="horizontal"
            theme="dark"
            className={`${cssClass}_menu ${clsPageEdit}`}>
            {isPage && (
              <>
                <Item key="seo_optimize" onClick={handleSeoOptimizeClick}>
                  {trans('SEO Optimize')}
                </Item>
                <Item key="page_published">
                  <Space
                    onClick={() =>
                      dispatch(
                        updatePage(idPage, {pushlish: !pageObj.pushlish}),
                      )
                    }>
                    <Switch checked={pageObj.pushlish} /> {trans('Published')}
                  </Space>
                </Item>
                <Item key="craft_btn_new" onClick={handleNewPageClick}>
                  <Space>
                    <PlusIcon />
                    {trans('New')}
                  </Space>
                </Item>
              </>
            )}
            <Item key="craft_btn_edit" onClick={handleEditClick}>
              <Space>
                <EditIcon /> {trans('Edit')}
              </Space>
            </Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(CraftHeader);
