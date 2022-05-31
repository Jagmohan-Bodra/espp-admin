import React from 'react';

const CountCard = (props) => {
  const {icon, title, count} = props;
  return (
    <div className={`count-card`}>
      <div className={`count-card_icon`}>
        {icon}
        {/* {icon} <img src={`https://picsum.photos/100/100`} /> */}
      </div>
      <div className={`count-card_content`}>
        <div className={`count-card_content_title`}>{title}</div>
        <div className={`count-card_content_count`}>{count}</div>
      </div>
    </div>
  );
};

export default CountCard;
