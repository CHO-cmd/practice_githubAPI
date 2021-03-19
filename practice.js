require("dotenv").config();
const axios = require("axios");

// https://api.github.com/graphql

async function countIssues(githubID) {
  const url = "https://api.github.com/graphql";
  // const owner = "codestates";
  // const name = "help-desk";

  let query = `query { 
    repository (owner:"codestates", name:"help-desk") { 
      issues(filterBy: {createdBy: "${githubID}"}) {
        totalCount
      } 
    }
  }`;

  let what = await axios.post(url, {
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "applicaiton/json",
    },
    body: JSON.stringify({ query }),
  });

  console.log(what);
}

countIssues("CHO-cmd");
