import React, { useState } from "react";
import { Mail } from "lucide-react";

function EmailSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle subscribe logic here
  };

  return (
    <section className="rounded-2xl bg-gradient-to-br from-surface-elevated via-surface-card to-accent-light px-6 py-10 text-center border border-border-subtle">
      <Mail className="mx-auto mb-6 h-10 w-10 text-accent" strokeWidth={1.5} />

      <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
        Stay Updated
      </h2>

      <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-8">
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
          className="w-full sm:flex-1 px-5 py-3.5 rounded-lg bg-surface-card text-text-primary placeholder-text-muted border border-border-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-accent text-white font-bold hover:bg-accent-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}

export default EmailSection;
