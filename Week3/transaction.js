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
  const senderId = 101;
  const receiverId = 102;
  const transactionAmount = 1000;
  const date = new Date(Date.now());

  const transactionDate = `${date.getFullYear()}-${formatDate(
    date.getMonth() + 1
  )}-${formatDate(date.getDate())}`;

  const UPDATE_SENDER_BALANCE = `UPDATE account SET balance = balance - ${transactionAmount} WHERE account_number = ${senderId}`;
  const UPDATE_RECEIVER_BALANCE = `UPDATE account SET balance = balance - ${transactionAmount} WHERE account_number = ${receiverId}`;
  const INSERT_TRANSACTIONS_TO_ACCOUNT_CHANGES = `
  INSERT INTO 
        account_changes(account_number, amount, changed_date, remark)
    VALUES
        (${senderId}, ${transactionAmount}, '${transactionDate}','sent'),
        (${receiverId}, ${transactionAmount}, '${transactionDate}', 'received');
    `;

  connection.connect();

  try {
    await execQuery("START TRANSACTION");
    await execQuery(UPDATE_SENDER_BALANCE);
    await execQuery(UPDATE_RECEIVER_BALANCE);
    await execQuery(INSERT_TRANSACTIONS_TO_ACCOUNT_CHANGES);
    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
};

const formatDate = (date) => {
  if (date < 10) {
    return `${0}${date}`;
  } else {
    return date;
  }
};

seedDatabase();
