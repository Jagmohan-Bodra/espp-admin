import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';
import Comment from './Comment';

const cssClass = styleGlobal.P_COMMENT_LOG_COMPONENT;

const CommentLog = (props) => {
  const {comments} = props;
  return (
    <div className={`${cssClass}`}>
      <Comment dateTime={'10-01-2020'} comments={comments} />
    </div>
  );
};

export default CommentLog;
