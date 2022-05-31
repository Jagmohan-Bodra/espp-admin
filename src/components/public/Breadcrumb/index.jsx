import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import {Breadcrumb} from 'antd';
import styleGlobal from '~/public/assets/styleGlobal';
import './style.scss';
const cssClass = styleGlobal.P_PAGINATION_COMPONENT;
const {Item} = Breadcrumb;

const BreadcrumbConponent = (props) => {
  const {data} = props;
  const history = useHistory();
  return (
    <div className={`${cssClass}__breadcrumb`}>
      <Breadcrumb>
        {(data || []).map((item, index) => (
          <Item key={index}>
            {item.link ? (
              <NavLink to={item.link || '#'}>{item.name || ''}</NavLink>
            ) : (
              <a onClick={() => history.goBack()}>{item.name || ''}</a>
            )}
          </Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbConponent;
