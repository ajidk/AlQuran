import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer";

interface PSurah {
  data: {
    tafsir: [];
    audioFull: Record<string, string>;
    nama: string;
    namaLatin: string;
    tempatTurun: string;
    arti: string;
    jumlahAyat: number;
  };
  teks: string;
}

const Tafsir = () => {
  const { id } = useParams();
  const [surah, setSurah] = useState<PSurah>();
  const [syaikh, setSyaikh] = useState("01");

  useEffect(() => {
    axios
      .get(`https://equran.id/api/v2/tafsir/${id}`)
      .then((item) => {
        setSurah(item?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log("surah", surah);
  const data = surah?.data;

  return (
    <div>
      <List dense={true} className="grid grid-cols-1 mb-4 gap-4 md:!mx-20">
        <ListItem className="drop-shadow rounded-lg !p-4 bg-green-500">
          <ListItemText
            primary={
              <Box>
                <Typography
                  fontSize={30}
                  align="center"
                  fontWeight={600}
                  className="arab"
                >
                  {data?.namaLatin} • {data?.nama}
                </Typography>
                <Typography
                  fontSize={18}
                  align="center"
                  fontWeight={600}
                  className="arab"
                >
                  {data?.tempatTurun} • {data?.arti} • {data?.jumlahAyat} Ayat
                </Typography>
              </Box>
            }
            secondary={
              <Box className="flex items-center gap-x-4">
                <AudioPlayer
                  title="audio"
                  className="border py-[9px] px-3 rounded-md bg-white text-black"
                  audioUrl={String(surah?.data?.audioFull[syaikh])}
                />

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  className="bg-white text-black"
                  value={syaikh}
                  label="Age"
                  size="small"
                  onChange={(e: SelectChangeEvent) => setSyaikh(e.target.value)}
                >
                  <MenuItem value={"01"}>Abdullah-Al-Juhany</MenuItem>
                  <MenuItem value={"02"}>Abdul-Muhsin-Al-Qasim</MenuItem>
                  <MenuItem value={"03"}>Abdurrahman-as-Sudais</MenuItem>
                  <MenuItem value={"04"}>Ibrahim-Al-Dossari</MenuItem>
                  <MenuItem value={"05"}>Misyari-Rasyid-Al-Afasi</MenuItem>
                </Select>
              </Box>
            }
          />
        </ListItem>
      </List>
      <List dense={true} className="grid grid-cols-1 gap-4 !mx-20">
        {surah?.data?.tafsir?.map((item: PSurah, idx: number) => {
          return (
            <ListItem
              className="drop-shadow bg-white rounded-lg !p-4"
              key={idx}
            >
              <ListItemAvatar className="absolute top-4 left-4 text-sm bg-no-repeat bg-center w-8 h-10">
                <div>{`${id} : ${idx + 1}`}</div>
                {/* <AudioPlayer audioUrl={item?.audio[syaikh]} /> */}
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography fontSize={16} pt={4} className="arab">
                    {item?.teks}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Tafsir;
