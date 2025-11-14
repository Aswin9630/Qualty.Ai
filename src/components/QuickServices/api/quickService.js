import { BASE_URL } from "../../../utils/constants";


async function handleJson(res) {
  const text = await res.text().catch(() => "");
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

export async function fetchComputeTotal() {
  const res = await fetch(`${BASE_URL}/quickService/computeTotal`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await handleJson(res);
    throw new Error(err.error || "Failed to compute totals");
  }
  return handleJson(res);
}

export async function createRazorpayOrder(amountMajor, currency = "INR") {
  const res = await fetch(`${BASE_URL}/quickService/createOrder`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amountMajor, currency }),
  });
  if (!res.ok) {
    const err = await handleJson(res);
    throw new Error(err.error || "Failed to create order");
  }
  return handleJson(res);
}

export async function verifyRazorpayPayment(payload) {
  const res = await fetch(`${BASE_URL}/quickService/verify`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await handleJson(res);
    throw new Error(err.error || "Payment verification failed");
  }
  return handleJson(res);
}

export async function bulkAddToCart(items = []) {
  const res = await fetch(`${BASE_URL}/quickService/cart/bulk`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) {
    const err = await handleJson(res);
    throw new Error(err.error || "Failed to add items to cart");
  }
  return handleJson(res);
}
