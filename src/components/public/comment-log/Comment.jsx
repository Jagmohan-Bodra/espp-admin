import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';
import {Divider} from 'antd';

const cssClass = styleGlobal.P_COMMENT_LOG_COMPONENT;

const ItemComment = (props) => {
  const {avatar, name, dateTime, comment} = props;
  return (
    <div className={`${cssClass}__comment_layout`}>
      <div className={`${cssClass}__comment_layout--avatar`}>{avatar}</div>
      <div className={`${cssClass}__comment_layout--content`}>
        <div className={`${cssClass}__comment_layout--content_label`}>
          <span className={`${cssClass}__comment_layout--content_label_name`}>
            {name}
          </span>
          -
          <span
            className={`${cssClass}__comment_layout--content_label_datetime`}>
            {dateTime}
          </span>
        </div>
        <div className={`${cssClass}__comment_layout--content_comment`}>
          {comment}
        </div>
      </div>
    </div>
  );
};

const CommentComponent = (props) => {
  const {dateTime, comments} = props;
  return (
    <div className={`${cssClass}__comment`}>
      <Divider plain>{dateTime}</Divider>
      {(comments || []).map((item, index) => (
        <ItemComment key={index} {...item} />
      ))}
    </div>
  );
};

export default CommentComponent;
