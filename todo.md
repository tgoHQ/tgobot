add ci

# loggers

- detect unban, timeout, untimeout, bulk delete, kick made outside of bot
- log bulk emoji removals for all of one emoji or all message emojis
- figure out how to specifically log when messages are deleted by someone other than the author

# utility

- gearlist command
  - save gearlists to database /gearlist save
  - add new gearlists using modals
  - /gearlist show
  - /gearlist edit
  - /gearlist delete

  - event to detect gear list links and prompt to save them
  - context command to pull up user's gear lists

- log deleted messages from clean command, log user ids whose messages were deleted, for searchability

- emoji shortcut to delete introduction channel message and thread at once

- commmand to search/look up articles from tgo guide

- ticket command
  - opens a private thread with specified name, adds the user
  - don't allow user to add other users?
  - command for adding users to ticket?
  - command to lock ticket? or button?
  - searchable logging. send a log message whe - tickets opened/closed/users added, with IDs for searchability

- learn how to use interaction handlers/collectors for buttons, modals, selects, etc
- sapphire preconditions and cooldowns (cooldown for vcping command)
- sapphire api plugin
- sapphire CLI
- sapphire logger
- subcommands and autocompletes
- https://sapphirejs.dev/docs/Documentation/api-plugins/@sapphire/plugin-utilities-store/
- https://sapphirejs.dev/docs/Documentation/api-plugins/@sapphire/plugin-hmr/

# some day

- beans
  detect thanks with tag or reply
  get message
  regex check for thank you, ty, thanks, etc
  check for tagged user or replied to user
  add bean to user
  send a message indicating what happened
  giveBean slash command
- refactor discord object loader for better dx
- stop hardcoding slash command ids in response message content- figure out how to fetch from the command registry by command name or by referencing the command's exported class

permission checks for moderation actions (acting on a higher-ranked user?)
combine tickets with reports and cases
