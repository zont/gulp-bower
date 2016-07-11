# gulp-bower
> Use Bower packages within gulp task manager.

[![Build Status](https://travis-ci.org/zont/gulp-bower.svg?branch=master)](https://travis-ci.org/zont/gulp-bower) [![codecov.io](https://codecov.io/github/zont/gulp-bower/coverage.svg?branch=master)](https://codecov.io/github/zont/gulp-bower?branch=master)

This task is designed for gulp 3.

## Install

```sh
$ npm install --save-dev gulp-bower
```

## Usage

Install packages into the `bower_components` directory from `bower.json` dependencies:

```javascript
var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower();
});
```

You can also provide array of Bower packages in `packages` option and save them into `bower.json`:

```javascript
var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower({ packages: ['jquery', 'lodash'], save: true });
});
```

### Examples of options

* To install packages into a custom directory, pass the `directory` option:

```javascript
var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower({ directory: './vendor' })
});
```

* To set the current working directory, pass the `cwd` option:

```javascript
var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower({ directory: './vendor', cwd: './client' })
});
```

* By default gulp-bower runs 'install' command for Bower. Using cmd property, you can specify the custom command (e.g. update):

```javascript
var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower({ cmd: 'update' });
});
```

## API

### `bower(opts)`
* **opts.packages** - `array` Array of Bower packages. Default: `[]`
* **opts.save** - `boolean` Save packages as dependencies into bower.json. Default: `false`
* **opts.directory** - `string` Install directory. Default: taken from `.bowerrc` config or `bower_components`
* **opts.cwd** - `string` Current working directory. Default: `process.cwd()`
* **opts.cmd** - `string` Bower command. Default: `install`
* **opts.interactive** - `boolean` Enable prompting on version conflicts. Default: `false`
* **opts.verbosity** - `number` Set verbosity level. Default: `2`
  * **0** - No output
  * **1** - Error output
  * **2** - Info

## Changelog

#####0.0.13
- Added verbosity options, prompting, .bowerrc handling, tests and CI. (by Crevil)

#####0.0.12
- Fixed command passing to also handle nested commands (by mechanoid)

#####0.0.11
- Fixed dependencies (by serbrech)

#####0.0.10
- Fixed #28

#####0.0.9
- Fixed #19
- Fixed undefined cwd bug

#####0.0.8
- Fixed dependencies versions (by Karl-Gustav)
- Fixed cwd bug (by mlegenhausen)

#####0.0.7
- Added commands support (by Keksinautin)

#####0.0.6
- Added ability to pass in an initialization object that allows a cwd to be specified (by cb1kenobi)

#####0.0.5
- Emits "end", so the consumer knows when bower is done installing (by agzam)

#####0.0.4
- fixed custom bower directory bug

#####0.0.3
- add logging (by squarejaw)

#####0.0.2
- parse .bowerrc for the bower install directory or allow the user to specify the directory (by eboskma)

#####0.0.1
- initial release
