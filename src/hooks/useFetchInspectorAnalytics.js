import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFailure } from "../redux/slice/inspectorAnalysisSlice";
import { BASE_URL } from "../utils/constants";

const useFetchInspectorAnalytics = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAnalytics = async () => {
      dispatch(fetchStart());
      try {
        const response = await fetch(`${BASE_URL}/inspector/analysis`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();        
        if (data.success) {
          dispatch(fetchSuccess(data.analytics));
        } else {
          dispatch(fetchFailure(data.message || "Failed to load analytics"));
        }
      } catch (err) {
        dispatch(fetchFailure("Network error"));
      }
    };

    fetchAnalytics();
  }, []);
};

export default useFetchInspectorAnalytics;
