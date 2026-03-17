// import { useState, useMemo, useEffect } from "react";
// import { useParams } from "react-router";
// import { CompanyCard } from "../components/CompanyCard.jsx";
// import { CompanyDetailDrawer } from "../components/CompanyDetailDrawer.jsx";
// import { RequestInspectionModal } from "../components/RequestInspectionModal.jsx";
// import { Search, Loader2 } from "lucide-react";
// import { motion } from "framer-motion";
// import { BASE_URL } from "../../../../../utils/constants.js";

// const SERVICE_NAMES = {
//   psi: "Pre Shipment Inspection",
//   loading: "Loading Supervision",
//   stuffing: "Stuffing Supervision",
//   destination: "Destination Inspection",
// };

// const ShimmerCard = () => (
//   <div className="animate-pulse bg-white rounded-2xl border border-gray-200 p-8 space-y-4">
//     <div className="flex gap-4">
//       <div className="w-14 h-14 bg-gray-100 rounded-xl" />
//       <div className="flex-1 space-y-2">
//         <div className="h-5 bg-gray-100 rounded w-1/2" />
//         <div className="h-3 bg-gray-100 rounded w-1/3" />
//       </div>
//     </div>
//     <div className="space-y-2">
//       <div className="h-3 bg-gray-100 rounded w-full" />
//       <div className="h-3 bg-gray-100 rounded w-3/4" />
//     </div>
//     <div className="flex gap-2">
//       <div className="h-6 w-16 bg-gray-100 rounded-full" />
//       <div className="h-6 w-16 bg-gray-100 rounded-full" />
//     </div>
//     <div className="h-10 bg-gray-100 rounded-xl" />
//     <div className="h-12 bg-gray-100 rounded-xl" />
//   </div>
// );

// const collectLocations = (regions) => {
//   const locs = [];
//   (regions || []).forEach((r) => {
//     locs.push(r.name?.toLowerCase() || "");
//     (r.locations || []).forEach((l) => locs.push(l.city?.toLowerCase() || ""));
//   });
//   return locs;
// };

// const matchesSearch = (company, query) => {
//   if (!query.trim()) return true;
//   const q = query.toLowerCase();
//   if (company.name?.toLowerCase().includes(q)) return true;
//   if (company.description?.toLowerCase().includes(q)) return true;
//   if ((company.commodities || []).some((c) => c.toLowerCase().includes(q))) return true;
//   const indiaLocs = collectLocations(company.indiaRegions);
//   const intlLocs = collectLocations(company.intlRegions);
//   if ([...indiaLocs, ...intlLocs].some((l) => l.includes(q))) return true;
//   return false;
// };

// export function Marketplace() {
//   const { id } = useParams();
//   const activeService = id || "psi";
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
//   const [companiesData, setCompaniesData] = useState([]);
//   const [requestData, setRequestData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const serviceName = SERVICE_NAMES[activeService] || "Inspection";

//   useEffect(() => {
//     const controller = new AbortController();
//     const fetchCompanies = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const res = await fetch(`${BASE_URL}/quickInspection/inspection-marketplace`, {
//           signal: controller.signal
//         });
//         const data = await res.json();
//         console.log("data",data)
//         if (!res.ok) throw new Error(data.message);

//         const transformed = data.quickInspections.map((q) => {
//           const collectServices = (regions) => {
//             const set = new Set();
//             (regions || []).forEach((r) =>
//               (r.locations || []).forEach((loc) =>
//                 Object.entries(loc.services || {}).forEach(([k, v]) => {
//                   if (v?.confirmed) set.add(k);
//                 })
//               )
//             );
//             return [...set];
//           };

//           return {
//             id: q.company._id,
//             quickInspectionId: q._id,
//             name: q.company.companyName,
//             email: q.company.companyEmail,
//             description: q.description,
//             commodities: q.commodities || [],
//             indiaRegions: q.indiaRegions || [],
//             intlRegions: q.intlRegions || [],
//             services: [
//               ...collectServices(q.indiaRegions || []),
//               ...collectServices(q.intlRegions || [])
//             ]
//           };
//         });

