import { styled } from "@mui/material";

export const ListChapter = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  borderRadius: 8,
  //   height: "90vh",
  overflow: "auto",
  overscrollBehaviorY: "none",

  margin: 5,
}));
