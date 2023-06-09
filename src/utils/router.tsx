import { createBrowserRouter } from "react-router-dom";
import { Doa, Dzikir, ListSurah, MainPage, Surah, Tafsir } from "../pages";
import NotFound from "../pages/NotFound";


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
    path: "/dzikir",
    element: <Dzikir />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
