# 🚀 BRIDGE Invoice Generator - Quick Start Guide

## ⚡ 30-Second Setup

### Step 1: Download
Download `bridge_invoice_generator.html` from the outputs folder

### Step 2: Open
Double-click the file in your file explorer OR right-click → Open with Browser

### Step 3: Create Invoices
Start filling in your invoice details and generating PDFs!

---

## 📖 Complete Walkthrough

### Tab 1: Edit Invoice

#### Invoice Details Section
```
Invoice Number:    BRIDGE/2025-26/001  (change as needed)
Invoice Date:      31 March 2026
Due Date:          07 April 2026
Payment Term:      [6 Months] or [12 Months] ← Click to toggle
```

#### Client Details Section
```
Client Name:       Mr. Rahul Sharma
Owner Name:        Paresh bhai
Restaurant Name:   La Qubical & Dosa Charcoal
```

#### Subscription Items Section
For each restaurant/client, you'll see:

```
Restaurant Name:   La Qubical
Restaurant Type:   Standalone Restaurant
Branches:          1
Plan:              Standard (or Pro)
6M Price:          ₹1,999  (auto-filled based on plan)
12M Price:         ₹1,499  (auto-filled based on plan)
Discount %:        0
Has Trial:         ☐ (checkbox)
```

**Quick Reference - Default Prices:**
```
Standard Plan:  6M = ₹1,999/month  |  12M = ₹1,499/month
Pro Plan:       6M = ₹3,499/month  |  12M = ₹2,499/month
```

#### Adding Multiple Items
- Click **+ Add Item** to add more restaurants
- Each gets its own form section
- Fill details for each
- Delete button appears when you have 2+ items

#### Summary Section
```
Subtotal:     (Calculated automatically)
GST @ 18%:    (Calculated automatically)
─────────────────────────────────
Grand Total:  (Calculated automatically)
```

**The calculator updates in real-time as you edit!**

### Tab 2: Preview

- Shows exactly how your invoice will look when printed/downloaded
- Switch back to Edit to make changes
- Download button generates PDF file

---

## 💰 Common Scenarios

### Scenario 1: Single Restaurant, 12-Month Plan
```
Fill these fields:
- Invoice No: BRIDGE/2025-26/002
- Date: 01 April 2026
- Due: 08 April 2026
- Client: Restaurant Owner Name
- Payment Term: 12 Months

Add Item:
- Name: Your Restaurant Name
- Type: Standalone Restaurant
- Branches: 1
- Plan: Standard (prices auto-fill)
- Discount: 0%
- Trial: No

Expected Total: ₹17,988 (₹1,499 × 12 months) + GST
```

### Scenario 2: Multi-Branch Chain with Discount
```
Fill these fields:
- Same as above

Add Item:
- Name: Restaurant Chain Name
- Type: Multi-Branch Chain
- Branches: 6
- Plan: Standard
- 6M Price: ₹1,799/month (custom price)
- 12M Price: ₹1,350/month
- Discount: 10%
- Trial: Yes ✓

Calculation: ₹1,350 × 12 months × 6 branches × 0.9 (10% off)
           = ₹87,480 + GST
```

### Scenario 3: Mixed Plans
```
Add Item 1:
- Name: Standard Client
- Plan: Standard
- Branches: 1

Add Item 2:
- Name: Pro Client
- Plan: Pro
- Branches: 3

Both get auto-calculated with their respective pricing tiers.
```

---

## 📥 Downloading Your Invoice

1. Click **Preview** tab to see final invoice
2. Click **↓ Download PDF** button
3. File saves as: `BRIDGE_Invoice_BRIDGE-2025-26-001.pdf`
4. Open and print or email to client

---

## ✏️ Editing Tips

### Quick Changes
- All fields update **instantly** - no "Save" button needed
- Preview updates in real-time
- Go back to Edit tab to make more changes

### Recalculation
- **Automatic**: Subtotal, GST, Total
- **Based on**: Number of months × price × branches × (1 - discount%)
- **Formula**: `(Price × Months × Branches) - Discount) × 1.18 (for GST)`

### Plan Selection
- Choose "Standard" or "Pro" from dropdown
- Prices auto-fill from reference table
- Can override prices if needed

---

## 🎯 Pricing Cheat Sheet

Print this for quick reference:

