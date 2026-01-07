import React, { useState } from "react";
import Joyride from "react-joyride";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const inspectionData = [
  { name: "Completed", value: 1 },
  { name: "Pending", value: 1 },
];

const paymentData = [
  { name: "Paid", value: 2 },
  { name: "Pending", value: 1 },
];

const completionRateData = [
  { date: "16/12", rate: 0.3 },
  { date: "17/12", rate: 0.5 },
  { date: "18/12", rate: 0.8 },
];

const paymentSuccessData = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  rate: Math.round(Math.random() * 100),
}));

const COLORS = ["#00C49F", "#FF8042"];
const COLORS2 = ["#00C49F", "#FF8042"];

export default function DetailAnalysisUI() {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: "#profile-info",
      content: "This is your profile information with Name, Email, and Mobile.",
      placement: "bottom",
    },
    {
      target: "#inspection-stats",
      content: "Here you can see your inspection statistics in detail.",
      placement: "bottom",
    },
    {
      target: "#payment-stats",
      content: "This section shows all payment related statistics.",
      placement: "bottom",
    },
    {
      target: "#visual-analytics",
      content: "Visual analytics display charts and trends for your activities.",
      placement: "top",
    },
    {
      target: "#inspection-analysis",
      content: "Inspection analysis pie chart.",
      placement: "top",
    },
    {
      target: "#completion-rate-trend",
      content: "Completion rate trend line chart.",
      placement: "top",
    },
    {
      target: "#payment-analysis",
      content: "Payment analysis pie chart.",
      placement: "top",
    },
    {
      target: "#payment-success-trend",
      content: "Payment success trend line chart.",
      placement: "top",
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-start p-8 bg-gray-50 overflow-auto">
      <Joyride
        steps={steps}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />

      <div
        className="w-full"
        style={{ transform: "scale(0.9)", transformOrigin: "top left" }}
      >
        <h1 className="text-2xl font-bold text-center">Overview</h1>
        <p className="text-center text-gray-500 mb-8">
          Your inspection activity, payments, and performance insights
        </p>

        <div id="profile-info" className="bg-white shadow p-4 rounded mb-6">
          <h2 className="font-semibold text-lg mb-2">Profile Info</h2>
          <div className="flex flex-col sm:flex-row justify-between">
            <p>
              <span className="font-semibold">Name:</span> Username
            </p>
            <p>
              <span className="font-semibold">Email:</span> user123@gmail.com
            </p>
            <p>
              <span className="font-semibold">Mobile:</span> 1234567890
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
       
          <div id="inspection-stats" className="bg-white shadow p-4 rounded w-full">
            <h2 className="font-semibold text-lg mb-2">Inspection Stats</h2>
            <div className="flex justify-between mb-2">
              <p>Total Enquiries: 2</p>
              <p>Completed Inspections: 0</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Pending Inspections: 2</p>
              <p>Completion Rate: 0%</p>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-black rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>

          <div id="payment-stats" className="bg-white shadow p-4 rounded w-full">
            <h2 className="font-semibold text-lg mb-2">Payment Stats</h2>
            <div className="flex justify-between mb-2">
              <p>Total Paid: ₹2438</p>
              <p>Pending Payments: ₹3377</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Average Payment: ₹1111</p>
              <p>Payment Success Rate: 37%</p>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-black rounded-full" style={{ width: "37%" }}></div>
            </div>
          </div>
        </div>

        <div id="visual-analytics">
          <h2 className="text-xl font-semibold mb-2 text-center">Visual Analytics</h2>
          <p className="text-center text-gray-500 mb-6">
            Explore your inspection trends, payment performance, and key metrics
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     
            <div id="inspection-analysis" className="bg-white shadow p-4 rounded">
              <h3 className="font-semibold mb-2">Inspection Analysis</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={inspectionData}
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {inspectionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div id="completion-rate-trend" className="bg-white shadow p-4 rounded">
              <h3 className="font-semibold mb-2">Completion Rate Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={completionRateData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div id="payment-analysis" className="bg-white shadow p-4 rounded">
              <h3 className="font-semibold mb-2">Payment Analysis</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={paymentData}
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {paymentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS2[index % COLORS2.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div id="payment-success-trend" className="bg-white shadow p-4 rounded">
              <h3 className="font-semibold mb-2">Payment Success Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={paymentSuccessData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
