'use strict';

const zlib = require('mz/zlib');
const utility = require('utility');
const sign = require('./sign');


class Request {
  constructor(options) {
    this.options = options;
  }

  async request() {
    const { httpclient, protocol, endpoint, accessKeyId, accessKeySecret } = this.options;
    const { projectName, path, method } = this.options;

    const hostname = `${projectName}.${endpoint}`;
    const host = `${protocol}://${hostname}`;
    const url = `${host}/${path}`;

    // https://help.aliyun.com/document_detail/29010.html
    const headers = {
      Date: new Date().toGMTString(),
      'x-log-apiversion': '0.6.0',
      'x-log-signaturemethod': 'hmac-sha1',
    };

    let body = this.options.body;
    if (body) {
      headers['x-log-bodyrawsize'] = body.length;

      body = await zlib.deflate(body);
      headers['x-log-compresstype'] = 'deflate';
      headers['Content-Type'] = 'application/x-protobuf';
      headers['Content-MD5'] = utility.md5(body, 'hex').toUpperCase();
    }

    // https://help.aliyun.com/document_detail/29012.html
    const signature = sign({ accessKeySecret, method, path, headers });
    headers.Authorization = `LOG ${accessKeyId}:${signature}`;

    return await httpclient.request(url, {
      method,
      content: body,
      headers,
      dataType: 'json',
      timeout: 30000,
    });
  }
}

module.exports = Request;
