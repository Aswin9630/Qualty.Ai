import React, { useEffect, useState } from "react";
import { COMPANY_API } from "../../../utils/constants";
import Shimmer from "../../../components/ShimmerUI";

export default function CompanyAnalysis() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${COMPANY_API}/analysis`, { credentials: "include" });
        const data = await res.json()
        console.log("dashData",data)
        if (!mounted) return;
        if (res.ok) setAnalytics(data.analytics || {});
      } catch (err) {
        console.error("Analytics error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <Shimmer className="h-8 w-1/3 rounded mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Shimmer className="h-24 rounded" />
          <Shimmer className="h-24 rounded" />
          <Shimmer className="h-24 rounded" />
          <Shimmer className="h-24 rounded" />
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const { profile, totalBids, wonBids, totalEarnings, winRate, recentBids } = analytics;
  const symbol = "₹";

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Company Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border rounded text-center">
          <div className="text-sm text-gray-500">Total Bids</div>
          <div className="text-2xl font-bold">{totalBids}</div>
        </div>
        <div className="p-4 border rounded text-center">
          <div className="text-sm text-gray-500">Won Bids</div>
          <div className="text-2xl font-bold">{wonBids}</div>
        </div>
        <div className="p-4 border rounded text-center">
          <div className="text-sm text-gray-500">Total Earnings</div>
          <div className="text-2xl font-bold">{symbol}{totalEarnings}</div>
        </div>
        <div className="p-4 border rounded text-center">
          <div className="text-sm text-gray-500">Win Rate</div>
          <div className="text-2xl font-bold">{winRate}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h3 className="text-sm text-gray-600 mb-2">Company</h3>
          <div className="text-black font-medium">{profile.companyName || profile.name}</div>
          <div className="text-xs text-gray-500">{profile.companyEmail || profile.email}</div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="text-sm text-gray-600 mb-2">Recent Bids</h3>
          <div className="space-y-2">
            {(recentBids || []).map((b) => (
              <div key={b._id} className="text-sm text-gray-700">
                <div className="font-medium text-black">{b.enquiry?.commodity || "—"}</div>
                <div className="text-xs">{b.enquiry?.currency==="INR"?"₹":"$"}{b.amount} • {new Date(b.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
            {(!recentBids || recentBids.length === 0) && <div className="text-sm text-gray-500">No recent bids</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
