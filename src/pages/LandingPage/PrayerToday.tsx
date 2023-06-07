import { useAppSelector } from "../../app/hooks";

const PrayerToday = () => {
  const { solat } = useAppSelector((state) => state.jadwal);
  const jadwal = solat?.data?.jadwal;
  return (
    <div className="w-full md:w-auto">
      <div className="rounded-xl bg-white/40 backdrop-blur-sm shadow-lg mx-3 md:mx-0 mt-6 py-4 px-5">
        <h4 className="text-center mb-4 font-extrabold text-xl">
          Jadwal Waktu Solat Hari Ini
        </h4>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-6">
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-base">Imsak</p>
            <p>{jadwal?.imsak}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-base">Subuh</p>
            <p>{jadwal?.subuh}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-base">Terbit</p>
            <p>{jadwal?.terbit}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-base">Dzuhur</p>
            <p>{jadwal?.dzuhur}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-base">Ashar</p>
            <p>{jadwal?.ashar}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-base">Maghrib</p>
            <p>{jadwal?.maghrib}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-base">Isya</p>
            <p>{jadwal?.isya}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerToday;
