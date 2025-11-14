// src/pages/InvoicePdfHelper.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/* Utilities */
function formatCurrency(amount, currency = "INR") {
  if (amount == null || Number.isNaN(Number(amount))) return "-";
  const v = Number(amount);
  if (currency === "USD") return `$${v.toFixed(2)}`;
  return `₹${v.toFixed(2)}`;
}
function formatDateTime(iso) {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

/* Build a DOM node for the invoice. Keep dimensions suitable for A4 rendering.
   opts: { companyName, logoUrl, notes, footerText }
*/
export function buildInvoiceNode(order = {}, opts = {}) {
  const companyName = opts.companyName || "Qualty.ai";
  const logoUrl = opts.logoUrl || `${window.location.origin}/assets/qualty-logo.png`;
  const placed = formatDateTime(order.createdAt);
  const paymentRef = order.paymentId || order.razorpay_order_id || "—";
  const subtotal = formatCurrency(order.subtotal, order.currency);
  const tax = formatCurrency(order.tax, order.currency);
  const total = formatCurrency(order.total, order.currency);
  const customerName = order.userName || order.user?.name || "-";
  const customerEmail = order.userEmail || order.user?.email || "-";
  const notes = opts.notes || "This is a computer-generated invoice. For queries: billing@qualty.ai";

  // wrapper
  const wrapper = document.createElement("div");
  wrapper.style.boxSizing = "border-box";
  wrapper.style.width = "800px";
  wrapper.style.margin = "0 auto";
  wrapper.style.fontFamily = 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  wrapper.style.color = "#111";
  wrapper.style.background = "#fff";
  wrapper.style.padding = "20px";
  wrapper.style.border = "1px solid #eee";
  wrapper.style.borderRadius = "6px";

  // header
  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.marginBottom = "18px";

  const left = document.createElement("div");
  left.style.display = "flex";
  left.style.alignItems = "center";
  left.style.gap = "12px";

  const logoImg = document.createElement("img");
  logoImg.src = logoUrl;
  logoImg.alt = companyName;
  logoImg.style.width = "72px";
  logoImg.style.height = "72px";
  logoImg.style.objectFit = "contain";
  logoImg.style.borderRadius = "6px";
  left.appendChild(logoImg);

  const titleWrap = document.createElement("div");
  const title = document.createElement("div");
  title.textContent = companyName;
  title.style.fontSize = "18px";
  title.style.fontWeight = "700";
  const sub = document.createElement("div");
  sub.textContent = "Professional inspection & service platform";
  sub.style.color = "#6b7280";
  sub.style.fontSize = "12px";
  titleWrap.appendChild(title);
  titleWrap.appendChild(sub);
  left.appendChild(titleWrap);

  const right = document.createElement("div");
  right.style.textAlign = "right";
  const invLabel = document.createElement("div");
  invLabel.textContent = "Invoice";
  invLabel.style.color = "#6b7280";
  invLabel.style.fontSize = "12px";
  const invId = document.createElement("div");
  invId.textContent = order._id || "";
  invId.style.fontWeight = "700";
  invId.style.marginTop = "6px";
  const placedEl = document.createElement("div");
  placedEl.textContent = `Placed ${placed}`;
  placedEl.style.color = "#6b7280";
  placedEl.style.fontSize = "12px";
  right.appendChild(invLabel);
  right.appendChild(invId);
  right.appendChild(placedEl);

  header.appendChild(left);
  header.appendChild(right);
  wrapper.appendChild(header);

  // billed to / payment
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.gap = "12px";
  row.style.flexWrap = "wrap";
  row.style.marginBottom = "12px";

  const cardA = document.createElement("div");
  cardA.style.flex = "1 1 260px";
  cardA.style.background = "#fafafa";
  cardA.style.padding = "12px";
  cardA.style.borderRadius = "8px";
  const billedLabel = document.createElement("div");
  billedLabel.textContent = "Billed to";
  billedLabel.style.color = "#6b7280";
  billedLabel.style.fontSize = "12px";
  const billedName = document.createElement("div");
  billedName.textContent = customerName;
  billedName.style.fontWeight = "600";
  billedName.style.marginTop = "8px";
  const billedEmail = document.createElement("div");
  billedEmail.textContent = customerEmail;
  billedEmail.style.color = "#6b7280";
  billedEmail.style.fontSize = "12px";
  cardA.appendChild(billedLabel);
  cardA.appendChild(billedName);
  cardA.appendChild(billedEmail);

  const cardB = document.createElement("div");
  cardB.style.flex = "1 1 260px";
  cardB.style.background = "#fafafa";
  cardB.style.padding = "12px";
  cardB.style.borderRadius = "8px";
  const payLabel = document.createElement("div");
  payLabel.textContent = "Payment";
  payLabel.style.color = "#6b7280";
  payLabel.style.fontSize = "12px";
  const payStatus = document.createElement("div");
  payStatus.textContent = order.status || "-";
  payStatus.style.fontWeight = "600";
  payStatus.style.marginTop = "8px";
  const payRef = document.createElement("div");
  payRef.textContent = `Ref: ${paymentRef}`;
  payRef.style.color = "#6b7280";
  payRef.style.fontSize = "12px";
  cardB.appendChild(payLabel);
  cardB.appendChild(payStatus);
  cardB.appendChild(payRef);

  row.appendChild(cardA);
  row.appendChild(cardB);
  wrapper.appendChild(row);

  // items table
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.marginTop = "6px";
  const thead = document.createElement("thead");
  const thr = document.createElement("tr");
  ["Service", "Details", "Price"].forEach((t, i) => {
    const th = document.createElement("th");
    th.textContent = t;
    th.style.background = "#f8fafc";
    th.style.color = "#6b7280";
    th.style.textAlign = "left";
    th.style.padding = "10px";
    if (i === 2) th.style.textAlign = "right";
    thr.appendChild(th);
  });
  thead.appendChild(thr);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  (order.items || []).forEach((it, idx) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.style.padding = "10px";
    td1.style.borderBottom = "1px solid #eee";
    td1.textContent = `${idx + 1}. ${it.serviceType || ""}`;
    const td2 = document.createElement("td");
    td2.style.padding = "10px";
    td2.style.borderBottom = "1px solid #eee";
    const details = [it.location, it.country].filter(Boolean).join(", ") + (it.commodity ? ` • ${it.commodity}` : "");
    td2.textContent = details;
    const td3 = document.createElement("td");
    td3.style.padding = "10px";
    td3.style.borderBottom = "1px solid #eee";
    td3.style.textAlign = "right";
    td3.textContent = formatCurrency(it.price, it.currency || order.currency);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrapper.appendChild(table);

  // totals
  const totalsWrap = document.createElement("div");
  totalsWrap.style.display = "flex";
  totalsWrap.style.justifyContent = "flex-end";
  totalsWrap.style.marginTop = "14px";
  const totalsBox = document.createElement("div");
  totalsBox.style.minWidth = "260px";
  totalsBox.style.background = "#fff";
  totalsBox.style.padding = "12px";
  totalsBox.style.borderRadius = "8px";
  totalsBox.style.border = "1px solid #f1f5f9";

  const subLine = document.createElement("div");
  subLine.style.display = "flex";
  subLine.style.justifyContent = "space-between";
  subLine.style.marginBottom = "6px";
  const l1 = document.createElement("div");
  l1.textContent = "Subtotal";
  l1.style.color = "#6b7280";
  const r1 = document.createElement("div");
  r1.textContent = subtotal;
  subLine.appendChild(l1);
  subLine.appendChild(r1);

  const taxLine = document.createElement("div");
  taxLine.style.display = "flex";
  taxLine.style.justifyContent = "space-between";
  taxLine.style.marginBottom = "6px";
  const l2 = document.createElement("div");
  l2.textContent = "Tax";
  l2.style.color = "#6b7280";
  const r2 = document.createElement("div");
  r2.textContent = tax;
  taxLine.appendChild(l2);
  taxLine.appendChild(r2);

  const totalLine = document.createElement("div");
  totalLine.style.display = "flex";
  totalLine.style.justifyContent = "space-between";
  totalLine.style.marginTop = "8px";
  totalLine.style.fontWeight = "700";
  const l3 = document.createElement("div");
  l3.textContent = "Total";
  const r3 = document.createElement("div");
  r3.textContent = total;
  totalLine.appendChild(l3);
  totalLine.appendChild(r3);

  totalsBox.appendChild(subLine);
  totalsBox.appendChild(taxLine);
  totalsBox.appendChild(totalLine);
  totalsWrap.appendChild(totalsBox);
  wrapper.appendChild(totalsWrap);

  const notesEl = document.createElement("div");
  notesEl.style.marginTop = "16px";
  notesEl.style.color = "#6b7280";
  notesEl.style.fontSize = "12px";
  notesEl.textContent = notes;
  wrapper.appendChild(notesEl);

  const footer = document.createElement("div");
  footer.style.marginTop = "18px";
  footer.style.padding = "12px";
  footer.style.background = "#fafafa";
  footer.style.borderRadius = "6px";
  footer.style.color = "#6b7280";
  footer.style.fontSize = "12px";
  footer.textContent = opts.footerText || `${companyName} • GSTIN: 29AAMCP9070G1ZV • Bengaluru, India`;
  wrapper.appendChild(footer);

  return wrapper;
}

export async function generatePdfBlobFromOrder(order = {}, opts = {}) {
  const node = buildInvoiceNode(order, opts);

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.opacity = "0";
  container.style.pointerEvents = "none";
  container.appendChild(node);
  document.body.appendChild(container);

  const scale = opts.scale || 2;
  const canvas = await html2canvas(node, {
    scale,
    useCORS: true,
    allowTaint: false,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.98);
  const pdfFormat = (opts.pdfFormat || "a4").toLowerCase();
  const orientation = opts.orientation || "portrait";
  const pdf = new jsPDF({ unit: "pt", format: pdfFormat, orientation });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = pageWidth / imgWidth;
  const renderWidth = pageWidth;
  const renderHeight = imgHeight * ratio;

  pdf.addImage(imgData, "JPEG", 0, 0, renderWidth, renderHeight, undefined, "FAST");

  let remainingHeight = renderHeight - pageHeight;
  let position = -pageHeight;
  while (remainingHeight > 0) {
    pdf.addPage();
    position -= pageHeight;
    pdf.addImage(imgData, "JPEG", 0, position, renderWidth, renderHeight, undefined, "FAST");
    remainingHeight -= pageHeight;
  }

  const blob = pdf.output("blob");

  // cleanup
  try { document.body.removeChild(container); } catch (e) {}

  const filename = opts.filename || `invoice-${order._id || Date.now()}.pdf`;
  return { blob, filename };
}
