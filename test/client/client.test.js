'use strict';

const assert = require('assert');
const urllib = require('urllib');
const sleep = require('mz-modules/sleep');
const SLSClient = require('../../lib/client');

describe('test/client/index.test.js', () => {
  let client;
  before(() => {
    client = new SLSClient({
      endpoint: process.env.SLS_ENDPOINT,
      accessKeyId: process.env.SLS_ACCESS_KEY_ID,
      accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
      httpclient: urllib,
    });
  });

  describe('postLogstoreLogs', () => {
    it('should post logs', async () => {
      const logGroup = client.createLogGroup({ topic: 'common-error', source: '127.0.0.1' });
      logGroup.setLog({
        time: 1,
        contents: {
          method: 'GET',
          path: '/',
        },
      });
      logGroup.setLog({
        time: 2,
        contents: {
          method: 'POST',
          path: '/',
        },
      });

      await client.postLogstoreLogs('egg-sls-unittest', 'egg-sls-test', logGroup);
    });

    it('should convert log content to string', async () => {
      const logGroup = client.createLogGroup({ topic: 'common-error', source: '127.0.0.1' });
      logGroup.setLog({
        time: 1,
        contents: {
          date: new Date(),
        },
      });

      await client.postLogstoreLogs('egg-sls-unittest', 'egg-sls-test', logGroup);
    });
  });

  describe('getLogs', () => {
    it('should getLogs', async () => {
      const topic = String(Date.now());
      const logGroup = client.createLogGroup({ topic, source: '127.0.0.1' });
      logGroup.setLog({
        time: new Date(),
        contents: {
          method: 'GET',
          path: '/',
        },
      });
      logGroup.setLog({
        time: new Date(),
        contents: {
          method: 'POST',
          path: '/',
        },
      });
      await client.postLogstoreLogs('egg-sls-unittest', 'egg-sls-test', logGroup);

      const logGroup1 = client.createLogGroup({ topic: `${topic}1`, source: '127.0.0.1' });
      logGroup1.setLog({
        time: new Date(),
        contents: {
          method: 'GET',
          path: '/1',
        },
      });
      logGroup1.setLog({
        time: new Date(),
        contents: {
          method: 'POST',
          path: '/1',
        },
      });
      await client.postLogstoreLogs('egg-sls-unittest', 'egg-sls-test', logGroup1);

      await sleep(5000);
      let result = await client.getLogs('egg-sls-unittest', 'egg-sls-test', { topic });
      assert(result.count === 2);
      assert(result.complete === true);
      assert(result.logs.length === 2);
      assert(result.logs[0].path === '/');
      assert(result.logs[0].method === 'GET');
      assert(result.logs[1].path === '/');
      assert(result.logs[1].method === 'POST');

      result = await client.getLogs('egg-sls-unittest', 'egg-sls-test', { topic: `${topic}1` });
      assert(result.count === 2);
      assert(result.complete === true);
      assert(result.logs.length === 2);
      assert(result.logs[0].path === '/1');
      assert(result.logs[0].method === 'GET');
      assert(result.logs[1].path === '/1');
      assert(result.logs[1].method === 'POST');
    });
  });

});
