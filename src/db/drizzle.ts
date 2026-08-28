import { env } from "#env";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "#db/schema";

const sql = postgres(env.DB_URL);
export const db = drizzle(sql, { schema });
