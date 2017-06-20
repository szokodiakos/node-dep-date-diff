'use strict';

const Table = require('cli-table');
const _ = require('lodash');
const program = require('commander');

const depDateDiff = require('./dep-date-diff');
const packageJson = require('../package.json');

const version = packageJson.version;

const examples = `
  Examples:

    $ dep-date-diff
    $ dep-date-diff --sort dateDiff
    $ dep-date-diff --sort dateDiff,usedVersionDate
`;

const isSortWanted = (sortParams) => !(sortParams.length === 1 && sortParams[0] === '');

function cli() {
  program
    .version(version)
    .option('-S --sort [sort properties]', 'Sorts the table elements, add items in a comma separated list')
    .on('--help', () => {
      console.log(examples);
    })
    .parse(process.argv);

  const sortParams = _.split(program.sort, ',');

  const options = { progressBar: true };

  depDateDiff(options)
    .then(results => {
      const sortBy = isSortWanted(sortParams) ? sortParams : ['usedVersionDate'];
      const sortedResults = _.sortBy(results, sortBy);
      const table = new Table({
        head: _.keys((_.first(sortedResults) || {}))
      });

      table.push(..._.map(sortedResults, (sortedResult) => {
        const sortedResultForView = _.assign({}, sortedResult, { dateDiff: `${sortedResult.dateDiff} days` });
        return _.values(sortedResultForView);
      }));
      console.log(table.toString());
    })
    .catch(err => setTimeout(() => { throw err; }));
}


module.exports = cli;
