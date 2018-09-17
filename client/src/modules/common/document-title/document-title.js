import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';


const DocumentTitle = ({ pageTitle }) =>
  <Helmet><title>Hino | {pageTitle}</title></Helmet>;

DocumentTitle.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default DocumentTitle;
