const core = require('@actions/core');
const { Octokit } = require('octokit');
const TelegramBot = require('node-telegram-bot-api');

async function run() {
  try {
    const recipients = core.getInput('recipients').split(',');
    const telegramToken = core.getInput('telegram_token');
    const message = core.getInput('message');
  
    // Send the Telegram message to each recipient
    const bot = new TelegramBot(telegramToken);
    recipients.forEach((recipient) => {
      bot.sendMessage(recipient.trim(), message, { parse_mode: 'Markdown' });
    });
  
    console.log('Telegram notifications sent successfully!');
  } catch (error) {
    core.setFailed(`Error sending Telegram notifications: ${error.message}`);
  }
}

run();
