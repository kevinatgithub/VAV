const color = {
  primary: '#98ca3d',
  primaryDark: '#01502e',
  primaryLight: '#eff9e9',

  text: '#333333',
  textInvert: '#fff',
  textLight: '#797979',
  border: '#e8e8e8',

  accentBlue: '#2493c1',
  accentBlueLight: '#eef3f8',
  accentGrey: '#f6f6f7',

  borderPrimary: '#BAD67D',

  background: '#ECF2F6',
};

const fontSize = {
  small: '11px',
  base: '14px',
  large: '17px',
  h4: '20px',
  h3: '23px',
  h2: '26px',
  h1: '30px',
};

const fontFamily = `
-apple-system,
BlinkMacSystemFont,
"Segoe UI", Roboto,
"PingFang SC",
"Hiragino Sans GB",
"Microsoft YaHei",
"Helvetica Neue",
Helvetica, Arial,
sans-serif
`;

// use commonjs module since this is being used in webpack
module.exports = {
  color,
  fontSize,
  fontFamily,
};
