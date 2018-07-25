'use strict';

const urllib = require('urllib');
const SLSClient = require('../../lib/client');

describe('test/client/index.test.js', () => {

  it('should post logs', async () => {
    const client = new SLSClient({
      endpoint: process.env.SLS_ENDPOINT,
      accessKeyId: process.env.SLS_ACCESS_KEY_ID,
      accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
      httpclient: urllib,
    });

    const logContents = [{
      key: 'name',
      value: 'hello',
    }];
    const logGroup = {
      topic: 'common-error',
      source: '127.0.0.1',
      logs: [{
        time: 1,
        contents: logContents,
      }],
    };

    await client.postLogstoreLogs('egg-sls-unittest', 'egg-sls-test', logGroup);
  });

});
