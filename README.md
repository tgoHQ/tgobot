<div align="center">

# `tgobot`

### Node.js Discord bot specializing in moderation.

![GitHub](https://img.shields.io/github/license/kevin8181/tgobot3?color=%23137c5a&link=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fagpl-3.0%2F) ![GitHub issues](https://img.shields.io/github/issues/kevin8181/tgobot3?color=%23e4b400&link=https%3A%2F%2Fgithub.com%2Fkevin8181%2Ftgobot3%2Fissues) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/kevin8181/tgobot3?color=%234a78fc&link=https%3A%2F%2Fgithub.com%2Fkevin8181%2Ftgobot3%2Fcommits)

</div>

## Features

- Moderation
  - Full set of moderation slash commands
    - Ban/Unban
    - Mute/Unmute (using timeout)
    - Bulk delete
    - Warnings
    - Slowmode (allows moderators to change slowmode without having Manage Channel permission)
  - DM messages to actioned users
  - Modlog system
    - Choose a modlog channel to post moderation events in
- Logging
  - Deleted messages (with content)
  - Message edits (content before and after)
  - New members
- Introductions
- Conveniences
  - No permission setup (all command access based on the user's pre-existing Discord permissions)
  - Designate a bots role to automatically assign when a new bot joins
  - Ping a role when there are X or more people in any voice channel
