# Lovable Open Backend

Backend API for Lovable Open, built with Node.js, Express, and MongoDB.

## Setup

1. Copy `.env.example` to `.env` and set your variables.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

## Folder Structure

- `src/models/` – Mongoose schemas
- `src/controllers/` – Route logic
- `src/routes/` – API endpoints
- `src/middleware/` – Auth middleware
- `src/socket.js` – Real-time server
- `src/index.js` – App entry
