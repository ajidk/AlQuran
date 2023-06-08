/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModalDialog } from "@mui/joy";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateDetail, updateModal } from "../../feature/general/slice";
import { Modal } from "@mui/material";

interface customModalState {
  children: any;
}

const CustomModal: React.FC<customModalState> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.general);

  const onHandleClose = () => {
    dispatch(updateModal(false));
    dispatch(updateDetail(null));
  };
  return (
    <Modal open={modal} onClose={onHandleClose}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        className="overflow-y-scroll scroll-smooth"
        sx={(theme) => ({
          [theme.breakpoints.only("lg")]: {
            top: "unset",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: "none",
            maxWidth: "unset",
          },
        })}
      >
        {children}
        {/* <Typography id="nested-modal-title" component="h2">
          Are you absolutely sure?
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
          }}
        >
          <Button
            variant="solid"
            color="neutral"
            // onClick={() => setOpen(false)}
          >
            Continue
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            // onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </Box> */}
      </ModalDialog>
    </Modal>
  );
};

export default CustomModal;
