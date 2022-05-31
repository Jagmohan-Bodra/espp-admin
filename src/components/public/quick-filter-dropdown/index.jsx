import React from 'react';
import FilterDropdown from '../filter-dropdown';
import FilterDropdownComponent, {TYPE as type} from './FilterDropdownComponent';

export const TYPE = type;

const QuickFilterDropdown = (props) => {
  return (
    <FilterDropdown
      overlay={<FilterDropdownComponent {...props} />}
      className={`page_cms_page__btn_filter ${props.className || ''}`}
    />
  );
};

export default QuickFilterDropdown;
