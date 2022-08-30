# Moodry

## About

### The story
My mother requested a data-oriented mood tracker. She wants to be able to enter a value from [bad, neutral, good] as well as an optional note, and to be able to see this data visualized in a variety of ways. The goal is to identify trends and be able to predict and prepare for bad times, as well as to take advantage of good times!

This project is a simple React app with Amplify as a back end. It is currently in active development.

### The Tech
As of the time of this writing, the app is a React PWA with a GraphQL API to access Amplify's DynamoDB. 

It is likely that as the data processing and visualization gets more complex, I will need to add an API layer between the client and server, to fetch and process data before sending to the frontend. This will probably be done through flask or express.


## Get Started

Clone the directory and treat like any react app

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

### Deployment

Create an amplify project, and run "amplify push"

