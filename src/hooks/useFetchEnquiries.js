import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addEnquiries } from "../redux/slice//enquirySlice";

const useFetchEnquiries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/inspector/enquiries`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json(); 
        if (data.enquiries) {
          
          dispatch(addEnquiries(data.enquiries));
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    loadEnquiries();
  }, []);
};

export default useFetchEnquiries;
