/**
 * Webpack config for builds
 */
module.exports = require('./webpack.make')({
  BUILD: false,
  PRODUCTION: true,
  TEST: false
});
