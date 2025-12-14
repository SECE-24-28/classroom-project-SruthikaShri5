# Day 11 - Backend Setup with Express.js and MongoDB

## Project Structure

```
day11/
├── config/
│   └── database.js          → MongoDB connection configuration
├── models/
│   ├── User.js             → User schema with validation
│   └── Plan.js             → Plan schema for recharge plans
├── routes/
│   └── userRoutes.js       → API route definitions
├── controllers/
│   └── userController.js   → Request handling logic
├── server.js               → Main Express server file
├── package.json            → Project dependencies
└── README.md              → Project documentation
```

## Folder Purpose

- **config/**: Database configuration and connection setup
- **models/**: Mongoose schemas and data models
- **routes/**: API endpoint definitions and routing
- **controllers/**: Business logic and request handlers
- **server.js**: Main application entry point

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. **Option A: Test without MongoDB**
   ```bash
   node test-server.js
   ```

3. **Option B: Run with MongoDB (requires local MongoDB)**
   - Start MongoDB service
   - Run: `npm run dev`

4. **Option C: Use MongoDB Atlas**
   - Update `config/database-atlas.js` with your connection string
   - Change import in `server.js` to use `database-atlas.js`

5. Test the API:
   - Browser: http://localhost:5000
   - API Test: http://localhost:5000/api/test
   - User Routes: http://localhost:5000/api/users/test

## Dependencies

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **nodemon**: Development tool for auto-restart

## Database Connection

- Local MongoDB: `mongodb://localhost:27017/mobile_recharge`
- Connection includes error handling and success logging

## Models Created

### User Schema
- name (required, string)
- email (required, unique, lowercase)
- mobile (required, unique, 10-digit validation)
- password (required, minimum 6 characters)
- timestamps (createdAt, updatedAt)

### Plan Schema
- type (required, enum: prepaid/postpaid)
- price (required, minimum 1)
- validity (required, string)
- data (required, string)
- description (required, string)
- timestamps (createdAt, updatedAt)