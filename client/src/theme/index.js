const color = {
  primary: '#DB3832',
  primaryDark: '#01502e',
  primaryLight: '#eff9e9',

  text: '#333333',
  textInvert: '#fff',
  textLight: '#797979',
  border: 'rgba(16, 22, 26, 0.15)',

  accentBlue: '#2493c1',
  accentBlueLight: '#eef3f8',
  accentGrey: '#f6f6f7',

  borderPrimary: '#BAD67D',

  background: '#ECF2F6',
};

const metrics = {
  header: '53px',
  sidebar: '80px',
};

// use commonjs module since this is being used in webpack
module.exports = {
  color,
  metrics,
};
