var bower = require('bower');
var fs = require('fs');
var gutil = require('gulp-util');
var path = require('path');
var through = require('through2');
var walk = require('walk');

var toString = {}.toString;

module.exports = function (opts, cmdArguments) {

	var stream = through.obj(function(file, enc, callback) {
		this.push(file);
		callback();
	});

	if (toString.call(opts) === '[object String]') {
		opts = {
			directory: opts
		};
	}

	opts = opts || {};
	opts.cwd = opts.cwd || process.cwd();

	if (!opts.directory) {
		var bowerrc = path.join(opts.cwd, '.bowerrc');
		if (fs.existsSync(bowerrc)) {
			var bower_config = JSON.parse(fs.readFileSync(bowerrc));
			opts.directory = bower_config.directory;
		}
		opts.directory = opts.directory || './bower_components';
	}

	var dir = opts.directory;
	gutil.log("Using cwd: ", opts.cwd);
	gutil.log("Using bower dir: ", dir);

	var cmd = opts.cmd || 'install';
	delete(opts.cmd);

	if (toString.call(cmdArguments) !== '[object Array]') {
		cmdArguments = [];
	}
	if (toString.call(cmdArguments[0]) !== '[object Array]') {
		cmdArguments[0] = [];
	}
	cmdArguments[1] = cmdArguments[1] || {};
	cmdArguments[2] = opts;


	// bower has some commands that are provided in a nested object structure, e.g. `bower cache clean`.
	var bowerCommand;

	// clean up the command given, to avoid unnecessary errors
	cmd = cmd.trim();

	var nestedCommand = cmd.split(' ');

	if (nestedCommand.length > 1) {
		// To enable that kind of nested commands, we try to resolve those commands, before passing them to bower.
		for (var commandPos = 0; commandPos < nestedCommand.length; commandPos++) {
			if (bowerCommand) {
				// when the root command is already there, walk into the depth.
				bowerCommand = bowerCommand[nestedCommand[commandPos]];
			} else {
				// the first time we look for the "root" commands available in bower
				bowerCommand = bower.commands[nestedCommand[commandPos]];
			}
		}

		// try to give a good error description to the user when a bad command was passed
		if (bowerCommand === undefined) {
			throw("The command " + cmd + " is not available in the bower commands");
		}
	} else {
		// if the command isn't nested, just go ahead as usual
		bowerCommand = bower.commands[cmd];
	}

	bowerCommand.apply(bower.commands, cmdArguments)
		.on('log', function(result) {
			gutil.log(['bower', gutil.colors.cyan(result.id), result.message].join(' '));
		})
		.on('error', function(error) {
			stream.emit('error', new gutil.PluginError('gulp-bower', error));
			stream.end();
		})
		.on('end', function() {
			var baseDir = path.join(opts.cwd, dir);
			var walker = walk.walk(baseDir);
			walker.on("errors", function(root, stats, next) {
				stream.emit('error', new gutil.PluginError('gulp-bower', stats.error));
				next();
			});
			walker.on("directory", function(root, stats, next) {
				next();
			});
			walker.on("file", function(root, stats, next) {
				var filePath = path.resolve(root, stats.name);

				fs.readFile(filePath, function(error, data) {
					if (error)
						stream.emit('error', new gutil.PluginError('gulp-bower', error));
					else
						stream.write(new gutil.File({
							path: path.relative(baseDir, filePath),
							contents: data
						}));

					next();
				});
			});
			walker.on("end", function() {
				stream.end();
			});
		});

	return stream;
};
