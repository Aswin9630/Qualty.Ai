import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { FaUserTie, FaChartBar, FaCheckCircle } from "react-icons/fa";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addInspectionBids,
  addInspectionStats,
} from "../../../redux/slice/enquiryBidSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const getCurrencySymbol = (currency) => (currency === "USD" ? "$" : "₹");

export default function InspectionDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { bids = [], stats = {}, enquiry } = useSelector((store) => store.enquiryBid);
  console.log("bids",bids);
  
  const [confirmedBidId, setConfirmedBidId] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isFinalPaid, setIsFinalPaid] = useState(false);
  const [amountPaid, setAmountPaid] = useState(null);
  const [balanceAmount, setBalanceAmount] = useState(null);
  const [currency, setCurrency] = useState("INR");

  const { inspectionBudget } = location.state || {};

  const fetchDetails = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/customer/bids/${id}`, {
        credentials: "include",
      });
      const data = await response.json(); 
      console.log("Biddata", data);
      if (data.success) {
        if (data.enquiry && data.enquiry.currency) {
          setCurrency(data.enquiry.currency);
        } else {
          setCurrency("INR"); 
        }

        dispatch(addInspectionBids(data.bids || []));
        dispatch(addInspectionStats(data.stats || {}));
        const confirmed = (data.bids || []).find((b) => b.status === "won");
        if (confirmed) setConfirmedBidId(confirmed._id);
        if (
          data.enquiry?.status === "completed" ||
          data.enquiry?.currentPhase === "completed"
        ) {
          setIsFinalPaid(true);
        } else {
          setIsFinalPaid(false);
        }
      } else {
        toast.error(data.message || "Failed to load details");
      }
    } catch (err) {
      console.error("fetchDetails error:", err);
      toast.error("Failed to load inspection details");
    }
  }, []); 

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleConfirmBid = async (bidId, enquiryId, amount) => {
    try {
      const initialAmount = amount * 0.3;

      const orderRes = await fetch(
        `${BASE_URL}/payment/createInitialOrder/${enquiryId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bidId,amount: initialAmount }),
        }
      );
      const orderData = await orderRes.json();
      console.log("confirmOrderData", orderData);

      if (!orderData.success) {
        toast.error(orderData.message || "Failed to create payment order");
        return;
      }

      const { order, customerDetails, paymentId, keyId } = orderData;

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Qualty.ai",
        description: "Confirm Bid Payment",
        order_id: order.id,
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.mobileNumber,
        },
        theme: {
          color: "#000000",
        },
        handler: async function (response) {
          setIsVerifying(true);
          try {
            const verifyRes = await fetch(`${BASE_URL}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                paymentId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                bidId,
              }),
            });

            const text = await verifyRes.text();
            console.log("verificationPay",text);
            
            let verifyData;
            try {
              verifyData = JSON.parse(text);
            } catch (e) {
              console.error("Non-JSON verify response:", text);
              toast.error("Payment verification failed (unexpected server response)");
              return;
            }

            console.log("verify", verifyData);

            if (verifyRes.ok && verifyData?.success) {
              toast.success(verifyData.message || "Bid confirmed successfully!");
              setConfirmedBidId(bidId);
              setAmountPaid(verifyData.amountPaid ?? 0);
              setBalanceAmount(verifyData.balanceAmount ?? 0);

              await fetchDetails();
            } else {
              const msg = verifyData?.message || "Payment verification failed";
              toast.error(msg);
            }
          } catch (err) {
            console.error("verify handler error:", err);
            toast.error("Error verifying payment");
          } finally {
            setIsVerifying(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsVerifying(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("handleConfirmBid error:", err);
      toast.error("Error initiating payment");
    }
  };

  const handleFinalPayment = async (enquiryId) => {
    try {
      setIsVerifying(true);
      const orderRes = await fetch(
        `${BASE_URL}/payment/createFinalOrder/${enquiryId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const orderData = await orderRes.json();
      if (!orderData.success) {
        toast.error(orderData.message || "Failed to create final payment order");
        setIsVerifying(false);
        return;
      }

      const { order, customerDetails, paymentId, keyId } = orderData;

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Qualty.ai",
        description: "Final Inspection Payment",
        order_id: order.id,
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.mobileNumber,
        },
        theme: { color: "#000000" },
        handler: async function (response) {
          setIsVerifying(true);
          try {
            const verifyRes = await fetch(`${BASE_URL}/payment/verifyFinal`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                paymentId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const text = await verifyRes.text();
            let verifyData;
            try {
              verifyData = JSON.parse(text);
            } catch (e) {
              console.error("Non-JSON verifyFinal response:", text);
              toast.error("Final payment verification failed (unexpected server response)");
              return;
            }

            if (verifyRes.ok && verifyData?.success) {
              toast.success(verifyData.message || "Final payment completed.");
              setIsFinalPaid(true);
              await fetchDetails();
            } else {
              toast.error(verifyData?.message || "Final payment verification failed");
            }
          } catch (err) {
            console.error("verifyFinal handler error:", err);
            toast.error("Error verifying final payment");
          } finally {
            setIsVerifying(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsVerifying(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("handleFinalPayment error:", err);
      toast.error("Error initiating final payment");
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {isVerifying && (
          <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-black mx-auto mb-4"></div>
              <p className="text-black font-medium">Verifying payment...</p>
            </div>
          </div>
        )}

        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black mb-2">
            Inspection Bids Overview
          </h1>
          <p className="text-gray-600 text-sm">
            Review inspector bids and confirm the best fit for your inspection
          </p>
        </div>

        {stats && (
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
              <FaChartBar /> Bidding Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-700">
              <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition">
                <p className="text-lg font-bold text-black">{inspectionBudget}</p>
                <p>My Amount</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition">
                <p className="text-lg font-bold text-black">{stats.totalBids}</p>
                <p>Total Bids</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition">
                <p className="text-lg font-bold text-black">{stats.lowestBid || 0}</p>
                <p>Lowest Bid</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition">
                <p className="text-lg font-bold text-black">{stats.highestBid || 0}</p>
                <p>Highest Bid</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition">
                <p className="text-lg font-bold text-black">{Math.round(stats.averageBid || 0)}</p>
                <p>Average Bid</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">🧑‍🔬 Inspector Bids</h2>

          {(!Array.isArray(bids) || bids.length === 0) ? (
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center text-gray-500 shadow-sm">
              <p className="text-lg font-semibold mb-2">No bids yet</p>
              <p className="text-sm">Once inspectors submit their bids, you'll be able to review and confirm them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bids.map((bid) => {
                const isConfirmed = bid._id === confirmedBidId;
                const isLost = bid.status === "lost";
                const isWon = bid.status === "won";

                const currencySymbol = getCurrencySymbol(currency || "INR");
                const displayedBidAmount = bid.customerViewAmount ?? 0;

                return (
                  <div
                    key={bid._id}
                    className={`bg-white p-6 rounded-xl border ${isConfirmed ? "border-green-500" : "border-gray-200"} shadow-md hover:shadow-lg transition`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <FaUserTie className="text-yellow-600" />
                        {bid.inspector?.name || bid.inspectionCompany?.companyName || "-"}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isWon ? "bg-green-100 text-green-800" : isLost ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}>
                        {String(bid.status || "").toUpperCase()}
                      </span>
                    </div>

                    <div className="text-sm text-gray-700 space-y-1 mb-4">
                      <p><strong>Bid Amount:</strong> {currencySymbol}{displayedBidAmount}/-</p>
                      <p><strong>Submitted:</strong> {new Date(bid.createdAt).toLocaleString()}</p>
                      <p><strong>Enquiry ID:</strong> {bid.enquiry}</p>

                      {isConfirmed && amountPaid !== null && balanceAmount !== null && (
                        <>
                          <p><strong>Paid (30%):</strong> {(currency === "INR" ? "₹" : "$")}{amountPaid}</p>
                          <p><strong>Balance (70%):</strong> {(currency === "INR" ? "₹" : "$")}{balanceAmount}</p>
                        </>
                      )}
                    </div>

                    {isConfirmed ? (
                      <div>
                        <button disabled className="bg-green-600 text-white px-4 py-2 rounded font-semibold text-sm w-full cursor-not-allowed">
                          <FaCheckCircle className="inline mr-2" /> Confirmed
                        </button>

                        {isFinalPaid ? (
                          <button disabled className="mt-3 bg-gray-200 text-gray-500 px-4 py-2 rounded font-semibold text-sm w-full cursor-not-allowed">
                            Balance Paid
                          </button>
                        ) : (
                          <button onClick={() => handleFinalPayment(bid.enquiry)} className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded font-semibold text-sm w-full cursor-pointer">
                            Pay Balance
                          </button>
                        )}
                      </div>
                    ) : confirmedBidId ? (
                      <button disabled className="bg-gray-200 text-gray-500 px-4 py-2 rounded font-semibold text-sm w-full cursor-not-allowed">
                        <FaCheckCircle className="inline mr-2" /> Not Selected
                      </button>
                    ) : (
                      <button onClick={() => handleConfirmBid(bid._id, bid.enquiry, bid.customerViewAmount)} className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded font-semibold text-sm w-full cursor-pointer">
                        <FaCheckCircle className="inline mr-2" /> Confirm This Bid
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
