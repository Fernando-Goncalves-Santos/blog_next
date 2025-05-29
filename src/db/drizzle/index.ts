import { drizzle } from "drizzle-orm/better-sqlite3";
import { postsTable } from "./schemas";
import Database from "better-sqlite3";
import { resolve } from "path";


const DatabasePath = resolve(process.cwd(), 'db.sqlite3')
const sqliteDatabase = new Database(DatabasePath)

export const drizzleDb = drizzle(sqliteDatabase, {
    schema: {
        posts: postsTable
    },
    // logger: true,
})