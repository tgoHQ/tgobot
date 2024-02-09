<div align="center">

# `tgobot`

### Node.js Discord bot specializing in moderation.

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
