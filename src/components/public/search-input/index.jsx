import React, {useState, useEffect} from 'react';
import {Input} from 'antd';
import FilterDropdown from '../filter-dropdown';
import styleGlobal from '~/public/assets/styleGlobal';

const {Search} = Input;
const cssClass = styleGlobal.P_SEARCH_INPUT_COMPONENT;

const SeacrchInput = (props) => {
  const {FilterLayout, filterProps} = props;
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(props.data);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <Search
      placeholder="Search"
      className={`${cssClass}`}
      prefix={
        <>
          <FilterDropdown
            overlay={
              FilterLayout && (
                <FilterLayout
                  {...(filterProps || {})}
                  data={data}
                  setVisible={setVisible}
                />
              )
            }
            className={`light-default`}
            setVisible={setVisible}
            visible={visible}
            isSearch={true}
          />
          <span className={`${cssClass}__hr`}></span>
        </>
      }
    />
  );
};

export default SeacrchInput;
