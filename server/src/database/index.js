const { drizzle } = require("drizzle-orm/supabase");
const schema = require("./schema.js");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const db = drizzle(supabase, { schema });
module.exports = { db };
