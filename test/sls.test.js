'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const sleep = require('mz-modules/sleep');


describe('test/sls.test.js', () => {

  describe('client', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/sls-client',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should GET /', async () => {
      let res = await app.httpRequest()
        .post('/logs')
        .send({ method: 'POST', path: '/' })
        .expect(200);
      const topic = res.body.topic;

      await sleep(3000);

      res = await app.httpRequest()
        .get('/logs/' + topic)
        .expect(200);
      assert(res.body.length === 1);
      assert(res.body[0].method === 'POST');
      assert(res.body[0].path === '/');
    });
  });

  describe('clients', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/sls-clients',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should GET /', async () => {
      let res = await app.httpRequest()
        .post('/logs')
        .send({ method: 'POST', path: '/' })
        .expect(200);
      const topic = res.body.topic;

      await sleep(3000);

      res = await app.httpRequest()
        .get('/logs/' + topic)
        .expect(200);
      assert(res.body.length === 1);
      assert(res.body[0].method === 'POST');
      assert(res.body[0].path === '/');
    });
  });
});
