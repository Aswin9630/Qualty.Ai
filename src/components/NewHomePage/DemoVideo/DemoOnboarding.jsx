import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RaiseEnquiry from "./components/RaiseEnquiryUi.jsx";
import Dashboard from "./components/DashboardUI.jsx";
import BiddingRoomUI from "./components/BiddingRoomUI.jsx";
import ChatUI from "./components/ChatUI.jsx";
import DetailAnalysisUI from "./components/DetailAnalysisUI.jsx";
import PaymentUI from "./components/PaymentUI.jsx";
import HistoryUI from "./components/HistoryUI.jsx";
import ProfileUI from "./components/ProfileUI.jsx";
import Joyride, { STATUS } from "react-joyride";
import {Link} from "react-router-dom"

import {
  UserCircle,
  LayoutDashboard,
  HelpCircle,
  Gavel,
  MessageCircle,
  LineChart,
  CreditCard,
  History,
} from "lucide-react";


function PreLoginModal({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!name || !email) return alert("Please fill in both fields!");
    setTimeout(() => {
      onSubmit({ name, email });
    }, 1500); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white rounded-xl p-6 shadow-2xl w-[280px] sm:w-[320px] z-10"
      >
        <h3 className="text-lg font-semibold mb-2 text-center">Welcome!</h3>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Please enter your name and email to continue
        </p>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full rounded-xl bg-black py-2 text-white font-medium hover:bg-black/90 transition"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}

function LoginSlide({ onNext }) {
  return (
    <div className="h-full flex items-center justify-center pt-16 px-6 relative">
      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, ease: "easeOut" }}
          className="absolute -top-[60px] left-1/2 -translate-x-1/2 z-20"
        >
          <div className="relative bg-white rounded-xl shadow-md border border-gray-200 px-4 py-2 max-w-sm">
            <p className="text-[11px] text-gray-700 leading-snug text-center">
              <span className="font-medium">Login</span> is where users start.
              They sign in here to access their dashboard.
            </p>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-[-45deg]" />
          </div>
        </motion.div>

        <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm mx-auto">
          <div className="text-center mb-4">
            <div className="mx-auto h-10 w-10 bg-black rounded-xl flex items-center justify-center mb-2">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-black">Welcome Back</h2>
            <p className="text-sm text-gray-600">Sign in to continue</p>
          </div>
          <div className="space-y-3">
            <select className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm">
              <option>-- Select Role --</option>
              <option>Customer</option>
              <option>Inspector</option>
              <option>Inspection Company</option>
            </select>
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-gray-300 px-3 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-gray-300 px-3 py-2"
            />
          </div>
          <button
            onClick={() => {
              setTimeout(() => onNext(), 1500);
            }}
            className="mt-4 w-full rounded-xl bg-black py-2 text-white font-medium hover:bg-black/90"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}