```
┌─────────────┬──────────────┬──────────────┐
│ Plan        │ 6 Months     │ 12 Months    │
├─────────────┼──────────────┼──────────────┤
│ Standard    │ ₹1,999/month │ ₹1,499/month │
│ Pro         │ ₹3,499/month │ ₹2,499/month │
└─────────────┴──────────────┴──────────────┘

Standard Plan includes:
  • 100 menu items
  • Basic nutritional tagging
  • 3 FSSAI-approved marketing tags
  • 1 physical QR code

Pro Plan includes:
  • Unlimited menu items
  • Full nutritional tagging + AI chatbot
  • Revenue reports + live dashboard
  • Up to 10 physical QR codes
```

---

## 🔧 Troubleshooting

### PDF Download doesn't work
**Solution:**
- Make sure pop-ups are allowed
- Try Chrome, Firefox, or Edge
- Check if adblocker is blocking

### Invoice looks different in preview
**Solution:**
- Zoom to 100% (Ctrl+0 or Cmd+0)
- Check window size (wider is better)
- Make sure all fields are filled

### Numbers don't match my calculation
**Solution:**
- GST is always 18%
- Make sure discount % is entered correctly
- Check number of branches
- Verify price per month

### Can't add more items
**Solution:**
- There's no limit! Click "+ Add Item" as many times as needed
- Each item is independent
- Delete unnecessary items with the Delete button

---

## 📊 Calculation Examples

### Example 1: Simple Single Item
```
Item: La Qubical (1 branch)
Plan: Standard, 12 months
Price: ₹1,499/month
Months: 12
Calculation:
  Base: ₹1,499 × 12 × 1 = ₹17,988
  GST (18%): ₹3,238
  Total: ₹21,226
```

### Example 2: Multi-Branch with Discount
```
Item: Dosa Charcoal (6 branches)
Plan: Standard, 12 months
Price: ₹1,350/month
Discount: 10%
Calculation:
  Base: ₹1,350 × 12 × 6 = ₹97,200
  After 10% discount: ₹97,200 × 0.9 = ₹87,480
  GST (18%): ₹15,746
  Total: ₹103,226
```

### Example 3: Multiple Items Combined
```
Item 1: Restaurant A (1 branch) Standard 12M
  Subtotal: ₹17,988

Item 2: Restaurant B (3 branches) Pro 12M
  Price: ₹2,499 × 12 × 3 = ₹89,964
  Subtotal after Item 1: ₹17,988 + ₹89,964 = ₹107,952

Combined GST (18%): ₹19,431
Grand Total: ₹127,383
```

---

## 🎓 Advanced Features

### Custom Pricing
Don't want standard prices? 
- Override 6M Price and 12M Price fields
- System recalculates automatically

### Flexible Discounts
- Add any discount % (e.g., 5%, 15%, 20%)
- Good for bulk orders or long-term contracts
- Applied before GST

### Trial Tracking
- Check "Has Trial" for trial-eligible items
- Shows in invoice: "14-Day Money-Back Trial"
- Useful for marketing and tracking

### Dynamic Invoice Numbers
- Generate new invoice number for each client
- Pattern: BRIDGE/[Year]-[Counter]/[#]
- Example: BRIDGE/2025-26/001, BRIDGE/2025-26/002

---

## 💼 For Team Members

### Sharing Invoices
1. Generate and download PDF
2. Email PDF to client
3. Keep copy in invoices folder
4. Update invoice number for next client

### Batch Processing
- Generate one invoice at a time
- Change client details
- Change invoice number
- Download new PDF
- Repeat

### Record Keeping
```
Suggested folder structure:
/BRIDGE Invoices
  /2025-26
    /March
      BRIDGE_Invoice_BRIDGE-2025-26-001.pdf
      BRIDGE_Invoice_BRIDGE-2025-26-002.pdf
    /April
      BRIDGE_Invoice_BRIDGE-2025-26-003.pdf
```

---

## 🆘 Need Help?

**Common Questions:**

Q: Can I edit the company details?
A: The template is locked to Fitshield details. Contact development to customize.

Q: Can I add my company logo?
A: Currently not in this version. Contact development for custom branding.

Q: Can I save my invoices online?
A: Download PDFs and store locally or use Google Drive/Dropbox.

Q: What if I make a mistake?
A: Just refresh the page and start over, or edit and re-download.

Q: Can multiple people use this?
A: Yes! Each person can run it independently. No server needed.

---

## 🎉 You're Ready!

You now have everything you need to:
✅ Create professional BRIDGE invoices
✅ Calculate pricing accurately  
✅ Download as PDF
✅ Share with clients

**Happy invoicing!**

---

**Questions?** Contact: support@bridge.fitshield.in  
**Version:** 1.0.0 | **Last Updated:** March 31, 2026
