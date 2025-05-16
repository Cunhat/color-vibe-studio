import { SparklesIcon } from "lucide-react";
import React from "react";

export default function GeneratingImgLoader() {
  return (
    <div className="max-w-md p-8 text-center">
      <div className="relative">
        {/* Pulsing background circle */}
        <div className="bg-primary/5 absolute left-1/2 mx-auto h-48 w-48 -translate-x-1/2 animate-[pulse_3s_infinite] rounded-full blur-xl"></div>

        {/* Inner container with glass effect */}
        <div className="bg-background/30 border-primary/20 relative z-10 rounded-xl border p-8 shadow-xl backdrop-blur-md">
          {/* Animated neurons or connections effect */}
          <div className="absolute inset-0 overflow-hidden rounded-xl opacity-20">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="from-primary/0 via-primary to-primary/0 absolute h-px bg-gradient-to-r"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: 0,
                  right: 0,
                  opacity: 0.7,
                  transform: `rotate(${Math.random() * 180}deg)`,
                  animation: `fade-in 1.5s ease-out ${i * 0.2}s infinite alternate`,
                }}
              ></div>
            ))}
          </div>

          {/* Spinning Icon */}
          <div className="relative mx-auto mb-6 h-24 w-24">
            {/* Inner glow */}
            <div className="bg-primary/10 absolute inset-0 animate-pulse rounded-full blur-xl"></div>

            {/* Outer ring */}
            <div
              className="border-primary/30 absolute inset-0 animate-spin rounded-full border-4 border-dashed"
              style={{ animationDuration: "10s" }}
            ></div>

            {/* Middle ring */}
            <div
              className="border-primary/20 absolute inset-2 animate-spin rounded-full border-4 border-dashed"
              style={{ animationDuration: "7s", animationDirection: "reverse" }}
            ></div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <SparklesIcon className="text-primary h-12 w-12 animate-pulse" />
            </div>
          </div>

          <h3 className="gradient-text mb-2 text-2xl font-bold">
            Creating Artwork
          </h3>
          <p className="text-muted-foreground mb-6 text-lg">
            Transforming your imagination into reality...
          </p>

          {/* Animated dots */}
          <div className="mb-4 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-primary h-2 w-2 rounded-full"
                style={{
                  animation: `scale-in 0.6s ease-out ${i * 0.2}s infinite alternate`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
