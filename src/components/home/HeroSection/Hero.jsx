import React from "react";
import { Sparkles } from "lucide-react";

function Hero() {
  return (
    <div>
      <div className="relative overflow-hidden border border-border-subtle bg-gradient-to-br from-surface-elevated via-surface-card to-accent-light min-h-[580px] sm:min-h-[630px] flex items-center">
        <div className="relative z-10 w-full max-w-7xl px-15 py-16 sm:py-20">
          <div className="flex items-center gap-2 text-accent font-semibold mb-6">
            <Sparkles size={20} className="shrink-0" />
            <span className="text-sm sm:text-base">
              Premium Shopping Experience
            </span>
          </div>

          <h1 className="text-text-primary font-extrabold leading-[1.1] text-4xl sm:text-5xl md:text-6xl max-w-xl mb-7">
            Shop the future, delivered today
          </h1>

          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-md mb-9">
            Discover premium products at unbeatable prices. Fast delivery, easy
            returns, and exceptional quality.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="cursor-pointer px-6 py-2 rounded-lg font-bold text-base bg-accent text-white hover:bg-accent-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              Shop Now
            </button>

            <button className="cursor-pointer px-6 py-2 rounded-lg font-bold text-base bg-transparent text-text-primary border-2 border-border-strong hover:bg-accent-light transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              View Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
