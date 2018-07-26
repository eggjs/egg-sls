'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async putLog() {
    const sls = this.ctx.app.sls.get('sls');
    const topic = String(Date.now());
    const body = this.ctx.request.body;
    const logGroup = sls.createLogGroup({ topic, source: '127.0.0.1' });
    logGroup.setLog({
      time: new Date(),
      contents: body,
    });
    await sls.postLogstoreLogs('egg-sls-unittest', 'egg-sls-test', logGroup);
    this.ctx.body = { topic };
  }

  async getLogs() {
    const sls = this.ctx.app.sls.get('sls');
    const topic = this.ctx.params.topic;
    const res = await sls.getLogs('egg-sls-unittest', 'egg-sls-test', { topic });
    this.ctx.body = res.logs;
  }
}

module.exports = HomeController;
