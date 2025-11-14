// import React, { useState } from "react";
// import psiImg from "../../assets/PSI.png";
// import loadingImg from "../../assets/Loading.png";
// import stuffingImg from "../../assets/Stuffing.png";
// import destinationImg from "../../assets/Destination.png";
// import BookingForm from "./BookingForm";

// const services = [
//   { name: "PSI", image: psiImg },
//   { name: "LOADING", image: loadingImg },
//   { name: "STUFFING", image: stuffingImg },
//   { name: "DESTINATION", image: destinationImg },
// ];

// export default function Services() {
//   const [selectedService, setSelectedService] = useState(null);

//   return (
//     <>
//       <section className="bg-black text-white py-12 px-4 sm:px-6 lg:px-16">
//         <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Quick Services</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service) => (
//             <div
//               key={service.name}
//               className="bg-white text-black rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-[1.02]"
//             >
//               <img
//                 src={service.image}
//                 alt={service.name}
//                 className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500"
//               />
//               <div className="p-4 flex flex-col items-center space-y-4">
//                 <h3 className="text-xl font-semibold">{service.name}</h3>
//                 <button
//                   onClick={() => setSelectedService(service)}
//                   className="bg-black cursor-pointer text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-black transition-all duration-300"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {selectedService && (
//         <BookingForm
//           service={selectedService}
//           onClose={() => setSelectedService(null)}
//         />
//       )}
//     </>
//   );
// }



import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import psiImg from "../../assets/PSI.png";
import loadingImg from "../../assets/Loading.png";
import stuffingImg from "../../assets/Stuffing.png";
import destinationImg from "../../assets/Destination.png";
import BookingForm from "./BookingForm";

const services = [
  { name: "PSI", image: psiImg },
  { name: "LOADING", image: loadingImg },
  { name: "STUFFING", image: stuffingImg },
  { name: "DESTINATION", image: destinationImg },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleBookClick = (service) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedService(service);
    }
  };

  return (
    <>
      <section className="bg-black text-white py-12 px-4 sm:px-6 lg:px-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Quick Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-white text-black rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-[1.02]"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="p-4 flex flex-col items-center space-y-4">
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <button
                  onClick={() => handleBookClick(service)}
                  className="bg-black cursor-pointer text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-black transition-all duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedService && (
        <BookingForm
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}
