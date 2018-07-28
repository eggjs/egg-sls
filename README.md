# egg-sls

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-sls.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-sls
[travis-image]: https://img.shields.io/travis/eggjs/egg-sls.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-sls
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-sls.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-sls?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-sls.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-sls
[snyk-image]: https://snyk.io/test/npm/egg-sls/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-sls
[download-image]: https://img.shields.io/npm/dm/egg-sls.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-sls

<!--
Description here.
-->

## Install

```bash
$ npm i egg-sls --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.sls = {
  enable: true,
  package: 'egg-sls',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.sls = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## API

### Project

- [ ] createProject
- [ ] deleteProject
- [ ] getProject
- [ ] listProject
- [ ] getProjectLogs

### Config

- [ ] createConfig
- [ ] deleteConfig
- [ ] getConfig
- [ ] listConfig
- [ ] updateConfig
- [ ] GetAppliedMachineGroups

### LogStore

- [x] createLogstore
- [x] deleteLogstore
- [x] getLogstore
- [x] listLogstore
- [ ] updateLogstore
- [x] getLogs
- [ ] getHistograms

### Shard

- [ ] ListShards
- [ ] SplitShard
- [ ] MergeShards
- [x] PostLogStoreLogs
- [ ] GetCursor
- [ ] PullLogs

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
