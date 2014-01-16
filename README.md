# gulp-bower
> Install Bower packages.

This task is designed for gulp 3.

## Usage

First, install `gulp-bower` as a development dependency:

```shell
npm install --save-dev gulp-bower
```

Then, add it to your `gulpfile.js`:

```javascript
var bower = require('gulp-bower');

gulp.task('bower', function() {
  bower()
    .pipe(gulp.dest('lib/'))
});
```