import TotalInspectionsCard from "./TotalInspectionsCard"
import ActiveOrdersCard from "./ActiveOrdersCard";
import CompletedTasksCard from "./CompletedTasksCard";
import TotalValueCard from "./TotalValueCard";
import QuickActions from "./QuickActions";
import QuickServicesSection from "./QuickServicesSection";
import Services from "../../QuickServices/services";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        <TotalInspectionsCard />
        <ActiveOrdersCard />
        <CompletedTasksCard />
        <TotalValueCard />
      </div>
      <div className="mt-8 flex flex-col gap-10 mb-10">
        <Services/>
        {/* <QuickServicesSection />  */}
        <QuickActions />
      </div>
    </div>
  );
}


