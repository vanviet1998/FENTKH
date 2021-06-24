const withPlugins = require("next-compose-plugins");
const { i18n } = require('./next-i18next.config')
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const config = {i18n, images: {
    domains: ["https://ntkhbackend.herokuapp.com"],
  },};

module.exports = withPlugins([], config);
