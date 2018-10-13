// use commonjs module since this is being used in webpack
const theme = require('./index');

module.exports = {
  'primary-color': theme.color.primary,
  'info-color': theme.color.primary,
  'processing-color': theme.color.primary,
  'text-color': theme.color.text,
  'body-background': theme.color.background,

  'font-family': theme.fontFamily,
  'font-size-base': theme.fontSize.base,
  'font-size-lg': theme.fontSize.large,
};
