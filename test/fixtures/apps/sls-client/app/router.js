'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.post('/logs', controller.home.putLog);
  router.get('/logs/:topic', controller.home.getLogs);
};
