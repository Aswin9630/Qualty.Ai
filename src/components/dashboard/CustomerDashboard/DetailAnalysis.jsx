import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";
import { User, ClipboardList, CreditCard } from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ChartCard from "./ChartCard";
import InfoCard from "./InfoCard";

ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DetailAnalysis() {
  const [customer, setCustomer] = useState(null);
  const [stats, setStats] = useState(null);
  const [animatedCompletion, setAnimatedCompletion] = useState(0);
  const [animatedPaymentSuccess, setAnimatedPaymentSuccess] = useState(0);

  useEffect(() => {
    const fetchCustomerStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/customer/analysis`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setCustomer(data.customer);
          setStats(data.stats);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to load customer analysis");
      }
    };
    fetchCustomerStats();
  }, []);

  useEffect(() => {
    if (stats) {
      let completion = 0;
      let payment = 0;

      const completionInterval = setInterval(() => {
        completion += 1;
        setAnimatedCompletion(completion);
        if (completion >= stats.completionRate) clearInterval(completionInterval);
      }, 10);

      const paymentInterval = setInterval(() => {
        payment += 1;
        setAnimatedPaymentSuccess(payment);
        if (payment >= stats.paymentSuccessRate) clearInterval(paymentInterval);
      }, 10);

      return () => {
        clearInterval(completionInterval);
        clearInterval(paymentInterval);
      };
    }
  }, [stats]);

  if (!customer || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 text-lg">
        Loading customer analysis...
      </div>
    );
  }

  const totalEnquiries = stats.totalEnquiries || 50;
  const completedInspections = stats.completedInspections || 35;
  const pendingInspections = stats.pendingInspections || 15;
  const completionRate = stats.completionRate || 70;

  const totalPaid = stats.totalPaid || 5000;
  const pendingPayment = stats.pendingPayment || 2000;
  const paymentSuccessRate = stats.paymentSuccessRate || 85;
  const averagePayment = stats.averagePayment || 2000;

  const inspectionDoughnutData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [stats.completedInspections, stats.pendingInspections],
        backgroundColor: ["#7bce5dc6", "#f35212f4"],
        borderColor: ["#ffffffff", "#ffffffff"],
        borderWidth: 2,
      },
    ],
  };

  const inspectionLineData = {
    labels: stats.enquiryTimeline.map(item => {
      const d = new Date(item.date);
      return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
    }),
    datasets: [
      {
        label: "Completion Rate %",
        data: stats.enquiryTimeline.map((_, idx) => {
          const total = idx + 1;
          const completed = stats.enquiryTimeline
            .slice(0, total)
            .filter(e => e.status === "completed").length;
          return Math.round((completed / total) * 100);
        }),
        borderColor: "#0059ffae",
        backgroundColor: "#ffffff",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ffffffff",
        pointBorderColor: "#b2b2b2ff",
        pointRadius: 5,
      },
    ],
  };

  const paymentDoughnutData = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [stats.totalPaid, stats.pendingPayment],
        backgroundColor: ["#7bce5dc6", "#f35212f4"],
        borderColor: ["#ffffffff", "#ffffffff"],
        borderWidth: 2,
      },
    ],
  };

  const paymentLineData = {
    labels: stats.paymentTimeline.map(item => {
      const d = new Date(item.date);
      return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
    }),
    datasets: [
      {
        label: "Payment Success %",
        data: stats.paymentTimeline.map((_, idx) => {
          const total = idx + 1;
          const paid = stats.paymentTimeline
            .slice(0, total)
            .filter(p => p.status === "paid").length;
          return Math.round((paid / total) * 100);
        }),
        borderColor: "#0059ffae",
        backgroundColor: "#ffffff",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ffffffff",
        pointBorderColor: "#b2b2b2ff",
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { color: "#000", font: { weight: "500" } } },
      tooltip: { enabled: true, titleColor: "#fff", bodyColor: "#fff" },
    },
    animation: { duration: 2000, easing: "easeInOutSine" },
    scales: { x: { ticks: { color: "#000" } }, y: { ticks: { color: "#000" } } },
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-black mb-2 tracking-wide">Overview</h1>
          <p className="text-gray-600 text-sm">
            Your inspection activity, payments, and performance insights
          </p>
        </div>

        <InfoCard
          icon={<User />}
          title="Profile Info"
          data={{
            Name: customer.name,
            Email: customer.email,
            Mobile: customer.mobileNumber,
          }}
          glow="blue"
        />

        <InfoCard
          icon={<ClipboardList />}
          title="Inspection Stats"
          data={{
            "Total Enquiries": totalEnquiries,
            "Completed Inspections": completedInspections,
            "Pending Inspections": pendingInspections,
            "Completion Rate": `${completionRate}%`,
          }}
          progress={{ label: "Completion Progress", value: animatedCompletion }}
          glow="purple"
        />

        <InfoCard
          icon={<CreditCard />}
          title="Payment Stats"
          data={{
            "Total Paid": `₹${totalPaid}`,
            "Pending Payments": `₹${pendingPayment}`,
            "Average Payment": `₹${averagePayment}`,
            "Payment Success Rate": `${paymentSuccessRate}%`,
          }}
          progress={{ label: "Payment Success", value: animatedPaymentSuccess }}
          glow="green"
        />

        <div className="text-center">
          <h1 className="text-4xl font-semibold text-black mb-2 tracking-wide">Visual Analytics</h1>
          <p className="text-gray-600 text-sm">
            Explore your inspection trends, payment performance, and key metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <ChartCard title="Inspection Analysis" type="doughnut" data={inspectionDoughnutData} options={chartOptions} />
          <ChartCard title="Completion Rate Trend" type="line" data={inspectionLineData} options={chartOptions} />
          <ChartCard title="Payment Analysis" type="doughnut" data={paymentDoughnutData} options={chartOptions} />
          <ChartCard title="Payment Success Trend" type="line" data={paymentLineData} options={chartOptions} />
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
