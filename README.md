# yak-shave 

[![npm][npm-image]][npm-url]  
[![npm version][npm-version-image]][npm-version-url]  
[![travis][travis-image]][travis-url]  
[![stable][stability-image]][stability-url]  

[npm-image]: https://nodei.co/npm/yak-shave.png
[npm-url]: https://www.npmjs.com/package/yak-shave
[npm-version-image]: https://badge.fury.io/js/yak-shave.png
[npm-version-url]: http://badge.fury.io/js/yak-shave
[travis-image]: https://secure.travis-ci.org/akiva/yak-shave.png
[travis-url]: https://travis-ci.org/akiva/yak-shave
[stability-image]: http://badges.github.io/stability-badges/dist/stable.svg
[stability-url]: http://github.com/badges/stability-badges
[browser-support-image]: http://ci.testling.com/akiva/yak-shave.png
[browser-support-url]: http://ci.testling.com/akiva/yak-shave

Initialise new npm modules without the yak shaving.

Inspired by the good work of [hughsk][1] and [mattdesl][2].

## Installation

Install easily using npm:

```bash
npm install -g yak-shave
```

## Getting started

First, update your npm config if you haven't already:

```bash
# required
npm config set init.author.name "Your Name"
npm config set init.author.email "me@example.com"
npm config set init.author.github "your-github-handle"

# optional, defaults to your github
npm config set init.author.url "http://your-site.com/"
```

There are two ways to create a new module using this generator. First, 
you can create a directory with the same name as the module you would
like to generate, enter it, and issue the `yak-shave` command:

```bash
mkdir some-module
cd some-module
yak-shave
```

Second, you can pass in the name of the module you'd like to create and 
the generator will create the directory for you in the current path that
you executed the command:

```bash
cd ~/projects
yak-shave some-module
```

**NB**: issuing the command `yak-shave .` behaves the same as the
first approach. 

The module generator will produce some generic files pre-populated for
your specific module:

  - `.gitignore`
  - `.jshintrc`
  - `.jshintignore`
  - `.npmignore`
  - `CHANGELOG.md`
  - `CONTRIBUTING.md`
  - `LICENSE`
  - `README.md`
  - `index.js`
  - `package.json`
  - `test.js`
  - `travis.yml`

## Usage

```
Usage: yak-shave [options] [name]

Options:

  name                The name of the module to generate. Defaults to the 
                      name of the parent directory

  -h, --help          Show usage

  -v, --version       Show version number

  -u, --user [user]   Specify the user or organization that Github will
                      point to. Overrides the user settings in your npm
                      config, but maintains it for the author name and url
                      fields. This value will also be used within all
                      Github links and the LICENSE file.
```

## Tests

The generator automatically creates an empty _Tape_ test file to act as
boilerplate for your module, as well as a default _JSHint_ configuration
and pre-commit hook to ensure that everything is in top form before
committing any bad code for your newly generated module's repository.

## License

MIT. See [LICENSE](LICENSE) for details.

[1]: https://github.com/hughsk/module-generator
[2]: https://github.com/mattdesl/module-generator
