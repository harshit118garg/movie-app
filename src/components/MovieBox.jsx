import React from "react";
import "../styles/MovieBox.scss";
import { Link } from "react-router-dom";

const MovieBox = ({ newMovie, IMG_PATH, IMG_NOT_AVAILABLE }) => {
  const { id, title, poster_path } = newMovie;

  return (
    <div className="col mx-3 movieBox">
      <Link to={`movie/${id}`}>
        <div className="imgBox">
          <img
            src={poster_path ? `${IMG_PATH}${poster_path}` : IMG_NOT_AVAILABLE}
            alt={title}
          />
        </div>
        <div className="title">
          <h5>{title.length > 25 ? `${title.substring(0, 25)}...` : title}</h5>
        </div>
      </Link>
    </div>
  );
};

export default MovieBox;
