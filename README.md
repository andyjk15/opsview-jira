# opsview-jira

A Slack bot that listens to our JIRA instance and alert's assignees when something has been assigned to them or they are mentioned in a comment.

## Install
1. Clone this repo
2. Run `npm install` to install dependencies
3. Run `cp .env-sample .env` to generate a templated environment file
4. Add environment options to the `.env` file (the Slack client id, secret and callback url are only needed if you are using the OAuth2 redirect to obtain a token)
5. Point your JIRA instance to `https://<your website>/jira-webhook`. It will now start receiving POST traffic from JIRA
6. Start the server with `NODE_ENV=production node server.js`. We suggest using something like [pm2](http://pm2.keymetrics.io/) to run the server long term.
