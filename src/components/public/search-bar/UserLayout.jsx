import React, {useState, useEffect} from 'react';
import {Row, Col, Menu, Button} from 'antd';
import styleGlobal from '~/public/assets/styleGlobal';
import UserDetails from '~/pages/user/user-details';

const cssClass = styleGlobal.P_SEARCH_BAR_MODAL_COMPONENT;

const UserContentItem = (props) => {
  const {obj} = props;

  const handleSelect = () => {
    props.handleSelect && props.handleSelect(obj);
  };

  return (
    <div className={`${cssClass}__user_content_item`}>
      <UserDetails obj={obj} />
      <Row className={`row__space-mid`}>
        <Col></Col>
        <Col>
          <Button
            className={`button__footer button__btn--save`}
            onClick={handleSelect}>
            Chọn
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const UserLayout = (props) => {
  const [data, setData] = useState(props.data || []);
  const [current, setCurrent] = useState(props.current || -1);

  useEffect(() => {
    setData(props.data || []);
    setCurrent(-1);
  }, [props.data]);

  return (
    <div className={`${cssClass}__user_layout`}>
      <Row>
        <Col span={6}>
          <div className={`${cssClass}__user_layout--menu`}>
            <Menu
              selectedKeys={[current]}
              onClick={(e) => setCurrent(e.key)}
              mode="inline">
              {(data || []).map((item, index) => (
                <Menu.Item key={index} icon={item.id}>
                  -{item.name}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </Col>
        <Col span={18}>
          {current !== -1 && (
            <UserContentItem
              obj={current !== -1 ? data[current] : {}}
              handleSelect={(obj) =>
                props.handleSelect && props.handleSelect(obj)
              }
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserLayout;
