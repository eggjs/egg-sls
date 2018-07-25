'use strict';

const assert = require('assert');
const is = require('is-type-of');
const LogGroupPB = require('./log').LogGroup;


class LogGroup {
  constructor(options = {}) {
    this.topic = options.topic || '';
    this.source = options.source || '';
    this.logs = [];
  }

  getLogs() {
    return this.logs;
  }

  setLog(obj) {
    assert(is.number(obj.time), 'time should be integer');

    const contents = [];
    if (obj.contents) {
      for (const key of Object.keys(obj.contents)) {
        contents.push({ key, value: obj.contents[key] });
      }
    }

    this.logs.push({
      time: obj.time,
      contents,
    });
  }

  encode() {
    const logGroup = {
      topic: this.topic,
      source: this.source,
      logs: this.logs,
    };

    return LogGroupPB.encode(logGroup).finish();
  }
}

module.exports = LogGroup;
