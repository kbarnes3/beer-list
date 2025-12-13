# Contributing to Base-Angular-App
We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with GitHub
We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [GitHub Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests
Pull requests are the best way to propose changes to the codebase (we use [GitHub Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
1. If you've added code that should be tested, add tests.
1. Ensure the test suite passes (see [Running Tests](#running-tests)).
1. Make sure your code lints (see [Linting](#linting)).
1. Issue that pull request!

## Any contributions you make will be mine
Kevin Barnes reserves the right to use any code submitted to this repository as he sees fit.

## Report bugs using Github's [issues](https://github.com/kbarnes3/kaitlin-go/issues)
We use GitHub issues to track public bugs. Report a bug by [opening a new issue](); it's that easy!

## Write bug reports with detail, background, and sample code
**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Running Tests
This project has a suite of verification that runs on every Pull Request using [Azure Pipelines](https://kbarnes3.visualstudio.com/BaseAngularApp/). This verification includes running unit tests and linting. Running the tests locally before a pull request is easy and might save some time. To run the tests locally:

1. Start a console with ```scripts/Console.ps1```.
1. Run ```ng test```.
1. Karma will run. A browser will open and show the test results. If you make any changes before stopping Karma, they will immediately be picked up and cause a test rerun.
1. When you are done, use ```Ctrl + C``` to exit Karma.

## Linting
1. Start a console with ```scripts/Console.ps1```.
1. Run ```ng lint```.
1. The linting results will print to your console.

## References
This document was adapted from this [gist](https://gist.github.com/briandk/3d2e8b3ec8daf5a27a62).
