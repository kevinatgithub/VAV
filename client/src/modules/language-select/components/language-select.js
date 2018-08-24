import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import i18next from 'i18next';
import { Select } from 'antd';
import { CustomSelect } from './language-select-style';

const { Option } = Select;

class LanguageSelect extends Component {
  state = {};

  getLanguages() {
    return i18next.options.whitelist.filter(lng => lng !== 'cimode');
  }

  getDisplayName(lng) {
    const [country, region] = lng.split('-');
    return `${country} (${region})`.toUpperCase();
  }

  handleLanguageChange = (lng) => {
    i18next.changeLanguage(lng, () => null);
  };

  render() {
    const languages = this.getLanguages();
    return (
      <CustomSelect defaultValue={i18next.language} size='large' onChange={this.handleLanguageChange}>
        {languages &&
          languages.map(lng =>
            <Option key={lng} value={lng}>
              {this.getDisplayName(lng)}
            </Option>,
          )}
      </CustomSelect>
    );
  }
}

export default LanguageSelect;