//         setCompaniesData(transformed);
//       } catch (err) {
//         if (err.name !== "AbortError") setError(err.message || "Failed to load");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCompanies();
//     return () => controller.abort();
//   }, []);

//   const filteredCompanies = useMemo(() => {
//     return companiesData
//       .filter((c) => c.services.includes(activeService))
//       .filter((c) => matchesSearch(c, searchQuery));
//   }, [companiesData, activeService, searchQuery]);

//   const handleViewDetails = (company) => {
//     setSelectedCompany(company);
//     setIsDrawerOpen(true);
//   };

//   const handleRequestInspection = (company) => {
//     setRequestData(company);
//     setIsRequestModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
//         <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
//           <div className="mb-2">
//             <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Marketplace</span>
//           </div>
//           <h1 className="text-5xl font-bold mb-2 text-gray-900 tracking-tight">{serviceName}</h1>
//           <p className="text-gray-400 text-base">Find and compare verified inspection companies</p>
//         </motion.div>

//         <motion.div
//           className="mt-8 mb-10"
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.15 }}
//         >
//           <div className="relative max-w-xl">
//             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input
//               type="text"
//               placeholder="Search by company, commodity, city or region..."
//               className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent placeholder:text-gray-400 transition"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//           {searchQuery && !loading && (
//             <p className="text-sm text-gray-500 mt-2 ml-1">
//               {filteredCompanies.length} result{filteredCompanies.length !== 1 ? "s" : ""} for "{searchQuery}"
//             </p>
//           )}
//         </motion.div>

//         {loading ? (
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//             {[1, 2, 3, 4, 5, 6].map((i) => <ShimmerCard key={i} />)}
//           </div>
//         ) : error ? (
//           <div className="text-center py-24 bg-gray-50 rounded-2xl">
//             <p className="text-gray-500 font-medium">{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-4 px-5 py-2 bg-black text-white rounded-xl text-sm"
//             >
//               Retry
//             </button>
//           </div>
//         ) : filteredCompanies.length === 0 ? (
//           <div className="text-center py-24 bg-gray-50 rounded-2xl">
//             <Loader2 size={0} className="hidden" />
//             <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <Search size={22} className="text-gray-400" />
//             </div>
//             <p className="font-semibold text-gray-700">No companies found</p>
//             <p className="text-sm text-gray-400 mt-1">
//               {searchQuery ? `Try a different search term` : `No companies offer this service yet`}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredCompanies.map((company, i) => (
//               <motion.div
//                 key={company.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//               >
//                 <CompanyCard
//                   company={company}
//                   service={activeService}
//                   onViewDetails={handleViewDetails}
//                   onRequestInspection={handleRequestInspection}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>

//       <CompanyDetailDrawer
//         company={selectedCompany}
//         service={activeService}
//         open={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         onRequestInspection={handleRequestInspection}
//       />

//       <RequestInspectionModal
//         requestData={requestData}
//         service={activeService}
//         open={isRequestModalOpen}
//         onClose={() => setIsRequestModalOpen(false)}
//       />
//     </div>
//   );
// }








import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router";
import { CompanyCard } from "../components/CompanyCard.jsx";
import { CompanyDetailDrawer } from "../components/CompanyDetailDrawer.jsx";
import { RequestInspectionModal } from "../components/RequestInspectionModal.jsx";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { BASE_URL } from "../../../../../utils/constants.js";

const SERVICE_NAMES = {
  psi: "Pre Shipment Inspection",
  loading: "Loading Supervision",
  stuffing: "Stuffing Supervision",
  destination: "Destination Inspection",
};

const ShimmerCard = () => (
  <div className="animate-pulse bg-white rounded-2xl border border-gray-200 p-8 space-y-4">
    <div className="flex gap-4">
      <div className="w-14 h-14 bg-gray-100 rounded-xl" />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-3/4" />
    </div>
    <div className="flex gap-2">
      <div className="h-6 w-16 bg-gray-100 rounded-full" />
      <div className="h-6 w-16 bg-gray-100 rounded-full" />
    </div>
    <div className="h-10 bg-gray-100 rounded-xl" />
    <div className="h-12 bg-gray-100 rounded-xl" />
  </div>
);

