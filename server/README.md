# CloudBlitz AI HackFest 2026 - Backend API

Backend server for managing hackathon registrations with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (Atlas account or local installation)
- npm or yarn

### Installation

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Edit `server/.env` file:
   ```env
   PORT=8080
   NODE_ENV=development
   
   # MongoDB Atlas (Cloud) - Get from https://cloud.mongodb.com
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hackathon?retryWrites=true&w=majority
   
   # OR Local MongoDB
   # MONGODB_URI=mongodb://localhost:27017/hackathon
   
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

Server will start on `http://localhost:8080`

---

## 📚 API Endpoints

### Base URL: `http://localhost:8080/api/v1`

### 1. **Create Registration**
```http
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "gender": "male",
  "college": "ABC College",
  "city": "Mumbai",
  "state": "Maharashtra",
  "course": "BTech",
  "year": "3rd Year",
  "participationType": "individual",
  "skillLevel": "Intermediate",
  "interests": ["AI / ML", "Web / App Development"],
  "referralSource": "Instagram",
  "communicationConsent": true,
  "declaration": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "registrationId": "CBZABC123XYZ",
    "name": "John Doe",
    "email": "john@example.com",
    "participationType": "individual",
    "paymentAmount": 499,
    "paymentStatus": "pending"
  }
}
```

---

### 2. **Get All Registrations** (Admin)
```http
GET /registrations?page=1&limit=10&participationType=team&paymentStatus=completed
```

**Response (200):**
```json
{
  "success": true,
  "data": [...],
  "totalPages": 5,
  "currentPage": 1,
  "total": 50
}
```

---

### 3. **Get Single Registration**
```http
GET /registrations/:id
```
Use either MongoDB `_id` or `registrationId`

**Response (200):**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### 4. **Update Payment Status**
```http
PATCH /registrations/:id/payment
Content-Type: application/json

{
  "paymentStatus": "completed"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Payment status updated",
  "data": { ... }
}
```

---

### 5. **Get Statistics**
```http
GET /stats
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "individual": 100,
    "team": 50,
    "paid": 120,
    "pending": 30
  }
}
```

---

### 6. **Health Check**
```http
GET /health
```

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-12T09:26:00.000Z"
}
```

---

## 🗄️ Database Schema

### Registration Model

```javascript
{
  // Basic Details
  name: String (required),
  email: String (required, unique),
  mobile: String (required),
  gender: String (enum),
  
  // Academic Details
  college: String (required),
  city: String (required),
  state: String (required),
  course: String (required),
  year: String (required),
  
  // Participation
  participationType: String (required: 'individual' | 'team'),
  teamName: String,
  teamMembers: [{
    name: String,
    email: String,
    mobile: String
  }],
  
  // Skills
  skillLevel: String (required),
  interests: [String],
  referralSource: String (required),
  
  // Consent
  communicationConsent: Boolean (required),
  declaration: Boolean (required),
  
  // Auto-generated
  registrationId: String (unique, auto-generated),
  paymentStatus: String (enum: 'pending' | 'completed' | 'failed'),
  paymentAmount: Number (auto-calculated: 499 or 999),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8080` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | See `.env` file |
| `CORS_ORIGIN` | Frontend URL for CORS | `http://localhost:5173` |

---

## 🧪 Testing

### Using cURL

**Create Registration:**
```bash
curl -X POST http://localhost:8080/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "mobile": "9876543210",
    "college": "Test College",
    "city": "Mumbai",
    "state": "Maharashtra",
    "course": "BTech",
    "year": "2nd Year",
    "participationType": "individual",
    "skillLevel": "Beginner / Non-Coder",
    "referralSource": "Instagram",
    "communicationConsent": true,
    "declaration": true
  }'
```

**Get Stats:**
```bash
curl http://localhost:8080/api/v1/stats
```

### Using Postman

1. Import the API endpoints
2. Set base URL: `http://localhost:8080/api/v1`
3. Test each endpoint with sample data

---

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   ├── models/
│   │   └── Registration.js   # Mongoose schema
│   ├── routes/
│   │   └── registration.js   # API routes
│   ├── middleware/
│   │   └── validation.js     # Input validation
│   └── index.js              # Main server file
├── .env                      # Environment variables
├── .gitignore
└── package.json
```

---

## 🔐 Security Features

- ✅ Input validation using express-validator
- ✅ Email uniqueness check
- ✅ CORS configuration
- ✅ Environment variable protection
- ✅ Error handling middleware
- ✅ MongoDB injection prevention (via Mongoose)

---

## 🚨 Common Issues

### MongoDB Connection Error

**Problem:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
1. Check if MongoDB is running (local)
2. Verify MongoDB Atlas connection string
3. Check network connectivity
4. Whitelist your IP in MongoDB Atlas

### CORS Error

**Problem:** `Access to fetch blocked by CORS policy`

**Solution:**
1. Verify `CORS_ORIGIN` in `.env` matches frontend URL
2. Restart backend server after changing `.env`

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::8080`

**Solution:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Or change PORT in .env
```

---

## 📊 Payment Integration

After successful registration, redirect user to payment gateway:

```javascript
// In frontend (RegisterPage.jsx)
const paymentUrl = `YOUR_PAYMENT_LINK?regId=${registrationId}&amount=${paymentAmount}`;
window.location.href = paymentUrl;
```

After payment, update status:

```javascript
// Payment callback/webhook
fetch(`http://localhost:8080/api/v1/registrations/${regId}/payment`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ paymentStatus: 'completed' })
});
```

---

## 📝 Next Steps

1. ✅ Set up MongoDB (Atlas or local)
2. ✅ Configure `.env` file
3. ✅ Install dependencies
4. ✅ Start server
5. ⏳ Test API endpoints
6. ⏳ Integrate payment gateway
7. ⏳ Deploy to production

---

## 🤝 Support

For issues or questions:
- Check the API response error messages
- Review server logs in terminal
- Verify environment variables
- Test with Postman/cURL first

---

## 📄 License

ISC
