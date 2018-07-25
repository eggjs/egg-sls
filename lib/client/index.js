'use strict';

const assert = require('assert');
const Request = require('./request');
const { LogGroup } = require('./log');

class SLSClient {

  constructor(options) {
    assert(options.httpclient, 'httpclient is required');
    assert(options.endpoint, 'endpoint is required');
    assert(options.accessKeyId, 'accessKeyId is required');
    assert(options.accessKeySecret, 'accessKeySecret is required');
    options.protocol = options.protocol || 'http';
    this.options = options;
  }

  async postLogstoreLogs(projectName, logstoreName, logGroup) {
    const buf = LogGroup.encode(logGroup).finish();
    const path = `/logstores/${logstoreName}/shards/lb`;

    const options = {
      projectName,
      path,
      method: 'POST',
      body: buf,
    };
    await this.request(options);
  }

  async request(options) {
    options = Object.assign({}, options, this.options);
    const req = new Request(options);
    const res = await req.request();
    if (res.status === 200) return res.data;

    if (res.data && res.data.errorMessage) {
      const err = new Error(res.data.errorMessage);
      err.code = res.data.errorCode;
      err.status = res.status;
      throw err;
    }

    throw new Error('response 500');
  }

}

module.exports = SLSClient;
