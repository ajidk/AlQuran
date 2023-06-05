import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/id"; // Menggunakan locale Indonesia untuk hari dan bulan dalam bahasa Indonesia

interface JadwalSolat {
  nama: string;
  waktu: moment.Moment;
}

function Clock(): JSX.Element {
  const [sekarang, setSekarang] = useState(moment());
  const [jadwalSaatIni, setJadwalSaatIni] = useState<JadwalSolat | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSekarang(moment());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    // Menentukan jadwal solat
    const jadwalSolat: JadwalSolat[] = [
      {
        nama: "Subuh",
        waktu: moment().set({ hour: 4, minute: 30, second: 0, millisecond: 0 }),
      },
      {
        nama: "Dzuhur",
        waktu: moment().set({ hour: 12, minute: 0, second: 0, millisecond: 0 }),
      },
      {
        nama: "Ashar",
        waktu: moment().set({
          hour: 15,
          minute: 30,
          second: 0,
          millisecond: 0,
        }),
      },
      {
        nama: "Maghrib",
        waktu: moment().set({ hour: 18, minute: 0, second: 0, millisecond: 0 }),
      },
      {
        nama: "Isya",
        waktu: moment().set({
          hour: 19,
          minute: 30,
          second: 0,
          millisecond: 0,
        }),
      },
    ];

    // Memeriksa jadwal solat saat ini
    const jadwalSaatIni = jadwalSolat.find((jadwal) =>
      sekarang.isSameOrBefore(jadwal.waktu)
    );
    setJadwalSaatIni(jadwalSaatIni || null);
  }, [sekarang]);

  return (
    <div>
      {jadwalSaatIni ? (
        <div>
          <p>Saat ini sedang waktu {jadwalSaatIni.nama}</p>
          <p>
            Sisa waktu hingga {jadwalSaatIni.nama} adalah{" "}
            {jadwalSaatIni.waktu.diff(sekarang, "hours")} jam{" "}
            {jadwalSaatIni.waktu.diff(sekarang, "minutes") % 60} menit
          </p>
        </div>
      ) : (
        <p>Sudah melewati waktu solat hari ini.</p>
      )}
    </div>
  );
}

export default Clock;
