import sqlite3 from "sqlite3";

const sql = sqlite3.verbose();
const DBSOURCE = "db.sqlite";

let con = new sql.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    con.run(
      `CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, email text, password text)`,
      (err) => {
        if (err) {
          console.log("Users Table Created");
        }
      }
    );

    con.run(
      `CREATE TABLE projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, startdate text, enddate text)`,
      (err) => {
        if (err) {
          console.log("Projects Table Created");
        }
      }
    );

    con.run(
      `CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, project_id INTEGER, status text, FOREIGN KEY (project_id) REFERENCES projects(id))`,
      (err) => {
        if (err) {
          console.log("Tasks Table Created");
        }
      }
    );
  }
});

export default con;
