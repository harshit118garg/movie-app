import React from "react";
import { useGlobalContext } from "../contextApi/context";
import "../styles/Movies.scss";
import MovieBox from "./MovieBox";

const Movies = () => {
  const { movie, IMG_PATH, IMG_NOT_AVAILABLE } = useGlobalContext();

  return (
    <>
      <section className="container">
        <div className="row">
          {movie.map((newMovie) => {
            return (
              <MovieBox
                newMovie={newMovie}
                IMG_PATH={IMG_PATH}
                IMG_NOT_AVAILABLE={IMG_NOT_AVAILABLE}
                key={newMovie.id}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Movies;
