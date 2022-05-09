/* eslint-disable @next/next/no-img-element */
import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import { Rating, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import Video from "./Video";

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openShow = () => {
    setShow(true);
  };
  const closeShow = () => {
    setShow(false);
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      setIsLoading(false);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.original_name || movie?.title || movie?.name || " ")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className="relative z-50 will-change-transform transition-all duration-1000 ease-in-out">
      <h2 className="p-5 ml-[20px] text-amber-500 inline-flex relative text-2xl before:content-[''] before:w-10 before:h-10 before:absolute before:-left-1 before:top-0 before:bg-gradient-to-r from-black/60 after:content-[''] after:w-10 after:h-10 after:absolute after:-right-1 after:top-0 after:bg-gradient-to-l after:from-black/60">
        {title}
      </h2>
      <div
        onMouseLeave={closeShow}
        className="flex overflow-y-hidden overflow-x-scroll space-x-2 scrollbar-hide "
      >
        {movies.map((movie) => (
          <motion.div
            onMouseEnter={openShow}
            initial={{ height: "fit" }}
            whileInView={{ height: "max" }}
            transition={{ duration: 2 }}
            onDoubleClick={openShow}
            onClick={() => handleClick(movie)}
            className="group h-fit space-y-5 relative"
            key={movie.id}
          >
            {isLoading ? (
              <Skeleton
                animation="pulse"
                variant="text"
                width={20}
                height={20}
                sx={{ color: "#ffff00" }}
              />
            ) : (
              <img
                className={`${
                  isLargeRow
                    ? "min-h-[500px] min-w-[100vw] w-full md:min-w-[40vw] lg:min-w-[350px]"
                    : "max-h-[230px]  min-w-[100vw] w-full md:min-w-[40vw] lg:min-w-[20vw] "
                } hover:bg-stone-900 brightness-50 group-hover:brightness-100 object-fill relative z-30 hover:z-50
               transition-all duration-200 transform-gpu ease-in-out cursor-pointer`}
                title={movie.original_name || movie.title || movie.name}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )}

            {show && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="flex flex-col h-full text-5xl relative z-50 justify-between px-2 opacity-0 group-hover:opacity-100"
              >
                <div className="flex w-full justify-between px-2">
                  <p className="font-black text-lg truncate...">
                    {movie.name || movie.title || movie.original_name}
                  </p>
                </div>
                <div className="p-2 py-3">
                  <span className="mb-5 flex justify-between whitespace-nowrap text-sm underline">
                    ({movie.vote_count}) VOTES
                    <Rating
                      name="popularity"
                      value={movie.popularity}
                      precision={0.1}
                      readOnly
                      size="xs"
                    />
                  </span>
                  <p className="text-sm invisible group-hover:visible">
                    {movie.overview}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
