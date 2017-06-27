'use strict';

const exec = require('child_process').exec; // eslint-disable-line security/detect-child-process

const co = require('co');
const npm = require('npm');
const _ = require('lodash');
const promisify = require('bluebird').promisify;

const pNpmLoad = promisify(npm.load.bind(npm));
const pNpmView = promisify(npm.view.bind(npm));
const pExec = promisify(exec);

function silentWrapPromise(fn) {
  return co.wrap(function *() {
    const oldStdoutWrite = process.stdout.write;

    process.stdout.write = function() {
      const cb = _.last(arguments);
      if (cb && _.isFunction(cb)) {
        return cb();
      }
    };
    try {
      return yield fn.apply(null, Array.prototype.slice.call(arguments));
    } finally {
      process.stdout.write = oldStdoutWrite;
    }
  });
}

function listPackages(cmdSwitch, typeName) {
  return pExec(`npm ls --depth=0 --json --${cmdSwitch}`)
    .then(JSON.parse)
    .then(packageData =>
      _.mapValues(packageData.dependencies, dependency =>
        _.assign({}, dependency, { type: typeName })));
}

module.exports.load = pNpmLoad;

module.exports.view = silentWrapPromise(pNpmView);

module.exports.getInstalledPackages = () =>
  Promise.all([
    listPackages('dev', 'devDependency'),
    listPackages('prod', 'dependency')
  ])
  .then(([devDeps, prodDeps]) => _.assign({}, devDeps, prodDeps));
