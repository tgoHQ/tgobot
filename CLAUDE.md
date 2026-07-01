# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`tgobot` is a Discord bot for a single guild (The Great Outdoors community). It is built on the [Sapphire framework](https://sapphirejs.dev) on top of discord.js, written in TypeScript as ES modules, and backed by a PostgreSQL database via Drizzle ORM.

## Commands

- `pnpm dev` — build then run (`build` + `start`)
- `pnpm build` — `rm -rf dist && tsc` (compiles `src/` to `dist/`)
- `pnpm start` — `node .` (runs `dist/bot.js`)
- `pnpm types` — `tsc --noEmit` typecheck
- `pnpm format` / `pnpm format:check` — Prettier write / check
- `pnpm check` — `format` + `types`
- `pnpm knip` — unused-code check (treats config hints as errors)
- `pnpm db` — Drizzle Kit CLI (e.g. `pnpm db push`, `pnpm db generate`)

CI (`.github/workflows/ci.yml`) runs, in order: `format:check`, `types`, `build`, `knip`. Match this before pushing. There is no test suite.

Package manager is **pnpm** (`pnpm@10.24.0`). Node uses `nodenext` module resolution, so **all relative imports must include the `.js` extension** even though the source files are `.ts` (e.g. `import { env } from "./env.js"`).

## Architecture

### Startup
`src/bot.ts` is the entry point. It configures the `SapphireClient` (intents, allowed mentions), sets commands to bulk-overwrite on every start and register only in `env.GUILD_ID`, logs in, then calls `initializeCronJobs()`.

### Sapphire auto-loading
Sapphire discovers and loads pieces by directory convention — you generally do **not** manually register them. Each piece is a class extending a Sapphire base:
- `src/commands/**` — slash/context commands (`extends Command`). Grouped by category folder (`fun`, `moderation`, `reference`, `utility`). Declare the command in `registerApplicationCommands`, handle it in `chatInputRun` / `contextMenuRun`.
- `src/listeners/**` — Discord event handlers (`extends Listener`). Grouped by concern (`autoMod`, `channels`, `logging`, `utilities`).
- `src/interaction-handlers/**` — autocomplete/button/modal handlers (`extends InteractionHandler`). Use `parse()` to filter/produce data and `run()` to respond.

These three directories are also the `knip` entry points, so exported classes here won't be flagged as unused.

### `src/lib/**` — business logic
Command/listener classes should stay thin and delegate to `src/lib`. Domain logic lives here, e.g. `lib/moderation` (notes, infractions, and `actions/` for ban/kick/warn/timeout/slowmode/bulkDelete), `lib/llm` (OpenAI chatbot client — "Steve" AI), `lib/autoRole`, `lib/linkCleaner` (URL sanitization).

### Discord object access — `src/lib/loadDiscordObjects.ts`
All roles, channels, and forum tags are referenced by ID from env and exposed as **async fetch functions** (e.g. `await CHANNEL_BOTS()`, `await ROLE_EXPERT()`). Always use these helpers rather than fetching channels/roles ad hoc; they centralize IDs and assert channel types. When adding a new channel/role, add its env var (`src/env.ts`) and a corresponding fetch helper here.

### Configuration — `src/env.ts`
All configuration (Discord token, guild ID, DB URL, OpenAI key, and every role/channel/tag ID) is validated at startup with a Zod schema and exported as the typed `env` object. Loaded from `.env` via dotenv. Adding any new external ID or secret means adding it to this schema.

### Database — `src/db`
- `schema.ts` — Drizzle table definitions (currently `userNotes`).
- `drizzle.ts` — exports the `db` client (postgres-js driver).
- `drizzle.config.ts` — Drizzle Kit config; migrations output to `./drizzle`, schema read from `src/db/schema.ts`, uses `DB_URL`.

### Cron jobs — `src/jobs`
`jobs/index.ts` defines the `CronJob` type (`{ schedule, execute }`) and an array of jobs registered with `node-cron` in `initializeCronJobs()`. Job modules live in `jobs/modules/**`. To add a scheduled task, create a module exporting a `CronJob` and add it to the `jobs` array.

## Conventions

- Prettier formats with **tabs** (`.prettierrc`); `dist/` is Prettier-ignored.
- `tsconfig.json` is strict, including `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters`, `verbatimModuleSyntax` (use `import type` for type-only imports), and `noPropertyAccessFromIndexSignature` (index-signature props like `process.env` must use bracket access, e.g. `process.env["DB_URL"]`).
- `@openbeta/sandbag` has a broken exports map; `tsconfig.json` `paths` points TS at its `.d.ts` directly (typecheck-only workaround — do not remove).
- `dist/` is committed/generated build output; never edit it by hand — edit `src/` and rebuild.
