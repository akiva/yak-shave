# Contributing guidelines

Contributions welcome! Please check past issues and pull requests before 
you open your own issue or pull request to avoid duplicating a frequently 
asked question.

In addition to improving the project, refactoring code, and implementing 
features, this project welcomes the following types of contributions:

  - **Ideas**: participate in an issue thread or start your own to have 
    your voice heard.

  - **Writing**: contribute your expertise in an area by helping expand 
    the included content.

  - **Copy editing**: fix typos, clarify language, and generally improve 
    the quality of the content.

  - **Formatting**: help keep content easy to read with consistent 
    formatting.

## Install

Fork and clone the repo, then `npm install` to install all dependencies.

## Testing

Tests are run with `npm test`. Please ensure all tests are passing 
before submitting a pull request (unless you're creating a failing test 
to increase test coverage or show a problem).

## Code style

This repository uses JSHint to maintain code style and consistency and to 
avoid style arguments. `npm run lint` runs `jshint` directly, and a 
pre-commit hook ensures the linting passes before you can commit
successfully to the Git repository.

[standard-image]: https://cdn.rawgit.com/feross/standard/master/badge.svg
[standard-url]: https://github.com/feross/standard
[semistandard-image]: https://cdn.rawgit.com/flet/semistandard/master/badge.svg
[semistandard-url]: https://github.com/Flet/semistandard

---

# Collaborating guidelines

**This is an OPEN Open Source Project.**

## What?

Individuals making significant and valuable contributions are given 
commit-access to the project to contribute as they see fit. This project 
is more like an open wiki than a standard guarded open source project.

## Rules

There are a few basic ground-rules for contributors:

  - **No `--force` pushes** or modifying the Git history in any way.

  - **Non-master branches** ought to be used for on-going work.

  - **External API changes and significant modifications** ought to be 
    subject to an **internal pull-request** to solicit feedback from 
    other contributors.

  - Internal pull-requests to solicit feedback are _encouraged_ for any 
    other non-trivial contribution but left to the discretion of the 
    contributor.

  - Contributors should adhere to the prevailing code style.

## Releases

Declaring formal releases remains the prerogative of the project maintainer.
