import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schema.js",
  out: "./supabase/migrations",
  dialect: "postgresql",
  verbose: true,
});
