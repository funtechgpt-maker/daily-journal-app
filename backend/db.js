const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS journal (
    date TEXT PRIMARY KEY,
    content TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS goals (
    month TEXT PRIMARY KEY,
    target INTEGER
  )
`);

module.exports = db;
