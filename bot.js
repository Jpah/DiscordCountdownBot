const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', message => {
  if (message.content.startsWith('!countdown')) {
    // Extract the countdown timestamp from the command
    const countdownTimestamp = parseInt(message.content.split(' ')[1]);

    // Check if a valid timestamp is provided
    if (isNaN(countdownTimestamp)) {
      return message.channel.send('Please provide a valid UTC timestamp!');
    }

    // Function to calculate and send the countdown message
    const sendCountdownMessage = () => {
      const currentTime = new Date();
      const countdownDateTime = new Date(countdownTimestamp);

      // Check if the specified date is reached
      if (currentTime >= countdownDateTime) {
        clearInterval(interval);
        return message.channel.send('Countdown has reached the specified date. Updates stopped.');
      }

      // Convert milliseconds to a readable format
      const timeRemaining = countdownDateTime - currentTime;
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

      // Display the updated countdown
      const countdownMessage = `Countdown to ${countdownDateTime.toUTCString()}: ${days}d ${hours}h ${minutes}m`;
      message.channel.send(countdownMessage);
    };

    // Send the initial countdown message
    sendCountdownMessage();

    // Set up an interval to update the countdown every minute (adjust as needed)
    const interval = setInterval(sendCountdownMessage, 60000); // 60000 milliseconds = 1 minute
  }
});

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
client.login(process.env.DISCORD_TOKEN);
