# node-dep-date-diff

Outputs all installed packages in a table (or JSON) with the release date of the currently installed version and latest available version.

## CLI install and usage

```bash
npm i -g dep-date-diff
dep-date-diff [options] # or use ddd alias

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -S --sort [sort properties]  Sorts the table elements, add items in a comma separated list
    -O --only-outdated           Only show dependencies which are out of date

  Examples:

    $ dep-date-diff
    $ dep-date-diff --sort dateDiff
    $ dep-date-diff --sort dateDiff,usedVersionDate
    $ dep-date-diff --only-outdated
```

Sample output
```bash
ddd
[===] 14/rps 100% 0.0s
┌───────────────┬───────────────┬─────────────┬─────────────────┬───────────────┬───────────────────┬──────────┐
│ packageName   │ type          │ usedVersion │ usedVersionDate │ latestVersion │ latestVersionDate │ dateDiff │
├───────────────┼───────────────┼─────────────┼─────────────────┼───────────────┼───────────────────┼──────────┤
│ lodash        │ dependency    │ 3.10.1      │ 2015-08-04      │ 4.17.4        │ 2016-12-31        │ 515 days │
├───────────────┼───────────────┼─────────────┼─────────────────┼───────────────┼───────────────────┼──────────┤
│ express       │ dependency    │ 4.15.3      │ 2017-05-17      │ 4.15.3        │ 2017-05-17        │ 0 days   │
└───────────────┴───────────────┴─────────────┴─────────────────┴───────────────┴───────────────────┴──────────┘
```

### In-code install and usage

```bash
npm i -D dep-date-diff
```

```javascript
const ddd = require('dep-date-diff');

ddd().then(result => {
  console.log(JSON.stringify(result, null, 2));
/*
  outputs:
  [{
    "packageName": "express",
    "type": "dependency",
    "usedVersion": "4.15.3",
    "usedVersionDate": "2017-05-17",
    "latestVersion": "4.15.3",
    "latestVersionDate": "2017-05-17",
    "dateDiff": "0 days"
  }, {
    "packageName": "lodash",
    "type": "dependency",
    "usedVersion": "3.10.1",
    "usedVersionDate": "2015-08-04",
    "latestVersion": "4.17.4",
    "latestVersionDate": "2016-12-31",
    "dateDiff": "515 days"
  }]
*/
});
```
