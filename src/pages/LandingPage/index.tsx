import axios from "axios";
import "dayjs/locale/id"; // Impor lokal bahasa Indonesia
import moment from "moment";
// import hijri from "dayjs-hijri";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";

interface prosJadwalSolat {
  jadwal: {
    maghrib: string;
    isya: string;
    ashar: string;
    dzuhur: string;
    subuh: string;
    imsak: string;
    terbit: string;
  };
}

// dayjs.extend(hijri);
dayjs.locale("id"); // Atur lokal bahasa Indonesia

const MainPage: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [jadwalSolat, setJadwalSolat] = useState<prosJadwalSolat>();
  const [tipeSolat, setTipeSolat] = useState({
    title: "",
    time: "",
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const solat = {
    isya: jadwalSolat?.jadwal?.isya,
    subuh: jadwalSolat?.jadwal?.subuh,
    dzuhur: jadwalSolat?.jadwal?.dzuhur,
    ashar: jadwalSolat?.jadwal?.ashar,
    maghrib: jadwalSolat?.jadwal?.maghrib,
  };

  const timeNow = moment().format("HH:mm");

  timeNow === jadwalSolat?.jadwal?.isya ||
  timeNow === jadwalSolat?.jadwal?.subuh ||
  timeNow === jadwalSolat?.jadwal?.dzuhur ||
  timeNow === jadwalSolat?.jadwal?.ashar ||
  timeNow === jadwalSolat?.jadwal?.maghrib ||
  timeNow === "22:33"
    ? audioRef.current?.play()
    : audioRef.current?.pause();

  timeNow === jadwalSolat?.jadwal?.isya
    ? setTipeSolat({ title: "Isya", time: jadwalSolat.jadwal.isya })
    : timeNow === jadwalSolat?.jadwal?.subuh
    ? setTipeSolat({ title: "Subuh", time: jadwalSolat.jadwal.subuh })
    : timeNow === jadwalSolat?.jadwal?.dzuhur
    ? setTipeSolat({ title: "Dzuhur", time: jadwalSolat.jadwal.dzuhur })
    : timeNow === jadwalSolat?.jadwal?.ashar
    ? setTipeSolat({ title: "Ashar", time: jadwalSolat.jadwal.ashar })
    : timeNow === jadwalSolat?.jadwal?.maghrib
    ? setTipeSolat({ title: "Maghrib", time: jadwalSolat.jadwal.maghrib })
    : "";

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const today = moment().format("YYYY/MM/DD");

  const currentDate = dayjs(); // Dapatkan tanggal saat ini

  // Mendapatkan waktu sekarang
  const sekarang = moment();

  // Menentukan jadwal solat
  const random = [
    {
      nama: "Subuh",
      waktu: moment(jadwalSolat?.jadwal.subuh, "HH:ii"),
    },
    {
      nama: "Dzuhur",
      waktu: moment(jadwalSolat?.jadwal.dzuhur, "HH:ii"),
    },
    {
      nama: "Ashar",
      waktu: moment(jadwalSolat?.jadwal.ashar, "HH:ii"),
    },
    {
      nama: "Maghrib",
      waktu: moment(jadwalSolat?.jadwal.maghrib, "HH:ii"),
    },
    {
      nama: "Isya",
      waktu: moment(jadwalSolat?.jadwal.isya, "HH:ii"),
    },
  ];

  // Memeriksa jadwal solat saat ini
  const jadwalSaatIni: any = random?.find((jadwal) =>
    sekarang?.isSameOrBefore(jadwal.waktu)
  );

  const selisih = jadwalSaatIni?.waktu?.diff(sekarang);
  const durasi = moment?.duration(selisih);
  const jam = durasi?.hours();
  const menit = durasi?.minutes();
  if (jadwalSaatIni) {
    // console.log(`Saat ini sedang waktu ${jadwalSaatIni.nama}`);
    console.log(
      `Sisa waktu hingga ${jadwalSaatIni.nama} adalah ${jam} jam ${menit} menit.`
    );
  } else {
    console.log("Sudah melewati waktu solat hari ini.");
  }
  console.log(`Saat ini sedang waktu ${jadwalSaatIni?.nama}`);
  // console.log("apaan tu bang messi", Math.floor(random / (60 * 60 * 1000)));

  const formattedHijriDate = currentDate.format("DD MMMM YYYY");

  const b = currentDate.isAfter(jadwalSolat?.jadwal?.subuh, "hours");

  console.log("bbbe", b);

  const dateHijri = new Intl.DateTimeFormat("id-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(Date.now());

  useEffect(() => {
    axios
      .get(`https://api.myquran.com/v1/sholat/jadwal/1010/${today}`)
      .then((item) => {
        setJadwalSolat(item?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [today]);

  return (
    <main className="bg-mosque bg-no-repeat bg-cover bg-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-36px)] min-h-[736px] mb-3">
          <h1 className="text-xl md:text-4xl font-bold text-center mx-1 md:mx-0">
            {formattedHijriDate} M | {dateHijri}
          </h1>
          <h2 className="text-lg md:text-2xl font-semibold">
            Waktu Solat Berikutnya
          </h2>
          <h3 className="text-5xl md:text-8xl font-semibold -mt-2">
            {jadwalSaatIni?.nama}
          </h3>
          <h4 className="text-xl md:text-3xl font-semibold">
            {/* {jam}:{menit} */}
          </h4>
          <div className="flex items-center space-x-1 my-4">
            <div className="text-5xl md:text-9xl p-5 md:p-8 rounded-3xl bg-white/40 backdrop-blur-sm shadow-xl flex justify-center">
              <p className="relative">{moment(time).format("HH")}</p>
              <p className="text-base md:text-xl font-semibold absolute bottom-2 md:bottom-5 leading-[1]">
                Jam
              </p>
            </div>
            <p className="text-5xl md:text-9xl">:</p>
            <div className="text-5xl md:text-9xl p-5 md:p-8 rounded-3xl bg-white/40 backdrop-blur-sm shadow-xl flex justify-center">
              <p className="relative">{moment(time).format("mm")}</p>
              <p className="text-base md:text-xl font-semibold absolute bottom-2 md:bottom-5 leading-[1]">
                Menit
              </p>
            </div>
            <p className="text-5xl md:text-9xl">:</p>
            <div className="text-5xl md:text-9xl p-5 md:p-8 rounded-3xl bg-white/40 backdrop-blur-sm shadow-xl flex justify-center">
              <p className="relative">{moment(time).format("ss")}</p>
              <p className="text-base md:text-xl font-semibold absolute bottom-2 md:bottom-5 leading-[1]">
                Detik
              </p>
            </div>
          </div>
          {/* <h4 className="text-lg md:text-2xl font-semibold text-center">
            Sehingga Waktu Solat Seterusnya Di Zon
          </h4> */}
          <h4 className="font-bold text-base md:text-2xl text-center">
            Tulang Bawang
          </h4>
          <div className="w-full md:w-auto">
            <div className="rounded-xl bg-white/40 backdrop-blur-sm shadow-lg mx-3 md:mx-0 mt-6 py-4 px-5">
              <h4 className="text-center mb-4 font-extrabold text-xl">
                Jadwal Waktu Solat Hari Ini
              </h4>
              <div className="grid grid-cols-3 md:grid-cols-7 gap-6">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-base">Imsak</p>
                  <p>{jadwalSolat?.jadwal?.imsak}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-base">Subuh</p>
                  <p>{jadwalSolat?.jadwal?.subuh}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-base">Terbit</p>
                  <p>{jadwalSolat?.jadwal?.terbit}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-base">Dzuhur</p>
                  <p>{jadwalSolat?.jadwal?.dzuhur}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-base">Ashar</p>
                  <p>{jadwalSolat?.jadwal?.ashar}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-base">Maghrib</p>
                  <p>{jadwalSolat?.jadwal?.maghrib}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-base">Isya</p>
                  <p>{jadwalSolat?.jadwal?.isya}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full flex justify-center items-center">
        <div className="rounded-t-md bg-white/40 backdrop-blur-sm px-4 py-0 shadow-sm">
          <p className="font-normal">
            Waktu Solat © 2023 Created by
            <a
              href="https://www.salimi.my"
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:font-semibold"
            >
              Salimi
            </a>
          </p>
        </div>
      </footer>
      <audio ref={audioRef} src="https://cldup.com/mmx-BZl2wj.mp3?_=1" />
    </main>
  );
};

export default MainPage;
