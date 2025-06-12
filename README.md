# Express API Application

A simple Express.js API application with basic security and logging middleware.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
PORT=3000
NODE_ENV=development
```

## Running the Application

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Project Structure

```
.
├── src/
│   └── server.js      # Main application file
├── .env              # Environment variables (create this file)
├── package.json      # Project dependencies and scripts
└── README.md         # This file
```

## Available Scripts

- `npm start`: Run the application in production mode
- `npm run dev`: Run the application in development mode with auto-reload
- `npm test`: Run tests (when implemented)

## Dependencies

- express: Web framework
- cors: Cross-Origin Resource Sharing middleware
- helmet: Security middleware
- morgan: HTTP request logger
- dotenv: Environment variable management

## Development Dependencies

- nodemon: Auto-reload during development
- jest: Testing framework 