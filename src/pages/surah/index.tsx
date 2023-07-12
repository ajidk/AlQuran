import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IQuran } from "../../assets/img";
import { CustomSpeedDial } from "../../components";
import { getListSurah } from "../../feature/quran/action";
import { listSurahState } from "../../utils/interface/quran";
import { ListChapter } from "../../utils/styled/listSurah";

function Surah() {
  const dispatch = useAppDispatch();
  const { listSurah, loading } = useAppSelector((state) => state.quran);

  useEffect(() => {
    dispatch(getListSurah());
  }, [dispatch]);

  const [search, setSearch] = useState<string>("");

  // const statusSurah = checked ? filterSurah.sort() : filterSurah.reverse();

  const filterSurah = listSurah.filter(
    (item: listSurahState) =>
      item.namaLatin.toLowerCase().includes(search) ||
      item.arti.toLowerCase().includes(search) ||
      item.tempatTurun.toLowerCase().includes(search)
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            className="flex gap-4 flex-col"
          >
            <CircularProgress color="success" />
          </Backdrop>
        ) : (
          <Fragment>
            <Box
              bgcolor="#59AD94"
              className="w-full flex flex-col justify-center items-center py-8 px-4"
            >
              <img alt="quran" src={IQuran} className="w-52 md:w-56" />
              <Typography fontSize={30} fontWeight={700} color="#fff">
                Al Quran Online
              </Typography>
              <Typography fontSize={13} fontWeight={400} color="#fff">
                Website Al Quran Digital Online Terjemahan Bahasa Indonesia
              </Typography>
            </Box>
            <Grid container m={2}>
              <Stack className="flex !flex-row flex-1 justify-center gap-5 items-end !mx-1 md:!mx-20 my-3">
                <input
                  placeholder="Cari surah..."
                  value={search}
                  className="rounded-2xl border text-center py-2 w-1/2 outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Stack>
              <Box className="sticky top-0 bg-white z-20 flex justify-center flex-col w-full !mb-4 !py-4">
                <Typography className="text-center text-[#59AD94] !text-3xl">
                  Daftar Surat
                </Typography>
              </Box>
              <ListChapter>
                <List
                  dense={true}
                  className="grid md:grid-cols-3 grid-cols-1 gap-4 !mx-1 md:!mx-20"
                >
                  {filterSurah?.map((item: listSurahState, idx: number) => {
                    return (
                      <Link key={idx} to={`/surah/${idx + 1}`}>
                        <ListItem
                          className="drop-shadow bg-white rounded-lg cursor-pointer"
                          secondaryAction={
                            <Typography fontSize={20}>{item.nama}</Typography>
                          }
                        >
                          <ListItemAvatar className="flex justify-center items-center bg-no-repeat bg-center bg-frame-number w-8 h-10">
                            <div>{idx + 1}</div>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography fontSize={16} fontWeight={600}>
                                {item.namaLatin}{" "}
                                <span className="text-sm font-light">
                                  ({item.arti})
                                </span>
                              </Typography>
                            }
                            secondary={
                              <Typography fontSize={14} fontWeight={300}>
                                {item.tempatTurun} .{" "}
                                <span>{item.jumlahAyat} ayah</span>
                              </Typography>
                            }
                          />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </ListChapter>
            </Grid>
          </Fragment>
        )}
      </Grid>
      <CustomSpeedDial />
    </Box>
  );
}

export default Surah;
