import {
  ArrowBack,
  ArrowForward
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CustomSpeedDial } from "../../components";
import AudioPlayer from "../../components/AudioPlayer";
import { detailSurah } from "../../feature/quran/action";
import Header from "./Header";

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

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { detail, loading } = useAppSelector((state) => state.quran);
  const { id } = useParams();
  const [syaikh, setSyaikh] = useState("01");

  useEffect(() => {
    dispatch(detailSurah({ id: String(id) }));
  }, [dispatch, id]);

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
          <Header />
          <Box className="flex justify-between drop-shadow bg-white py-2 items-center mt-2 sticky top-0 z-50 !px-4 md:!px-20">
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() =>
                navigate(`/surah/${detail?.suratSebelumnya?.nomor}`)
              }
            >
              {detail?.suratSebelumnya?.namaLatin}
            </Button>
            <Box className="items-center gap-x-4 hidden md:flex">
              <AudioPlayer
                title="audio"
                className="border py-[9px] px-3 rounded-md bg-white text-black"
                audioUrl={String(detail?.audioFull[syaikh])}
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
            <Button
              variant="outlined"
              endIcon={<ArrowForward />}
              onClick={() =>
                navigate(`/surah/${detail?.suratSelanjutnya?.nomor}`)
              }
            >
              {detail?.suratSelanjutnya?.namaLatin}
            </Button>
          </Box>
          {id !== "1" && (
            <Box className="drop-shadow bg-white rounded-lg my-4 p-6 mx-20">
              <Typography
                fontSize={30}
                align="center"
                fontWeight={600}
                className="arab"
              >
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </Typography>
            </Box>
          )}
          <List dense={true} className="grid grid-cols-1 gap-4 !mx-4 md:!mx-20">
            {detail?.ayat?.map((item: PSurah, idx: number) => {
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
      <CustomSpeedDial />
    </Fragment>
  );
};

export default Detail;
