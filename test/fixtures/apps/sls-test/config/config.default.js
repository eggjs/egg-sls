'use strict';

exports.keys = '123456';

exports.sls = {
  client: {
    endpoint: process.env.SLS_ENDPOINT,
    accessKeyId: process.env.SLS_ACCESS_KEY_ID,
    accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
  },
};
