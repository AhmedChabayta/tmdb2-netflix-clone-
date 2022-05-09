import React from "react";
import requests from "../requests";
import Banner from "./Banner";
import Nav from "./Nav";
import Row from "./Row";

function Layout() {
  return (
    <div className="bg-black text-white">
      <header>
        <Nav />
        <Banner />
      </header>
      <Row title="TRENDING" fetchUrl={requests.fetchTrending} />
      <Row title="TOP RATED" fetchUrl={requests.fetchTopRated} />
      <Row title="ACTION" fetchUrl={requests.fetchActionMovies} />
      <Row title="COMEDY" fetchUrl={requests.fetchComedyMovies} />
      <Row title="HORROR" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="ROMANCE" fetchUrl={requests.fetchRomanceMovies} />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetlixOriginals}
        isLargeRow
      />
      <Row title="MYSTERY" fetchUrl={requests.fetchMystery} />
      <Row title="SCIFI" fetchUrl={requests.fetchSciFi} />
      <Row title="WESTERN" fetchUrl={requests.fetchWestern} />
      <Row title="ANIMATION" fetchUrl={requests.fetchAnimation} />
      <Row title="TV" fetchUrl={requests.fetchTV} />
    </div>
  );
}

export default Layout;
