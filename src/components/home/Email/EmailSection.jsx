import React, { useState } from "react";
import { Mail } from "lucide-react";

function EmailSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle subscribe logic here
  };

  return (
    <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-14 text-center">
      <Mail className="mx-auto mb-6 h-10 w-10 text-white" strokeWidth={1.5} />

      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Stay Updated
      </h2>

      <p className="text-indigo-100 text-base sm:text-lg max-w-xl mx-auto mb-8">
        Subscribe to our newsletter and get exclusive deals and new arrivals
        first.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full sm:flex-1 px-5 py-3.5 rounded-lg bg-white/20 text-white placeholder-indigo-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-indigo-700 font-bold hover:bg-indigo-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}

export default EmailSection;