'use strict';

const uuid = require('uuid/v4');
const assert = require('assert');
const urllib = require('urllib');
const sleep = require('mz-modules/sleep');
const SLSClient = require('../../lib/client');

describe('test/client/index.test.js', () => {
  const projectName = uuid();

  let client;
  before(() => {
    client = new SLSClient({
      endpoint: process.env.SLS_ENDPOINT,
      accessKeyId: process.env.SLS_ACCESS_KEY_ID,
      accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
      httpclient: urllib,
    });
  });
  before(async () => {
    await client.createProject({
      projectName,
      description: projectName,
    });
    await sleep(5000);
  });
  after(async () => {
    await sleep(10000);
    await client.deleteProject(projectName);
  });

  describe('Logstore', () => {
    it('should create, list and delete logstore', async () => {
      const logstoreName = uuid();
      await client.createLogstore(projectName, {
        logstoreName,
        ttl: 1,
        shardCount: 1,
      });

      try {
        let res = await client.listLogstore(projectName);
        assert(res.count >= 1);
        assert(res.logstores.includes(logstoreName));

        res = await client.getLogstore(projectName, logstoreName);
        assert(res.ttl === 1);
        assert(res.shardCount === 1);

        // await client.updateLogstore(projectName, logstoreName, {
        //   ttl: 2,
        //   shardCount: 2,
        // });
        //
        // res = await client.getLogstore(projectName, logstoreName);
        // assert(res.ttl === 2);
        // assert(res.shardCount === 2);
      } finally {
        await client.deleteLogstore(projectName, logstoreName);
      }
    });

    it('should throw when shardCount is 0', async () => {
      try {
        await client.createLogstore(projectName, {
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
        await client.deleteLogstore(projectName, 'unknown');
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

      await client.postLogstoreLogs('egg-sls-post-log', 'egg-sls-post-log', logGroup);
    });

    it('should convert log content to string', async () => {
      const logGroup = client.createLogGroup({ topic: 'common-error', source: '127.0.0.1' });
      logGroup.setLog({
        time: 1,
        contents: {
          date: new Date(),
        },
      });

      await client.postLogstoreLogs('egg-sls-post-log', 'egg-sls-post-log', logGroup);
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
      await client.postLogstoreLogs('egg-sls-post-log', 'egg-sls-post-log', logGroup);

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
      await client.postLogstoreLogs('egg-sls-post-log', 'egg-sls-post-log', logGroup1);

      await sleep(5000);
      let result = await client.getLogs('egg-sls-post-log', 'egg-sls-post-log', { topic });
      assert(result.count === 2);
      assert(result.complete === true);
      assert(result.logs.length === 2);
      assert(result.logs[0].path === '/');
      assert(result.logs[0].method === 'GET');
      assert(result.logs[1].path === '/');
      assert(result.logs[1].method === 'POST');

      result = await client.getLogs('egg-sls-post-log', 'egg-sls-post-log', { topic: `${topic}1` });
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
