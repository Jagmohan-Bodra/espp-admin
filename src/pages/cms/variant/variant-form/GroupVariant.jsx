import React from 'react';

const GroupVariant = (props) => {
  const {title} = props;
  return (
    <div className={`group-variant`}>
      <div className={`group-variant_title`}>{title}</div>
      <div className={`group-variant_childrent`}>{props.children}</div>
    </div>
  );
};

export default GroupVariant;
