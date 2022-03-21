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
  function (error, result) {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  function (error, result) {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
  function (error, result) {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  "SELECT Name FROM country WHERE Continent = 'Europe'",
  function (error, result) {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  "SELECT Name FROM country ORDER BY SurfaceArea DESC",
  function (error, result) {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  "SELECT Name FROM city WHERE CountryCode = 'NLD'",
  function (error, result) {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  "SELECT Population FROM city WHERE Name = 'Rotterdam'",
  function (error, result) {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  "SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10",
  function (error, result) {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  "SELECT * FROM city ORDER BY Population DESC LIMIT 10",
  function (error, result) {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  "SELECT SUM(Population) FROM country",
  function (error, result) {
    if (error) throw error;
    console.log(result);
  }
);

connection.end();
