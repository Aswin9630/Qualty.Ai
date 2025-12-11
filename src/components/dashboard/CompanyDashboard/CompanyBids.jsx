export default function CompanyBids() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Bids Quoted</h3>
      <p className="text-3xl font-semibold text-black mb-3">128</p>
      <button className="text-sm font-semibold text-black hover:underline">
        View Bids →
      </button>
    </div>
  );
}