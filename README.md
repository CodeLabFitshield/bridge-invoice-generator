# 🌉 BRIDGE Invoice Generator by Fitshield

A professional, production-ready invoice generator for BRIDGE subscription management. Create, customize, and download invoices in minutes.

## 📦 What's Included

### 1. **Standalone HTML Version** (`bridge_invoice_generator.html`)
- **Zero dependencies** - Just open in a browser, no installation needed
- **Fully functional** - All features built-in with vanilla JavaScript
- **PDF export** - Download invoices directly as PDF
- **Responsive design** - Works on desktop and tablet

### 2. **React Component** (`BridgeInvoiceGenerator.jsx`)
- Production-ready React component
- Built with modern React hooks
- Easy to integrate into existing projects
- TypeScript-ready

## 🚀 Quick Start

### Option A: HTML Version (Recommended for immediate use)

1. **Download** `bridge_invoice_generator.html`
2. **Open** the file in any modern web browser
3. **Start creating invoices!**

That's it! No server needed, no installation required.

### Option B: React Version

```bash
npm install jspdf html2canvas

# Copy BridgeInvoiceGenerator.jsx to your project
# Import and use in your app:

import BridgeInvoiceGenerator from './BridgeInvoiceGenerator';

function App() {
  return <BridgeInvoiceGenerator />;
}
```

## ✨ Features

### Invoice Management
- ✅ **Create Invoices** - Full form-based invoice creation
- ✅ **Multiple Items** - Add/remove subscription items dynamically
- ✅ **Dynamic Pricing** - Support for both Standard and Pro plans
- ✅ **Flexible Terms** - 6-month and 12-month payment options
- ✅ **Automatic Calculations** - GST (18%) calculated automatically

### Plan Pricing
```
Standard Plan:
  - 6 months: ₹1,999/month
  - 12 months: ₹1,499/month

Pro Plan:
  - 6 months: ₹3,499/month
  - 12 months: ₹2,499/month
```

### Customization
- **Client Details** - Name, owner, restaurant details
- **Invoice Metadata** - Invoice number, dates, payment terms
- **Line Items** - Restaurant name, branches, plan, discount, trial status
- **Dynamic Discounts** - Add any discount percentage per item
- **Trial Eligibility** - Mark items as trial-eligible

### Export & Download
- 📥 **PDF Download** - Download invoice as professional PDF
- 📋 **Template Preview** - Live preview of invoice format
- 🎨 **Professional Layout** - Matches BRIDGE brand identity

## 📋 Template Details

### Company Information
- **Company:** Fitshield Dietfood PVT LTD
- **GSTIN:** 24AAACF1234A1Z5
- **CIN:** U74999GJ2023PTC141234
- **Location:** Ahmedabad, Gujarat -- 380001
- **Contact:** support@bridge.fitshield.in | +91 98765 43210

### Bank Details (Payment)
- **Bank:** BOB Bank
- **Account Name:** Fitshield Dietfood Pvt. Ltd.
- **Account No.:** 50200098765432
- **IFSC Code:** HDFC0001234
- **Branch:** Ashram Road, Ahmedabad
- **Account Type:** Current
- **UPI ID:** bridge@fitshield

### Invoice Components
1. **Header** - Company branding and invoice details
2. **Billed To** - Client information and trial status
3. **Subscription Details** - Itemized pricing table
4. **Features Comparison** - Standard vs Pro plan features
5. **Payment Details** - Bank and UPI information
6. **Signature Section** - Authorized signatory block

## 🎯 Usage Guide

### Creating an Invoice

1. **Go to Edit Invoice tab**
2. **Fill Invoice Details:**
   - Invoice number (auto: BRIDGE/2025-26/001)
   - Invoice date
   - Due date
   - Select payment term (6M or 12M)

3. **Add Client Details:**
   - Client name
   - Owner name
   - Restaurant name

4. **Add Subscription Items:**
   - Click "+ Add Item" for each restaurant
   - Fill: Restaurant name, type, branches, plan, pricing
   - Add discount % if applicable
   - Mark if trial-eligible

5. **Review Summary:**
   - Subtotal calculation
   - GST (18%)
   - Grand total

6. **Export:**
   - Preview the invoice
   - Download as PDF

