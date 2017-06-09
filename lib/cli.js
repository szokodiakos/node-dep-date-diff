'use strict';

const Table = require('cli-table');
const _ = require('lodash');

const depDateDiff = require('./dep-date-diff');

depDateDiff({ progressBar: true })
  .then(results => {
    const sortedResults = _.sortBy(results, (item) => item.usedVersionDate);
    const table = new Table({
      head: _.keys((_.first(sortedResults) || {}))
    });

    table.push(..._.map(sortedResults, (v) => _.values(v)));
    console.log(table.toString());
  })
  .catch(err => setTimeout(() => { throw err; }));
