const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  return {
    ...config,
    resolver: {
      extraNodeModules: {
        axios: path.resolve(__dirname, './node_modules/axios'),
      },
    },
  };
})();
