import React, { useState, useEffect } from "react";
import promoImg from "../assets/PromoPop.png";

const PromoPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("promoDismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("promoDismissed", "true");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fadeIn">
      <div
        className="relative bg-black rounded-xl shadow-2xl 
                   max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl 
                   w-full mx-4 overflow-hidden flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer 
                     text-xl font-bold focus:outline-none z-10"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Image */}
        <img
          src={promoImg}
          alt="Year-End Promo"
          className="max-w-[85%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] 
                     h-auto max-h-[70vh] object-contain mx-auto"
        />
      </div>
    </div>
  );
};

export default PromoPopup;
