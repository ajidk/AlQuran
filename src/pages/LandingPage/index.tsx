/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from "@mui/material";
import moment from "moment";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllCity, getJadwalSolat } from "../../feature/jadwal/actions";
import { tanggal } from "../../utils/date";
import Clock from "./Clock";
import PrayerToday from "./PrayerToday";
import { CustomSpeedDial } from "../../components";
import { IMedina } from "../../assets/img";
import axios from "axios";

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
  const jadwal = solat?.jadwal;

  timeNow === jadwal?.isya ||
  timeNow === jadwal?.subuh ||
  timeNow === jadwal?.dzuhur ||
  timeNow === jadwal?.ashar ||
  timeNow === jadwal?.maghrib ||
  timeNow === "09:20"
    ? audioRef.current?.play()
    : audioRef.current?.pause();

  useEffect(() => {
    dispatch(
      getJadwalSolat({ id: idCity?.id, today: moment().format("YYYY/MM/DD") })
    ).then((item) => {
      const jadwalSolat = item.payload.jadwal;

      const solat: PropsTipeSolat[] = [
        {
          nama: "Subuh",
          waktu: moment(jadwalSolat?.subuh, "HH:ii"),
          clock: jadwalSolat?.subuh,
        },
        {
          nama: "Terbit",
          waktu: moment(jadwalSolat?.terbit, "HH:ii"),
          clock: jadwalSolat?.terbit,
        },
        {
          nama: "Dhuha",
          waktu: moment(jadwalSolat?.dhuha, "HH:ii"),
          clock: jadwalSolat?.dhuha,
        },
        {
          nama: "Dzuhur",
          waktu: moment(jadwalSolat?.dzuhur, "HH:ii"),
          clock: jadwalSolat?.dzuhur,
        },
        {
          nama: "Ashar",
          waktu: moment(jadwalSolat?.ashar, "HH:ii"),
          clock: jadwalSolat?.ashar,
        },
        {
          nama: "Maghrib",
          waktu: moment(jadwalSolat?.maghrib, "HH:ii"),
          clock: jadwalSolat?.maghrib,
        },
        {
          nama: "Isya",
          waktu: moment(jadwalSolat?.isya, "HH:ii"),
          clock: jadwalSolat?.isya,
        },
      ];

      const jadwalSaatIni = solat?.find((solat) =>
        moment()?.isSameOrBefore(solat.waktu)
      );

      const selisih = jadwalSaatIni?.waktu?.diff(moment());

      const durasi = moment?.duration(selisih);
      const jam = durasi?.hours();
      const menit = durasi?.minutes();

      if (jadwalSaatIni) {
        setTipeSolat({
          nama: String(jadwalSaatIni?.nama),
          time: `${jam}:${menit}`,
          clock: jadwalSaatIni?.clock,
        });
      } else {
        setTipeSolat({
          nama: solat[0]?.nama,
          time: String(solat[0]?.waktu),
          clock: solat[0]?.clock,
        });
      }
    });
  }, [dispatch, idCity?.id]);

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

  type deviceInfoState = {
    deviceMemory?: number;
    hardwareConcurrency: number;
    platform: string;
    userAgent: string;
    vendor: string;
    language?: string;
    screenHeight?: number;
    screenWidth?: number;
    ipAddress?: string | number;
  };

  const [deviceInfo, setDeviceInfo] = useState<deviceInfoState | null>(null);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const {
        deviceMemory,
        hardwareConcurrency,
        userAgent,
        platform,
        vendor,
        language,
      }: deviceInfoState = window.navigator;
      const { width, height } = window.screen;
      const response = await fetch("https://api.ipify.org/?format=json");
      const data = await response.json();

      setDeviceInfo({
        ipAddress: data.ip,
        userAgent,
        platform,
        vendor,
        language,
        screenWidth: width,
        screenHeight: height,
        hardwareConcurrency,
        deviceMemory,
      });
    };

    fetchDeviceInfo();
  }, []);

  const sendToTelegram = useCallback(async () => {
    if (deviceInfo === null) return;

    return axios.post(`https://api.telegram.org/bot6389390017:AAG4AANbYzV70T0dBpBaWmRnwI22s1NEV4Y/sendMessage`, {
      chat_id: "784526105",
      text: `
        pengunjung tanggal ${moment().format("dddd, d MMMM YYYY")}
        ip address: ${deviceInfo.ipAddress}
        deviceMemory: ${deviceInfo?.deviceMemory}
        hardwareConcurrency: ${deviceInfo?.hardwareConcurrency}
        platform: ${deviceInfo?.platform}
        userAgent: ${deviceInfo?.userAgent}
        vendor: ${deviceInfo?.vendor}
        language: ${deviceInfo?.language}
        screenHeight: ${deviceInfo?.screenHeight}
        screenWidth: ${deviceInfo?.screenWidth}
        `,
    });
  }, [deviceInfo]);

  useEffect(() => {
    // sendToTelegram();
  }, [sendToTelegram]);

  return (
    <main
      className="bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url('${IMedina}')` }}
    >
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
          <Clock />
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
          <PrayerToday jadwal={jadwal} />
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
      <CustomSpeedDial />
    </main>
  );
};

export default MainPage;
