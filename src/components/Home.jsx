import React from "react";
import "../styles/Home.scss";
import Movies from "./Movies";
import Search from "./Search";

const Home = () => {
  return (
    <>
      <Search />
      <Movies />
    </>
  );
};

export default Home;
