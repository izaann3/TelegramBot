# Telegram Bot with Google Apps Script

This project uses Google Apps Script to create a Telegram bot that interacts with users through a simple command menu. The bot supports commands like `/start`, `/contact`, and `/faq`, and logs user interactions to Google Sheets.

## Features

- **/start**: Displays a welcome message and main menu with options.
- **/contact**: Sends a notification email to the support team for user assistance.
- **/faq**: Provides frequently asked questions and answers.
- **/exit**: Ends the conversation.
- Logs user interactions (ID, name, message, and date) to Google Sheets.

## Setup

1. **Set up the Google Apps Script**:
   - Create a new project in [Google Apps Script](https://script.google.com/).
   - Copy and paste the provided script into the editor.
   - Save and deploy the script as a web app.

2. **Create a Telegram Bot**:
   - Open Telegram and search for **BotFather**.
   - Use the `/newbot` command to create a new bot and get the API token.

3. **Configure the Script**:
   - Replace the `apiToken` variable with your Telegram bot token.
   - Set the `appUrl` variable to your Apps Script URL.
   - Configure your Google Sheet ID to log user interactions.

4. **Set Webhook**:
   - Run the `setWebhook()` function to connect the bot to your script.

5. **Deploy**:
   - Deploy the script as a web app and make sure it’s accessible.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
