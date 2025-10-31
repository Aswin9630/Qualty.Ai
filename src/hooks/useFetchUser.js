
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import {useDispatch} from "react-redux"
import {addUser} from "../redux/slice/userSlice"

const useFetchUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/profile`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        
        if (data.userInfo) {
          dispatch(addUser(data.userInfo))
        } else {
          navigate("/");   
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);
  
};

export default useFetchUser;
