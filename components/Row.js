/* eslint-disable @next/next/no-img-element */
import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../axios";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="relative bg-transparent">
      <h2 className="py-5 ml-[20px] text-amber-500 inline-flex relative text-2xl before:content-[''] before:w-10 before:h-10 before:absolute before:-left-1 before:bottom-5 before:bg-gradient-to-r from-black/60 after:content-[''] after:w-10 after:h-10 after:absolute after:-right-1 after:bottom-5 after:bg-gradient-to-l after:from-black/60">
        {title}
      </h2>
      <div className="flex overflow-y-hidden overflow-x-scroll space-x-4 scrollbar-hide relative">
        {movies.map((movie) => (
          <div
            onClick={() => handleClick(movie)}
            className="group space-y-5 relative  transition-all duration-150 ease-in-out"
            key={movie.id}
          >
            <img
              className={`${
                isLargeRow
                  ? "min-h-[300px] min-w-[200px]"
                  : "min-h-[15vh] min-w-[19.1vw]"
              } hover:bg-stone-900 brightness-50 group-hover:brightness-100 object-fill relative group-hover:scale-110
               transition-all duration-200 transform-gpu ease-in-out cursor-pointer`}
              title={movie.original_name || movie.title || movie.name}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />

            <span className="invisible group-hover:visible flex flex-col w-full items-start px-2 text-xsfont-light text-stone-500 group-hover:text-white ">
              <p className="text-lg underline ">
                {movie.name || movie.title || movie.original_name}
              </p>
              <p>VOTES: ({movie.vote_count}) </p>
              <p>POPULARITY: {movie.popularity}</p>
            </span>
          </div>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
