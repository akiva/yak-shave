#!/usr/bin/env node

'use strict';

var minimist = require('minimist');
var chalk = require('chalk');
var pkg = require('../package.json');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var conf = require('npmconf');
var inquirer = require('inquirer');
var escape = require('js-string-escape');
var npm = require('npm');
var semver = require('semver');
var xtend = require('xtend');
var camelCase = require('camelcase');
var readdirp = require('readdirp');
var dotty = require('dotty');

var argv = minimist(process.argv.slice(2), {
  alias: {
    u: 'user',
    h: 'help',
    v: 'version'
  },
  default: {},
  boolean: ['v', 'h'],
  string: 'u'
});
var target = null;
var prefix = null;
var moduleData = {};
var npmConfData = {};

if (argv.h) help();
else if (argv.version) version();
else init();

function help() {
  fs.createReadStream(__dirname + '/usage.txt')
    .pipe(process.stdout)
    .on('close', function () {
      process.exit(0);
    });
}

function version() {
  console.log(pkg.version);
  process.exit(0);
}

function error(err) {
  console.error(chalk.bold.red(err));
  process.exit(1);
}

function init() {
  return loadNpmConfig(function (err, config) {
    if (err) return error(err);
    processNpmConfig(config, function (err) {
      if (err) return error(err);
      return setTargetDir(argv._[0], function () {
        return promptUser();
      });
    });
  });
}

function afterPromptUser() {
  return installDependencies();
}

function postDependencyInstallation(err, deps) {
  if (err) return error('Error installing one or more dev dependencies:', err);
  Object.keys(deps).forEach(function (dep) {
    if (prefix && semver.gte(deps[dep], '0.1.0'))
      deps[dep] = prefix + deps[dep];
    console.log(chalk.green('Installed %s'), [dep, deps[dep]].join('@'));
  });
  moduleData.devDependencies = JSON.stringify(deps);
  readdirp({
    root: path.resolve('templates')
  }).on('data', function (file) {
    var dest = path.resolve(target, file.path);
    fs.exists(dest, function (exists) {
      if (exists) return console.log('Ignoring: %s', file.path);
      fs.readFile(file.fullPath, 'utf8', function (err, content) {
        if (err) return error(err);
        content = render(content, xtend(moduleData, npmConfData));
        if (file.name.match(/\.json$/g))
          content = JSON.stringify(JSON.parse(content), null, 2);
        fs.writeFile(dest, content);
      });
    });
  });
}

function render(template, params) {
  return template.replace(/\{\{([^}]+)}}/g, function (_, name) {
    return dotty.get(params, name);
  });
}

function loadNpmConfig(done) {
  conf.load({}, function (err, config) {
    if (err) return done(err);
    return done(null, config);
  });
}

function setTargetDir(dir, done) {
  dir = path.resolve(dir || process.cwd());
  fs.stat(dir, function (err) {
    if (err) return makeTargetDir(dir, done);
    return done();
  });
}

function makeTargetDir(dir, done) {
  mkdirp(dir, function (err) {
    if (err) return done(err);
    afterSetTargetDir(dir, done);
  });
}

function afterSetTargetDir(dir, done) {
  target = dir;
  done();
}

function promptUser() {
  var name = {
    'name': 'name',
    'message': 'Module name',
    'default': path.basename(target)
  };
  var description = {
    'name': 'description',
    'message': 'Module description'
  };
  var tags = {
    'name': 'tags',
    'message': 'Module tags:'
  };
  var stability = {
    'name': 'stability',
    'type': 'list',
    'message': 'Module stability:',
    'default': 'experimental',
    'choices': [
      'deprecated',
      'experimental',
      'unstable',
      'stable',
      'frozen',
      'locked'
    ]
  };
  return inquirer.prompt([
    name,
    description,
    tags,
    stability
  ], function (answers) {
    moduleData.name = dequote(answers.name);
    moduleData.testDescription =
      escape(answers.description).replace(/\\"+/g, '\"');
    moduleData.description = dequote(answers.description);
    moduleData.varName = camelCase(answers.name);
    moduleData.tags = JSON.stringify(
      answers.tags.split(' ').map(function (str) {
        return dequote(str).trim();
      }).filter(Boolean),
      null,
      2
    );
    moduleData.devDependencies = '{}';
    return afterPromptUser();
  });
}

function dequote(str) {
  return str.replace(/\"+/g, '\\"');
}

function processNpmConfig(config, done) {
  prefix = config.get('save-prefix');
  npmConfData.user = {
    name: config.get('init.author.name'),
    site: config.get('init.author.url') || '',
    email: config.get('init.author.email'),
    github: config.get('init.author.github'),
    username: config.get('username')
  };
  if (typeof argv.u === 'string') {
    npmConfData.org = {
      name: argv.u,
      github: argv.u
    };
    console.log(
      chalk.green(
        'Creating module under organization %s',
        chalk.bold(npmConfData.org.name)
      )
    );
  } else if (argv.u)
    return done('--user specified, but without an organization!');
  if (!npmConfData.user.name)
    return done(configParamError('name', 'Your Name'));
  if (!npmConfData.user.email)
    return done(configParamError('email', 'me@example.com'));
  if (!npmConfData.user.github)
    return done(configParamError('github', 'your-github-handle'));
  if (!npmConfData.org)
    npmConfData.org = {
      name: npmConfData.user.name,
      github: npmConfData.user.github
    };
  if (!npmConfData.user.url)
    npmConfData.user.url = 'https://github.com/' + npmConfData.user.github;
  return done();
}

function configParamError(param, sample) {
  var message = 'Missing npm configuration option, please run the ' +
    'following using your own value:\nnpm config set init.author.' +
    param + ' "' + sample;
  return message;
}

function installDependencies() {
  var devDependencies = [
    'jshint',
    'tape',
    'pre-commit'
  ];
  npm.load({ saveDev: true }, function (err) {
    if (err) return postDependencyInstallation(err);
    npm.commands.install(target, devDependencies, function (err, dependencies) {
      if (err) return postDependencyInstallation(err);
      dependencies = dependencies.reduce(function (acc, dep) {
        var d = dep[0].split('@');
        if (devDependencies.indexOf(d[0]) !== -1) acc[d[0]] = d[1];
        return acc;
      }, {});
      return postDependencyInstallation(null, dependencies);
    });
    npm.on('log', function (message) {
      console.log(message);
    });
  });
}
