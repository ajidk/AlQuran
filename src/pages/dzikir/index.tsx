import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, FormControlLabel, Switch } from "@mui/material";
import parse from "html-react-parser";
import { CustomSpeedDial } from "../../components";
import { dzikr } from "../../utils/json/dzikr";
import "./css/embla.css";

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = () => {
  const options: EmblaOptionsType = {};

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);
  const [toggle, setToggle] = useState(true);
  console.log(prevBtnEnabled);

  return (
    <>
      <Box
        bgcolor="#59AD94"
        className="w-full grid grid-cols-3 items-center py-8 px-4"
      >
        <Box>
          <FormControlLabel
            value={toggle ? "pagi" : "petang"}
            control={<Switch color="primary" />}
            label={toggle ? "" : ""}
            labelPlacement="end"
            checked={toggle}
            onChange={() => setToggle(!toggle)}
          />
        </Box>
        <Box
          className="text-2xl flex-1 md:text-4xl"
          fontWeight={700}
          color="#fff"
          textAlign={"center"}
        >
          Dzikir {toggle ? "pagi" : "petang"}
        </Box>
        <Box className="hidden md:flex justify-end items-end">
          <ArrowBack
            onClick={scrollPrev}
            className={
              prevBtnEnabled === true ? "cursor-pointer" : "cursor-auto"
            }
            sx={{ color: prevBtnEnabled === false ? "gray" : "black" }}
          />

          <ArrowForward
            onClick={scrollNext}
            className={
              nextBtnEnabled === true ? "cursor-pointer" : "cursor-auto"
            }
            sx={{ color: nextBtnEnabled === false ? "gray" : "black" }}
          />
        </Box>
      </Box>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {dzikr.map(
              (item, index) =>
                (item.time === (toggle ? "pagi" : "petang") ||
                  item.time === "") && (
                  <div
                    className="flex justify-center items-start min-w-full px-4 md:px-10 overflow-scroll text-center"
                    key={index}
                  >
                    <div className="w-3/4">
                      <div className="text-2xl font-bold my-4">
                        {item.title}
                      </div>
                      <div className="arab text-3xl leading-[3.8rem]">
                        {parse(String(item.arabic))}
                      </div>

                      <div className="font-light my-3">
                        <em>"{item.translated_id}"</em>
                        <span className="text-sm font-semibold ml-3">
                          {item.narrator !== "" && `( ${item.narrator} ) -`} ({" "}
                          {item.note} )
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="font-bold">faedah:</span>{" "}
                        {parse(item.faedah)}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {/* <div className="fixed left-0 right-0 bottom-4">
        <div className="flex justify-center gap-x-3 items-center">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div> */}
      <CustomSpeedDial />
    </>
  );
};

export default EmblaCarousel;
