export const generateInvoiceContent = (data) => {
  const styles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
      }
      
      .header {
        text-align: center;
        margin-bottom: 30px;
        background: linear-gradient(135deg, #22D3EE, #A78BFA, #E879F9);
        color: white;
        padding: 20px;
        border-radius: 8px;
      }
      
      .header h1 {
        margin: 0;
      }
      
      .header p {
        color: white;
        margin: 10px 0;
      }
      
      .invoice-info {
        margin-bottom: 20px;
        text-align: right;
        color: #666;
      }
      
      .service-details h2 {
        color: #22D3EE;
        border-bottom: 2px solid #A78BFA;
        padding-bottom: 5px;
      }
      
      .service-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      
      .service-table th {
        padding: 12px;
        text-align: left;
        border-bottom: 2px solid #22D3EE;
        background-color: #f0f7ff;
      }
      
      .service-table td {
        padding: 12px;
        border-bottom: 1px solid #e0e0e0;
      }
      
      .service-table tr.special-offer {
        background-color: #fdf4ff;
      }
      
      .service-table tr.special-offer td {
        color: #E879F9;
      }
      
      .total-section {
        text-align: right;
        margin-top: 20px;
        margin-bottom: 30px;
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
      }
      
      .total-section .original-amount {
        color: #666;
        text-decoration: line-through;
        margin: 5px 0;
      }
      
      .total-section .total-amount {
        color: #A78BFA;
        margin: 10px 0;
        font-size: 1.17em;
        font-weight: bold;
      }
      
      .total-section .savings {
        color: #22D3EE;
        font-size: 14px;
        margin: 5px 0;
      }
      
      .footer {
        margin-top: 40px;
        color: #666;
        font-size: 14px;
        border-top: 1px solid #e0e0e0;
        padding-top: 20px;
      }
      
      .company-info {
        margin-top: 30px;
        text-align: center;
        color: #22D3EE;
      }

      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    </style>
  `;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("₹", "Rs. ");
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.hours * item.rate, 0);
  };

  const today = new Date();
  const invoiceDate =
    data?.invoiceDate ||
    today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const invoiceNumber =
    data?.invoiceNumber ||
    `VALX-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

  const items = data?.items || [
    {
      description: "Standard Service Rate",
      hours: 47,
      rate: 650,
      isSpecial: false,
    },
    {
      description: "Special Offer Price",
      hours: 28,
      rate: 500,
      isSpecial: true,
    },
  ];

  const originalTotal = calculateTotal(items.filter((item) => !item.isSpecial));
  const discountedTotal = calculateTotal(
    items.filter((item) => item.isSpecial)
  );
  const savings = originalTotal - discountedTotal;

  return `
    ${styles}
    <div class="invoice">
      <div class="header">
        <h1>VAL-X International Technologies</h1>
        <p>Professional IT Solutions</p>
      </div>

      <div class="invoice-info">
        <p>
          <strong>Invoice Date:</strong> ${invoiceDate}<br>
          <strong>Invoice #:</strong> ${invoiceNumber}
        </p>
      </div>

      <div class="service-details">
        <h2>Service Details</h2>
        <table class="service-table">
          <tr>
            <th>Description</th>
            <th style="text-align: right;">Hours</th>
            <th style="text-align: right;">Rate</th>
            <th style="text-align: right;">Amount</th>
          </tr>
          ${items
            .map(
              (item) => `
            <tr${item.isSpecial ? ' class="special-offer"' : ""}>
              <td>${item.isSpecial ? "<strong>" : ""}${item.description}${item.isSpecial ? "</strong>" : ""}</td>
              <td style="text-align: right;">${item.hours}</td>
              <td style="text-align: right;">${formatCurrency(item.rate)}</td>
              <td style="text-align: right;">${item.isSpecial ? "<strong>" : ""}${formatCurrency(item.hours * item.rate)}${item.isSpecial ? "</strong>" : ""}</td>
            </tr>
          `
            )
            .join("")}
        </table>
      </div>

      <div class="total-section">
        <p class="original-amount">Original Amount: ${formatCurrency(originalTotal)}</p>
        <h3 class="total-amount">TOTAL AMOUNT DUE: ${formatCurrency(discountedTotal)}</h3>
        <p class="savings">You save: ${formatCurrency(savings)}!</p>
      </div>

      <div class="footer">
        <p><strong>Payment Terms:</strong> Due upon receipt<br>
        Please include invoice number ${invoiceNumber} with payment</p>

        <div class="company-info">
          <p>VAL-X International Technologies<br>
          Email: cto@val-x.com<br>
          Thank you for your business!</p>
        </div>
      </div>
    </div>
  `;
};

export default generateInvoiceContent;
