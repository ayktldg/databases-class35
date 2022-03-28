import mysql from "mysql";
import util from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT PRIMARY KEY,
      paper_title VARCHAR(50),
      conference VARCHAR(50),
      publish_date DATE
    );`;

  const CREATE_RESEARCH_PAPERS_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_papers_authors (
      id INT PRIMARY KEY,
      author_no INT,
      paper_id INT,
      FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id),
      FOREIGN KEY(author_no) REFERENCES authors(author_no)
      );`;

  const CANCEL_FK_CHECK = "SET FOREIGN_KEY_CHECKS = 0;"; //added for removing errors when inserting data into authors table

  const ADD_AUTHORS = `
    INSERT INTO 
      authors (author_no, author_name, university, date_of_birth, h_index, gender, mentor) 
    VALUES 
        (100, 'Leanne', 'University of Amsterdam', '1980-04-07', 24, 'f', 101),
        (101, 'Ervin', 'University of Amsterdam', '1977-10-05', 30, 'm', 102),
        (102, 'Andrew', 'University of Amsterdam', '1990-12-22', 22, 'm', 103),
        (103, 'Patricia', 'University of Groningen', '1969-10-10', 40, 'f', 104),
        (104, 'Bret', 'University of Groningen', '1993-02-12', 32, 'f', 105),
        (105, 'Dennis', 'Leiden University', '1991-05-30', 37, 'm', 106),
        (106, 'Kurtis', 'Leiden University', '1964-09-18', 60, 'm', 107),
        (107, 'Glenna', 'Delft University of Technology', '1994-04-15', 29, 'f', 108),
        (108, 'Jack', 'Delft University of Technology', '1978-11-24', 49, 'm', 110),
        (109, 'Jane', 'Maastricht University', '1989-01-29', 33, 'f', 111),
        (110, 'Martin', 'Tilburg University', '1992-08-14', 38, 'm', 112),
        (111, 'Ann', 'Utrecht University', '1990-09-23', 40, 'f', 113),
        (112, 'Mary', 'Wageningen University', '1979-04-10', 56, 'f', 114),
        (113, 'Nicholas', 'Eindhoven University of Technology', '1988-03-02', 52, 'm', 109),
        (114, 'Anna', 'University of Twente', '1993-06-21', 28, 'f', 100 )  
    `;

  const ADD_RESEARCH_PAPERS = `
    INSERT INTO 
      research_papers (paper_id, paper_title, conference, publish_date) 
    VALUES 
        (501, 'Intro to Js', 'Js Conference', '2000-05-03'),
        (502, 'Java Abstractions', 'Java Conf', '2010-11-10'),
        (503, 'JavaScript Data Types', 'Js Conference', '2005-10-20'),
        (504, 'Exercise Effects', 'Health Conf', '1999-11-10'),
        (505, 'Importance of Posture', 'Health Conf', '2010-06-07'),
        (506, 'Climate Change', 'Climate Conf', '2018-04-22'),
        (507, 'Energy', 'Energy Conf', '2000-10-28'),
        (508, 'Endangered species', 'Energy Conf', '2009-04-12'),
        (509, 'Nuclear energy', 'Energy Conf', '2010-08-20'),
        (510, 'Dietary supplements', 'Health Conf', '2020-01-27'),
        (511, 'React Components', 'Js Conf', '2021-05-10'),
        (512, 'Vuex State Management', 'Js Conf', '2022-01-25'),
        (513, 'Vue3', 'Vue Conf', '2021-04-11'),
        (514, 'React7', 'React Conf', '2022-06-04'),
        (515, 'Obesity', 'Health Conf', '2017-05-30'), 
        (516, 'Promises', 'Js Conference', '2010-05-03'),
        (517, 'Java Classes', 'Java Conf', '1992-11-10'),
        (518, 'Closures', 'Js Conference', '2006-10-20'),
        (519, 'Exercise and Fitness', 'Health Conf', '2000-11-10'),
        (520, 'Fast Foods', 'Health Conf', '2017-06-07'),
        (521, 'Soil Pollution', 'Climate Conf', '2018-04-22'),
        (522, 'Recycling', 'Energy Conf', '2003-10-28'),
        (523, 'Alternative Fuel', 'Energy Conf', '2020-04-12'),
        (524, 'Deforestation', 'Energy Conf', '2019-08-20'),
        (525, 'Covid-19 Effects', 'Health Conf', '2021-01-27'),
        (526, 'React Lifecycle', 'Js Conf', '2022-03-10'),
        (527, 'Node Js Modules', 'Js Conf', '2022-02-25'),
        (528, 'Express with Vue Ls', 'Vue Conf', '2021-08-11'),
        (529, 'React Redux', 'React Conf', '2020-06-04'),
        (530, 'Organic Foods', 'Health Conf', '2016-05-30')
    `;

  const ADD_RESEARCH_PAPERS_AUTHORS = `
    INSERT INTO 
      research_papers_authors (id,author_no, paper_id) 
    VALUES 
        (1, 100, 501),
        (3, 100, 503),
        (4, 100, 526),
        (5, 100, 529),
        (6, 101, 503),
        (7, 101, 512),
        (8, 101, 513),
        (9, 103, 502),
        (10, 103, 524),
        (11, 103, 525),
        (12, 104, 504),
        (13, 105, 505),
        (14, 105, 519),
        (15, 105, 520),
        (16, 106, 505),
        (17, 106, 507),
        (18, 108, 508),
        (19, 108, 509),
        (20, 108, 527),
        (21, 108, 528),
        (22, 109, 510),
        (23, 110, 511),
        (24, 111, 512), 
        (25, 111, 530),
        (26, 111, 513),
        (27, 112, 513),
        (28, 112, 514),
        (29, 112, 515),
        (30, 112, 516),
        (31, 113, 517),
        (32, 113, 523),
        (33, 114, 518),
        (34, 114, 521),
        (35, 114, 522)
    `;

  connection.connect();

  try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_RESEARCH_PAPERS_AUTHORS_TABLE);
    await execQuery(CANCEL_FK_CHECK);
    await execQuery(ADD_AUTHORS);
    await execQuery(ADD_RESEARCH_PAPERS);
    await execQuery(ADD_RESEARCH_PAPERS_AUTHORS);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

seedDatabase();
