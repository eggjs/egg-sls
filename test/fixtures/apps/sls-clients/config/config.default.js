'use strict';

exports.keys = '123456';

exports.security = {
  csrf: false,
};

exports.sls = {
  clients: {
    sls: {
      endpoint: process.env.SLS_ENDPOINT,
      accessKeyId: process.env.SLS_ACCESS_KEY_ID,
      accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
    },
  },
};
