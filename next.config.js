const withPlugins = require("next-compose-plugins");
const { i18n } = require('./next-i18next.config')

const config = {i18n};

module.exports = withPlugins([], config);
