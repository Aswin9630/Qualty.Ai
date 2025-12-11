import { useNavigate } from "react-router-dom";
import NewHeader from "../NewHeader";

const Signup = () => {
  const navigate = useNavigate();
  const handleCardClick = (route, e) => {
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    navigate(route);
  };

  const handleButtonClick = (route, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(route);
  };

  return (
  <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
    
    <div className="max-w-2xl w-full space-y-8 py-10">
      {/* Header */}
      <div>
        <h2 className="mt-6 text-center text-3xl font-semibold text-black">
          Choose Your Role
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select the role that best describes you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={(e) => handleCardClick("/signup/customer", e)}
          className="cursor-pointer bg-white p-6 rounded-lg border-2 border-gray-300 hover:border-black transition-all duration-200 hover:shadow-lg flex flex-col h-full"
        >
          <div className="text-center flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-black mb-2">Customer</h3>
            <p className="text-sm text-gray-700 mb-4 flex-1">
              Request and manage inspections
            </p>
            <button
              onClick={(e) => handleButtonClick("/signup/customer", e)}
              className="cursor-pointer w-full py-2 px-4 text-white rounded-md bg-black hover:bg-grey-900 transition-colors mt-auto"
            >
              Sign up as Customer
            </button>
          </div>
        </div>

        {/* Inspector Card */}
        <div
          onClick={(e) => handleCardClick("/signup/inspector", e)}
          className="cursor-pointer bg-white p-6 rounded-lg border-2 border-gray-300 hover:border-black transition-all duration-200 hover:shadow-lg flex flex-col h-full"
        >
          <div className="text-center flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-black mb-2">Inspector</h3>
            <p className="text-sm text-gray-700 mb-4 flex-1">
              Perform inspections and submit reports
            </p>
            <button
              onClick={(e) => handleButtonClick("/signup/inspector", e)}
              className="cursor-pointer w-full py-2 px-4 text-white rounded-md bg-black hover:bg-grey-900 transition-colors mt-auto"
            >
              Sign up as Inspector
            </button>
          </div>
        </div>

        {/* Company Card (optional) */}
        <div
          onClick={(e) => handleCardClick("/signup/company", e)}
          className="cursor-pointer bg-white p-6 rounded-lg border-2 border-gray-300 hover:border-black transition-all duration-200 hover:shadow-lg flex flex-col h-full"
        >
          <div className="text-center flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-black mb-2">Inspection Company</h3>
            <p className="text-sm text-gray-700 mb-4 flex-1">
              Manage inspectors and company operations
            </p>
            <button
              onClick={(e) => handleButtonClick("/signup/company", e)}
              className="cursor-pointer w-full py-2 px-4 text-white rounded-md bg-black hover:bg-grey-900 transition-colors mt-auto"
            > 
              Sign up as Company
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <span className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer font-medium text-black hover:text-gray-800 underline underline-offset-4 transition-colors duration-200"
          >
            Sign in
          </button>
        </span>
      </div>
    </div>
  </div>
);

};

export default Signup;