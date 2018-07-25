'use strict';

const mock = require('egg-mock');

describe('test/sls.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/sls-test',
    });
    return app.ready();
  });
  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .post('/logs')
      .send({ key: 'a', value: 'b' })
      .expect(200);
  });
});
