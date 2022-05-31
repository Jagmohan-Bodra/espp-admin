import React from 'react';
import {withRouter} from 'react-router-dom';
import {Card} from 'antd';
import {trans} from '../Translate';
import './style.scss';

const CardSeoPreview = (props) => {
  const {data, className} = props;

  const handleImage = () => {
    if (data.images && className == 'card-preview-image') {
      return (
        <div className="optimize-seo-image">
          <img src={data.images} />
        </div>
      );
    }
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title={trans('Preview')}
        className={'card-preview optimize-seo-card-preview-top'}>
        <div className={'card-preview-in ' + className}>
          {handleImage()}
          <span className="optimize-seo-title">{data.title}</span>
          <br />
          <span className="optimize-seo-link">
            {'https://www.espp.com.sg/'}
          </span>
          <br />
          <span className="optimize-seo-description">{data.description}</span>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(CardSeoPreview);
