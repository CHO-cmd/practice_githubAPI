require("dotenv").config();
const axios = require("axios");

// https://api.github.com/graphql

async function getData() {
  let what = await axios.get("https://api.github.com/graphql", {
    headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}` },
  });

  console.log(what);
}

getData();
