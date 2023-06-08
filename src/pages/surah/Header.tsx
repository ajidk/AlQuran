import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";

const Header = () => {
  const { detail } = useAppSelector((state) => state.quran);

  return (
    <Stack className="py-5 bg-[#59AD94] drop-shadow flex justify-center items-center text-white">
      <Typography fontSize={40} className="arab font-semibold items-center">
        {detail?.nama}
      </Typography>
      <Typography
        fontSize={32}
        align="center"
        fontWeight={600}
        className="arab"
      >
        {detail?.namaLatin}
      </Typography>
      <Typography fontSize={16} align="center" className="arab">
        ( {detail?.arti} )
      </Typography>
      <Typography
        fontSize={18}
        align="center"
        fontWeight={500}
        className="arab"
      >
        {detail?.tempatTurun} - {detail?.jumlahAyat} Ayat
      </Typography>
    </Stack>
  );
};

export default Header;
