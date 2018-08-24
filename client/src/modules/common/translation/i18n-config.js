import enGB from './en-GB';
import nlBE from './nl-BE';

const languages = [enGB, nlBE];

export default {
  default: enGB.key,
  languages: languages.map(language => language.key),
  resources: languages.reduce((acc, curr) =>
    ({ ...acc, [curr.key]: { translations: curr.translations } })
    , {}),
  customFormat: (value, format, lng) => {
    switch (format) {
      case 'date':
        return new Intl.DateTimeFormat(lng).format(value);
      case 'number':
        return new Intl.NumberFormat(lng).format(value);
      default:
        return value;
    }
  },
};
