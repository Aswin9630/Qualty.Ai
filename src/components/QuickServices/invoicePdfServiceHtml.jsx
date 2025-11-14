
// import ReactDOM from "react-dom/client";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import InvoiceHTML from "./InvoiceTemplate";


// export async function generatePdfFromOrderHtml(order = {}, opts = {}) {
//   const filename = opts.filename || `qualty-invoice-${order._id || Date.now()}.pdf`;
//   const company = opts.company || {};
//   const scale = opts.scale || 2;

//   // 1) mount offscreen
//   const mount = document.createElement("div");
//   mount.style.position = "fixed";
//   mount.style.left = "-9999px";
//   mount.style.top = "0";
//   mount.style.width = "0px";
//   mount.style.height = "0px";
//   mount.style.overflow = "hidden";
//   document.body.appendChild(mount);

//   const root = ReactDOM.createRoot(mount);
//   root.render(<InvoiceHTML order={order} company={company} />);

//   // wait for render and images
//   await new Promise((res) => setTimeout(res, 250));
//   const invoiceNode = mount.querySelector("#invoice-document") || mount.firstElementChild;
//   if (!invoiceNode) {
//     try { root.unmount(); } catch {}
//     document.body.removeChild(mount);
//     throw new Error("Invoice render failed");
//   }

//   const imgs = invoiceNode.querySelectorAll("img");
//   await Promise.all(Array.from(imgs).map((img) => {
//     if (img.complete) return Promise.resolve();
//     return new Promise((res) => { img.onload = img.onerror = res; });
//   }));

//   // 2) try jsPDF.html for selectable text
//   try {
//     const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
//     await new Promise((resolve, reject) => {
//       pdf.html(invoiceNode, {
//         callback: function () {
//           try {
//             const blob = pdf.output("blob");
//             resolve({ blob });
//           } catch (e) { reject(e); }
//         },
//         x: 10,
//         y: 10,
//         html2canvas: { scale, useCORS: true, allowTaint: false },
//         windowWidth: invoiceNode.scrollWidth || invoiceNode.offsetWidth || 800,
//       });
//     });
//     const blob = pdf.output("blob");
//     try { root.unmount(); } catch {}
//     try { document.body.removeChild(mount); } catch {}
//     return { blob, filename, method: "html" };
//   } catch (err) {
//     console.warn("jsPDF.html failed, falling back to html2canvas:", err);
//     // fallback raster approach
//     const canvas = await html2canvas(invoiceNode, {
//       scale,
//       useCORS: true,
//       allowTaint: false,
//       backgroundColor: "#ffffff",
//       logging: false,
//     });
//     const imgData = canvas.toDataURL("image/jpeg", 0.95);
//     const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();
//     const imgWidth = canvas.width;
//     const imgHeight = canvas.height;
//     const ratio = pageWidth / imgWidth;
//     const renderWidth = pageWidth;
//     const renderHeight = imgHeight * ratio;

//     pdf.addImage(imgData, "JPEG", 0, 0, renderWidth, renderHeight, undefined, "FAST");

//     let remainingHeight = renderHeight - pageHeight;
//     let position = -pageHeight;
//     while (remainingHeight > 0) {
//       pdf.addPage();
//       position -= pageHeight;
//       pdf.addImage(imgData, "JPEG", 0, position, renderWidth, renderHeight, undefined, "FAST");
//       remainingHeight -= pageHeight;
//     }

//     const blob = pdf.output("blob");
//     try { root.unmount(); } catch {}
//     try { document.body.removeChild(mount); } catch {}
//     return { blob, filename, method: "canvas" };
//   }
// }


// src/utils/invoicePdfServiceHtml.js
import React from "react";
import ReactDOM from "react-dom/client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import InvoiceHTML from "./InvoiceTemplate";


export async function generatePdfFromOrderHtml(order = {}, opts = {}) {
  const filename = opts.filename || `qualty-invoice-${order._id || Date.now()}.pdf`;
  const company = opts.company || {};
  const scale = opts.scale || 2;

  const mount = document.createElement("div");
  mount.style.position = "fixed";
  mount.style.left = "-9999px";
  mount.style.top = "0";
  mount.style.width = "0px";
  mount.style.height = "0px";
  mount.style.overflow = "hidden";
  document.body.appendChild(mount);

  const root = ReactDOM.createRoot(mount);
  root.render(<InvoiceHTML order={order} company={company} />);

  await new Promise((res) => setTimeout(res, 350));
  const invoiceNode = mount.querySelector("#invoice-document") || mount.firstElementChild;
  if (!invoiceNode) {
    try { root.unmount(); } catch {}
    try { document.body.removeChild(mount); } catch {}
    throw new Error("Invoice render failed");
  }

  const imgs = invoiceNode.querySelectorAll("img");
  await Promise.all(Array.from(imgs).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((r) => { img.onload = img.onerror = r; });
  }));

  try {
const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });

await new Promise((resolve, reject) => {
  let done = false;
  const timer = setTimeout(() => {
    if (!done) {
      done = true;
      reject(new Error("jsPDF.html timed out"));
    }
  }, 20000);

  pdf.html(invoiceNode, {
    x: 10,
    y: 10,
    html2canvas: {
      scale: Math.min(scale, 1.5), 
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff"
    },
    windowWidth: invoiceNode.scrollWidth || 794,
    callback: () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve();
    },
    autoPaging: "text"
  });
});

const blob = pdf.output("blob");


    try { root.unmount(); } catch {}
    try { document.body.removeChild(mount); } catch {}

    return { blob, filename, method: "html" };
  } catch (err) {
    console.warn("jsPDF.html failed, falling back to html2canvas:", err);
const canvas = await html2canvas(invoiceNode, { scale: 1.5, useCORS: true, backgroundColor: "#fff" });


    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });

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

    try { root.unmount(); } catch {}
    try { document.body.removeChild(mount); } catch {}

    return { blob, filename, method: "canvas" };
  }
}
