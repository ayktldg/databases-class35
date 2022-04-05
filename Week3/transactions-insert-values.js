import util from "util";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const INSERT_TO_ACCOUNT_TABLE = `
    INSERT INTO 
        account(account_number, balance)
    VALUES
        (101,5000.00),
        (102,3200.00),
        (103,4000.00);
    `;
  const INSERT_TO_ACCOUNT_CHANGES_TABLE = `
    INSERT INTO 
        account_changes(account_number, amount, changed_date, remark)
    VALUES
        (101, 1000.00, '2022-03-27','sent'),
        (102, 100.50, '2022-03-28', 'received'),
        (103, 2500.90, '2022-03-29', 'sent');
    `;
  connection.connect();

  try {
    await execQuery("START TRANSACTION");

    await execQuery(INSERT_TO_ACCOUNT_TABLE);
    await execQuery(INSERT_TO_ACCOUNT_CHANGES_TABLE);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
};

seedDatabase();
