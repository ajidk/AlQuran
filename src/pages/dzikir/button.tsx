import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React from "react";

type DotButtonPropType = {
  selected: boolean;
  className?: string;
  onClick: () => void;
};

export const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { selected, onClick } = props;

  return (
    <button
      className={"!bg-red-500 rounded-full embla__dot".concat(
        selected ? " embla__dot--selected !bg-black" : ""
      )}
      type="button"
      onClick={onClick}
    />
  );
};

type PrevNextButtonPropType = {
  enabled: boolean;
  onClick: () => void;
};

export const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className="!hidden md:!flex embla__button !left-auto !right-[3rem] !top-10 embla__button--prev"
      onClick={onClick}
      disabled={!enabled}
    >
      <ArrowBack />
    </button>
  );
};

export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className="!hidden md:!flex embla__button !top-10 embla__button--next"
      onClick={onClick}
      disabled={!enabled}
    >
      <ArrowForward />
    </button>
  );
};
