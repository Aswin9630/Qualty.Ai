import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPayments } from "../redux/slice/paymentSlice";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

export default function useFetchCustomerPayments(enquiryId, shouldFetch = true) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/customer/payments`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setPayments(data.payments));
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to load payment history");
      }
    };

    if (shouldFetch) {
      fetchPayments();
    }
  }, [dispatch, enquiryId, shouldFetch]);
}
