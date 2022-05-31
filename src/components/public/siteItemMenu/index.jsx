import React from 'react';
import {withRouter} from 'react-router-dom';
import {Avatar} from 'antd';
import {trans} from '~/components/public/Translate';
import './style.scss';

const SiteItemMenu = (props) => {
  const {siteItem} = props;
  return (
    <div className="p-component-site-item-menu">
      <Avatar size={20} src={siteItem.avatar || ''}></Avatar>
      <span>{trans(siteItem.name)}</span>
    </div>
  );
};

export default withRouter(SiteItemMenu);
