# TriviaGeek

Mobile quiz application testing your trivia knowledge

To use a deployed version of the app, please visit the site here to download and use via Expo. Otherwise, see instructions below for setting up on a local machine.

https://exp.host/@jschwantz/triviageek

Web version coming soon

## Installation

After forking/cloning the repo, to install dependencies run, both the webserver and the expo client:

```bash
npm install

cd ../rn-client
npm install
```
With postgres installed on your machine, the db needs to be created:

```bash
createdb triviageek
```

## Usage 
This will open a browser window from Expo, that will allow you to open the app in either an Android or iOS simulator. To get the experience on your phone, download Expo Client from the App Store (available on both platforms) and scan the QR code. Please note the change potentially needed to the apiUrl in the file above if using directly on your phone.

## Technologies Used

  * Apollo Server
  * Apollo Client
  * React Native
  * PostgreSQL
  * Sequelize
  * Node
  * Express
  * jservice.io
