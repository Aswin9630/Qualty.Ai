import React from 'react';

const CompanyPayment = ({ payments }) => {
  const hasPayments = payments && payments.length > 0;

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      {/* Show message on top if no payments */}
      {!hasPayments && (
        <p className="text-gray-500 text-center text-lg font-semibold mb-4">
          No payments available
        </p>
      )}

      {hasPayments && (
        <div className="border border-gray-300 rounded-2xl p-6 w-full text-center">
          {/* Render your payments here */}
          {payments.map((payment, idx) => (
            <div key={idx} className="py-2 border-b last:border-b-0">
              {payment.name} - ${payment.amount}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyPayment;