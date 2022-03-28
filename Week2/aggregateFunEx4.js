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

const GET_RESEARCH_PAPERS_AND_NUMBER_OF_AUTHORS = `
SELECT 
    research_papers.paper_title, count(research_papers_authors.author_no) AS number_of_authors 
FROM 
    research_papers 
JOIN 
    research_papers_authors 
ON 
    research_papers.paper_id = research_papers_authors.paper_id 
GROUP BY 
    research_papers.paper_title;
`;

const GET_RESEARCH_PAPERS_PUBLISHED_BY_FEMALES = `
SELECT 
    gender, COUNT(research_papers_authors.paper_id) AS sum_of_published_papers
FROM 
    authors 
JOIN 
    research_papers_authors 
ON 
    research_papers_authors.author_no = authors.author_no 
GROUP BY 
    gender 
HAVING 
    gender = 'f';
  `;

const GET_AVG_OF_H_INDEX_BY_PER_UNIVERSITY = `
SELECT 
    university, AVG(h_index) AS average_h_index 
FROM
    authors 
GROUP BY
    university;
  `;

const GET_SUM_OF_RESEARCH_PAPERS_OF_AUTHORS_BY_PER_UNIVERSITY = `
SELECT 
    university, COUNT(research_papers_authors.paper_id) AS sum_of_research_papers 
FROM
    authors 
JOIN 
    research_papers_authors 
ON 
    research_papers_authors.author_no = authors.author_no 
GROUP BY 
    university;
  `;

const GET_MIN_MAX_H_INDEX_BY_PER_UNIVERSITY = `
SELECT 
    university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
FROM
    authors 
GROUP BY 
    university;
  `;

execQuery(GET_RESEARCH_PAPERS_AND_NUMBER_OF_AUTHORS);
execQuery(GET_RESEARCH_PAPERS_PUBLISHED_BY_FEMALES);
execQuery(GET_AVG_OF_H_INDEX_BY_PER_UNIVERSITY);
execQuery(GET_SUM_OF_RESEARCH_PAPERS_OF_AUTHORS_BY_PER_UNIVERSITY);
execQuery(GET_MIN_MAX_H_INDEX_BY_PER_UNIVERSITY);

connection.end();
