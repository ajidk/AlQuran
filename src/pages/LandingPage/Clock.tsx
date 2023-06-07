import moment from "moment";
import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(moment());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex items-center space-x-1 my-4">
      <div className="text-5xl md:text-9xl p-5 md:p-8 rounded-3xl bg-white/40 backdrop-blur-sm shadow-xl flex justify-center">
        <p className="relative">{time.format("HH")}</p>
        <p className="text-base md:text-xl font-semibold absolute bottom-2 md:bottom-5 leading-[1]">
          Jam
        </p>
      </div>
      <p className="text-5xl md:text-9xl">:</p>
      <div className="text-5xl md:text-9xl p-5 md:p-8 rounded-3xl bg-white/40 backdrop-blur-sm shadow-xl flex justify-center">
        <p className="relative">{time.format("mm")}</p>
        <p className="text-base md:text-xl font-semibold absolute bottom-2 md:bottom-5 leading-[1]">
          Menit
        </p>
      </div>
      <p className="text-5xl md:text-9xl">:</p>
      <div className="text-5xl md:text-9xl p-5 md:p-8 rounded-3xl bg-white/40 backdrop-blur-sm shadow-xl flex justify-center">
        <p className="relative">{time.format("ss")}</p>
        <p className="text-base md:text-xl font-semibold absolute bottom-2 md:bottom-5 leading-[1]">
          Detik
        </p>
      </div>
    </div>
  );
};

export default Clock;