const collectLocations = (regions) => {
  const locs = [];
  (regions || []).forEach((r) => {
    locs.push(r.name?.toLowerCase() || "");
    (r.locations || []).forEach((l) => locs.push(l.city?.toLowerCase() || ""));
  });
  return locs;
};

const matchesSearch = (company, query) => {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  if (company.name?.toLowerCase().includes(q)) return true;
  if (company.description?.toLowerCase().includes(q)) return true;
  if ((company.commodities || []).some((c) => c.toLowerCase().includes(q))) return true;
  const indiaLocs = collectLocations(company.indiaRegions);
  const intlLocs = collectLocations(company.intlRegions);
  if ([...indiaLocs, ...intlLocs].some((l) => l.includes(q))) return true;
  return false;
};

export function Marketplace() {
  const { id } = useParams();
  const activeService = id || "psi";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [companiesData, setCompaniesData] = useState([]);
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const serviceName = SERVICE_NAMES[activeService] || "Inspection";

  useEffect(() => {
    const controller = new AbortController();
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/quickInspection/inspection-marketplace`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        const transformed = data.quickInspections.map((q) => {
          const collectServices = (regions) => {
            const set = new Set();
            (regions || []).forEach((r) =>
              (r.locations || []).forEach((loc) =>
                Object.entries(loc.services || {}).forEach(([k, v]) => {
                  if (v?.confirmed) set.add(k);
                })
              )
            );
            return [...set];
          };

          const hasIntlCoverage =
            (q.intlRegions || []).length > 0 &&
            (q.intlRegions || []).some((r) =>
              (r.locations || []).some((loc) =>
                Object.values(loc.services || {}).some((v) => v?.confirmed)
              )
            );

          const indiaServices = collectServices(q.indiaRegions || []);
          const intlServices = collectServices(q.intlRegions || []);
          const allServices = [...new Set([...indiaServices, ...intlServices])];

          if (hasIntlCoverage && !allServices.includes("destination")) {
            allServices.push("destination");
          }

          return {
            id: q.company._id,
            quickInspectionId: q._id,
            name: q.company.companyName,
            email: q.company.companyEmail,
            description: q.description,
            commodities: q.commodities || [],
            indiaRegions: q.indiaRegions || [],
            intlRegions: q.intlRegions || [],
            services: allServices,
            hasIntlCoverage,
          };
        });

        setCompaniesData(transformed);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
    return () => controller.abort();
  }, []);

  const filteredCompanies = useMemo(() => {
    return companiesData
      .filter((c) => c.services.includes(activeService))
      .filter((c) => matchesSearch(c, searchQuery));
  }, [companiesData, activeService, searchQuery]);

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setIsDrawerOpen(true);
  };

  const handleRequestInspection = (company) => {
    setRequestData(company);
    setIsRequestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
              Marketplace
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-2 text-gray-900 tracking-tight">
            {serviceName}
          </h1>
          <p className="text-gray-400 text-base">
            Find and compare verified inspection companies
          </p>
        </motion.div>

        <motion.div
          className="mt-8 mb-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="relative max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by company, commodity, city or region..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent placeholder:text-gray-400 transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && !loading && (
            <p className="text-sm text-gray-500 mt-2 ml-1">
              {filteredCompanies.length} result
              {filteredCompanies.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ShimmerCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2 bg-black text-white rounded-xl text-sm"
            >
              Retry
            </button>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-2xl">
            <Loader2 size={0} className="hidden" />
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={22} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-700">No companies found</p>
            <p className="text-sm text-gray-400 mt-1">
              {searchQuery
                ? `Try a different search term`
                : `No companies offer this service yet`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCompanies.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <CompanyCard
                  company={company}
                  service={activeService}
                  onViewDetails={handleViewDetails}
                  onRequestInspection={handleRequestInspection}
                />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <CompanyDetailDrawer
        company={selectedCompany}
        service={activeService}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onRequestInspection={handleRequestInspection}
      />

      <RequestInspectionModal
        requestData={requestData}
        service={activeService}
        open={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </div>
  );
}