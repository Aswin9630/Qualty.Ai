// // src/components/Invoice/InvoiceHTML.jsx
// import React from "react";

// export default function InvoiceTemplate({ order = {}, company = {} }) {
//   const cmp = {
//     name: company.name || "Qualty.ai",
//     logoUrl: company.logoUrl || `${window.location.origin}/assets/qualty-logo.png`,
//     address: company.address || "Qualty.ai, Bengaluru, India",
//     gstin: company.gstin || "29AAMCP9070G1ZV",
//     phone: company.phone || "",
//     email: company.email || "billing@qualty.ai",
//     footerNote: company.footerNote || "This invoice is computer generated and does not require a signature.",
//   };

//   const fmt = (v, currency = "INR") => {
//     if (v == null || Number.isNaN(Number(v))) return "-";
//     const n = Number(v);
//     if (currency === "USD") return `$${n.toFixed(2)}`;
//     return `₹${n.toFixed(2)}`;
//   };

//   const fmtDate = (iso) => {
//     if (!iso) return "-";
//     try {
//       const d = new Date(iso);
//       return d.toLocaleString(undefined, { day: "2-digit", month: "short", year: "numeric" });
//     } catch {
//       return iso;
//     }
//   };

//   const items = Array.isArray(order.items) ? order.items : [];

//   return (
//     <article id="invoice-document" style={{
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
//       color: "#0f1724",
//       maxWidth: 820,
//       margin: "0 auto",
//       background: "#ffffff",
//       padding: 28,
//       boxSizing: "border-box",
//       fontSize: 13,
//       lineHeight: 1.4,
//     }}>
//       <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
//         <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
//           <img src={cmp.logoUrl} alt={cmp.name} style={{ width: 88, height: 88, objectFit: "contain" }} />
//           <div>
//             <div style={{ fontSize: 18, fontWeight: 700 }}>{cmp.name}</div>
//             <div style={{ color: "#475569", marginTop: 6 }}>{cmp.address}</div>
//             {cmp.email && <div style={{ color: "#475569", marginTop: 4 }}>{cmp.email}{cmp.phone ? ` • ${cmp.phone}` : ""}</div>}
//           </div>
//         </div>

//         <div style={{ textAlign: "right" }}>
//           <div style={{ color: "#475569" }}>Invoice</div>
//           <div style={{ fontWeight: 700, fontSize: 16, marginTop: 6 }}>{order._id || "—"}</div>
//           <div style={{ color: "#64748b", marginTop: 8 }}>Placed {fmtDate(order.createdAt)}</div>
//         </div>
//       </header>

//       <section style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
//         <div style={{ flex: "1 1 320px", background: "#f8fafc", padding: 12, borderRadius: 8 }}>
//           <div style={{ color: "#475569", fontSize: 12 }}>Billed to</div>
//           <div style={{ fontWeight: 700, marginTop: 6 }}>{order.userName || order.user?.name || "-"}</div>
//           <div style={{ color: "#6b7280", marginTop: 6 }}>{order.userEmail || order.user?.email || "-"}</div>
//         </div>

//         <div style={{ flex: "1 1 240px", background: "#f8fafc", padding: 12, borderRadius: 8 }}>
//           <div style={{ color: "#475569", fontSize: 12 }}>Payment</div>
//           <div style={{ fontWeight: 700, marginTop: 6 }}>{order.status || "-"}</div>
//           <div style={{ color: "#6b7280", marginTop: 6 }}>Ref: {order.paymentId || order.razorpay_order_id || "—"}</div>
//         </div>
//       </section>

