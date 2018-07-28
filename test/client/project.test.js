'use strict';

const uuid = require('uuid/v4');
const assert = require('assert');
const urllib = require('urllib');
const sleep = require('mz-modules/sleep');
const SLSClient = require('../../lib/client');

describe('test/client/project.test.js', () => {
  let client;
  before(() => {
    client = new SLSClient({
      endpoint: process.env.SLS_ENDPOINT,
      accessKeyId: process.env.SLS_ACCESS_KEY_ID,
      accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
      httpclient: urllib,
    });
  });

  it('should create, get and delete project', async () => {
    const projectName = uuid();
    await client.createProject({
      projectName,
      description: projectName,
    });

    try {
      const res = await client.getProject(projectName);
      assert(res.projectName === projectName);
    } finally {
      await sleep(10000);
      await client.deleteProject(projectName);
    }
  });

  it('should list project', async () => {
    const projectName1 = uuid();
    const projectName2 = uuid();
    await client.createProject({
      projectName: projectName1,
      description: projectName1,
    });
    await client.createProject({
      projectName: projectName2,
      description: projectName2,
    });
    await sleep(10000);

    try {
      let res = await client.listProject();
      assert(res.total === res.count);

      res = await client.listProject({ offset: 0, size: 1 });
      assert(res.count === 1);
      assert(res.total > res.count);
      console.log(res.projects);
    } finally {
      await sleep(5000);
      await client.deleteProject(projectName1);
      await sleep(5000);
      await client.deleteProject(projectName2);
    }
  });
});