### Example Scenarios

#### Single Restaurant Invoice
```
Restaurant: La Qubical
Type: Standalone Restaurant
Branches: 1
Plan: Standard
6M Price: ₹1,999/month → 12M: ₹1,499/month
Total for 12M: ₹17,988
```

#### Multi-Branch with Discount
```
Restaurant: Dosa Charcoal
Type: Multi-Branch Chain
Branches: 6
Plan: Standard
Discount: 10%
Trial: Yes (14-day money-back)
6M Price: ₹1,799/month → 12M: ₹1,350/month
After 10% discount → 12M Total: ₹87,480
```

## 💡 Pricing Reference

### Standard Plan
- **Features:** 100 menu items, Basic Nutritional Tagging, 3 FSSAI tags, 1 QR code
- **6-Month:** ₹1,999/month
- **12-Month:** ₹1,499/month

### Pro Plan
- **Features:** Unlimited items, Full Nutritional Tagging + AI Chatbot, Revenue Reports, 10 QR codes
- **6-Month:** ₹3,499/month
- **12-Month:** ₹2,499/month

## 🛠️ Technical Details

### HTML Version Tech Stack
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - No dependencies
- **html2pdf.js** - PDF generation (CDN)

### React Version Tech Stack
- **React 17+** - Component-based UI
- **jsPDF** - PDF generation
- **html2canvas** - Canvas rendering
- **CSS-in-JS** - Inline styles

### Browser Support
- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📱 Responsive Design
- Desktop optimized
- Tablet friendly
- Mobile accessible (preview mode)

## 🔒 Data & Privacy
- ✅ **No Backend Required** - All processing client-side
- ✅ **No Data Transmission** - Everything stays on your device
- ✅ **Secure** - No external API calls (except PDF library)
- ✅ **Offline Compatible** - Works without internet after first load

## 📝 Customization Guide

### Modifying Company Information
Edit these in the template:
```javascript
// Company name
"Fitshield Dietfood PVT LTD."

// Bank details
Bank: "BOB Bank"
Account: "50200098765432"
IFSC: "HDFC0001234"

// Contact
Email: "support@bridge.fitshield.in"
Phone: "+91 98765 43210"
```

### Changing Default Prices
```javascript
const planPricing = {
  Standard: { 6: 1999, 12: 1499 },  // Standard plan
  Pro: { 6: 3499, 12: 2499 },       // Pro plan
};
```

### Styling
- Modify CSS in `<style>` section
- Colors, fonts, spacing easily adjustable
- Responsive breakpoints included

## 🚀 Deployment Options

### Option 1: Local File
- Save `bridge_invoice_generator.html`
- Open in browser
- Share file with team

### Option 2: Web Server
```bash
# Copy to web server
scp bridge_invoice_generator.html user@server:/var/www/html/

# Access via browser
https://yourdomain.com/bridge_invoice_generator.html
```

### Option 3: Embed in Website
```html
<iframe src="bridge_invoice_generator.html" 
        width="100%" 
        height="800" 
        frameborder="0">
</iframe>
```

### Option 4: React Integration
```jsx
import BridgeInvoiceGenerator from './BridgeInvoiceGenerator';

export default function InvoicePage() {
  return (
    <div>
      <BridgeInvoiceGenerator />
    </div>
  );
}
```

## 🐛 Troubleshooting

### PDF Download Not Working
- Check browser console for errors
- Ensure pop-ups are not blocked
- Try different browser if issue persists

### Invoice Preview Looks Off
- Clear browser cache
- Check window zoom level (should be 100%)
- Try different browser

### Missing Data in PDF
- Ensure all fields are filled
- Check that items have complete information
- Verify GST calculation (should be 18%)

## 📞 Support

For issues, feature requests, or customization needs:
- Contact: **support@bridge.fitshield.in**
- Team: Fitshield BRIDGE Development

## 📄 License

Proprietary - Fitshield Health Tech Pvt. Ltd.

## 🎉 Getting Started

1. Download `bridge_invoice_generator.html`
2. Open in browser
3. Fill in your invoice details
4. Preview and download PDF
5. Share with clients!

---

**Version:** 1.0.0  
**Last Updated:** March 31, 2026  
**Created by:** Fitshield BRIDGE Team
