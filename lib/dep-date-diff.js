'use strict';

const co = require('co');
const _ = require('lodash');
const ProgressBar = require('progress');
const moment = require('moment');

const npm = require('./npm');

function *depDateDiff(_options) {
  const options = _.assign({
    progressBar: false,
    depFilter: (dep) => dep.details.from !== dep.details.resolved
  }, _options);

  yield npm.load();

  const _deps = yield npm.getInstalledPackages();
  const deps = _.chain(_deps.dependencies)
    .map((value, key) => ({ details: value, package: key }))
    .filter(options.depFilter)
    .value();

  let bar;
  if (options.progressBar) {
    bar = new ProgressBar('[:bar] :rate/rps :percent :etas', {
      total: deps.length,
      complete: '=',
      incomplete: ' '
    });
  }

  const results = [];

  for (const dep of deps) {
    let result;
    try {
      result = yield npm.view(dep.package, 'time');
    } catch (err) {
      continue;
    } finally {
      if (options.progressBar) {
        bar.tick();
      }
    }
    const timeResult = _(result)
      .values()
      .first()
      .time;
    const packageName = dep.package;
    const usedVersion = dep.details.version;
    const usedVersionDate = moment(timeResult[usedVersion]).format('YYYY-MM-DD');
    const latestVersion = _(result)
      .keys()
      .first();
    const latestVersionDate = moment(timeResult[latestVersion]).format('YYYY-MM-DD');
    const dateDiff = `${moment(latestVersionDate).diff(usedVersionDate, 'days')} days`;
    results.push({ packageName, usedVersion, usedVersionDate, latestVersion, latestVersionDate, dateDiff });
  }

  return results;
}

module.exports = co.wrap(depDateDiff);
