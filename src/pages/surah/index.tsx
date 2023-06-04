import {
  Backdrop,
  Box,
  CircularProgress,
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
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer";

interface PSurah {
  verse_key: string;
  text_indopak: string;
  data: {
    ayat: [];
    audioFull: Record<string, string>;
    nama: string;
    namaLatin: string;
    tempatTurun: string;
    arti: string;
    jumlahAyat: number;
  };
  teksArab: string;
  teksIndonesia: string;
  teksLatin: string;
  audio: Record<string, string>;
}

const Surah = () => {
  const { id } = useParams();
  const [surah, setSurah] = useState<PSurah>();
  const [syaikh, setSyaikh] = useState("01");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://equran.id/api/v2/surat/${id}`)
      .then((item) => {
        setLoading(false);
        setSurah(item?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const data = surah?.data;

  return (
    <Fragment>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          className="flex gap-4 flex-col"
        >
          <CircularProgress color="inherit" />
          <Box> Loading</Box>
        </Backdrop>
      ) : (
        <Fragment>
          <List
            dense={true}
            className="grid grid-cols-1 mb-4 gap-4 !mx-4 md:!mx-20"
          >
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
                      {data?.tempatTurun} • {data?.arti} • {data?.jumlahAyat}{" "}
                      Ayat
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
                      onChange={(e: SelectChangeEvent) =>
                        setSyaikh(e.target.value)
                      }
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
          {id !== "1" && (
            <List
              dense={true}
              className="grid grid-cols-1 gap-4 !mx-4 md:!mx-20"
            >
              <ListItem className="drop-shadow bg-white rounded-lg !p-4">
                <ListItemText
                  primary={
                    <Typography
                      fontSize={30}
                      align="center"
                      fontWeight={600}
                      className="arab"
                    >
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          )}
          <List dense={true} className="grid grid-cols-1 gap-4 !mx-4 md:!mx-20">
            {surah?.data?.ayat?.map((item: PSurah, idx: number) => {
              return (
                <ListItem
                  className="drop-shadow bg-white rounded-lg !p-4"
                  key={idx}
                >
                  <ListItemAvatar className="absolute top-4 left-4 text-sm bg-no-repeat bg-center w-8 h-10">
                    <div>{`${id} : ${idx + 1}`}</div>
                    <AudioPlayer audioUrl={item?.audio[syaikh]} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        fontSize={30}
                        align="right"
                        fontWeight={600}
                        className="arab"
                      >
                        {item?.teksArab}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography
                          fontSize={14}
                          borderBottom={1}
                          pb={1}
                          fontWeight={500}
                        >
                          {item?.teksLatin}
                        </Typography>
                        <Typography fontSize={14} pt={1} fontWeight={300}>
                          {item?.teksIndonesia}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Surah;
