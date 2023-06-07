/* eslint-disable @typescript-eslint/no-explicit-any */
export interface listSurahState {
  arti: string;
  audioFull: any;
  deskripsi: string;
  jumlahAyat: number;
  nama: string;
  namaLatin: string;
  nomor: number;
  tempatTurun: string;
}

export interface quranState {
  listSurah: listSurahState[];
  loading: boolean;
  solat: any;
}
