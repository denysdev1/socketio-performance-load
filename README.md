# 🔥 Performance Load

Welcome to the Performance Load App! This application allows you to monitor the performance metrics of connected devices in real-time. It uses React for the front-end and Socket.IO for real-time communication with a Node.js server.

It needs to be run locally in order to get info about the OS.

## Tech Stack

JavaScript, React, Bootstrap, Socket.IO, Express

## Run Locally

Clone the project

```bash
  git clone git@github.com:denysdev1/socketio-performance-load.git
```

Go to the project directory

```bash
  cd socketio-performance-load
```

Install dependencies for each directory

```bash
  npm install
```

Start every directory server

```bash
  npm run dev (on client) || npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

In **server** directory:

`CLIENT_URL`

`SERVER_PORT`

In **nodeClient** directory:

`SERVER_URL`

In **client** directory:

`VITE_SERVER_URL`
