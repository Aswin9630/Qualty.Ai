import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFail } from "../../redux/slice/companySlice/companyEnquirySlice";
import { COMPANY_API } from "../../utils/constants";

export default function useFetchCompanyEnquiries() {
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    async function load() {
      dispatch(fetchStart());
      try {
        const res = await fetch(`${COMPANY_API}/enquiries`, { credentials: "include" });
        const data = await res.json();
        console.log("data",data);
        
        if (data) dispatch(fetchSuccess(data.enquiries || []));
        else if (mounted) dispatch(fetchFail(data.message || "Failed to load"));
      } catch (err) {
        if (mounted) dispatch(fetchFail(err.message));
      }
    }
    load();
    return () => { mounted = false; };
  }, [dispatch]);
}
