'use strict';

const Client = require('./lib/client');


module.exports = app => {
  if (!app.config.sls.enable) return;

  app.addSingleton('sls', config => {
    config = Object.assign({}, config, { httpclient: app.httpclient });
    return new Client(config);
  });
};
