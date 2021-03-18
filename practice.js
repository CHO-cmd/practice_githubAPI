require("dotenv").config();
const axios = require("axios");

// https://api.github.com/graphql

async function getData() {
  const endpoint = "https://api.github.com/graphql";
  const query = `query { 
    repository (owner:"codestates", name:"help-desk") { 
      issues {
        totalCount
      }
    }
  }`;

  // query {
  //   repository (owner:"codestates", name:"help-desk") {
  //     issue {
  //       author {
  //         login(:"CHO-cmd")
  //       }
  //     }
  //   }
  // }

  let what = await axios.get(endpoint, {
    headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}` },
    body: JSON.stringify({ query }),
  });

  console.log(what);
}

getData();