function CustomerLayout({ autoShowTooltip, onTourFinish }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [runJoyride, setRunJoyride] = useState(true);
  const [runBiddingTooltip, setRunBiddingTooltip] = useState(false);
  const [runChatTooltip, setRunChatTooltip] = useState(false);

  const navItems = [
    { label: "Dashboard", key: "dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Raise Enquiry", key: "enquiry", icon: <HelpCircle size={20} /> },
    { label: "Bidding Room", key: "bidding", icon: <Gavel size={20} /> },
    { label: "Inspection Chat Room", key: "chat", icon: <MessageCircle size={20} /> },
    { label: "Detail Analysis", key: "analysis", icon: <LineChart size={20} /> },
    { label: "Payments", key: "payments", icon: <CreditCard size={20} /> },
    { label: "History", key: "history", icon: <History size={20} /> },
    { label: "Profile", key: "profile", icon: <UserCircle size={20} /> },
  ];

  const joyrideSteps = [
    {
      target: ".raise-enquiry-nav",
      content: <div className="text-[11px] leading-tight">Click here to raise an enquiry</div>,
      placement: "right-start",
      disableBeacon: true,
      offset: 4,
    },
  ];

  const biddingTooltipSteps = [
    {
      target: ".bidding-nav",
      content: <div className="text-[11px] leading-tight">This is the Bidding Room. Click here to proceed after submitting enquiry.</div>,
      placement: "right-start",
      disableBeacon: true,
      offset: 4,
    },
  ];

  const chatTooltipSteps = [
    {
      target: ".chat-nav",
      content: <div className="text-[11px] leading-tight">Click here to access the Inspection Chat Room after confirming your bid.</div>,
      placement: "right-start",
      disableBeacon: true,
      offset: 4,
    },
  ];

  const handleEnquirySubmit = () => {
    setTimeout(() => setRunBiddingTooltip(true), 1500);
  };

  const handleBiddingTooltipCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setTimeout(() => {
        setRunBiddingTooltip(false);
        setActiveSection("bidding");
      }, 1500);
    }
  };

  const handleConfirmBid = () => {
    setTimeout(() => setRunChatTooltip(true), 1500);
  };

  const handleChatTooltipCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setTimeout(() => setRunChatTooltip(false), 1500);
    }
  };

  const handleNavClick = (key) => {
    setTimeout(() => {
      setActiveSection(key);
      setRunJoyride(false);
      setRunBiddingTooltip(false);
      setRunChatTooltip(false);
    }, 1500);
  };

  return (
    <>
      <Joyride
        steps={joyrideSteps}
        run={runJoyride}
        continuous={false}
        showProgress={false}
        showSkipButton={false}
        hideCloseButton
        disableOverlay
        spotlightClicks
        styles={{
          options: { zIndex: 10000 },
          tooltip: { padding: "4px", borderRadius: "6px", fontSize: "11px", maxWidth: "120px" },
          tooltipContainer: { textAlign: "left" },
          buttonClose: { display: "none !important" },
          buttonSkip: { display: "none" },
          tooltipFooter: { display: "none" },
        }}
        callback={(data) => {
          const { status } = data;
          if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) setRunJoyride(false);
        }}
      />
      <Joyride
        steps={biddingTooltipSteps}
        run={runBiddingTooltip}
        continuous={false}
        showProgress={false}
        showSkipButton={false}
        hideCloseButton
        disableOverlay
        spotlightClicks
        styles={{
          options: { zIndex: 10000 },
          tooltip: { padding: "4px", borderRadius: "6px", fontSize: "11px", maxWidth: "120px" },
          tooltipContainer: { textAlign: "left" },
          buttonClose: { display: "none !important" },
          buttonSkip: { display: "none" },
          tooltipFooter: { display: "none" },
        }}
        callback={handleBiddingTooltipCallback}
      />
      <Joyride
        steps={chatTooltipSteps}
        run={runChatTooltip}
        continuous={false}
        showProgress={false}
        showSkipButton={false}
        hideCloseButton
        disableOverlay
        spotlightClicks
        styles={{
          options: { zIndex: 10000 },
          tooltip: { padding: "4px", borderRadius: "6px", fontSize: "11px", maxWidth: "120px" },
          tooltipContainer: { textAlign: "left" },
          buttonClose: { display: "none !important" },
          buttonSkip: { display: "none" },
          tooltipFooter: { display: "none" },
        }}
        callback={handleChatTooltipCallback}
      />

      <div className="h-full flex flex-col max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
          <h1 className="font-semibold text-[14px]">Customer Dashboard</h1>
        </div>

        <div className="flex flex-1 h-full">
          <aside className="w-48 bg-white border-r border-gray-200 flex flex-col text-[10px] divide-y divide-gray-200">
            <div className="p-4 flex items-center gap-2">
              <UserCircle size={20} />
              <span className="font-semibold">Username</span>
            </div>

            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded ${
                    item.key === "enquiry"
                      ? "raise-enquiry-nav"
                      : item.key === "bidding"
                      ? "bidding-nav"
                      : item.key === "chat"
                      ? "chat-nav"
                      : ""
                  } ${activeSection === item.key ? "bg-black text-white" : "hover:bg-gray-100 text-gray-600"}`}
                  onClick={() => handleNavClick(item.key)}
                >
                  {item.icon}
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 p-4 overflow-y-auto">
            {activeSection === "dashboard" && <Dashboard />}
            {activeSection === "enquiry" && <RaiseEnquiry onSubmitEnquiry={handleEnquirySubmit} />}
            {activeSection === "bidding" && <BiddingRoomUI onConfirmBid={handleConfirmBid} />}
            {activeSection === "chat" && <ChatUI onTourFinish={onTourFinish} />}
            {activeSection === "analysis" && <DetailAnalysisUI />}
            {activeSection === "payments" && <PaymentUI />}
            {activeSection === "history" && <HistoryUI />}
            {activeSection === "profile" && <ProfileUI />}
          </div>
        </div>
      </div>
    </>
  );
}


export default function DemoOnboarding() {
  const [step, setStep] = useState(0);
  const [autoShowTooltip, setAutoShowTooltip] = useState(false);
  const [showPreLogin, setShowPreLogin] = useState(true);

  const slidesRef = useRef([]);
  slidesRef.current = [
    <LoginSlide key="login" onNext={() => setTimeout(() => { setStep(1); setAutoShowTooltip(true); }, 1500)} />,
    <CustomerLayout key="customer" autoShowTooltip={autoShowTooltip} onTourFinish={() => setTimeout(() => setStep(2), 1500)} />,
    <div key="thankyou" className="h-full flex flex-col items-center justify-center px-6 gap-4">
      <div className="text-center text-white">
        <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
        <p className="text-sm">Thank you for viewing the demo. You can explore the real product now!</p>
      </div>
      <button
        onClick={() => setTimeout(() => setStep(0), 1500)}
        className="mt-4 rounded-xl bg-white text-black px-6 py-2 font-medium hover:bg-white/90 transition"
      >
        Restart Demo
      </button>
    </div>,
  ];

  const slides = slidesRef.current;

  const next = () => setTimeout(() => setStep((s) => Math.min(s + 1, slides.length - 1)), 1500);
  const skip = () => setTimeout(() => setStep(slides.length - 1), 1500);

  const handlePreLoginSubmit = (data) => {
    setTimeout(() => setShowPreLogin(false), 1500);
    console.log("User info:", data);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-4 mb-10">
      <div>
       <Link to="/home"> <button className="bg-black text-white px-4 py-2 cursor-pointer rounded-lg m-10">Back to home</button></Link>
      </div>
      {showPreLogin && <PreLoginModal onSubmit={handlePreLoginSubmit} />}
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f19] shadow-2xl transition-all duration-300 ${
          showPreLogin ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white/70">
          <p className="text-sm">Product Demo</p>
          <button onClick={skip} className="text-sm hover:text-white transition">Skip</button>
        </div>
        <div className="relative h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {slides[step]}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-6 rounded-full transition-all ${
                  step === i ? "bg-white" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setTimeout(() => setStep((s) => Math.max(s - 1, 0)), 1500)}
                className="rounded-full bg-white/20 px-5 py-2 text-sm font-medium text-white hover:bg-white/30"
              >
                Back
              </button>
            )}
            <button
              onClick={next}
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-white/90"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 