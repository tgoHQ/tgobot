<div align="center">

# `tgobot3`

### Node.js Discord bot specializing in moderation.

</div>

![GitHub](https://img.shields.io/github/license/kevin8181/tgobot3?color=%23137c5a&link=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fagpl-3.0%2F) ![GitHub issues](https://img.shields.io/github/issues/kevin8181/tgobot3?color=%23e4b400&link=https%3A%2F%2Fgithub.com%2Fkevin8181%2Ftgobot3%2Fissues) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/kevin8181/tgobot3?color=%234a78fc&link=https%3A%2F%2Fgithub.com%2Fkevin8181%2Ftgobot3%2Fcommits)

## Features

- Full set of moderation slash commands
  - Ban/Unban
  - Mute/Unmute (using timeout)
  - Bulk delete
  - Warnings
  - Slowmode (allows moderators to change slowmode without having Manage Channel permission)
- DM messages to actioned users
- Comprehensive modlog system
  - Choose a modlog channel to post moderation events in
- No permission setup (all command access based on the user's pre-existing Discord permissions)
- Designate a bots role to automatically assign when a new bot joins

## Installation and Setup

Create your application on the [Discord Developer Portal](https://discord.com/developers/applications).

Make sure [Node.js](https://nodejs.org/) is installed.

Then, run:

```
$ git clone https://github.com/kevin8181/tgobot3
$ cd tgobot3
$ npm install
```

Environmental variables:

| Variable          | Value                                   |
| ----------------- | --------------------------------------- |
| TOKEN             | your Discord bot's token                |
| CLIENT_ID         | your Discord application's client ID    |
| MODLOG_CHANNEL_ID | id of the modlog channel in your server |
| APPEALS_URL       | url to visit for moderation appeals     |

To launch:

```
$ node .
```
