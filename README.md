# module-init 

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Initialise new npm modules without the yak shaving.

Originally forked from the good work of [hughsk][1] and [mattdesl][2].

## Installation

Install easily using npm:

```bash
npm install -g @akiva/module-init
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
like to generate, enter it, and issue the `module-init` command:

```bash
mkdir some-module
cd some-module
module-init
```

Second, you can pass in the name of the module you'd like to create and 
the generator will create the directory for you in the current path that
you executed the command:

```bash
cd ~/projects
module-init some-module
```

**NB**: issuing the command `module-init .` behaves the same as the
first approach. 

The module generator will produce some generic files pre-populated for
your specific module:

  - `README.md`
  - `LICENSE`
  - `package.json`
  - `.gitignore`
  - `.npmignore`
  - `.jshintrc`
  - `.jshintignore`
  - `test.js`
  - `index.js`

## Usage

```
Usage: module-init [options] [name]

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
