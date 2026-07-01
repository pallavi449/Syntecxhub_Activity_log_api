# User Activity Tracker API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** that records user activities in an audit trail. The project uses JWT Authentication, Role-Based Access Control, and Swagger UI for interactive API documentation.

---

## Features

- User Registration
- User Login (JWT Authentication)
- Update User
- Delete User
- Activity Log / Audit Trail
- Filter Logs by User, Action, and Date
- Admin-only Log Access
- MongoDB Database
- Swagger API Documentation

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Swagger UI
- bcrypt.js

---

## Installation

```bash
git clone <repository-url>
cd user-activity-tracker
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Run the server:

```bash
npm start
```

or

```bash
npm run dev
```

---

## API Documentation

Swagger UI:

```
http://localhost:5000/api-docs
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register User |
| POST | `/api/users/login` | Login User |
| PUT | `/api/users/:id` | Update User |
| DELETE | `/api/users/:id` | Delete User |
| GET | `/api/logs` | Get Activity Logs (Admin Only) |

---

## Project Structure

```
user-activity-tracker
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env
├── server.js
├── package.json
└── README.md
```

---

## Author

**Pallavi Kumari**
