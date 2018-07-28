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

  describe('Logstore', () => {
    it('should create, list and delete logstore', async () => {
      await client.createLogstore('egg-sls-unittest1', {
        logstoreName: 'egg-sls-test1',
        ttl: 1,
        shardCount: 1,
      });

      try {
        let res = await client.listLogstore('egg-sls-unittest1');
        assert(res.count > 1);
        assert(res.logstores.includes('egg-sls-test1'));

        res = await client.getLogstore('egg-sls-unittest1', 'egg-sls-test1');
        assert(res.ttl === 1);
        assert(res.shardCount === 1);

        // await client.updateLogstore('egg-sls-unittest1', 'egg-sls-test1', {
        //   ttl: 2,
        //   shardCount: 2,
        // });
        //
        // res = await client.getLogstore('egg-sls-unittest1', 'egg-sls-test1');
        // assert(res.ttl === 2);
        // assert(res.shardCount === 2);
      } finally {
        await client.deleteLogstore('egg-sls-unittest1', 'egg-sls-test1');
      }
    });

    it('should throw when shardCount is 0', async () => {
      try {
        await client.createLogstore('egg-sls-unittest1', {
          logstoreName: 'egg-sls-test1',
          ttl: 1,
          shardCount: 0,
        });
        throw new Error('should not run');
      } catch (err) {
        assert(err.message === 'shardCount value is out of range');
      }
    });

    it('should throw when delete a no existing logstore', async () => {
      try {
        await client.deleteLogstore('egg-sls-unittest1', 'unknown');
        throw new Error('should not run');
      } catch (err) {
        assert(err.message === 'logstore unknown does not exist');
      }
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

      await client.postLogstoreLogs('egg-sls-unittest1', 'egg-sls-test', logGroup);
    });

    it('should convert log content to string', async () => {
      const logGroup = client.createLogGroup({ topic: 'common-error', source: '127.0.0.1' });
      logGroup.setLog({
        time: 1,
        contents: {
          date: new Date(),
        },
      });

      await client.postLogstoreLogs('egg-sls-unittest1', 'egg-sls-test', logGroup);
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
      await client.postLogstoreLogs('egg-sls-unittest1', 'egg-sls-test', logGroup);

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
      await client.postLogstoreLogs('egg-sls-unittest1', 'egg-sls-test', logGroup1);

      await sleep(5000);
      let result = await client.getLogs('egg-sls-unittest1', 'egg-sls-test', { topic });
      assert(result.count === 2);
      assert(result.complete === true);
      assert(result.logs.length === 2);
      assert(result.logs[0].path === '/');
      assert(result.logs[0].method === 'GET');
      assert(result.logs[1].path === '/');
      assert(result.logs[1].method === 'POST');

      result = await client.getLogs('egg-sls-unittest1', 'egg-sls-test', { topic: `${topic}1` });
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
