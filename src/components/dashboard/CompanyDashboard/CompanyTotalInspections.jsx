export default function CompanyTotalInspections() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Inspections</h3>
      <p className="text-3xl font-semibold text-black mb-3">0</p>
      <button className="text-sm font-semibold text-black hover:underline">
        View Analysis →
      </button>
    </div>
  );
}