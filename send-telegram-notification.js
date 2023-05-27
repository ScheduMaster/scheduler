const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

async function sendTelegramMessage(repository, actor, eventName) {
  const markdownTemplate = await readFileAsync('message-template.md', 'utf8');

  const message = markdownTemplate
    .replace('{{repository}}', repository)
    .replace('{{actor}}', actor)
    .replace('{{eventName}}', eventName)
    .replace('{{time}}', new Date().toISOString());

  const requestBody = {
    chat_id: process.env.TELEGRAM_TO,
    text: message,
    parse_mode: 'Markdown',
  };

  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`;

  try {
    await axios.post(url, requestBody);
    console.log('Telegram message sent successfully!');
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
}

sendTelegramMessage(process.argv[2], process.argv[3], process.argv[4]);
