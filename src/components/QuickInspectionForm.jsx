import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import useFetchUser from "../hooks/useFetchUser";
import { useLocation, useNavigate  } from "react-router";
import NewHeader from "./NewHeader"

const QuickInspectionForm = ({ closeForm, onSubmit }) => {
  const locationState = useLocation();
  const navigate = useNavigate()
  const prefill = locationState.state || {};

  const [formData, setFormData] = useState({
    location: prefill.location || "",
    commodityCategory: "",
    description: "",
    inspectionDate: "",
    inspectionTypes: "",
    inspectionService: "",
    contact: "",
    volume: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useFetchUser();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidContact = (contact) => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(contact) || emailRegex.test(contact);
  };

  const launchRazorpayDialog = (data) => {
  const { order, keyId, customerDetails, paymentId, requestId } = data;

  const options = {
    key: keyId,
    amount: order.amount,
    currency: "INR",
    name: "Qualty.AI",
    description: "Quick Service Payment",
    order_id: order.id,
    prefill: {
      name: customerDetails.name,
      email: customerDetails.email,
      contact: customerDetails.mobileNumber,
    },
    handler: async function (response) {
      try {
        const verifyRes = await fetch(`${BASE_URL}/payment/verifyQuickService`, {
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

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          toast.success("Payment successful!");
          navigate("/customer/dashboard");
        } else {
          toast.error("Payment verification failed");
        }
      } catch (err) {
        toast.error("Verification error");
        console.error(err);
      }
    },
    theme: { color: "#0f172a" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidContact(formData.contact)) {
      setError("Please enter a valid phone number or email");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/quick-services/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();      
      setLoading(false);

      if (!data.success) {
        setError(data.message || "Submission failed");
        return;
      }

      toast.success(data.message);

      setFormData({
        location: "",
        commodityCategory: "",
        description: "",
        inspectionDate: "",
        inspectionTypes: "",
        inspectionService: "",
        contact: "",
        volume: "",
      });

      if (onSubmit) onSubmit(data);
       launchRazorpayDialog(data);
    } catch (err) {
      console.error("Error submitting form:", err);
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };


  return (
  <div className="min-h-screen bg-white text-black px-4 py-10">
    {/* <NewHeader/> */}
    <form
      onSubmit={handleFormSubmit}
      className="space-y-6 py-25 bg-white text-black p-8 rounded-2xl shadow-xl border border-gray-300 max-w-2xl mx-auto animate-fade-in"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Quick Inspection Request</h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleFormChange}
          placeholder="Enter location"
          required
          autoFocus
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:border-black focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Commodity Category</label>
        <select
          name="commodityCategory"
          value={formData.commodityCategory}
          onChange={handleFormChange}
          required
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:border-black focus:outline-none"
        >
          <option value="">Select category</option>
          <option value="Rice">Rice</option>
          <option value="Grains">Grains</option>
          <option value="Pulses">Pulses</option>
          <option value="Wheat">Wheat</option>
          <option value="Maize">Maize</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          rows="3"
          placeholder="Enter description"
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:border-black focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Volume</label>
        <input
          name="volume"
          value={formData.volume}
          onChange={handleFormChange}
          placeholder="Enter volume"
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:border-black focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Inspection Date</label>
        <input
          type="date"
          name="inspectionDate"
          value={formData.inspectionDate}
          onChange={handleFormChange}
          required
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:border-black focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Inspection Type</label>
        <div className="flex gap-6">
          {["Physical", "Chemical", "Both"].map((type) => (
            <label key={type} className="text-sm text-gray-800 flex items-center">
              <input
                type="radio"
                name="inspectionTypes"
                value={type}
                checked={formData.inspectionTypes === type}
                onChange={handleFormChange}
                className="mr-2 accent-black"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Inspection Service</label>
        <select
          name="inspectionService"
          value={formData.inspectionService}
          onChange={handleFormChange}
          required
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:border-black focus:outline-none"
        >
          <option value="">Select service</option>
          <option value="PSI">PSI</option>
          <option value="Loading">Loading</option>
          <option value="Stuffing">Stuffing</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Contact</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleFormChange}
          placeholder="Phone or Email"
          required
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:border-black focus:outline-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-4 pt-6">
        <button
          type="button"
          onClick={closeForm}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg font-medium transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 py-3 cursor-pointer rounded-lg font-medium transition-colors ${
            loading
              ? "bg-gray-300 cursor-not-allowed text-black"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </form>
  </div>
);

};

export default QuickInspectionForm;
