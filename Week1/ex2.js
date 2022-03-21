import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

connection.query(
  "SELECT Name FROM country WHERE Population > 8000000;",
  (error, results) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  (error, results) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
  (error, results) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  "SELECT Name FROM country WHERE Continent = 'Europe'",
  (error, results) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  "SELECT Name FROM country ORDER BY SurfaceArea DESC",
  (error, results) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  "SELECT Name FROM city WHERE CountryCode = 'NLD'",
  (error, results) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  "SELECT Population FROM city WHERE Name = 'Rotterdam'",
  (error, results) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  "SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10",
  (error, results) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  "SELECT * FROM city ORDER BY Population DESC LIMIT 10",
  (error, results) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query("SELECT SUM(Population) FROM country", (error, results) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
