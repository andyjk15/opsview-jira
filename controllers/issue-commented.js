import fs from 'fs';
import slack from 'controllers/slack';
import { getUserSlackIdFromEmail } from 'controllers/get-user';

export default function issueCommented(response) {

  // Announce what we're doing
  console.log(`- Issue commented ${new Date()}`);

  // Attempt to find a mention in the comments
  const mentionedUsers = response.comment.body.match(/(\[~.+?\])/g);

  if (mentionedUsers.length === 0) {
    console.log(`- No user mentions found ${new Date()}`);
    return false;
  }

  mentionedUsers.forEach(userEmail => {
    getUserSlackIdFromEmail(userEmail.replace(/(\[~|\])/g, ''), (err, slackId) => {
      if (err || !slackId) {
        console.log(`- No Slack ID found for email ${userEmail.replace(/(\[~|\])/g, '')} ${new Date()}`, err);
      } else {
        console.log(`- Sending message to ${userEmail.replace(/(\[~|\])/g, '')} from ${response.user.displayName} ${new Date()}`);
        slack.api('chat.postMessage', {
          text: `${response.user.displayName} mentioned you in a comment here https://opsview.atlassian.net/browse/${response.issue.key}`,
          channel: slackId,
          as_user: false,
          username: process.env.BOT_USERNAME || 'JIRA Bot',
          icon_emoji: process.env.BOT_EMOJI || ':information_source:'
        }, err => {
          if (err) {
            return console.log('Could not notify via Slack. Error:', err);
        	}
          console.log(`- Message sent successfully ${new Date()}`)
        });
      }
    });
  });
}
