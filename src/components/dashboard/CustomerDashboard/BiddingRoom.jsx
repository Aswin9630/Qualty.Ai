import { useEffect, useState } from "react";
import ActiveInspectionRequests from "./ActiveInspectionRequests";
import { BASE_URL } from "../../../utils/constants";

const BiddingRoom = () => {
  const [enquiryData,setEnquiryData]=useState("");

  useEffect(()=>{
      getMyQueries()
  },[])
    
  const getMyQueries=async()=>{
      const response=await fetch(`${BASE_URL}/customer/my-enquiries`,{
          method:"GET",   
          credentials:"include",
      })
      const data=await response.json()
      setEnquiryData(data.enquiries)

  }

  return <div className="p-6 min-h-screen">
    <ActiveInspectionRequests requests={enquiryData} />
  </div>;
}
export default BiddingRoom;