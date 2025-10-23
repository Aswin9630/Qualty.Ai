import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { setProgressMap } from "../../../redux/slice/inspectionProgressSlice";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const progressMap = useSelector((state) => state.inspectionProgress);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/inspector/confirmed-customers`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setCustomers(data.customers);

          const orderIds = data.customers.map((c) => c.orderId);
          const progressRes = await fetch(`${BASE_URL}/chat/progress-multiple`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderIds }),
          });
          const progressData = await progressRes.json();
          if (progressData.success) {
            dispatch(setProgressMap(progressData.progressMap));
          }
        }
      } catch (err) {
        console.error("Failed to fetch customers:", err);
      }
    };

    fetchCustomers();
  }, [dispatch]);

  const getStatusLabel = (level) => {
    if (level >= 4) return "Completed";
    if (level >= 1) return "In Progress";
    return "Not Started";
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6 text-black">Chat with Customers</h2>
        {customers.length === 0 ? (
          <p className="text-gray-500">No customers available for chat.</p>
        ) : (
          <div className="space-y-4">
            {customers.map((customer, index) => {
              const status = getStatusLabel(progressMap[customer.orderId] || 0);
              return (
                <div
                  key={`${customer.id}-${customer.orderId}-${index}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-gray-300 rounded-lg p-4 hover:shadow transition"
                >
                  <div className="mb-2 sm:mb-0 sm:w-1/4">
                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      <span
                        className={`px-1 sm:px-2 py-1 text-xs rounded-full ${
                          status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {status}
                      </span>
                    </p>
                  </div>

                  <div className="sm:w-2/4 space-y-1 text-center sm:text-left">
                    <p className="text-sm sm:text-lg font-semibold text-black">{customer.name}</p>
                    <p className="text-xs text-gray-500">Commodity: {customer.commodity}</p>
                    <p className="text-xs text-gray-500">Order ID: {customer.orderId}</p>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:w-1/4 text-center sm:text-right">
                    <button
                      onClick={() => navigate(`/inspector/chat/${customer.id}/${customer.orderId}`)}
                      className="bg-black text-white cursor-pointer px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-gray-900 transition w-full sm:w-auto"
                    > 
                      Chat
                    </button> 
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

