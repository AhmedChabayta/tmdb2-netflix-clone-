import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../requests";

function Banner() {
  const [showText, setShowText] = useState(true);
  const [movie, setMovie] = useState([]);

  const showTextHandler = () => {
    setShowText(!showText);
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetlixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  const base_url = "https://image.tmdb.org/t/p/original/";
  return (
    <div
      className="h-[600px] relative pt-10"
      style={{
        backgroundImage: `url('${base_url}${
          movie?.backdrop_path || movie?.poster_path
        }')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-screen z-10 h-20 bg-gradient-to-b from-black absolute top-0" />
      <div className="py-10 ml-5 h-full relative pt-[140px] space-y-2 flex flex-col justify-between">
        <div className="space-x-2 relative z-50 py-10 space-y-5">
          <h1 className="text-6xl font-extrabold">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <button className="px-5 py-1 rounded-[2px] bg-amber-600 hover:bg-amber-800 active:scale-105 transition-all duration-200">
            Flick
          </button>
          <button className="px-5 py-1 rounded-[2px] bg-amber-600 hover:bg-amber-800 active:scale-105 transition-all duration-200">
            My ButtList
          </button>
        </div>
        <div className={`max-w-xl text-lg font-semibold pb-20`}>
          <p
            className={`${
              showText ? "truncate ..." : ""
            } transition duration-200 relative z-50`}
          >
            {movie?.overview}
          </p>
          <button
            className="underline whitespace-nowrap relative z-50 my-auto"
            onClick={showTextHandler}
          >
            {showText ? "Read More" : "Read Less"}
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[600px] w-screen bg-gradient-to-t from-black" />
    </div>
  );
}

export default Banner;
