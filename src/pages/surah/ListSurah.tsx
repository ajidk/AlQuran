import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface OblistChapter {
  name_arabic: string;
  name_complex: string;
  revelation_place: string;
  verses_count: number;
  translated_name: { name: string };
}

function ListSurah() {
  const [listChapter, setListChapter] = useState<[OblistChapter]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.quran.com/api/v4/chapters?language=id")
      .then((item) => {
        setLoading(false);
        setListChapter(item?.data?.chapters);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const ListChapter = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    borderRadius: 8,
    height: "80vh",
    overflow: "auto",
    overscrollBehaviorY: "none",
    margin: 5,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
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
          <Grid container xs={12} md={12} m={2}>
            <Typography
              sx={{ mt: 4, mb: 2 }}
              className="!ml-3 md:!ml-20"
              variant="h6"
              component="div"
            >
              List Nama Surah
            </Typography>
            <ListChapter>
              <List
                dense={true}
                className="grid md:grid-cols-3 grid-cols-1 gap-4 !mx-1 md:!mx-20"
              >
                {listChapter?.map((item: OblistChapter, idx: number) => {
                  return (
                    <Link key={idx} to={`/surah/${idx + 1}`}>
                      <ListItem
                        className="drop-shadow bg-white rounded-lg cursor-pointer"
                        secondaryAction={
                          <Typography fontSize={20}>
                            {item?.name_arabic}
                          </Typography>
                        }
                      >
                        <ListItemAvatar className="flex justify-center items-center bg-no-repeat bg-center bg-frame-number w-8 h-10">
                          <div>{idx + 1}</div>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography fontSize={16} fontWeight={600}>
                              {item?.name_complex}{" "}
                              <span className="text-sm font-light">
                                ({item?.translated_name?.name})
                              </span>
                            </Typography>
                          }
                          secondary={
                            <Typography fontSize={14} fontWeight={300}>
                              {item?.revelation_place} .{" "}
                              <span>{item?.verses_count} ayah</span>
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
        )}
      </Grid>
    </Box>
  );
}

export default ListSurah;
