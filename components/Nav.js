import { Autocomplete, TextField } from "@mui/material";
import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import axios from "../axios";

function Nav({ results }) {
  console.log(results);
  const [show, handleShow] = useState(false);
  const [search, setSearch] = useState("");

  const setQuery = (event) => {
    setSearch(event.target.value);
  };

  const fetchList = async () => {
    const req = await fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=c602004fafb19d5cefd8dd7449084f32&query=${search}"
    );
    const list = await req.json();
    const mappedList = list.map((item) => {
      {
        item.name || item.title || item.original_name;
      }
      setSearch(mappedList);
    });
  };

  const transitionNav = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNav);
    return () => window.removeEventListener("scroll", transitionNav);
  }, []);

  return (
    <nav
      className={`flex ${
        show === false ? "visible" : "invisible"
      }  transition-all duration-200 fixed h-24 w-screen z-20 justify-between p-5 bg-gradient-to-b from-black `}
    >
      <h1 className="flex flex-col text-amber-500 cursor-pointer text-4xl font-bold">
        BUTTFLIX
        <span className="text-sm"> at the flick of a butt</span>
      </h1>
      <div className="flex">
        <button className="cursor-pointer font-semibold px-5 py-1 text text-lg text-amber-500">
          SIGN IN
        </button>
      </div>
    </nav>
  );
}

export default Nav;
export const getStaticProps = async () => {
  return {
    props: { results: results },
  };
};
