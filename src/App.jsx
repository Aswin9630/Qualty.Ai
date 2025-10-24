import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

const Login = lazy(() => import("../src/components/auth/Login"));
const Signup = lazy(() => import("../src/components/auth/Signup"));
const CustomerSignup = lazy(() => import("../src/components/auth/CustomerSignup"));
const InspectorSignup = lazy(() => import("../src/components/auth/InspectorSignup"));
const CompanySignup = lazy(() => import("../src/components/auth/CompanySignup"));
const QuickInspection = lazy(() => import("./components/QuickInspection"));
const LocationDetail = lazy(() => import("./components/LocationDetail"));
const QuickInspectionForm = lazy(() => import("./components/QuickInspectionForm"));
const InspectorDashboard = lazy(() => import("./components/dashboard/InspectorDashboard/InspectorDashboard"));
const RaiseEnquiry = lazy(() => import("./components/dashboard/CustomerDashboard/RaiseEnquiry"));
const BiddingRoom = lazy(() => import("./components/dashboard/CustomerDashboard/BiddingRoom"));
const Dashboard = lazy(() => import("./components/dashboard/CustomerDashboard/Dashboard"));
const ChatWithUs = lazy(() => import("./components/dashboard/CustomerDashboard/ChatWithUs"));
const DetailAnalysis = lazy(()=>import("./components/dashboard/CustomerDashboard/DetailAnalysis"))
const LiveChat = lazy(()=>import("./components/dashboard/CustomerDashboard/LiveChat"))
const MyAccount = lazy(()=>import("./components/dashboard/CustomerDashboard/MyAccount"))
const MyHistory = lazy(()=>import("./components/dashboard/CustomerDashboard/MyHistory"))
const Payments = lazy(()=>import("./components/dashboard/CustomerDashboard/Payments"))
const CustomerLayout = lazy(()=>import("./components/dashboard/CustomerDashboard/CustomerLayout"))
const InspectionDetailsPage = lazy(()=>import("./components/dashboard/CustomerDashboard/InspectionDetailsPage"))
const InspectorLayout = lazy(()=>import("./components/dashboard/InspectorDashboard/InspectorLayout"))
const InspectorBidRoom = lazy(()=>import("./components/dashboard/InspectorDashboard/InspectorBidRoom"))
const InspectorChatWithUs = lazy(()=>import("./components/dashboard/InspectorDashboard/InspectorChatWithUs"))
const InspectorAnalysis = lazy(()=>import("./components/dashboard/InspectorDashboard/InspectorAnalysis"))
const InspectorLiveChat = lazy(()=>import("./components/dashboard/InspectorDashboard/InspectorLiveChat"))
const InspectorMyAccount = lazy(()=>import("./components/dashboard/InspectorDashboard/InspectorMyAccount"))
const InspectorMyHistory = lazy(()=>import("./components/dashboard/InspectorDashboard/InspectorMyHistory"))
const InspectorPayment = lazy(()=>import("./components/dashboard/InspectorDashboard/InspectorPayment"));
const CompanyLayout = lazy(()=>import("./components/dashboard/CompanyDashboard/CompanyLayout"))
const CompanyDashboard = lazy(()=>import("./components/dashboard/CompanyDashboard/CompanyDashboard"))
const CompanyBidRoom = lazy(()=>import("./components/dashboard/CompanyDashboard/CompanyBidRoom"))
const CompanyChatWithUs = lazy(()=>import("./components/dashboard/CompanyDashboard/CompanyChatWithUs"))
const CompanyAnalysis = lazy(()=>import("./components/dashboard/CompanyDashboard/CompanyAnalysis"))
const CompanyLiveChat = lazy(()=>import("./components/dashboard/CompanyDashboard/CompanyLiveChat"))
const CompanyAccount = lazy(()=>import("./components/dashboard/CompanyDashboard/CompanyAccount"))
const CompanyHistory = lazy(()=>import("./components/dashboard/CompanyDashboard/CompanyHistory"))
const CompanyPayment = lazy(()=>import("./components/dashboard/CompanyDashboard/CompanyPayment"))
const CustomerEnquiryDetailPage = lazy(()=>import("./components/dashboard/CustomerDashboard/CustomerEnquiryDetailPage"))
const QuickRequestsPage = lazy(()=>import("./components/dashboard/CustomerDashboard/QuickRequestPage"))
const QuickRequestDetailPage = lazy(()=>import("./components/dashboard/CustomerDashboard/QuickRequestDetailPage"))
const VerifyEmailPage = lazy(()=>import("./components/auth/VerifyEmailPage"))
const VerifyPendingPage = lazy(()=>import("./components/auth/VerifyPendingPage"))
const WonBidsDashboard = lazy(()=>import("./components/dashboard/InspectorDashboard/WonBidsDashboard"))
const Services = lazy(()=>import("./components/Services"))
const Contact = lazy(()=>import("./components/Contact"))
import ShimmerUI from "./components/ShimmerUI";
import About from "./components/About";
import PrivacyPolicy from "./components/PrivacyPolicy";
import InspectorList from "./components/dashboard/CustomerDashboard/InspectorList";
import Chat from "./components/dashboard/chat/Chat";
import CustomerList from "./components/dashboard/InspectorDashboard/CustomerList";
import PaymentDetailPage from "./components/dashboard/CustomerDashboard/PaymentDetailPage";
import Carousel from "./components/Carousal";

