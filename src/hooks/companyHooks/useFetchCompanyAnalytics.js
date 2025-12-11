import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFail } from "../../redux/slice/companySlice/companyAnalysisSlice";
import { COMPANY_API } from "../../utils/constants";

export default function useFetchCompanyAnalytics() {
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    async function load() {
      dispatch(fetchStart());
      try {
        const res = await fetch(`${COMPANY_API}/analysis`, { credentials: "include" });
        const data = await res.json();
        if (res.ok && mounted) dispatch(fetchSuccess(data.analytics || null));
        else if (mounted) dispatch(fetchFail(data.message || "Failed to load analytics"));
      } catch (err) {
        if (mounted) dispatch(fetchFail(err.message));
      }
    }
    load();
    return () => { mounted = false; };
  }, [dispatch]);
}
