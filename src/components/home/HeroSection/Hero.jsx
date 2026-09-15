import React from 'react'
import { Sparkles } from "lucide-react";

function Hero() {
  return (
    <div>
        <div className="relative overflow-hidden  border border-white/10 bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-600 min-h-[580px] sm:min-h-[630px] flex items-center">
          <div className="relative z-10 w-full max-w-7xl px-7 py-16 sm:py-20">
            <div className="flex items-center gap-2 text-white font-semibold mb-6">
              <Sparkles size={20} className="shrink-0" />
              <span className="text-sm sm:text-base">Premium Shopping Experience</span>
            </div>

            <h1 className="text-white font-extrabold leading-[1.1] text-4xl sm:text-5xl md:text-6xl max-w-xl mb-7">
              Shop the future, delivered today
            </h1>

            <p className="text-indigo-100 text-base sm:text-lg leading-relaxed max-w-md mb-9">
              Discover premium products at unbeatable prices. Fast delivery, easy
              returns, and exceptional quality.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="cursor-pointer px-8 py-4 rounded-lg font-bold text-base bg-white text-indigo-700 hover:bg-indigo-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Shop Now
              </button>
              <button className="cursor-pointer px-8 py-4 rounded-lg font-bold text-base bg-transparent text-white border-2 border-white/60 hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                View Categories
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero