# URL Shortener Frontend

## Description
A frontend application to shorten long URLs, manage them, and analyze click statistics.

## Features
- Simple input form for URL shortening.
- Dashboard to manage generated short URLs.
- Click tracking analytics (e.g., location, browser, device).
- Expiration dates for URLs.
- QR code generation for short links.

## Tech Stack
- **Frontend:** React, HTML, CSS, JavaScript, Tailwind CSS
- **Backend (Mock API):** JSON Server
- **Backend (User Authentication):** Node.js, Express.js, JWT, bcrypt, MongoDB

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Setup

#### 1. Clone the Repository
```sh
git clone https://github.com/Ashishbhatt75way/URL-Shortner.git
cd URL-Shortner 
cd frontend
```

#### 2. Install Dependencies
```sh
npm install --force  
```

#### 3. Start the Frontend
```sh
npm run dev 
```

The application will run on `http://localhost:5174`.

## Setting Up JSON Server
A JSON server is used as a mock backend for storing short URLs.

#### 1. Install JSON Server
```sh
npm install -g json-server
```

#### 2. Create `db.json`
Inside the project root, create a file named `db.json` and add the following:
```json
{
  "urls": [
    {
      "id": 1,
      "longUrl": "https://example.com",
      "shortUrl": "https://short.ly/abc123",
      "clicks": 10,
      "createdAt": "2024-02-20T12:00:00Z"
    }
  ]
}
```

#### 3. Start the JSON Server
```sh
json-server --watch db.json --port 5000
```

The mock API will be available at `http://localhost:5000/urls`.

## Setting Up Backend Server for User Authentication
A backend server is required for handling user authentication, including signup, login, and token-based authentication.

#### 1. Set Up Backend Project
```sh
git clone https://github.com/Ashishbhatt75way/URL-Shortner-Backend.git
cd url-shortener-backend
npm install
```

#### 2. Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT = 8000
JWT_ACCESS_SECRET = "TOP_SECRET"
JWT_REFRESH_SECRET = "TOP_SECRET"
MONGODB_URI = "mongodb://localhost:27017/"
```

#### 3. Start the Backend Server
```sh
npm run local
```

The backend API will be available at `http://localhost:4000`.

