"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date to 8 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 8);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-8 text-center">
      <div className="flex flex-col items-center">
        <div className="text-6xl md:text-8xl font-bold text-primary font-mono">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider mt-2">
          Days
        </div>
      </div>
      <div className="text-4xl md:text-6xl text-primary">:</div>
      <div className="flex flex-col items-center">
        <div className="text-6xl md:text-8xl font-bold text-primary font-mono">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider mt-2">
          Hours
        </div>
      </div>
      <div className="text-4xl md:text-6xl text-primary">:</div>
      <div className="flex flex-col items-center">
        <div className="text-6xl md:text-8xl font-bold text-primary font-mono">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider mt-2">
          Minutes
        </div>
      </div>
      <div className="text-4xl md:text-6xl text-primary">:</div>
      <div className="flex flex-col items-center">
        <div className="text-6xl md:text-8xl font-bold text-primary font-mono">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider mt-2">
          Seconds
        </div>
      </div>
    </div>
  );
}
