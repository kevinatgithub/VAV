// import PropTypes from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';
import { Span, Title } from '../../ui';

const PageHeaderTitle = ({ title, subTitle }) => {
  return [
    <Title key={0}>
      {title}
    </Title>,
    <Span key={1} paddingLeft={10}>
      {subTitle}
    </Span>,
  ];
};

PageHeaderTitle.propTypes = {
  title: PropTypes.node,
  subTitle: PropTypes.node,
};

export default PageHeaderTitle;
