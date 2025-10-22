import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardStatus } from "../redux/slice/dashboardStatsSlice";

export default function useDashboardStats() {
    const dispatch = useDispatch();
  const status = useSelector((state) => state.dashboardStatus.status);
  

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/customer/dashboardStatus`, {
          credentials: "include",
        });
        const data = await res.json();  
                 
        if (data.success) {
             dispatch(setDashboardStatus(data.stats));
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };
     if (!status) {
      fetchStats();
    }
  }, [dispatch, status]);

  return status;
}
