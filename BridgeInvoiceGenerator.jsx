import React, { useState, useRef, useCallback } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BridgeInvoiceGenerator = () => {
  // Form state
  const [invoiceNo, setInvoiceNo] = useState('BRIDGE/2025-26/001');
  const [invoiceDate, setInvoiceDate] = useState('31 March 2026');
  const [dueDate, setDueDate] = useState('07 April 2026');
  const [paymentTerm, setPaymentTerm] = useState('12m');

  // Client details
  const [clientName, setClientName] = useState('Mr. Rahul Sharma');
  const [ownerName, setOwnerName] = useState('Paresh bhai');
  const [restaurantName, setRestaurantName] = useState('La Qubical & Dosa Charcoal');

  // Line items
  const [items, setItems] = useState([
    {
      id: 1,
      restaurant: 'La Qubical',
      type: 'Standalone Restaurant',
      branches: 1,
      plan: 'Standard',
      price6m: 1999,
      price12m: 1499,
      discount: 0,
      trial: false,
    },
    {
      id: 2,
      restaurant: 'Dosa Charcoal',
      type: 'Multi-Branch Chain',
      branches: 6,
      plan: 'Standard',
      price6m: 1799,
      price12m: 1350,
      discount: 10,
      trial: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState('preview');
  const invoiceRef = useRef();

  // Plan pricing reference
  const planPricing = {
    Standard: { 6: 1999, 12: 1499 },
    Pro: { 6: 3499, 12: 2499 },
  };

  // Calculate totals
  const calculateTotals = useCallback(() => {
    let subtotal = 0;

    items.forEach((item) => {
      const monthlyRate = paymentTerm === '12m' ? item.price12m : item.price6m;
      const months = paymentTerm === '12m' ? 12 : 6;
      let itemTotal = monthlyRate * months * item.branches;

      // Apply discount
      if (item.discount > 0) {
        itemTotal = itemTotal * (1 - item.discount / 100);
      }

      subtotal += itemTotal;
    });

    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    return { subtotal: Math.round(subtotal), gst, total };
  }, [items, paymentTerm]);

  const { subtotal, gst, total } = calculateTotals();

  // Update item
  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Add item
  const addItem = () => {
    const newId = Math.max(...items.map((i) => i.id)) + 1;
    setItems([
      ...items,
      {
        id: newId,
        restaurant: `Restaurant ${newId}`,
        type: 'Standalone Restaurant',
        branches: 1,
        plan: 'Standard',
        price6m: 1999,
        price12m: 1499,
        discount: 0,
        trial: false,
      },
    ]);
  };

  // Delete item
  const deleteItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Format currency
  const formatCurrency = (num) => {
    return '₹' + Math.round(num).toLocaleString('en-IN');
  };

  // Download PDF
  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`BRIDGE_Invoice_${invoiceNo.replace(/\//g, '-')}.pdf`);
  };

  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div style={styles.logo}>🌉</div>
            <div>
              <div style={styles.title}>BRIDGE Invoice Generator</div>
              <div style={styles.subtitle}>by Fitshield</div>
            </div>
          </div>
          <div style={styles.headerStats}>
            <div style={styles.stat}>
              <div style={styles.statValue}>{items.length}</div>
              <div style={styles.statLabel}>Items</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statValue}>{formatCurrency(total)}</div>
              <div style={styles.statLabel}>Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tab,
            borderBottomColor: activeTab === 'form' ? '#1a1a1a' : 'transparent',
            color: activeTab === 'form' ? '#1a1a1a' : '#999',
          }}
          onClick={() => setActiveTab('form')}
        >
          Edit Invoice
        </button>
        <button
          style={{
            ...styles.tab,
            borderBottomColor: activeTab === 'preview' ? '#1a1a1a' : 'transparent',
            color: activeTab === 'preview' ? '#1a1a1a' : '#999',
          }}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      {/* Form Section */}
      {activeTab === 'form' && (
        <div style={styles.mainContent}>
          <div style={styles.formSection}>
            {/* Invoice Metadata */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>Invoice Details</div>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Invoice Number</label>
                  <input
                    style={styles.input}
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Invoice Date</label>
                  <input
                    style={styles.input}
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Due Date</label>
                  <input
                    style={styles.input}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label style={styles.label}>Payment Term</label>
                <div style={styles.buttonGroup}>
                  <button
                    style={{
                      ...styles.termButton,
                      background: paymentTerm === '6m' ? '#f0f0f0' : 'white',
                      borderColor: paymentTerm === '6m' ? '#1a1a1a' : '#ddd',
                    }}
                    onClick={() => setPaymentTerm('6m')}
                  >
                    6 Months (₹1,999 / ₹3,499)
                  </button>
                  <button
                    style={{
                      ...styles.termButton,
                      background: paymentTerm === '12m' ? '#f0f0f0' : 'white',
                      borderColor: paymentTerm === '12m' ? '#1a1a1a' : '#ddd',
                    }}
                    onClick={() => setPaymentTerm('12m')}
                  >
                    12 Months (₹1,499 / ₹2,499)
                  </button>
                </div>
              </div>
            </div>

            {/* Client Details */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>Client Details</div>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Client Name</label>
                  <input
                    style={styles.input}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Owner Name</label>
                  <input
                    style={styles.input}
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Restaurant Name</label>
                  <input
                    style={styles.input}
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div style={styles.card}>
              <div style={styles.cardTitleWithButton}>
                <div style={styles.cardTitle}>Subscription Items</div>
                <button
                  style={styles.addButton}
                  onClick={addItem}
                >
                  + Add Item
                </button>
              </div>

              {items.map((item) => (
                <div key={item.id} style={styles.itemCard}>
                  <div style={styles.itemGrid}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Restaurant Name</label>
                      <input
                        style={styles.input}
                        value={item.restaurant}
                        onChange={(e) => updateItem(item.id, 'restaurant', e.target.value)}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Restaurant Type</label>
                      <input
                        style={styles.input}
                        value={item.type}
                        onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Branches</label>
                      <input
                        style={styles.input}
                        type="number"
                        value={item.branches}
                        onChange={(e) => updateItem(item.id, 'branches', parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Plan</label>
                      <select
                        style={styles.select}
                        value={item.plan}
                        onChange={(e) => {
                          const plan = e.target.value;
                          updateItem(item.id, 'plan', plan);
                          updateItem(item.id, 'price6m', planPricing[plan][6]);
                          updateItem(item.id, 'price12m', planPricing[plan][12]);
                        }}
                      >
                        <option>Standard</option>
                        <option>Pro</option>
                      </select>
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>6M Price (₹/month)</label>
                      <input
                        style={styles.input}
                        type="number"
                        value={item.price6m}
                        onChange={(e) => updateItem(item.id, 'price6m', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>12M Price (₹/month)</label>
                      <input
                        style={styles.input}
                        type="number"
                        value={item.price12m}
                        onChange={(e) => updateItem(item.id, 'price12m', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Discount %</label>
                      <input
                        style={styles.input}
                        type="number"
                        value={item.discount}
                        onChange={(e) => updateItem(item.id, 'discount', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div style={{ ...styles.formGroup, display: 'flex', alignItems: 'flex-end' }}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={item.trial}
                          onChange={(e) => updateItem(item.id, 'trial', e.target.checked)}
                          style={{ marginRight: '8px' }}
                        />
                        Has Trial
                      </label>
                    </div>
                  </div>

                  {items.length > 1 && (
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete Item
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>Summary</div>
              <div style={styles.summaryGrid}>
                <div style={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span style={styles.summaryValue}>{formatCurrency(subtotal)}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>GST @ 18%:</span>
                  <span style={styles.summaryValue}>{formatCurrency(gst)}</span>
                </div>
                <div style={{ ...styles.summaryRow, borderTop: '2px solid #1a1a1a', paddingTop: '12px', marginTop: '12px', fontWeight: 'bold', fontSize: '18px' }}>
                  <span>Grand Total:</span>
                  <span style={styles.summaryValue}>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={styles.actionButtons}>
              <button style={styles.previewButton} onClick={() => setActiveTab('preview')}>
                Preview Invoice →
              </button>
              <button style={styles.downloadButton} onClick={downloadPDF}>
                ↓ Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Section */}
      {activeTab === 'preview' && (
        <div style={styles.mainContent}>
          <div style={styles.previewContainer}>
            <div style={styles.previewHeader}>
              <button style={styles.backButton} onClick={() => setActiveTab('form')}>
                ← Back to Edit
              </button>
              <button style={styles.downloadButton} onClick={downloadPDF}>
                ↓ Download PDF
              </button>
            </div>

            <div ref={invoiceRef} style={styles.invoicePDF}>
              <InvoiceTemplate
                invoiceNo={invoiceNo}
                invoiceDate={invoiceDate}
                dueDate={dueDate}
                clientName={clientName}
                ownerName={ownerName}
                restaurantName={restaurantName}
                items={items}
                paymentTerm={paymentTerm}
                subtotal={subtotal}
                gst={gst}
                total={total}
                formatCurrency={formatCurrency}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Invoice Template Component
const InvoiceTemplate = ({
  invoiceNo,
  invoiceDate,
  dueDate,
  clientName,
  ownerName,
  restaurantName,
  items,
  paymentTerm,
  subtotal,
  gst,
  total,
  formatCurrency,
}) => {
  return (
    <div style={styles.invoiceDocument}>
      {/* Header */}
      <table style={styles.invoiceTable}>
        <tr>
          <td style={styles.invoiceHeaderLeft}>
            <div style={styles.invoiceBrand}>BRIDGE</div>
            <div style={styles.invoiceSubtext}>by Fitshield</div>
            <div style={styles.invoiceSubtext}>Menu Intelligence</div>
            <div style={styles.invoiceCompany}>Fitshield Dietfood PVT LTD.</div>
            <div style={styles.invoiceDetails}>
              <div>GSTIN: 24AAACF1234A1Z5</div>
              <div>CIN: U74999GJ2023PTC141234</div>
              <div>Ahmedabad, Gujarat -- 380001</div>
              <div>support@bridge.fitshield.in | +91 98765 43210</div>
            </div>
          </td>
          <td style={styles.invoiceHeaderRight}>
            <div style={styles.invoiceHeaderTitle}>INVOICE</div>
            <div style={styles.invoiceHeaderField}>
              <span style={styles.invoiceHeaderLabel}>Invoice No:</span>
              <span style={styles.invoiceHeaderValue}>{invoiceNo}</span>
            </div>
            <div style={styles.invoiceHeaderField}>
              <span style={styles.invoiceHeaderLabel}>Date:</span>
              <span style={styles.invoiceHeaderValue}>{invoiceDate}</span>
            </div>
            <div style={styles.invoiceHeaderField}>
              <span style={styles.invoiceHeaderLabel}>Due Date:</span>
              <span style={styles.invoiceHeaderValue}>{dueDate}</span>
            </div>
            <div style={styles.invoiceHeaderField}>
              <span style={styles.invoiceHeaderLabel}>Plan:</span>
              <span style={styles.invoiceHeaderValue}>Standard</span>
            </div>
          </td>
        </tr>
      </table>

      <hr style={styles.invoiceSeparator} />

      {/* Billed To */}
      <div style={styles.invoiceSection}>
        <div style={styles.invoiceSectionTitle}>BILLED TO</div>
        <table style={styles.invoiceTable}>
          <tr>
            <td style={{ width: '50%' }}>
              <div style={styles.invoiceClientName}>{clientName}</div>
              <div style={styles.invoiceClientDetails}>
                <div>Owner: {ownerName}</div>
                <div>{restaurantName}</div>
              </div>
            </td>
            <td style={{ width: '50%' }}>
              <div style={styles.invoiceClientName}>14-Day Money-Back Trial (Dosa Charcoal)</div>
              <div style={{ ...styles.invoiceClientDetails, marginTop: '8px' }}>
                <strong>Trial valid from date of activation</strong>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <hr style={styles.invoiceSeparator} />

      {/* Subscription Details */}
      <div style={styles.invoiceSection}>
        <div style={styles.invoiceSectionTitle}>SUBSCRIPTION DETAILS --- STANDARD PLAN</div>
        <table style={styles.invoiceItemsTable}>
          <thead>
            <tr style={styles.invoiceTableHeader}>
              <th style={styles.invoiceTableHeaderCell}>Client / Restaurant</th>
              <th style={styles.invoiceTableHeaderCell}>Branches</th>
              <th style={{ ...styles.invoiceTableHeaderCell, textAlign: 'right' }}>Rate/Month</th>
              <th style={{ ...styles.invoiceTableHeaderCell, textAlign: 'right' }}>6M Total</th>
              <th style={{ ...styles.invoiceTableHeaderCell, textAlign: 'right' }}>12M Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const rate6m = item.price6m;
              const rate12m = item.price12m;
              const total6m = rate6m * 6 * item.branches * (1 - item.discount / 100);
              const total12m = rate12m * 12 * item.branches * (1 - item.discount / 100);

              return (
                <tr key={item.id} style={styles.invoiceTableRow}>
                  <td style={styles.invoiceTableCell}>
                    <div style={styles.invoiceItemName}>{item.restaurant}</div>
                    <div style={styles.invoiceItemType}>{item.type}</div>
                    {item.discount > 0 && (
                      <div style={styles.invoiceItemDiscount}>{item.discount}% OFF</div>
                    )}
                    {item.trial && (
                      <div style={styles.invoiceItemTrial}>14-Day Money-Back Trial</div>
                    )}
                  </td>
                  <td style={{ ...styles.invoiceTableCell, textAlign: 'center' }}>
                    {item.branches}
                  </td>
                  <td style={{ ...styles.invoiceTableCell, textAlign: 'right' }}>
                    {formatCurrency(rate6m)} / {formatCurrency(rate12m)}
                  </td>
                  <td style={{ ...styles.invoiceTableCell, textAlign: 'right' }}>
                    {formatCurrency(total6m)}
                  </td>
                  <td style={{ ...styles.invoiceTableCell, textAlign: 'right' }}>
                    {formatCurrency(total12m)}
                  </td>
                </tr>
              );
            })}
            <tr style={styles.invoiceTotalRow}>
              <td colSpan="2" style={styles.invoiceTotalCell}>
                Subtotal (Base Price)
              </td>
              <td style={{ ...styles.invoiceTotalCell, textAlign: 'right' }}></td>
              <td style={{ ...styles.invoiceTotalCell, textAlign: 'right' }}>
                {formatCurrency(subtotal)}
              </td>
              <td style={{ ...styles.invoiceTotalCell, textAlign: 'right' }}></td>
            </tr>
            <tr style={styles.invoiceTableRow}>
              <td colSpan="2" style={styles.invoiceTableCell}>
                GST @ 18%
              </td>
              <td style={{ ...styles.invoiceTableCell, textAlign: 'right' }}></td>
              <td style={{ ...styles.invoiceTableCell, textAlign: 'right' }}>
                {formatCurrency(gst)}
              </td>
              <td style={{ ...styles.invoiceTableCell, textAlign: 'right' }}></td>
            </tr>
            <tr style={styles.invoiceTotalRow}>
              <td colSpan="2" style={styles.invoiceTotalCell}>
                GRAND TOTAL (incl. GST)
              </td>
              <td style={{ ...styles.invoiceTotalCell, textAlign: 'right' }}></td>
              <td style={{ ...styles.invoiceTotalCell, textAlign: 'right' }}>
                {formatCurrency(total)}
              </td>
              <td style={{ ...styles.invoiceTotalCell, textAlign: 'right' }}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Features */}
      <div style={styles.invoiceSection}>
        <div style={styles.invoiceFeaturesGrid}>
          <div style={styles.invoiceFeatureBox}>
            <div style={styles.invoiceFeatureTitle}>Standard Plan</div>
            <ul style={styles.invoiceFeatureList}>
              <li>Up to 100 menu items</li>
              <li>Basic Nutritional Tagging</li>
              <li>3 FSSAI approved marketing tags</li>
              <li>1 Physical QR code</li>
            </ul>
          </div>
          <div style={styles.invoiceFeatureBox}>
            <div style={styles.invoiceFeatureTitle}>Pro Plan (₹2,499/month vs ₹1,499 Std)</div>
            <ul style={styles.invoiceFeatureList}>
              <li>Unlimited menu items vs 100 item cap</li>
              <li>Full Nutritional Tagging + BRIDGE AI Chatbot</li>
              <li>Revenue Opportunity Reports + Live Dashboard</li>
              <li>Up to 10 Physical QR code delivery</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div style={styles.invoiceSection}>
        <table style={styles.invoiceTable}>
          <tr>
            <td style={{ width: '55%', verticalAlign: 'top' }}>
              <div style={styles.invoiceSectionTitle}>PAYMENT DETAILS</div>
              <div style={styles.invoicePaymentDetails}>
                <div><strong>Bank:</strong> BOB Bank</div>
                <div><strong>Account Name:</strong> Fitshield Dietfood Pvt. Ltd.</div>
                <div><strong>Account No.:</strong> 50200098765432</div>
                <div><strong>IFSC Code:</strong> HDFC0001234</div>
                <div><strong>Branch:</strong> Ashram Road, Ahmedabad</div>
                <div><strong>Account Type:</strong> Current</div>
                <div><strong>UPI ID:</strong> bridge@fitshield</div>
              </div>
              <div style={styles.invoicePaymentQR}>[ QR Code for UPI Payment ] Scan to pay via any UPI app</div>
            </td>
            <td style={{ width: '45%', verticalAlign: 'top', borderLeft: '1px solid #e0e0e0', paddingLeft: '20px' }}>
              <div style={styles.invoiceSectionTitle}>FOR FITSHIELD HEALTH TECH PVT. LTD.</div>
              <div style={styles.invoiceSignatureLine}></div>
              <div style={{ ...styles.invoiceSectionTitle, marginTop: '12px' }}>Authorised Signatory</div>
              <div style={styles.invoiceSignatoryInfo}>BRIDGE --- Fitshield Health Tech Pvt. Ltd.</div>
              <div style={styles.invoiceSignatoryDate}>Date: {invoiceDate}</div>
              <div style={styles.invoiceFooterNote}>
                <em>This is a computer-generated invoice.</em><br/>
                <em>Terms: Payment due within 7 days of invoice date.</em><br/>
                <em>Prices in INR inclusive of applicable taxes.</em>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <hr style={styles.invoiceSeparator} />
      <div style={styles.invoiceFooter}>
        Note: Dosa Charcoal eligible for 14-day money-back trial.
      </div>
    </div>
  );
};

// Styles
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f8f8f8;
  }
`;

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8f8f8',
  },
  header: {
    background: '#1a1a1a',
    color: 'white',
    padding: '40px 30px',
    borderBottom: '1px solid #333',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logo: {
    fontSize: '40px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    fontFamily: "'Playfair Display', serif",
    marginBottom: '2px',
  },
  subtitle: {
    fontSize: '13px',
    color: '#aaa',
  },
  headerStats: {
    display: 'flex',
    gap: '40px',
  },
  stat: {
    textAlign: 'right',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#aaa',
  },
  tabContainer: {
    background: 'white',
    display: 'flex',
    borderBottom: '1px solid #e0e0e0',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  tab: {
    padding: '16px 24px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s',
  },
  mainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '30px',
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  card: {
    background: 'white',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1a1a1a',
  },
  cardTitleWithButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  itemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
    marginBottom: '16px',
  },
  itemCard: {
    background: '#f8f8f8',
    padding: '16px',
    borderRadius: '6px',
    marginBottom: '16px',
    border: '1px solid #e0e0e0',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#666',
    marginBottom: '6px',
  },
  checkboxLabel: {
    fontSize: '13px',
    color: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
    ':focus': {
      outline: 'none',
      borderColor: '#1a1a1a',
    },
  },
  select: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    fontFamily: 'inherit',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
  termButton: {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    background: 'white',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.3s',
  },
  addButton: {
    padding: '8px 16px',
    background: '#1a1a1a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'background 0.3s',
  },
  deleteButton: {
    padding: '8px 16px',
    background: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
  },
  summaryGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
  },
  summaryValue: {
    fontWeight: '600',
    fontSize: '16px',
    color: '#1a1a1a',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
  },
  previewButton: {
    flex: 1,
    padding: '12px 20px',
    background: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
  },
  downloadButton: {
    flex: 1,
    padding: '12px 20px',
    background: '#1a1a1a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
  },
  previewContainer: {
    background: 'white',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    padding: '30px',
  },
  previewHeader: {
    display: 'flex',
    gap: '12px',
    marginBottom: '30px',
  },
  backButton: {
    flex: 1,
    padding: '12px 20px',
    background: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  invoicePDF: {
    background: 'white',
    padding: '40px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  invoiceDocument: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    lineHeight: '1.5',
    color: '#333',
  },
  invoiceTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  invoiceHeaderLeft: {
    width: '50%',
    paddingRight: '20px',
    verticalAlign: 'top',
    borderRight: '1px solid #ddd',
  },
  invoiceHeaderRight: {
    width: '50%',
    paddingLeft: '20px',
    verticalAlign: 'top',
  },
  invoiceBrand: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  invoiceSubtext: {
    fontSize: '10px',
    color: '#666',
    marginBottom: '2px',
  },
  invoiceCompany: {
    fontSize: '11px',
    fontWeight: 'bold',
    margin: '8px 0 4px 0',
  },
  invoiceDetails: {
    fontSize: '9px',
    lineHeight: '1.6',
  },
  invoiceHeaderTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  invoiceHeaderField: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  invoiceHeaderLabel: {
    fontWeight: 'bold',
  },
  invoiceHeaderValue: {
    fontWeight: 'bold',
  },
  invoiceSeparator: {
    border: 'none',
    borderTop: '1px solid #e0e0e0',
    margin: '20px 0',
  },
  invoiceSection: {
    marginBottom: '20px',
  },
  invoiceSectionTitle: {
    fontSize: '11px',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  invoiceClientName: {
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  invoiceClientDetails: {
    fontSize: '10px',
    lineHeight: '1.6',
    color: '#666',
  },
  invoiceItemsTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  invoiceTableHeader: {
    background: '#f5f5f5',
    borderBottom: '1px solid #ddd',
  },
  invoiceTableHeaderCell: {
    padding: '8px',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '10px',
  },
  invoiceTableRow: {
    borderBottom: '1px solid #eee',
  },
  invoiceTableCell: {
    padding: '8px',
    fontSize: '10px',
  },
  invoiceItemName: {
    fontWeight: 'bold',
    marginBottom: '2px',
  },
  invoiceItemType: {
    fontSize: '9px',
    color: '#666',
  },
  invoiceItemDiscount: {
    fontSize: '9px',
    color: '#d9534f',
    fontWeight: 'bold',
  },
  invoiceItemTrial: {
    fontSize: '9px',
    color: '#666',
    fontStyle: 'italic',
  },
  invoiceTotalRow: {
    background: '#f9f9f9',
    fontWeight: 'bold',
    borderTop: '2px solid #333',
    borderBottom: '2px solid #333',
  },
  invoiceTotalCell: {
    padding: '8px',
    fontSize: '10px',
  },
  invoiceFeaturesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  invoiceFeatureBox: {
    border: '1px solid #ddd',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '9px',
  },
  invoiceFeatureTitle: {
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  invoiceFeatureList: {
    margin: 0,
    paddingLeft: '16px',
    lineHeight: '1.8',
  },
  invoicePaymentDetails: {
    fontSize: '10px',
    lineHeight: '1.8',
  },
  invoicePaymentQR: {
    fontSize: '9px',
    marginTop: '8px',
    fontStyle: 'italic',
  },
  invoiceSignatureLine: {
    marginBottom: '20px',
    paddingBottom: '40px',
    borderBottom: '1px solid #333',
  },
  invoiceSignatoryInfo: {
    fontSize: '10px',
    marginBottom: '8px',
  },
  invoiceSignatoryDate: {
    fontSize: '10px',
  },
  invoiceFooterNote: {
    fontSize: '9px',
    color: '#666',
    marginTop: '12px',
    lineHeight: '1.6',
  },
  invoiceFooter: {
    fontSize: '9px',
    color: '#666',
    borderTop: '1px solid #ddd',
    paddingTop: '12px',
    marginTop: '20px',
  },
};

export default BridgeInvoiceGenerator;
