import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch(`${BASE_URL}/contact/sendEnquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Enquiry sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send enquiry.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending enquiry.");
    }
  };

  return (
    <section className="px-6 py-12 bg-white text-black">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10"  style={{ backgroundImage: "linear-gradient(90deg, #ff7a18 0%, #af00ff 100%)", WebkitBackgroundClip: "text", color: "transparent" }}>
        Contact Us
      </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder=" name "
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-black bg-white text-black  "
          />
          <input
            type="email"
            name="email"
            placeholder=" email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-black bg-white text-black"
          />
          <textarea
            name="message"
            placeholder=" message...."
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 rounded border border-black bg-white text-black"
          />
          <button
            type="submit"
            className="cursor-pointer w-full py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
          >
            Send Enquiry
          </button>
        </form>
        {status && <p className="mt-4 text-center text-sm">{status}</p>}
      </div>
    </section>
  );
}
