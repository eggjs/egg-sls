'use strict';

const url = require('url');
const qs = require('querystring');
const crypto = require('crypto');


module.exports = sign;

function sign(options) {
  const { accessKeySecret, method, path, headers } = options;

  const signString = [
    method,
    headers['Content-MD5'] || '',
    headers['Content-Type'] || '',
    headers.Date || '',
    canonicalizedLOGHeaders(headers),
    canonicalizedResource(path),
  ].join('\n');

  return hmac(accessKeySecret, signString);
}

function hmac(secret, content) {
  return crypto
    .createHmac('sha1', secret)
    .update(new Buffer(content))
    .digest('base64');
}

function canonicalizedLOGHeaders(headers) {
  const amzHeaders = Object.keys(headers).filter(k => k.indexOf('x-log-') === 0);
  amzHeaders.sort((a, b) => {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  });
  return amzHeaders
    .map(name => `${name.toLowerCase()}:${String(headers[name])}`)
    .join('\n');
}

function canonicalizedResource(requestUrl) {
  const urlObject = url.parse(requestUrl);
  const pathname = urlObject.pathname;
  const queryString = urlObject.query || '';
  const resource = decodeURIComponent(pathname);

  const queryObject = qs.parse(queryString);
  const queryKeys = Object.keys(queryObject);
  if (!queryKeys.length) {
    return resource;
  }
  queryKeys.sort((a, b) => {
    return a < b ? -1 : 1;
  });
  const sortedQueryString = queryKeys.map(k => k + '=' + queryObject[k]);
  return resource + '?' + sortedQueryString.join('&');
}
