'use strict';

const urllib = require('urllib');
const SLSClient = require('../../lib/client');

describe('test/client/index.test.js', () => {

  it('should post logs', async () => {
    console.log(SLSClient);
    const client = new SLSClient({
      endpoint: '',
      accessKeyId: '',
      accessKeySecret: '',
      httpclient: urllib,
    });

    const logContents = [{
      key: 'name',
      value: 'hello',
    },
    ];
    const logGroup = {
      topic: 'common-error',
      source: '127.0.0.1',
      logs: [{
        time: 1,
        contents: logContents,
      }],
    };

    await client.postLogstoreLogs('ant-techlessapp', 'chair-log-internal', logGroup);
  });

});
