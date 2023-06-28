/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }

  70% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    let difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col items-center mb-4 justify-center h-full text-2xl bg-black w-full">
      <h1 className="text-4xl my-5 text-yellow-300">SOLO FALTAN</h1>
      <button className="animate-pulse mb-6 bg-yellow-300 text-black py-4 px-8 rounded-md text-lg transition-colors duration-200 ease-in-out cursor-pointer hover:bg-yellow-400">
        {timeLeft.days} DIAS, {timeLeft.hours} HORAS, {timeLeft.minutes}{" "}
        MINUTOS, {timeLeft.seconds} SEGUNDOS
      </button>
    </div>
  );
};

export default function Home() {
  return <CountdownTimer targetDate="2023-07-11T20:00:00" />;
}
