import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

const DROP_MEETUP_DATABASE = "DROP DATABASE IF EXISTS meetup;";

const CREATE_MEETUP_DATABASE = "CREATE DATABASE meetup;";

const USE_MEETUP_DATABASE = "USE meetup;";

const CREATE_INVITEE_TABLE = `CREATE TABLE Invitee(
  invitee_no INT, invitee_name VARCHAR(100), invited_by VARCHAR(100)
);`;

const CREATE_MEETING_TABLE = `CREATE TABLE Meeting(
  meeting_no INT, meeting_title VARCHAR(100), starting_time DATETIME, ending_time DATETIME, room_no INT
);`;

const CREATE_ROOM_TABLE = `CREATE TABLE Room(
  room_no INT, room_name VARCHAR(100), floor_number INT
);`;

const INSERT_INTO_INVITEE = `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) 
VALUES 
  (1, 'Fred', 'Sara'),
  (2, 'Martin', 'Andrew'),
  (3, 'Ashley', 'Bob'),
  (4, 'Jane', 'David'),
  (5, 'John', 'Sara');`;

const INSERT_INTO_MEETING = `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no)
VALUES 
  (1, 'Intro Js', '2022-04-12 09:30:00', '2022-04-12 15:30:00', 110),
  (2, 'Databases', '2022-04-15 09:00:00', '2022-04-13 16:30:00', 111),
  (3, 'Closures', '2022-05-12 11:45:00', '2022-05-12 14:00:00', 112),
  (4, 'Advanced Js', '2022-06-01 09:00:00', '2022-06-01 17:00:00', 113),
  (5, 'Intro Js', '2022-07-10 09:30:00', '2022-07-10 15:45:00', 114);`;

const INSERT_INTO_ROOM = `INSERT INTO Room (room_no, room_name, floor_number) 
VALUES 
  (101, 'Ocean', 1),
  (201, 'Garden', 2),
  (310, 'Pool', 3),
  (103, 'Sea', 1),
  (204, 'Forest', 2);`;

const execQuery = (query, message = "Success") => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log(message);
      console.log(results);
    }
  });
};

connection.connect();

execQuery(DROP_MEETUP_DATABASE);
execQuery(CREATE_MEETUP_DATABASE);
execQuery(USE_MEETUP_DATABASE);
execQuery(CREATE_INVITEE_TABLE);
execQuery(CREATE_MEETING_TABLE);
execQuery(CREATE_ROOM_TABLE);
execQuery(INSERT_INTO_INVITEE);
execQuery(INSERT_INTO_MEETING);
execQuery(INSERT_INTO_ROOM);

connection.end();
