import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'core/styled';

const PageDropdown = ({ maxPages, currentPage, setPage, ...rest }) => {
  const options = Array.from({ length: maxPages }, (x, i) => i + 1).map(p => ({ label: p, value: p }));
  const onChange = (e) => {
    const page = parseInt(e.target.value, 10);
    setPage(page);
  };

  return <Select {...rest} value={`${currentPage}`} options={options} onChange={onChange} />;
};

PageDropdown.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
};

export default PageDropdown;
