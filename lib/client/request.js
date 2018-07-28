'use strict';

const zlib = require('mz/zlib');
const utility = require('utility');
const is = require('is-type-of');
const sign = require('./sign');


class Request {
  constructor(options) {
    this.options = options;
  }

  async request() {
    const { httpclient, protocol, endpoint, accessKeyId, accessKeySecret } = this.options;
    const { projectName, path, method } = this.options;

    const hostname = projectName ? `${projectName}.${endpoint}` : endpoint;
    const host = `${protocol}://${hostname}`;
    const url = `${host}${path}`;

    // https://help.aliyun.com/document_detail/29010.html
    const headers = {
      Date: new Date().toGMTString(),
      'x-log-apiversion': '0.6.0',
      'x-log-signaturemethod': 'hmac-sha1',
    };

    let body = this.options.body;
    if (body) {
      if (is.buffer(body)) {
        headers['x-log-bodyrawsize'] = body.length;

        body = await zlib.deflate(body);
        headers['x-log-compresstype'] = 'deflate';
        headers['Content-Type'] = 'application/x-protobuf';
      } else {
        body = new Buffer(JSON.stringify(body));
        headers['x-log-bodyrawsize'] = body.length;
        headers['Content-Type'] = 'application/json';
      }

      headers['Content-MD5'] = utility.md5(body, 'hex').toUpperCase();
    } else {
      headers['x-log-bodyrawsize'] = 0;
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