function App() {
  return (
    <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Suspense fallback={<ShimmerUI/>}>
      <Routes>    
        <Route path="/" element={ <LandingPage/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/signup" element={ <Signup/> }/>
        <Route path="/services" element={ <Services/> }/>
        <Route path="/about" element={ <About/> }/>
        <Route path="/contact" element={ <Contact/> }/>
        <Route path="/privacy-policy" element={ <PrivacyPolicy/> }/>
        <Route path="/card" element={ <Carousel/> }/>

        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        <Route path="/verify-pending" element={<VerifyPendingPage />} />

        <Route path="/signup/customer" element={ <CustomerSignup/> }/>
        <Route path="/signup/inspector" element={ <InspectorSignup/> }/>
        <Route path="/signup/company" element={ <CompanySignup/> }/>

        <Route path="/customer" element={ <CustomerLayout/> }> 
         <Route path="dashboard" element={<Dashboard />} />
          <Route path="bidding" element={<BiddingRoom />} />
          <Route path="chat" element={<ChatWithUs />} />
          <Route path="analysis" element={<DetailAnalysis />} />
          <Route path="inspectorList" element={<InspectorList />} />
          <Route path="chat/:targetId/:orderId" element={<Chat />} />
          <Route path="account" element={<MyAccount />} />
          <Route path="history" element={<MyHistory />} />
          <Route path="payments" element={<Payments />} />
          <Route path="payments/:enquiryId" element={<PaymentDetailPage/>} />
          <Route path="enquiry" element={<RaiseEnquiry />} />
          <Route path="inspection/:id" element={<InspectionDetailsPage />} />
          <Route path="enquiry/:id" element={<CustomerEnquiryDetailPage />} />
           <Route path="quick-requests" element={<QuickRequestsPage />} />
           <Route path="quick-requests/:id" element={<QuickRequestDetailPage />} />
        </Route>

        <Route path="/inspector" element={ <InspectorLayout/> }>
         <Route path="dashboard" element={<InspectorDashboard />} />
          <Route path="bidding" element={<InspectorBidRoom />} />
          <Route path="CustomerList" element={<CustomerList />} />
          <Route path="chat/:targetId/:orderId" element={<Chat />} />
          <Route path="analysis" element={<InspectorAnalysis />} />
          <Route path="account" element={<InspectorMyAccount />} />
          <Route path="history" element={<InspectorMyHistory />} />
          <Route path="payments" element={<InspectorPayment />} />
          <Route path="pending-inspections" element={<WonBidsDashboard />} />
        </Route>

        <Route path="/company" element={ <CompanyLayout/> }>
         <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="bidding" element={<CompanyBidRoom />} />
          <Route path="chat" element={<CompanyChatWithUs />} />
          <Route path="analysis" element={<CompanyAnalysis />} />
          <Route path="live-chat" element={<CompanyLiveChat />} />
          <Route path="account" element={<CompanyAccount />} />
          <Route path="history" element={<CompanyHistory />} />
          <Route path="payments" element={<CompanyPayment />} />
        </Route>

        <Route path="/quickInspection" element={ <QuickInspection />} />
        <Route path="/quickInspection/:regionName" element={ <LocationDetail />} />
        <Route path="/quickInspection/form" element={ <QuickInspectionForm />} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;