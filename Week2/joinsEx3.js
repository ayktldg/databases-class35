import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
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

const GET_AUTHORS_MENTORS = `
  SELECT 
  a.author_no, m.author_name AS author ,a.author_name AS mentor
FROM
  authors a
INNER JOIN authors m ON 
  a.author_no = m.mentor;
`;

const GET_AUTHORS_AND_PAPERS = `
SELECT 
  authors.*, research_papers.paper_title 
FROM 
  authors 
LEFT JOIN 
  research_papers_authors 
ON 
  research_papers_authors.author_no = authors.author_no left
JOIN 
  research_papers 
ON 
  research_papers_authors.paper_id = research_papers.paper_id;`;

execQuery(GET_AUTHORS_MENTORS);
execQuery(GET_AUTHORS_AND_PAPERS);

connection.end();
