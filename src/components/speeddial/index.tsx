import {
  MosqueOutlined,
  NewspaperOutlined,
  VolunteerActivismOutlined,
} from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: <MosqueOutlined />, name: "Jadwal", path: "/" },
  { icon: <NewspaperOutlined />, name: "AlQuran", path: "/surah" },
  { icon: <VolunteerActivismOutlined />, name: "Doa", path: "/prayer" },
  // { icon: <ShareIcon />, name: "Share" },
];

const CustomSpeedDial = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      className="fixed bottom-5 right-4"
      direction="up"
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipPlacement="left"
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => navigate(action.path)}
        />
      ))}
    </SpeedDial>
  );
};

export default CustomSpeedDial;
