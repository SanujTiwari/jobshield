# JobShield AI

## Overview

JobShield AI is a web application that helps users identify potentially fraudulent job postings using AI-powered risk analysis. The platform analyzes job descriptions, company information, and suspicious patterns to generate a risk score and provide detailed reasons for the assessment.

The goal of JobShield AI is to help job seekers avoid scams and make safer career decisions.

## Features

* User Registration and Login
* Secure Authentication using JWT
* Job Posting Analysis
* AI-Powered Risk Detection
* Risk Score Generation
* Risk Level Classification (Low, Medium, High)
* Detailed Scam Indicators and Reasons
* Analysis History
* Dashboard with Statistics
* Responsive User Interface

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Authentication

* JWT (JSON Web Token)
* bcrypt

## Project Structure

```text
JobShield/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── config/
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd JobShield
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

The backend will run on:

```text
http://localhost:5000
```

## Risk Analysis Logic

JobShield AI evaluates job postings using multiple indicators, including:

* Registration or application fees
* Suspicious urgency phrases
* Generic email domains
* Unrealistic salary claims
* Missing company information
* Scam-related keywords

Based on detected indicators, the system generates:

* Risk Score
* Risk Level
* Detailed Analysis Report

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

### Job Analysis

#### Analyze Job

```http
POST /api/jobs/analyze
```

#### Get Dashboard Statistics

```http
GET /api/jobs/stats
```

## Future Enhancements

* Google Authentication
* Resume Scanner
* Company Reputation Checker
* AI Chat Assistant
* Browser Extension
* Job Bookmarking
* Email Scam Detection
* Real-time Scam Reporting

## Screenshots

Add screenshots of:

* Login Page
* Register Page
* Dashboard
* Job Analysis Results

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Create a Pull Request

## License

This project is developed for educational and portfolio purposes.

## Author

Sonu

Computer Science Engineering Student

Full Stack Developer
