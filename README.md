# JobShield

> **Detect scams before they cost you.**

## Overview

JobShield is a multi-type scam detection and prevention platform designed to protect users from fraudulent job postings, recruiter impersonations, upfront payment scams, phishing messages, and malicious URLs. The platform evaluates multi-source indicators, normalizes risk scores (0–100), categorizes risk factors, and provides plain-language explanations and targeted recommendations.

## Core Scanners & Capabilities

* **Job Scam Scanner**: Analyzes job descriptions, compensation, and employer details.
* **Message Scam Scanner**: Evaluates recruiter messages, SMS, WhatsApp, and email copy for urgency and phishing indicators.
* **Payment Scam Scanner**: Checks registration fees, security deposits, and advance payment requests.
* **Recruiter Scanner**: Inspects recruiter names, email domains, profile URLs, and company matches.
* **Company Verification**: Assesses company domain age, registration credentials, and authenticity status.
* **URL Scanner**: Evaluates technical link structure, HTTPS validity, and domain mismatches.
* **Scan History & Dashboard V2**: Comprehensive tracking, metrics, and distribution charts.
* **Scam Reporting & Safety Center**: Community fraud reporting and educational safety guides.
* **Resume Match**: AI-powered resume compatibility analysis against job postings.
* **AI Chat Assistant**: Context-aware chatbot for scam identification guidance.

## Tech Stack

### Frontend

* React.js (with Vite)
* Vanilla CSS (custom design system with CSS variables)
* Framer Motion (animations)
* React Router v6
* Lucide React (icons)

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Authentication

* JWT (JSON Web Token)
* bcrypt
* Google OAuth 2.0

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

## Author

Sanuj Tiwari

Computer Science Engineering Student

Full Stack Developer
