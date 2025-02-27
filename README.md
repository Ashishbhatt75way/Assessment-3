# URL Shortener with AI-Based Phishing Detection

## Overview
This project is a **React-based URL Shortener** that integrates an **AI-powered phishing and spam detection system** to ensure users do not shorten malicious URLs. It uses **natural.js** for model deployment in the backend.

##  Features
- **Shorten URLs** quickly and efficiently.
- **Generates QR Code** 
- **AI-Based Phishing Detection** before shortening.
- **Prevents malicious/scam URLs** from being shortened.
- **User-friendly React UI**.
- **Fast and secure backend** integration.

---

## Tech Stack
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

### **Backend (FAST API)**
- Python
- FastAPI
- uvicorn
---

## Installation
### Clone the Repository
```bash
git clone https://github.com/Ashishbhatt75way/Assessment-3.git
cd Assessment-3
```

### Install Dependencies
#### **frontend**
```bash
cd frontend
npm install --force
```
#### **backend**
```bash
cd backend
npm install
```
#### **python-backend**
```bash
cd python-backend
pip install -r requirements.txt
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
#### **Run Python-Backend**
```bash
uvicorn app:app --reload
```
#### **Run JSON-Server**
```bash
cd frontend

json-server --watch db.json --port 5000
```
---

## How It Works
1. **User enters a URL** in the input field.
2. **AI Model analyses the URL** (detects if it's phishing/malware/defacement/benign).
3. If **safe**, the URL is shortened and stored in the db.json file which is from json-server.
4. If **malicious**, an alert is shown.
5. The shortened URL is provided for safe sharing.
---

## AI Model Training & Deployment
### Training the Model (Using )
1. Collect phishing & safe URL datasets.
2. Extract features (length, special chars, domain age, etc.).
3. Train a binary classification model.
4. Export the trained model (`eTc.sav`).
5. Model link:
```
https://colab.research.google.com/drive/1PAj-A7dzVw4NUJ4_xHCcUvRsTvJktMFu?usp=sharing 
```
---

## API Endpoints
### Shorten URL
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
  "shortUrl": "http://lh:5000/abc123"
}
```

### Check Phishing Before Shortening
```http
POST http://localhost:8000/predict
```
**Request Body:**
```json
{
  "url": "http://www.fake-link.com"
}
```
**Response:**
```json
{
  "url": "http://www.fake-link.com",
  "prediction": "phishing"
}
```