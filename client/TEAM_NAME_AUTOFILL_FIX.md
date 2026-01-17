# Easebuzz Team Name Auto-Fill - Troubleshooting

## 🔍 Issue
Team Name field is not auto-filling on Easebuzz payment page.

## 🧪 Current Implementation

We're trying multiple parameter name variations:

```javascript
if (participationType === 'team' && teamName) {
  urlParams.teamName = teamName;
  urlParams.team_name = teamName;
  urlParams['Team Name'] = teamName;
  urlParams.udf1 = teamName; // User Defined Field
}
```

**Generated URL Example:**
```
https://smartpay.easebuzz.in/142077/Team_HackFest2026?
  name=Jane+Smith&
  email=jane@example.com&
  phone=9876543211&
  amount=999&
  txnid=CBZDEF456ABC&
  teamName=Code+Warriors&
  team_name=Code+Warriors&
  Team+Name=Code+Warriors&
  udf1=Code+Warriors
```

---

## 🔧 Next Steps to Fix

### Option 1: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Submit team registration
4. Look for "Payment URL:" log
5. Copy the full URL
6. Check if team name is in the URL

### Option 2: Contact Easebuzz Support

Ask Easebuzz:
1. **What is the exact parameter name** for "Team Name" field?
2. **Does the payment page support URL parameters** for auto-fill?
3. **Are there User Defined Fields (UDF)** we can use?

Common UDF parameter names:
- `udf1`, `udf2`, `udf3`, `udf4`, `udf5`
- `productinfo`
- `custom_field`

### Option 3: Use Easebuzz API

Instead of URL parameters, use Easebuzz Payment Initiation API:

```javascript
// Backend endpoint
POST /api/v1/initiate-payment

// Request
{
  "registrationId": "CBZDEF456ABC",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543211",
  "amount": 999,
  "teamName": "Code Warriors"
}

// Response from Easebuzz
{
  "payment_url": "https://easebuzz.in/pay/xyz123",
  "access_key": "..."
}
```

Then redirect to the payment URL returned by Easebuzz.

---

## 📞 Recommended Action

**Contact Easebuzz support** and ask:

> "We're using SmartPay links for our hackathon registration:
> - Individual: https://smartpay.easebuzz.in/142077/Indi_HackFest2026
> - Team: https://smartpay.easebuzz.in/142077/Team_HackFest2026
> 
> We need to auto-fill the 'Team Name' field. What URL parameter name should we use?
> 
> We've tried: teamName, team_name, Team Name, udf1
> 
> Can you provide the correct parameter name or suggest an alternative approach?"

---

## 🎯 Temporary Workaround

If auto-fill doesn't work, users will need to manually enter team name on payment page. The data is still saved in your database, so you have it for records.

---

## ✅ What's Working

- ✅ Name auto-fills
- ✅ Email auto-fills
- ✅ Phone auto-fills
- ✅ Amount auto-fills (999)
- ❌ Team Name doesn't auto-fill (needs Easebuzz parameter name)

---

**Check the browser console for the generated URL and share it with Easebuzz support to get the correct parameter name.**
