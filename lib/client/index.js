'use strict';

const assert = require('assert');
const is = require('is-type-of');
const Request = require('./request');
const LogGroup = require('./log_group');
const { getTimeSecond } = require('./utils');


class SLSClient {

  constructor(options) {
    assert(options.httpclient, 'httpclient is required');
    assert(options.endpoint, 'endpoint is required');
    assert(options.accessKeyId, 'accessKeyId is required');
    assert(options.accessKeySecret, 'accessKeySecret is required');
    options.protocol = options.protocol || 'http';
    this.options = options;
  }

  async createIndex(projectName, logstoreName, indexOptions) {
    const path = `/logstores/${logstoreName}/index`;
    const options = {
      projectName,
      path,
      method: 'POST',
      body: indexOptions,
    };
    await this.request(options);
  }

  async updateIndex(projectName, logstoreName, indexOptions) {
    const path = `/logstores/${logstoreName}/index`;
    const options = {
      projectName,
      path,
      method: 'PUT',
      body: indexOptions,
    };
    await this.request(options);
  }

  async getIndex(projectName, logstoreName) {
    const path = `/logstores/${logstoreName}/index`;
    const options = {
      projectName,
      path,
      method: 'GET',
    };
    const res = await this.request(options);
    return res.data;
  }

  async deleteIndex(projectName, logstoreName) {
    const path = `/logstores/${logstoreName}/index`;
    const options = {
      projectName,
      path,
      method: 'DELETE',
    };
    await this.request(options);
  }

  async createProject(projectOptions = {}) {
    const { projectName, description } = projectOptions;
    assert(projectName, 'projectName is required');
    assert(description, 'description is required');

    const path = '/';
    const options = {
      path,
      method: 'POST',
      body: {
        projectName,
        description,
      },
    };
    await this.request(options);
  }

  async getProject(projectName) {
    assert(projectName, 'projectName is required');

    const path = '/';
    const options = {
      projectName,
      path,
      method: 'GET',
    };
    const res = await this.request(options);
    return res.data;
  }

  async deleteProject(projectName) {
    assert(projectName, 'projectName is required');

    const path = '/';
    const options = {
      projectName,
      path,
      method: 'DELETE',
    };
    await this.request(options);
  }

  async listProject(listOptions = {}) {
    const { offset, size } = listOptions;
    const query = [];
    if (is.number(offset)) query.push(`offset=${offset}`);
    if (is.number(size)) query.push(`size=${size}`);

    const path = '/?' + query.join('&');
    const options = {
      path,
      method: 'GET',
    };
    const res = await this.request(options);
    return res.data;
  }

  async createLogstore(projectName, logstoreOptions = {}) {
    const { logstoreName, ttl, shardCount } = logstoreOptions;
    assert(logstoreName, 'logstoreName is required');
    assert(is.number(ttl), 'ttl should be number');
    assert(is.number(shardCount), 'shardCount should be number');

    const path = '/logstores';
    const options = {
      projectName,
      path,
      method: 'POST',
      body: {
        logstoreName,
        ttl,
        shardCount,
      },
    };
    await this.request(options);
  }

  async deleteLogstore(projectName, logstoreName) {
    assert(logstoreName, 'logstoreName is required');

    const path = '/logstores/' + logstoreName;
    const options = {
      projectName,
      path,
      method: 'DELETE',
    };
    await this.request(options);
  }

  async listLogstore(projectName) {
    const path = '/logstores';
    const options = {
      projectName,
      path,
      method: 'GET',
    };
    const res = await this.request(options);
    return res.data;
  }

  async getLogstore(projectName, logstoreName) {
    const path = '/logstores/' + logstoreName;
    const options = {
      projectName,
      path,
      method: 'GET',
    };
    const res = await this.request(options);
    return res.data;
  }

  async updateLogstore(projectName, logstoreName, logstoreOptions = {}) {
    const body = { logstoreName };
    if (logstoreOptions.ttl) body.ttl = logstoreOptions.ttl;
    if (logstoreOptions.shardCount) body.shardCount = logstoreOptions.shardCount;

    const path = '/logstores/' + logstoreName;
    const options = {
      projectName,
      path,
      method: 'PUT',
      body,
    };
    console.log(options);
    await this.request(options);
  }

  createLogGroup(options) {
    return new LogGroup(options);
  }

  async getLogs(projectName, logstoreName, queryObj = {}) {
    const { topic = '', query = '', line = 100, offset = 0, reverse = false } = queryObj;
    let { from, to } = queryObj;

    if (!from && !to) {
      to = getTimeSecond(new Date());
      from = to - 900;
    } else {
      assert(from, 'from is required');
      assert(to, 'to is required');
      assert(is.date(from), 'from should be Date');
      assert(is.date(to), 'to should be Date');
      from = getTimeSecond(from);
      to = getTimeSecond(to);
    }

    const querysting = [];
    querysting.push('type=log');
    querysting.push(`from=${from}`);
    querysting.push(`to=${to}`);
    querysting.push(`topic=${topic}`);
    querysting.push(`query=${query}`);
    querysting.push(`line=${line}`);
    querysting.push(`offset=${offset}`);
    querysting.push(`reverse=${reverse}`);

    const path = `/logstores/${logstoreName}?${querysting.join('&')}`;
    const options = {
      projectName,
      path,
      method: 'GET',
    };
    const res = await this.request(options);

    return {
      count: Number(res.headers['x-log-count']),
      complete: res.headers['x-log-progress'] === 'Complete',
      logs: res.data,
    };
  }

  async postLogstoreLogs(projectName, logstoreName, logGroup) {
    assert(logGroup instanceof LogGroup, 'should create logGroup by client.createLogGroup');

    const buf = logGroup.encode();
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
    if (res.status === 200) return res;

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
