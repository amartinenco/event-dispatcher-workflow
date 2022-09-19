require('dotenv').config();
const axios = require('axios');

async function run() {
  
  const REPO_OWNER = process.env.owner;
  const REPO_NAME = process.env.repo;
  const GITHUB_TOKEN = process.env.token;
  const JOB_NAME = process.env.job_name;

  let payload = {
    event_type: JOB_NAME
  };

  const dispatchUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`;
  console.log(`Dispatching ${dispatchUrl} with paylaod`, payload);
  const res = await axios.post(dispatchUrl, payload, {
      headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json"
      }
  });
  
  return res.status;
}

run().then(() => console.log('Completed running command')).catch(e => {
  console.log(e.message);
  process.exit(1);
});