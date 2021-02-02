# slack-ghost

[![Dependencies][prod-dependencies-badge]][prod-dependencies]
[![Build][build-badge]][build]
[![MIT License][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]


## Description

Simulate Slack activity to appear as connected.

## Install

```bash
$ npm i -g @rimiti/slack-ghost
```

## How to use it?

Before everything, you have to go to the [Slack Legacy Token](https://api.slack.com/custom-integrations/legacy-tokens) page and click to *Create token* 
to generate your token.

### With an environment variable (recommended)

1 Create the `SLACK_GHOST_TOKEN` environment variable:

```bash
$ export SLACK_GHOST_TOKEN=token
```
2. Enjoy:

```
$ slackghost
$ [2019-01-02T17:52:41.088Z] - You are connected as "dobairro.dimitri" (RFA1KN75T).
```

### With a CLI argument

1. Enjoy:

```
$ slackghost xoxp-434098521764-517538955265-514963434770-84ea548c6tf0e7yb3028bd3fac6ff62d
$ [2019-01-02T17:52:41.088Z] - You are connected as "dobairro.dimitri" (RFA1KN75T).
```

## Scripts

Run using yarn run `<script>` command.

    clean       - Remove temporarily folders.
    build       - Compile source files.
    build:watch - Interactive watch mode, compile sources on change.
    lint        - Lint source files.
    lint:fix    - Lint source files and auto-fix.

## License

MIT © [Dimitri DO BAIRRO](https://github.com/rimiti/slack-ghost/blob/master/LICENSE)

[prod-dependencies-badge]: https://david-dm.org/rimiti/slack-ghost/status.svg
[prod-dependencies]: https://david-dm.org/rimiti/slack-ghost
[build-badge]: https://github.com/rimiti/slack-ghost/workflows/Test/badge.svg
[build]: https://github.com/rimiti/slack-ghost/actions?query=workflow%3ATest+branch%3Amaster
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license]: https://github.com/rimiti/slack-ghost/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
