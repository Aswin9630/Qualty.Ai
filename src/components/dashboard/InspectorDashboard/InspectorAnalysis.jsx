import { useSelector } from "react-redux";
import useFetchInspectorAnalytics from "../../../hooks/useFetchInspectorAnalytics";
import ShimmerUI from "../../ShimmerUI";

const InspectorAnalysis = () => {
  useFetchInspectorAnalytics();
  const { analytics, loading, error } = useSelector(
    (state) => state.inspectorAnalysis
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-6 py-10">
        <ShimmerUI />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-sm">
        {error}
      </div>
    );
  }

  if (!analytics) return null;

  const { profile, totalBids, wonBids, totalEarnings, winRate, recentBids } =
    analytics;

  const getCurrencySymbol = (currency) => (currency === "USD" ? "$" : "₹");
  const currency = analytics.currency || "INR";
  const symbol = getCurrencySymbol(currency);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-black animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Inspector Performance Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Bids", value: totalBids },
          { label: "Won Bids", value: wonBids },
          { label: "Total Earnings", value: `${symbol}${totalEarnings}` },
          { label: "Win Rate", value: `${winRate}%`, color: "text-blue-600" },
        ].map((card, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
            <p className="text-sm text-gray-500">{card.label}</p>
            <h2 className={`text-2xl font-bold ${card.color || "text-black"}`}>{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Inspector Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Mobile:</strong> {profile.mobileNumber}</p>
          <p><strong>Type:</strong> {profile.inspectorType}</p>
          <p>
            <strong>Experience:</strong>{" "}
            {profile.commodities?.[0]?.experienceYears
              ? `${profile.commodities[0].experienceYears} years`
              : "—"}
          </p>
          <p>
            <strong>Commodities:</strong>{" "}
            {profile.commodities?.map((c, i) => (
              <span key={i} className="inline-block mr-2">{c.commodity}</span>
            ))}
          </p>
          <p><strong>Accepts Requests:</strong> {profile.acceptsRequests ? "Yes" : "No"}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Bids</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Enquiry</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentBids.map((bid) => (
                <tr key={bid._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{bid.enquiry?.commodity}</td>
                  <td className="px-4 py-2">{symbol} {bid.amount}</td>
                  <td className="px-4 py-2 capitalize">{bid.status}</td>
                  <td className="px-4 py-2">{new Date(bid.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InspectorAnalysis;
