# gulp-bower2
> Install Bower packages.

This task is designed for gulp 3.

## Usage

First, install `gulp-bower2` as a development dependency:

```shell
npm install --save-dev gulp-bower2
```

Then, add it to your `gulpfile.js`:

```javascript
var gulp = require('gulp');
var bower = require('gulp-bower2');

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('lib/'))
});
```

This defaults to the directory configured in `./.bowerrc` or to `./bower_components` when no `.bowerrc` could be found.

You can also specify a custom Bower directory:

```javascript
var gulp = require('gulp');
var bower = require('gulp-bower2');

gulp.task('bower', function() {
  return bower('./my_bower_components')
    .pipe(gulp.dest('lib/'))
});
```

To set the current working directory, you must pass in an `options` object:

```javascript
var gulp = require('gulp');
var bower = require('gulp-bower2');

gulp.task('bower', function() {
  return bower({ directory: './my_bower_components', cwd: './myapp' })
    .pipe(gulp.dest('lib/'))
});
```

By default `gulp-bower2` runs `install` command for Bower.
Using `cmd` property, you can specify the custom command. (e.g. `update`)

```javascript
var bower = require('gulp-bower2');

gulp.task('bower', function() {
  return bower({ cmd: 'update'});
});
```



## Changelog

#####0.0.8
- Locked down the dependency versions so the build doesn't brake when the dependencies change without warning

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