//       <main>
//         <table role="table" style={{ width: "100%", borderCollapse: "collapse", marginTop: 6 }}>
//           <thead>
//             <tr>
//               <th style={{ textAlign: "left", padding: 12, background: "#f1f5f9", color: "#475569", fontSize: 12 }}>#</th>
//               <th style={{ textAlign: "left", padding: 12, background: "#f1f5f9", color: "#475569", fontSize: 12 }}>Service</th>
//               <th style={{ textAlign: "left", padding: 12, background: "#f1f5f9", color: "#475569", fontSize: 12 }}>Details</th>
//               <th style={{ textAlign: "right", padding: 12, background: "#f1f5f9", color: "#475569", fontSize: 12 }}>Rate</th>
//               <th style={{ textAlign: "right", padding: 12, background: "#f1f5f9", color: "#475569", fontSize: 12 }}>Qty</th>
//               <th style={{ textAlign: "right", padding: 12, background: "#f1f5f9", color: "#475569", fontSize: 12 }}>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length === 0 && (
//               <tr><td colSpan={6} style={{ padding: 14, color: "#6b7280" }}>No items</td></tr>
//             )}
//             {items.map((it, i) => {
//               const details = [it.location, it.country].filter(Boolean).join(", ") + (it.commodity ? ` • ${it.commodity}` : "");
//               const qty = (it.qty ?? it.volume ?? 1);
//               const rate = it.rate ?? it.price ?? 0;
//               const amount = (Number(qty) * Number(rate)) || 0;
//               return (
//                 <tr key={i}>
//                   <td style={{ padding: 10, borderBottom: "1px solid #e6eef8" }}>{i + 1}</td>
//                   <td style={{ padding: 10, borderBottom: "1px solid #e6eef8", fontWeight: 600 }}>{it.serviceType}</td>
//                   <td style={{ padding: 10, borderBottom: "1px solid #e6eef8", color: "#475569" }}>
//                     <div>{details}</div>
//                     {it.date && <div style={{ fontSize: 12, marginTop: 6, color: "#94a3b8" }}>{new Date(it.date).toLocaleDateString()}</div>}
//                   </td>
//                   <td style={{ padding: 10, borderBottom: "1px solid #e6eef8", textAlign: "right" }}>{fmt(rate, it.currency || order.currency)}</td>
//                   <td style={{ padding: 10, borderBottom: "1px solid #e6eef8", textAlign: "right" }}>{qty}</td>
//                   <td style={{ padding: 10, borderBottom: "1px solid #e6eef8", textAlign: "right", fontWeight: 700 }}>{fmt(amount, it.currency || order.currency)}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
//           <div style={{ minWidth: 300, background: "#ffffff", padding: 12, borderRadius: 8, border: "1px solid #e6eef8" }}>
//             <div style={{ color: "#475569", fontSize: 12 }}>Subtotal</div>
//             <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontWeight: 700 }}>
//               <div></div>
//               <div>{fmt(order.subtotal ?? items.reduce((s, it) => s + ((Number(it.qty ?? it.volume ?? 1) * Number(it.rate ?? it.price ?? 0)) || 0), 0), order.currency)}</div>
//             </div>

//             <div style={{ color: "#475569", fontSize: 12, marginTop: 10 }}>Tax</div>
//             <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
//               <div></div>
//               <div>{fmt(order.tax ?? 0, order.currency)}</div>
//             </div>

//             <div style={{ height: 8 }} />

//             <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 16, fontWeight: 800 }}>
//               <div>Total</div>
//               <div>{fmt(order.total ?? ( (order.subtotal ?? 0) + (order.tax ?? 0) ), order.currency)}</div>
//             </div>
//           </div>
//         </div>

//       </main>

//       <footer style={{ marginTop: 22 }}>
//         <div style={{ color: "#64748b", fontSize: 12 }}>{cmp.footerNote}</div>

//         <div style={{ marginTop: 12, padding: 12, background: "#f8fafc", borderRadius: 8, color: "#475569" }}>
//           <div style={{ fontWeight: 700 }}>{cmp.name}</div>
//           <div style={{ marginTop: 6 }}>GSTIN: {cmp.gstin}</div>
//           <div style={{ marginTop: 4 }}>{cmp.address}</div>
//         </div>
//       </footer>
//     </article>
//   );
// }


// src/components/Invoice/InvoiceHTML.jsx
import React from "react";


