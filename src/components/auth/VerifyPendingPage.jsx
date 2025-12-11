export default function VerifyPendingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold mb-4">📧 Check Your Email</h2>
        <p className="text-lg text-gray-300">
          We’ve sent a verification link to your email. Please check your inbox and click the link to activate your account. Link will expires in 10 mins.
        </p>
      </div>
    </div>
  );
}
