import env from "../util/env.js";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema.js";

const sql = postgres(env.DB_URL);
const db = drizzle(sql, { schema });

export default db;
