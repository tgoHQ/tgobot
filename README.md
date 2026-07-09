# tgobot

The Discord bot for **The Great Outdoors** community server. It handles moderation, logging, member onboarding, channel automation, an AI chatbot ("Steve"), and various utility and reference commands.

Built with [Sapphire](https://sapphirejs.dev) on top of [discord.js](https://discord.js.org), written in TypeScript (ESM), and backed by PostgreSQL via [Drizzle ORM](https://orm.drizzle.team).

## Requirements

- [Node.js](https://nodejs.org) (LTS)
- [pnpm](https://pnpm.io) 10+
- A PostgreSQL database
- A Discord bot application ([Developer Portal](https://discord.com/developers/applications))
- An OpenAI API key

## Setup

```bash
pnpm install
```

Create a `.env` file with the required configuration. Every value is validated at startup by the Zod schema in [`src/env.ts`](src/env.ts) — see that file for the complete, authoritative list. It includes:

- **Discord:** `TOKEN`, `GUILD_ID`
- **Keys & URLs:** `DB_URL`, `GUIDE_SEARCH_URL`, `OPENAI_API_KEY`
- **Role IDs:** `ROLE_*` (moderator, expert, booster, patron, bot, etc.)
- **Channel IDs:** `CHANNEL_*` (introductions, logs, forums, activity channels, etc.)
- **Forum tag IDs:** `TAG_*`

Push the database schema:

```bash
pnpm db push
```

## Running

```bash
pnpm dev      # build, then start
```

Or separately:

```bash
pnpm build    # compile src/ -> dist/
pnpm start    # run the compiled bot
```

Commands are registered only in the guild set by `GUILD_ID`, and are bulk-overwritten on every startup.

## Scripts

| Command             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `pnpm dev`          | Build then start                                  |
| `pnpm build`        | Compile TypeScript to `dist/`                     |
| `pnpm start`        | Run the compiled bot (`node .`)                   |
| `pnpm types`        | Typecheck without emitting                        |
| `pnpm format`       | Format with Prettier                              |
| `pnpm format:check` | Check formatting                                  |
| `pnpm check`        | `format` + `types`                                |
| `pnpm knip`         | Report unused code/dependencies                   |
| `pnpm db`           | Drizzle Kit CLI (e.g. `pnpm db push`, `generate`) |

CI runs `format:check`, `types`, `build`, and `knip` on every push and pull request.

## Project structure

```
src/
  bot.ts                 Entry point: client config, login, cron init
  env.ts                 Zod-validated environment configuration
  commands/              Slash & context commands (fun, moderation, reference, utility)
  listeners/             Discord event handlers (autoMod, channels, logging, utilities)
  interaction-handlers/  Autocomplete / button / modal handlers
  lib/                   Business logic (moderation, llm, autoRole, linkCleaner, ...)
  jobs/                  Scheduled cron jobs
  db/                    Drizzle schema and client
  util/                  Small shared helpers
```

Commands, listeners, and interaction handlers are auto-loaded by Sapphire based on their directory. Discord roles, channels, and forum tags are accessed through the typed helper functions in [`src/lib/loadDiscordObjects.ts`](src/lib/loadDiscordObjects.ts).

## License

Licensed under the GNU Affero General Public License (AGPL). See [LICENSE](LICENSE).
