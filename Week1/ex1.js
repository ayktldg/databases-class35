import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

connection.connect();

connection.query("DROP DATABASE IF EXISTS meetup", function (error, results) {
  if (error) throw error;
  console.log("meetup database has been dropped");
});

connection.query("CREATE DATABASE meetup", function (error, results) {
  if (error) throw error;
  console.log("meetup database has been created");
});

connection.query("USE meetup", function (error, results) {
  if (error) throw error;
  console.log("Using meetup database");
});

connection.query(
  `CREATE TABLE Invitee(
    invitee_no INT, invitee_name VARCHAR(100), invited_by VARCHAR(100)
  )`,
  function (error, results) {
    if (error) throw error;
    console.log("Invitee table created.");
    console.log(results);
  }
);

connection.query(
  `CREATE TABLE Meeting(
      meeting_no INT, meeting_title VARCHAR(100), starting_time DATETIME, ending_time DATETIME, room_no INT
    )`,
  function (error, results) {
    if (error) throw error;
    console.log("Meeting table created.");
    console.log(results);
  }
);

connection.query(
  `CREATE TABLE Room(
      room_no INT, room_name VARCHAR(100), floor_number INT
    )`,
  function (error, results) {
    if (error) throw error;
    console.log("Room table created.");
    console.log(results);
  }
);

connection.query(
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) 
    VALUES 
      (1, 'Fred', 'Sara'),
      (2, 'Martin', 'Andrew'),
      (3, 'Ashley', 'Bob'),
      (4, 'Jane', 'David'),
      (5, 'John', 'Sara')`,
  function (error, results) {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  `INSERT INTO Room (room_no, room_name, floor_number) 
      VALUES 
        (101, 'Ocean', 1),
        (201, 'Garden', 2),
        (310, 'Pool', 3),
        (103, 'Sea', 1),
        (204, 'Forest', 2)`,
  function (error, results) {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no)
    VALUES 
      (1, 'Intro Js', '2022-04-12 09:30:00', '2022-04-12 15:30:00', 110),
      (2, 'Databases', '2022-04-15 09:00:00', '2022-04-13 16:30:00', 111),
      (3, 'Closures', '2022-05-12 11:45:00', '2022-05-12 14:00:00', 112),
      (4, 'Advanced Js', '2022-06-01 09:00:00', '2022-06-01 17:00:00', 113),
      (5, 'Intro Js', '2022-07-10 09:30:00', '2022-07-10 15:45:00', 114)`,
  function (error, results) {
    if (error) throw error;
    console.log(results);
  }
);

connection.end();
