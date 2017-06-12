# node-dep-date-diff

Outputs all installed packages in a table (or JSON) with the release date of the currently installed version and latest available version.

## CLI install and usage

```bash
npm i -g dep-date-diff
dep-date-diff # or use ddd alias
```

Sample output
```bash
ddd
[==] 40/rps 100% 0.0s
┌─────────────┬─────────────┬─────────────────┬───────────────┬───────────────────┬──────────┐
│ packageName │ usedVersion │ usedVersionDate │ latestVersion │ latestVersionDate │ dateDiff │
├─────────────┼─────────────┼─────────────────┼───────────────┼───────────────────┼──────────┤
│ lodash      │ 3.10.1      │ 2015-08-04      │ 4.17.4        │ 2016-12-31        │ 515 days │
├─────────────┼─────────────┼─────────────────┼───────────────┼───────────────────┼──────────┤
│ express     │ 4.15.3      │ 2017-05-17      │ 4.15.3        │ 2017-05-17        │ 0 days   │
└─────────────┴─────────────┴─────────────────┴───────────────┴───────────────────┴──────────┘
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
    "usedVersion": "4.15.3",
    "usedVersionDate": "2017-05-17",
    "latestVersion": "4.15.3",
    "latestVersionDate": "2017-05-17",
    "dateDiff": "0 days"
  }, {
    "packageName": "lodash",
    "usedVersion": "3.10.1",
    "usedVersionDate": "2015-08-04",
    "latestVersion": "4.17.4",
    "latestVersionDate": "2016-12-31",
    "dateDiff": "515 days"
  }]
*/
});
```
