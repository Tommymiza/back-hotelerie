const supabase = require("@supabase/supabase-js");

const db = supabase.createClient(
  "https://isfwntkqouccfopmbjux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzZndudGtxb3VjY2ZvcG1ianV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4MjY3NzksImV4cCI6MjAxMTQwMjc3OX0.ai9QAcnxFGwI4bb4HTmO13V2t0K3qqgFNvRqzzwprAw"
);
module.exports = db;
