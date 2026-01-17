# Payment Integration Guide

## 💳 Payment Links

Your hackathon uses **Easebuzz** payment gateway with two separate payment links:

### Individual Registration (₹499)
```
https://smartpay.easebuzz.in/142077/Indi_HackFest2026
```

### Team Registration (₹999)
```
https://smartpay.easebuzz.in/142077/Team_HackFest2026
```

---

## 🔄 Current Flow

1. **User fills 5-step registration form**
2. **Frontend validates data**
3. **Submits to backend** → `POST /api/v1/register`
4. **Backend saves to MongoDB** → Generates registration ID
5. **Returns success response** with registration data
6. **Frontend shows success alert** with registration ID
7. **Automatic redirect** to appropriate payment link:
   - Individual → Indi_HackFest2026
   - Team → Team_HackFest2026

---

## 📝 Implementation Details

### Frontend Code (RegisterPage.jsx)

```javascript
if (response.ok && data.success) {
  // Show success message
  alert(
    `✅ Registration Successful!\n\n` +
    `Registration ID: ${data.data.registrationId}\n` +
    `Name: ${data.data.name}\n` +
    `Payment Amount: ₹${data.data.paymentAmount}\n\n` +
    `Redirecting to payment page...`
  );

  // Redirect based on participation type
  const paymentUrl = data.data.participationType === 'individual'
    ? 'https://smartpay.easebuzz.in/142077/Indi_HackFest2026'
    : 'https://smartpay.easebuzz.in/142077/Team_HackFest2026';
  
  window.location.href = paymentUrl;
}
```

---

## 🔗 Payment Callback (Optional Enhancement)

If Easebuzz supports webhooks/callbacks, you can update payment status automatically:

### 1. Create Callback Endpoint

Add to `server/src/routes/registration.js`:

```javascript
// POST /api/v1/payment-callback
router.post('/payment-callback', async (req, res) => {
  try {
    const { registrationId, paymentStatus, transactionId } = req.body;
    
    // Verify payment with Easebuzz (if they provide verification API)
    
    // Update registration
    const registration = await Registration.findOneAndUpdate(
      { registrationId },
      { 
        paymentStatus: 'completed',
        transactionId,
        paidAt: new Date()
      },
      { new: true }
    );
    
    // Send confirmation email (optional)
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### 2. Configure Easebuzz Webhook

In Easebuzz dashboard:
- Set webhook URL: `https://your-domain.com/api/v1/payment-callback`
- Configure to send: registration ID, payment status, transaction ID

---

## 📊 Payment Status Tracking

### Database Fields

Each registration has:
```javascript
{
  registrationId: "CBZABC123XYZ",
  paymentStatus: "pending" | "completed" | "failed",
  paymentAmount: 499 or 999,
  transactionId: "TXN123456", // Added after payment
  paidAt: Date // Added after payment
}
```

### Manual Status Update

If webhook is not available, update manually via API:

```bash
curl -X PATCH http://localhost:8080/api/v1/registrations/CBZABC123XYZ/payment \
  -H "Content-Type: application/json" \
  -d '{"paymentStatus": "completed"}'
```

---

## 🎯 User Journey

### Successful Payment
```
1. User completes form
   ↓
2. Registration saved (status: pending)
   ↓
3. Redirected to Easebuzz
   ↓
4. User pays ₹499 or ₹999
   ↓
5. Easebuzz processes payment
   ↓
6. (Optional) Webhook updates status to "completed"
   ↓
7. User redirected back to your site (if configured)
   ↓
8. Show success page with registration ID
```

### Failed Payment
```
1. User completes form
   ↓
2. Registration saved (status: pending)
   ↓
3. Redirected to Easebuzz
   ↓
4. Payment fails/cancelled
   ↓
5. User can retry payment using registration ID
```

---

## 🔐 Security Considerations

### Current Implementation
- ✅ Registration data saved before payment
- ✅ Unique registration ID generated
- ✅ Payment amount auto-calculated (₹499/₹999)
- ✅ Cannot change amount on frontend

### Recommended Enhancements
1. **Payment Verification**: Verify payment status with Easebuzz API
2. **Webhook Signature**: Validate webhook requests from Easebuzz
3. **Duplicate Prevention**: Check if registration already paid
4. **Timeout Handling**: Mark pending payments as expired after X hours

---

## 📧 Post-Payment Actions (Optional)

After successful payment, you can:

1. **Send Confirmation Email**
   - Registration ID
   - Payment receipt
   - Event details
   - Next steps

2. **Generate Certificate**
   - Participation certificate
   - Store in database

3. **Add to WhatsApp Group**
   - Send group link via email
   - Or add automatically via API

4. **Update Dashboard**
   - Show in admin panel
   - Update statistics

---

## 🧪 Testing Payment Flow

### Test Registration
1. Fill form with test data
2. Submit registration
3. Note the registration ID from alert
4. You'll be redirected to Easebuzz
5. Use Easebuzz test mode (if available)

### Verify in Database
```bash
# Get registration
curl http://localhost:8080/api/v1/registrations/CBZABC123XYZ

# Check payment status
# Should show: "paymentStatus": "pending"
```

### Manual Status Update (for testing)
```bash
curl -X PATCH http://localhost:8080/api/v1/registrations/CBZABC123XYZ/payment \
  -H "Content-Type: application/json" \
  -d '{"paymentStatus": "completed"}'
```

---

## 📱 Success Page (Optional Enhancement)

Create a success page to show after payment:

### Route: `/payment-success`

```jsx
// src/pages/PaymentSuccess.jsx
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const regId = searchParams.get('regId');
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>🎉 Payment Successful!</h1>
        <p>Registration ID: {regId}</p>
        <p>Check your email for confirmation.</p>
      </div>
    </div>
  );
};
```

Configure Easebuzz to redirect to:
```
https://your-domain.com/payment-success?regId=CBZABC123XYZ
```

---

## 🚀 Current Status

✅ **Implemented:**
- Registration form saves data to MongoDB
- Auto-redirect to correct payment link
- Registration ID generation
- Payment amount calculation

⏳ **Pending (Optional):**
- Payment webhook integration
- Email notifications
- Success page
- Payment verification

---

## 📞 Support

For Easebuzz integration help:
- Check Easebuzz documentation
- Contact Easebuzz support for webhook setup
- Test in sandbox mode before going live

---

**Your payment integration is ready to use!** 🎉

Users will now automatically redirect to the correct payment page after registration.
