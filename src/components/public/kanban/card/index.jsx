import React from 'react';
import {Row, Col} from 'antd';
import {NavLink} from 'react-router-dom';
import '../style.scss';
const cssClass = 'p_kanban_component';

const Header = (props) => {
  const {code, datetimehead} = props;
  return (
    <div className={`${cssClass}__kanban_card_header`}>
      <span style={{color: '#1890ff', fontSize: '14px'}}>{code}</span>
      {datetimehead && (
        <div className={`${cssClass}__body--datetime`}>{datetimehead}</div>
      )}
    </div>
  );
};

const Body = (props) => {
  const {name, datetime, quantity, amount, currency, email, phone} = props;
  return (
    <div className={`${cssClass}__kanban_card_body`}>
      <div className={`${cssClass}__body--title`}>{name}</div>
      <div className={`${cssClass}__body--text`}>{email}</div>
      <div className={`${cssClass}__body--text`}>{phone}</div>
      <div className={`${cssClass}__body--datetime`}>{datetime}</div>
      {quantity && amount && (
        <Row style={{justifyContent: 'space-between'}}>
          <Col>
            {/* <div className={`${cssClass}__body--quantity`}> */}
            <div>
              <span className={`${cssClass}__body--text`}>
                Quantity:
                <br />
                Amount ({currency}):
              </span>
            </div>
          </Col>
          <Col>
            <div className={`${cssClass}__body--quantity`}>
              <b className={`${cssClass}__body--text`}>
                {quantity}
                <br />
                {amount}
              </b>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

const Card = (props) => {
  const {headers, bodies} = props;
  const {code, path, datetimehead} = headers || {};
  const {name, datetime, quantity, amount, currency, email, phone} =
    bodies || {};
  return (
    <div className={`${cssClass} kanban_card`}>
      <NavLink to={path || '#'} className={`${cssClass}`}>
        <Header
          code={code || ''}
          path={path || ''}
          datetimehead={datetimehead || ''}
        />
        <Body
          name={name || ''}
          datetime={datetime || ''}
          quantity={quantity || ''}
          amount={amount || ''}
          currency={currency || ''}
          email={email || ''}
          phone={phone || ''}
        />
      </NavLink>
    </div>
  );
};

export default Card;
