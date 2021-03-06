require("dotenv").config();
const axios = require("axios");

async function countIssues(githubID) {
  const url = "https://api.github.com/graphql";

  let query1 = `query { 
    repository (owner:"codestates", name:"pre-help-desk") {
      issues(filterBy: {createdBy: "${githubID}"}) {
        totalCount
      } 
    }
  }`;

  let query2 = `query { 
    repository (owner:"codestates", name:"help-desk") {
      issues(filterBy: {createdBy: "${githubID}"}) {
        totalCount
      } 
    }
  }`;

  let preHDIssueCount = await axios.post(url, {
    Headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "applicaiton/json",
    },
    body: JSON.stringify({ query1 }),
  });

  let HDIssueCount = await axios.post(url, {
    Headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "applicaiton/json",
    },
    body: JSON.stringify({ query2 }),
  });

  return {
    preHelpDeskCount: preHDIssueCount,
    helpDeskCount: HDIssueCount,
    total: preHDIssueCount + HDIssueCount,
  };
}

// start
countIssues("CHO-cmd");
