# 🧪 Postman Testing Guide

## Quick Start

### Import Collection

1. Open Postman
2. Click **Import** button
3. Select `postman_collection.json` file
4. Collection will appear in sidebar

---

## 📋 Sample JSON Payloads

### 1. Individual Registration (₹499)

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "mobile": "9876543210",
  "gender": "male",
  "college": "ABC Institute of Technology",
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

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "registrationId": "CBZABC123XYZ",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "participationType": "individual",
    "paymentAmount": 499,
    "paymentStatus": "pending"
  }
}
```

---

### 2. Team Registration (₹999)

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "mobile": "9876543211",
  "gender": "female",
  "college": "XYZ College of Engineering",
  "city": "Pune",
  "state": "Maharashtra",
  "course": "MCA",
  "year": "2nd Year",
  "participationType": "team",
  "teamName": "Code Warriors",
  "member2Name": "Alice Johnson",
  "member2Email": "alice@example.com",
  "member2Mobile": "9876543212",
  "member3Name": "Bob Wilson",
  "member3Email": "bob@example.com",
  "member3Mobile": "9876543213",
  "member4Name": "Charlie Brown",
  "member4Email": "charlie@example.com",
  "member4Mobile": "9876543214",
  "skillLevel": "Advanced",
  "interests": ["AI / ML", "Blockchain", "DevOps"],
  "referralSource": "College / Friend",
  "communicationConsent": true,
  "declaration": true
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "registrationId": "CBZDEF456ABC",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "participationType": "team",
    "paymentAmount": 999,
    "paymentStatus": "pending"
  }
}
```

---

### 3. Beginner Registration (No-Code Track)

```json
{
  "name": "Sarah Williams",
  "email": "sarah.w@example.com",
  "mobile": "9876543215",
  "gender": "female",
  "college": "PQR University",
  "city": "Nagpur",
  "state": "Maharashtra",
  "course": "BCA",
  "year": "1st Year",
  "participationType": "individual",
  "skillLevel": "Beginner / Non-Coder",
  "interests": ["No-Code Tools", "Just Exploring"],
  "referralSource": "WhatsApp",
  "communicationConsent": true,
  "declaration": true
}
```

---

## 🧪 Testing Steps

### Step 1: Health Check
**Endpoint:** `GET http://localhost:8080/health`

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-12T09:34:27.000Z"
}
```

✅ If this works, your server is running!

---

### Step 2: Create Individual Registration
**Endpoint:** `POST http://localhost:8080/api/v1/register`

**Headers:**
```
Content-Type: application/json
```

**Body:** Use Individual Registration JSON above

**What to Check:**
- ✅ Status code: 201
- ✅ Response has `registrationId`
- ✅ `paymentAmount` is 499
- ✅ `paymentStatus` is "pending"

---

### Step 3: Create Team Registration
**Endpoint:** `POST http://localhost:8080/api/v1/register`

**Body:** Use Team Registration JSON above

**What to Check:**
- ✅ Status code: 201
- ✅ `paymentAmount` is 999
- ✅ Team name is saved

---

### Step 4: Get All Registrations
**Endpoint:** `GET http://localhost:8080/api/v1/registrations?page=1&limit=10`

**Expected Response:**
```json
{
  "success": true,
  "data": [...],
  "totalPages": 1,
  "currentPage": 1,
  "total": 2
}
```

---

### Step 5: Get Single Registration
**Endpoint:** `GET http://localhost:8080/api/v1/registrations/{registrationId}`

Replace `{registrationId}` with ID from Step 2 response

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "registrationId": "CBZABC123XYZ",
    "name": "John Doe",
    ...
  }
}
```

---

### Step 6: Update Payment Status
**Endpoint:** `PATCH http://localhost:8080/api/v1/registrations/{registrationId}/payment`

**Body:**
```json
{
  "paymentStatus": "completed"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Payment status updated",
  "data": {
    "registrationId": "CBZABC123XYZ",
    "paymentStatus": "completed",
    ...
  }
}
```

---

### Step 7: Get Statistics
**Endpoint:** `GET http://localhost:8080/api/v1/stats`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "total": 2,
    "individual": 1,
    "team": 1,
    "paid": 1,
    "pending": 1
  }
}
```

---

## ❌ Error Testing

### Test 1: Duplicate Email
Try registering with same email twice

**Expected Response (400):**
```json
{
  "success": false,
  "message": "This email is already registered"
}
```

---

### Test 2: Missing Required Field
Remove `name` from JSON

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    }
  ]
}
```

---

### Test 3: Invalid Email Format
Use email: `"invalid-email"`

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

---

### Test 4: Invalid Mobile Number
Use mobile: `"123"`

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "mobile",
      "message": "Please provide a valid 10-digit mobile number"
    }
  ]
}
```

---

## 📊 Field Validation Rules

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | String | Yes | Min 2 characters |
| email | String | Yes | Valid email format, unique |
| mobile | String | Yes | 10+ digits |
| gender | String | No | male/female/prefer-not-to-say |
| college | String | Yes | - |
| city | String | Yes | - |
| state | String | Yes | Indian state |
| course | String | Yes | BE/BTech/BCA/BCS/BSc (CS)/MCA/Other |
| year | String | Yes | 1st-4th Year/Passout |
| participationType | String | Yes | individual/team |
| teamName | String | Conditional | Required if team |
| member2Name/Email/Mobile | String | Conditional | Required if team |
| member3/4 | String | No | Optional team members |
| skillLevel | String | Yes | Beginner/Basic/Intermediate/Advanced |
| interests | Array | No | Multiple selections allowed |
| referralSource | String | Yes | Instagram/WhatsApp/etc. |
| communicationConsent | Boolean | Yes | Must be true |
| declaration | Boolean | Yes | Must be true |

---

## 🔍 Troubleshooting

### Server Not Responding
- Check if server is running: `cd server && npm run dev`
- Verify port 8080 is not in use
- Check MongoDB connection in terminal

### MongoDB Connection Error
- Verify `MONGODB_URI` in `server/.env`
- Check MongoDB Atlas IP whitelist
- Ensure MongoDB service is running (if local)

### CORS Error (if testing from browser)
- Verify `CORS_ORIGIN` in `server/.env`
- Should match frontend URL

---

## 📝 Quick Copy-Paste Commands

### cURL Individual Registration
```bash
curl -X POST http://localhost:8080/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "mobile": "9876543210",
    "gender": "male",
    "college": "ABC Institute of Technology",
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
  }'
```

### cURL Team Registration
```bash
curl -X POST http://localhost:8080/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "mobile": "9876543211",
    "gender": "female",
    "college": "XYZ College of Engineering",
    "city": "Pune",
    "state": "Maharashtra",
    "course": "MCA",
    "year": "2nd Year",
    "participationType": "team",
    "teamName": "Code Warriors",
    "member2Name": "Alice Johnson",
    "member2Email": "alice@example.com",
    "member2Mobile": "9876543212",
    "skillLevel": "Advanced",
    "interests": ["AI / ML", "Blockchain"],
    "referralSource": "College / Friend",
    "communicationConsent": true,
    "declaration": true
  }'
```

---

## ✅ Success Checklist

- [ ] Health check returns 200
- [ ] Individual registration creates record
- [ ] Team registration creates record
- [ ] Duplicate email is rejected
- [ ] Missing fields are validated
- [ ] Invalid email format is rejected
- [ ] Get all registrations works
- [ ] Get single registration works
- [ ] Payment status update works
- [ ] Statistics endpoint works

---

Happy Testing! 🚀
