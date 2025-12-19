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
      console.log("biddingRoom",data)   
      const activeOnly = (data.enquiries || []).filter(
      (e) => e.status !== "cancelled"
    );
      setEnquiryData(activeOnly)

  }
   const handleDeleted = (id) => {
    setEnquiryData((prev) => prev.filter((r) => r._id !== id));
  };
  return <div className="p-6 min-h-screen">
    <ActiveInspectionRequests requests={enquiryData} onDeleted={handleDeleted} />
  </div>;
}
export default BiddingRoom;