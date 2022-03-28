import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

const execQuery = (query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    } else {
      console.table(results);
    }
  });
};

execQuery("SELECT Name FROM country WHERE Population > 8000000;");
execQuery("SELECT Name FROM country WHERE Name LIKE '%land%';");
execQuery("SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;");
execQuery("SELECT Name FROM country WHERE Continent = 'Europe';");
execQuery("SELECT Name FROM country ORDER BY SurfaceArea DESC;");
execQuery("SELECT Name FROM city WHERE CountryCode = 'NLD';");
execQuery("SELECT Population FROM city WHERE Name = 'Rotterdam';");
execQuery("SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10;");
execQuery("SELECT * FROM city ORDER BY Population DESC LIMIT 10;");
execQuery("SELECT SUM(Population) FROM country;");

connection.end();
