// import TotalInspectionsCard from "./TotalInspectionsCard"
// import ActiveOrdersCard from "./ActiveOrdersCard";
// import CompletedTasksCard from "./CompletedTasksCard";
// import TotalValueCard from "./TotalValueCard";
// import { Landing } from "./QuickInspection/pages/Landing";

// export default function Dashboard() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
//         <TotalInspectionsCard />
//         <ActiveOrdersCard />
//         <CompletedTasksCard />
//         <TotalValueCard />
//       </div>
//       <div className="mt-8 flex flex-col gap-10 mb-10">

//         <Landing/>

//       </div>
//     </div>
//   );
// }




import TotalInspectionsCard from "./TotalInspectionsCard";
import ActiveOrdersCard from "./ActiveOrdersCard";
import CompletedTasksCard from "./CompletedTasksCard";
import TotalValueCard from "./TotalValueCard";
import { Landing } from "./QuickInspection/pages/Landing";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Overview</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <TotalInspectionsCard />
          <ActiveOrdersCard />
          <CompletedTasksCard />
          <TotalValueCard />
        </div>

        <div className="mt-10 flex flex-col gap-10 pb-10">
          <Landing />
        </div>
      </div>
    </div>
  );
}