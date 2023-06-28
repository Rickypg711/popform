import React, { useEffect, useState, useCallback, useMemo } from "react";

export default function CountdownTimer() {
  const targetDate = useMemo(() => new Date("2023-07-11T00:00:00.000Z"), []);

  const calculateTimeLeft = useCallback(() => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [calculateTimeLeft]);

  return (
    <button className="w-full  text-white text-lg bg-red-500 rounded text-center cursor-pointer">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <span key={interval} className="text-center mr-2 text-lg">
          {`${value} ${interval}`}
        </span>
      ))}
    </button>
  );
}
