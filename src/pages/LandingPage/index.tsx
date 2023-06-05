/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from "@mui/material";
import moment from "moment";

import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllCity, getJadwalSolat } from "../../feature/jadwal/actions";
import { tanggal } from "../../utils/date";

interface PropsTipeSolat {
  nama: string;
  waktu?: moment.Moment;
  time?: string;
  clock?: string;
}

interface propsLocation {
  id: string;
  lokasi: string;
}

const MainPage: React.FC = () => {
  const { allCity, solat } = useAppSelector((state) => state.jadwal);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(moment());
  const [tipeSolat, setTipeSolat] = useState<PropsTipeSolat>();

  const [idCity, setIdCity] = useState<propsLocation>({
    id: "1010",
    lokasi: "KAB. TULANG BAWANG",
  });

  useEffect(() => {
    dispatch(getAllCity());
  }, [dispatch]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const timeNow = moment().format("HH:mm");
  const jadwal = solat?.data?.jadwal;

  timeNow === jadwal?.isya ||
  timeNow === jadwal?.subuh ||
  timeNow === jadwal?.dzuhur ||
  timeNow === jadwal?.ashar ||
  timeNow === jadwal?.maghrib ||
  timeNow === "09:20"
    ? audioRef.current?.play()
    : audioRef.current?.pause();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const today = moment().format("YYYY/MM/DD");

  const sekarang = moment();

  useEffect(() => {
    dispatch(getJadwalSolat({ id: idCity?.id, today: today })).then((item) => {
      const jadwalSolat = item.payload.data;

      const random: PropsTipeSolat[] = [
        {
          nama: "Subuh",
          waktu: moment(jadwalSolat?.jadwal?.subuh, "HH:ii"),
          clock: jadwalSolat?.jadwal?.subuh,
        },
        {
          nama: "Dzuhur",
          waktu: moment(jadwalSolat?.jadwal?.dzuhur, "HH:ii"),
          clock: jadwalSolat?.jadwal?.dzuhur,
        },
        {
          nama: "Ashar",
          waktu: moment(jadwalSolat?.jadwal?.ashar, "HH:ii"),
          clock: jadwalSolat?.jadwal?.ashar,
        },
        {
          nama: "Maghrib",
          waktu: moment(jadwalSolat?.jadwal?.maghrib, "HH:ii"),
          clock: jadwalSolat?.jadwal?.maghrib,
        },
        {
          nama: "Isya",
          waktu: moment(jadwalSolat?.jadwal?.isya, "HH:ii"),
          clock: jadwalSolat?.jadwal?.isya,
        },
      ];

      const jadwalSaatIni = random?.find((jadwal) =>
        sekarang?.isSameOrBefore(jadwal?.waktu)
      );

      const selisih = jadwalSaatIni?.waktu?.diff(sekarang);
      const durasi = moment?.duration(selisih);
      const jam = durasi?.hours();
      const menit = durasi?.minutes();

      setTipeSolat({
        nama: String(jadwalSaatIni?.nama),
        time: `${jam}:${menit}`,
        clock: jadwalSaatIni?.clock,
      });
    });
  }, [dispatch, idCity?.id, sekarang, today]);

  const onHandleChangeLocation = (_e: any, newValue: any) => {
    const filterLokasi: any = allCity?.find(
      (item) => item.lokasi === newValue.lokasi
    );
    console.log("apalah daya", filterLokasi);
    if (filterLokasi === undefined) {
      setIdCity({
        ...idCity,
        id: "1010",
        lokasi: "KAB. TULANG BAWANG",
      });
    } else {
      setIdCity({
        ...idCity,
        id: String(filterLokasi?.id),
        lokasi: String(filterLokasi?.lokasi),
      });
    }
  };

  const defaultProps = {
    options: allCity,
    getOptionLabel: (option: propsLocation) => option.lokasi,
  };

  return (
    <main className="bg-mosque bg-no-repeat bg-cover bg-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-36px)] min-h-[736px] mb-3">
          <h1 className="text-xl md:text-4xl font-bold text-center mx-1 md:mx-0">
            {tanggal.masehi} M | {tanggal.hijriah}
          </h1>
          <h2 className="text-lg md:text-2xl font-semibold">
            Waktu Solat Berikutnya
          </h2>
          <h3 className="text-5xl md:text-8xl font-semibold -mt-2">
            {tipeSolat?.nama}
          </h3>
          <h4 className="text-xl md:text-3xl font-semibold">
            {tipeSolat?.clock}
          </h4>
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
          <Autocomplete
            {...defaultProps}
            sx={{ width: 300 }}
            onChange={(e, newValue) => onHandleChangeLocation(e, newValue)}
            id="select-on-focus"
            selectOnFocus
            renderInput={(params) => (
              <TextField {...params} label="KAB. TULANG BAWANG" />
            )}
          />

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
        </div>
      </div>
      <footer className="w-full flex justify-center items-center">
        <div className="rounded-t-md bg-white/40 backdrop-blur-sm px-4 py-0 shadow-sm">
          <p className="font-normal">
            Waktu Solat © 2023 Created by
            <a
              href="https://suraji.my.id/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:font-semibold"
            >
              Suraji
            </a>
          </p>
        </div>
      </footer>
      <audio ref={audioRef} src="https://cldup.com/mmx-BZl2wj.mp3?_=1" />
    </main>
  );
};

export default MainPage;
