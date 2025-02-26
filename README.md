# 🚀 URL Shortener with AI-Based Phishing Detection

## 📌 Overview
This project is a **React-based URL Shortener** that integrates an **AI-powered phishing and spam detection system** to ensure users do not shorten malicious URLs. It uses **natural.js** for model deployment in the backend.

## 🔥 Features
- **Shorten URLs** quickly and efficiently.
- **Generates QR Code** 
- **AI-Based Phishing Detection** before shortening.
- **Prevents malicious/scam URLs** from being shortened.
- **User-friendly React UI**.
- **Fast and secure backend** integration.

---

## 🏗 Tech Stack
### **Frontend (React.js)**
- React.js
- Tailwind CSS (for styling)
- React Query (for API calls)
- React Router (for navigation)

### **Backend (Node.js & Express.js)**
- Node.js
- Express.js
- JSON Server (for storing shortened URLs)
- JWT Authentication

### **AI Model**
- Natural.js (for model training)

---

## Installation
### Clone the Repository
```bash
git clone https://github.com/Ashishbhatt75way/Assessment-3.git
cd Assessment-3
```

### Install Dependencies
#### **Frontend**
```bash
cd frontend
npm install --force
```
#### **Backend**
```bash
cd backend
npm install
```

### Start the Project
#### **Run Frontend**
```bash
npm run dev
```
#### **Run Backend**
```bash
npm run local
```

---

## How It Works
1️⃣ **User enters a URL** in the input field.
2️⃣ **AI Model analyses the URL** (detects if it's phishing/malware/defacement/benign).
3️⃣ If **safe**, the URL is shortened and stored in the database.
4️⃣ If **malicious**, an alert is shown.
5️⃣ The shortened URL is provided for safe sharing.

---

## AI Model Training & Deployment
### ** Training the Model (Using natural.js)**
1. Collect phishing & safe URL datasets.
2. Extract features (length, special chars, domain age, etc.).
3. Train a binary classification model.
4. Export the trained model (`model.json`).


---

## API Endpoints
### ** Shorten URL**
```http
POST /api/urls
```
**Request Body:**
```json
{
  "originalUrl": "https://example.com"
}
```
**Response:**
```json
{
  "shortUrl": "http://localhost:5173/abc123"
}
```

### ** Check Phishing Before Shortening**
```http
POST /api/models/predict
```
**Request Body:**
```json
{
  "url": "http://suspicious-site.com"
}
```
**Response:**
```json
{
  "data": malware,
  "success": true
}
```