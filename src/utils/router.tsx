import { createBrowserRouter } from "react-router-dom";
import { ListSurah, MainPage, Surah, Tafsir } from "../pages";
import NotFound from "../pages/NotFound";
import Doa from "../pages/Doa";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/surah",
    element: <ListSurah />,
  },
  {
    path: "/surah/:id",
    element: <Surah />,
  },
  {
    path: "/tafsir/:id",
    element: <Tafsir />,
  },
  {
    path: "/prayer",
    element: <Doa />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
