const path = require('path');

module.exports = {
  src: path.join(__dirname, '..', 'src'),
  modules: path.join(__dirname, '..', 'src', 'modules'),
  dist: path.join(__dirname, '..', 'dist'),
  public: path.join(__dirname, '..', 'public'),
  publicHtml: path.join(__dirname, '..', 'public', 'index.html'),
  config: path.join(__dirname, '..', 'config'),
};
