import React, { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";

export default function RaiseEnquiryUI({ onSubmitEnquiry }) {
  const [runJoyride, setRunJoyride] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRunJoyride(true);
    }, 300); 
    return () => clearTimeout(timer);
  }, []);
   const handleSubmit = () => {
    setRunJoyride(false);
    onSubmitEnquiry();
  };

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunJoyride(false);
    }

    if (type === "step:after") {
      onSubmitEnquiry();
    }
  };

  return (
    <div className="max-w-3xl mx-auto relative">
 
      <Joyride
        run={runJoyride}
        steps={[
          {
            target: ".submit-enquiry-btn",
            content:
              "Click here to submit your inspection enquiry and proceed to bidding room",
            placement: "bottom",
            disableBeacon: true,
            disableFlip: true,
            disableScrolling: true,
            disableOverlay: true, 
            styles: {
              tooltip: {
                fontSize: "0.6rem",
                padding: "4px 6px",
                maxWidth: "150px",
                borderRadius: "4px",
              },
              tooltipArrow: {
                borderTopColor: "#000",
                borderWidth: "3px",
                marginTop: "-3px",
              },
              buttonNext: { display: "none" },
              buttonBack: { display: "none" },
              buttonSkip: { display: "none" },
            },
            spotlightClicks: false,
            hideCloseButton: true,
          },
        ]}
        continuous
        scrollToFirstStep={false}
        showProgress={false}
        showSkipButton={false}
        callback={handleJoyrideCallback}
      />

      <div className="origin-top scale-[0.6] p-4 bg-white rounded-lg shadow-lg text-xs text-gray-700">
        <h2 className="text-center text-lg font-semibold mb-6">
          Raise Inspection Enquiry
        </h2>
  {/* ---------------- FORM ---------------- */}
        <section className="mb-6">
          <h3 className="font-semibold mb-3">Inspection Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <input value="India" disabled className="border rounded px-3 py-2 bg-gray-50" />
            <div className="flex gap-2">
              <input
                value="Tiruchirappalli, Tamil Nadu, India"
                disabled
                className="border rounded px-3 py-2 bg-gray-50 flex-1"
              />
              <button disabled className="bg-gray-900 text-white px-4 rounded">
                Map
              </button>
            </div>
            <input value="12/22/2025" disabled className="border rounded px-3 py-2 bg-gray-50" />
            <input value="12/23/2025" disabled className="border rounded px-3 py-2 bg-gray-50" />
            <select disabled className="border rounded px-3 py-2 bg-gray-50">
              <option>Medium</option>
            </select>
          </div>
        </section>

        <section className="mb-6">
          <h3 className="font-semibold mb-3">Commodity Specification</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select disabled className="border rounded px-3 py-2 bg-gray-50">
              <option>Agricultural & Food Commodities</option>
            </select>
            <select disabled className="border rounded px-3 py-2 bg-gray-50">
              <option>Food Grains & Cereals</option>
            </select>
            <select disabled className="border rounded px-3 py-2 bg-gray-50">
              <option>Rice (basmati/non-basmati)</option>
            </select>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked disabled />
                Physical Inspection
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" disabled />
                Chemical Inspection
              </label>
            </div>
            <span className="text-xs text-gray-500">
              P: Dimensions / Size, Purity / Impurities
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input value="₹ 1000" disabled className="border rounded px-3 py-2 bg-gray-50" />
            <input value="50" disabled className="border rounded px-3 py-2 bg-gray-50" />
          </div>

          <select disabled className="border rounded px-3 py-2 bg-gray-50 w-1/2">
            <option>Kilograms</option>
          </select>
        </section>

        <section className="mb-8">
          <h3 className="font-semibold mb-3">Service & Compliance</h3>
          <div className="flex flex-col gap-3">
            <div className="border rounded px-3 py-2 bg-gray-50 flex justify-between">
              <span className="bg-gray-200 px-2 py-1 rounded text-xs">Loading Truck</span>
              <span className="text-gray-400">×</span>
            </div>
            <div className="border rounded px-3 py-2 bg-gray-50 flex justify-between">
              <span className="bg-gray-200 px-2 py-1 rounded text-xs">NABL</span>
              <span className="text-gray-400">×</span>
            </div>
          </div>
        </section>

        <div className="px-4">
          <button
            className="submit-enquiry-btn w-full bg-black text-white py-3 rounded font-medium"
            onClick={handleSubmit}
          >
            Submit Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}
