'use strict';

const assert = require('assert');
const sign = require('../../lib/client/sign');


describe('requestSigner', function() {
  const accessKeySecret = '';
  const method = 'GET';
  const path = '/';
  const headers = {
    'Content-Type': 'application/x-protobuf',
    'Content-MD5': 'test',
    'x-log-compresstype': 'deflate',
    'x-log-bodyrawsize': 10,
    'x-log-signaturemethod': 'hmac-sha1',
    'x-log-apiversion': '0.6.0',
    Date: new Date(1532526447622).toGMTString(),
    Host: 'test',
  };

  it('should return correct sign', function() {
    const result = sign({ accessKeySecret, method, path, headers });
    assert(result === 'AcQjTPYVIhgAGvauFMGzr8yWRYw=');
  });

  it('should return correct canonicalizedResource', function() {
    const path = 'http://cn-shenzhen-ant-share.log.aliyuncs.com/logstores/testlogstore/shards/lb?b=1&e=2&c=3';
    const result = sign({ accessKeySecret, method, path, headers });
    assert(result === 'B1xPda7qePNF7b5EVg+Q5LkWEB4=');
  });

});
