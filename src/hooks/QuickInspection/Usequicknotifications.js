import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../utils/constants";

export function useCustomerQuickNotifications() {
  const [hasAccepted, setHasAccepted] = useState(false);

  const check = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/quickInspection/my-requests`, {
        credentials: "include"
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success) {
        const found = data.data.some(
          (r) => r.status === "accepted" && r.payment?.status !== "completed"
        );
        setHasAccepted(found);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, [check]);

  return hasAccepted;
}

export function useCompanyQuickNotifications() {
  const [pendingCount, setPendingCount] = useState(0);

  const check = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/inspectionCompany/quick-requests`, {
        credentials: "include"
      });
      if (!res.ok) return;
      const data = await res.json()
      if (data.success) {
        const count = data.data.filter((r) => r.status === "pending").length;
        setPendingCount(count)
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    check();
    const interval = setInterval(check,30000);
    return () => clearInterval(interval);
  }, [check]);

  return pendingCount;
}