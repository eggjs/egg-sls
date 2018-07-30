'use strict';

const uuid = require('uuid/v4');
const assert = require('assert');
const urllib = require('urllib');
const sleep = require('mz-modules/sleep');
const SLSClient = require('../../lib/client');

describe('test/client/index.test.js', () => {
  const logstoreName = uuid();

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
    await client.createLogstore('egg-sls-post-log', {
      logstoreName,
      ttl: 1,
      shardCount: 1,
    });
  });
  after(async () => {
    await sleep(10000);
    await client.deleteLogstore('egg-sls-post-log', logstoreName);
  });

  it('should create, get and delete index', async () => {
    await client.createIndex('egg-sls-post-log', logstoreName, {
      ttl: 7,
      line: {
        token: [ ',' ],
      },
    });

    let res = await client.getIndex('egg-sls-post-log', logstoreName);
    assert.deepEqual(res.line.token, [ ',' ]);

    await client.updateIndex('egg-sls-post-log', logstoreName, {
      line: {
        token: [ ',', '/' ],
      },
    });

    res = await client.getIndex('egg-sls-post-log', logstoreName);
    assert.deepEqual(res.line.token, [ ',', '/' ]);

    await client.deleteIndex('egg-sls-post-log', logstoreName);

    try {
      res = await client.getIndex('egg-sls-post-log', logstoreName);
      throw new Error('should not run');
    } catch (err) {
      assert(err.message === 'index config doesn\'t exist');
    }
  });

});
