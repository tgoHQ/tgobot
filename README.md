# tgobot3
Node.js Discord bot specializing in moderation.

## Features
- Full set of moderation slash commands
  - Ban/Unban
  - Mute/Unmute (using slowmode)
  - Bulk delete
  - Warnings
  - Slowmode (allows moderators to change slowmode without having Manage Channel permission)
- DM messages to actioned users
- Comprehensive modlog system
  - Choose a modlog channel to post moderation events in
- No permission setup (all commands based on the user's pre-existing Discord permissions)

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

| Variable            | Value                                   | Required |
|---------------------|-----------------------------------------|----------|
| TOKEN               | your Discord bot's token                | true     |
| CLIENT_ID           | your Discord application's client ID    | true     |
| MODLOG\_CHANNEL\_ID | id of the modlog channel in your server | true     |
| APPEALS_URL         | url to visit for moderation appeals     | true     |

To launch:
```
$ node .
```
