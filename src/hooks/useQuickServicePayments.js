import { useCallback, useState } from "react";
import { BASE_URL } from "../utils/constants";

export default function useQuickServicePayments() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const fetchPayments = useCallback(async ({ q = "", p = 1, limit = 12 } = {}) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.set("page", p);
      params.set("limit", limit);
      if (q) params.set("q", q);
      const res = await fetch(`${BASE_URL}/quickService/payment?${params.toString()}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to fetch payments");
      setItems(data.items || []);
      setPage(data.page || p);
      setPages(data.pages || 1);
      setTotal(data.total || 0);
      return data;
    } catch (err) {
      console.error("fetchPayments error:", err);
      setError(err.message || "Failed to load payments");
      setItems([]);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, items, page, pages, total, error, fetchPayments, setPage };
}
