/* 
Question 1- Give an example of a value that can be passed as name and code that would
      take advantage of SQL-injection and (fetch all the records in the database).

Answer => It can be passed turkey' as name and tur' as code to query to sql-injection. 
    If we pass the single quote after the string parameter, sql get confused and retrieve all data.
*/
import prompt from "prompt";
import mysql from "mysql";
import util from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
  multipleStatements: true,
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function queryDatabase() {
  let country = "";
  let name = "";
  let code = "";
  prompt.start();
  try {
    const input1 = await input(["country"]);
    const input2 = await input(["name"]);
    const input3 = await input(["code"]);
    country = input1.country;
    name = input2.name;
    code = input3.code;

    // 1. Naive way of passing the parameter to the query
    //const select_query = `SELECT Population FROM ${country} WHERE Name = '${name}' and code = '${code}'`;

    // 2. Escaping the parameter ( replacing the unwanted characters)
    const select_query = `select Population from ${country} WHERE name = ${connection.escape(
      name
    )} and code = ${connection.escape(code)}`;

    connection.connect();
    console.log(select_query);
    const results = await execQuery(select_query);
    for (let r of results) {
      console.log(r);
    }
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();
