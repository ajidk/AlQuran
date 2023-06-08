import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CustomSpeedDial } from "../../components";
import CustomModal from "../../components/modal";
import { updateDetail, updateModal } from "../../feature/general/slice";
import { dailyPrayer, dailyState } from "../../utils/json/dailyPrayer";


const Doa = () => {
  const dispatch = useAppDispatch();
  const { byDetail } = useAppSelector((state) => state.general);
  const [search, setSearch] = useState("");

  const onHandleModal = (item: dailyState) => {
    dispatch(updateModal(true));
    dispatch(updateDetail(item));
  };

  const filterPrayer = dailyPrayer.filter((item) =>
    item.doa.toLocaleLowerCase().includes(search)
  );

  return (
    <Fragment>
      <Box
        bgcolor="#59AD94"
        className="w-full flex flex-col justify-center items-center py-8 px-4"
      >
        {/* <img alt="quran" src={IQuran} className="w-52 md:w-56" /> */}
        <Typography fontSize={30} fontWeight={700} color="#fff">
          Doa Harian
        </Typography>
      </Box>
      <Stack className="flex my-4 flex-1 !mx-1 md:!mx-20">
        <input
          placeholder="Cari nama doa"
          className="border py-3 text-center rounded-2xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>

      <List
        dense={true}
        className="grid md:grid-cols-3 grid-cols-1 gap-4 !mx-1 md:!mx-20 items-center justify-center"
      >
        {filterPrayer?.map((item: dailyState, idx: number) => {
          return (
            <ListItem
              key={`daily-${idx}`}
              className="drop-shadow bg-white rounded-lg cursor-pointer"
              onClick={() => onHandleModal(item)}
            >
              <ListItemAvatar className="flex justify-center items-center bg-no-repeat bg-center bg-frame-number w-8 h-10">
                <div>{idx + 1}</div>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography fontSize={16} fontWeight={600}>
                    {item.doa}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>

      <CustomModal>
        <Stack justifyContent="center" alignItems="center" rowGap={3}>
          <Typography fontSize={20} fontWeight={600}>
            {byDetail?.doa}
          </Typography>
          <Typography
            fontSize={30}
            align="center"
            fontWeight={600}
            className="arab"
          >
            {byDetail?.ayat}
          </Typography>
          <Typography fontSize={16} fontWeight={300} align="center">
            {byDetail?.artinya}
          </Typography>
        </Stack>
      </CustomModal>
      <CustomSpeedDial />
    </Fragment>
  );
};

export default Doa;