export default function InvoiceTemplate({ order = {}, company = {} }) {
  const cmp = {
    name: company.name || "Qualty.ai",
    logoUrl: company.logoUrl || `${window.location.origin}/assets/qualty-logo.png`,
    address: company.address || "Qualty.ai, Bengaluru, India",
    gstin: company.gstin || "29AAMCP9070G1ZV",
    phone: company.phone || "",
    email: company.email || "billing@qualty.ai",
    footerNote: company.footerNote || "This is a computer-generated invoice. For billing queries contact billing@qualty.ai",
  };

  const fmt = (v, currency = "INR") => {
    if (v == null || Number.isNaN(Number(v))) return "-";
    const n = Number(v);
    if (currency === "USD") return `$${n.toFixed(2)}`;
    return `₹${n.toFixed(2)}`;
  };

  const fmtDate = (iso) => {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, { day: "2-digit", month: "short", year: "numeric" });
    } catch {
      return iso;
    }
  };

  // compute derived values if not provided
  const items = Array.isArray(order.items) ? order.items : [];
  const computedSubtotal = items.reduce((s, it) => {
    const q = Number(it.qty ?? it.volume ?? 1) || 0;
    const r = Number(it.rate ?? it.price ?? 0) || 0;
    return s + q * r;
  }, 0);
  const subtotal = Number(order.subtotal ?? computedSubtotal);
  const computedTax = items.reduce((s, it) => s + (Number(it.cgst || 0) + Number(it.sgst || 0) + Number(it.igst || 0)), 0);
  const tax = Number(order.tax ?? computedTax ?? 0);
 // const tax = Number(order.tax ?? items.reduce((s, it) => s + (Number(it.cgst || 0) + Number(it.sgst || 0) + Number(it.igst || 0)), 0) || 0);
  const total = Number(order.total ?? subtotal + tax);
 
  // total in words (simple English converter for integers)
  const toWords = (num) => {
    // basic: supports up to crores; production: replace with robust lib
    if (!Number.isFinite(num)) return "";
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    function inWords(n) {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + inWords(n % 100) : "");
      if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
      if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
      return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + inWords(n % 10000000) : "");
    }
    const intPart = Math.round(num);
    return inWords(intPart) + " Rupees Only";
  };

  const currency = order.currency || items[0]?.currency || "INR";

  // styles: use inline CSS for predictable rendering
  const styles = {
    page: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: "#0f1724",
      maxWidth: 820,
      margin: "0 auto",
      background: "#ffffff",
      padding: 28,
      boxSizing: "border-box",
      fontSize: 12.5,
      lineHeight: 1.35,
    },
    header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
    brand: { display: "flex", gap: 14, alignItems: "center" },
    logo: { width: 88, height: 88, objectFit: "contain" },
    companyName: { fontSize: 18, fontWeight: 700 },
    muted: { color: "#475569" },
    card: { background: "#f8fafc", padding: 12, borderRadius: 8 },
    table: { width: "100%", borderCollapse: "collapse", marginTop: 8 },
    th: { textAlign: "left", padding: 10, background: "#f1f5f9", color: "#475569", fontSize: 12 },
    td: { padding: 10, borderBottom: "1px solid #e6eef8", verticalAlign: "top" },
    totalsBox: { minWidth: 320, background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #e6eef8" },
    footerCard: { marginTop: 14, padding: 12, background: "#f8fafc", borderRadius: 8, color: "#475569" },
  };

  return (
    <article id="invoice-document" style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={cmp.logoUrl} alt={cmp.name} style={styles.logo} />
          <div>
            <div style={styles.companyName}>{cmp.name}</div>
            <div style={{ ...styles.muted, marginTop: 6 }}>{cmp.address}</div>
            {cmp.email && <div style={{ ...styles.muted, marginTop: 6 }}>{cmp.email}{cmp.phone ? ` • ${cmp.phone}` : ""}</div>}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={styles.muted}>Tax Invoice</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginTop: 6 }}>{order._id || "—"}</div>
          <div style={{ ...styles.muted, marginTop: 6 }}>Placed {fmtDate(order.createdAt)}</div>
          <div style={{ marginTop: 8, fontSize: 12 }}>Status: <strong>{order.status || "-"}</strong></div>
        </div>
      </header>

      <section style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
        <div style={{ ...styles.card, flex: "1 1 380px" }}>
          <div style={{ color: "#475569", fontSize: 12 }}>Billed to</div>
          <div style={{ fontWeight: 700, marginTop: 6 }}>{order.userName || order.user?.name || "-"}</div>
          <div style={{ color: "#6b7280", marginTop: 6 }}>{order.userEmail || order.user?.email || "-"}</div>
        </div>

        <div style={{ ...styles.card, flex: "1 1 200px" }}>
          <div style={{ color: "#475569", fontSize: 12 }}>Payment</div>
          <div style={{ fontWeight: 700, marginTop: 6 }}>{order.status || "-"}</div>
          <div style={{ color: "#6b7280", marginTop: 6 }}>Ref: {order.paymentId || order.razorpay_order_id || "—"}</div>
        </div>
      </section>

      <main>
        <table role="table" style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: 36 }}>#</th>
              <th style={{ ...styles.th, width: "28%" }}>Service</th>
              <th style={{ ...styles.th, width: "20%" }}>HSN / SAC</th>
              <th style={{ ...styles.th, width: "18%", textAlign: "right" }}>Rate</th>
              <th style={{ ...styles.th, width: "8%", textAlign: "right" }}>Qty</th>
              <th style={{ ...styles.th, width: "10%", textAlign: "right" }}>CGST</th>
              <th style={{ ...styles.th, width: "10%", textAlign: "right" }}>SGST</th>
              <th style={{ ...styles.th, width: "12%", textAlign: "right" }}>Amount</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={8} style={{ padding: 14, color: "#6b7280" }}>No items</td></tr>
            )}

            {items.map((it, idx) => {
              const qty = Number(it.qty ?? it.volume ?? 1) || 0;
              const rate = Number(it.rate ?? it.price ?? 0) || 0;
              const cgst = Number(it.cgst ?? 0) || 0;
              const sgst = Number(it.sgst ?? 0) || 0;
              const igst = Number(it.igst ?? 0) || 0;
              const amount = qty * rate;
              return (
                <tr key={idx}>
                  <td style={styles.td}>{idx + 1}</td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: 700 }}>{it.serviceType}</div>
                    <div style={{ color: "#475569", marginTop: 6 }}>{[it.location, it.country].filter(Boolean).join(", ")}{it.commodity ? ` • ${it.commodity}` : ""}</div>
                    {it.date && <div style={{ color: "#94a3b8", marginTop: 6 }}>{new Date(it.date).toLocaleDateString()}</div>}
                  </td>
                  <td style={styles.td}>{it.hsn || it.sac || "-"}</td>
                  <td style={{ ...styles.td, textAlign: "right" }}>{fmt(rate, it.currency || currency)}</td>
                  <td style={{ ...styles.td, textAlign: "right" }}>{qty}</td>
                  <td style={{ ...styles.td, textAlign: "right" }}>{fmt(cgst, currency)}</td>
                  <td style={{ ...styles.td, textAlign: "right" }}>{fmt(sgst, currency)}</td>
                  <td style={{ ...styles.td, textAlign: "right", fontWeight: 700 }}>{fmt(amount + cgst + sgst + igst, currency)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
          <div style={styles.totalsBox}>
            <div style={{ color: "#475569", fontSize: 12 }}>Subtotal</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontWeight: 700 }}>
              <div></div>
              <div>{fmt(subtotal, currency)}</div>
            </div>

            <div style={{ color: "#475569", fontSize: 12, marginTop: 10 }}>CGST</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <div></div>
              <div>{fmt(items.reduce((s, it) => s + (Number(it.cgst || 0) || 0), 0), currency)}</div>
            </div>

            <div style={{ color: "#475569", fontSize: 12, marginTop: 10 }}>SGST</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <div></div>
              <div>{fmt(items.reduce((s, it) => s + (Number(it.sgst || 0) || 0), 0), currency)}</div>
            </div>

            <div style={{ height: 8 }} />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 16, fontWeight: 800 }}>
              <div>Total</div>
              <div>{fmt(total, currency)}</div>
            </div>

            <div style={{ marginTop: 8, fontSize: 11, color: "#6b7280" }}>{toWords(total)}</div>
          </div>
        </div>
      </main>

      <footer style={{ marginTop: 18 }}>
        <div style={{ ...styles.muted, fontSize: 12 }}>{cmp.footerNote}</div>

        <div style={styles.footerCard}>
          <div style={{ fontWeight: 700 }}>{cmp.name}</div>
          <div style={{ marginTop: 6 }}>GSTIN: {cmp.gstin}</div>
          <div style={{ marginTop: 4 }}>{cmp.address}</div>
        </div>
      </footer>
    </article>
  );
}
