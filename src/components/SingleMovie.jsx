import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../contextApi/context";
import "../styles/SingleMovie.scss";
import { Link } from "react-router-dom";

const SingleMovie = () => {
  const { id } = useParams();
  const { IMG_PATH_300, IMG_NOT_AVAILABLE } = useGlobalContext();

  const API_URl = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState();

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      setIsLoading(false);
      console.log(data);
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovies(`${API_URl}`);
    }, 800);

    return () => clearTimeout(timeOut);
    // eslint-disable-next-line
  }, [id]);

  if (isLoading) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center align-items-center mt-5">
          <h2 className="fs-1 fw-bolder text-uppercase">Loading....</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <div className="row p-2 border-4 rounded-2 bg-secondary bg-opacity-50 p-4 shadow-lg">
          <div className="col-md-4 col-sm-5">
            <div className="imgBox">
              <img
                src={
                  movie.poster_path
                    ? `${IMG_PATH_300}${movie.poster_path}`
                    : IMG_NOT_AVAILABLE
                }
                alt={movie.title}
                className="border-3 rounded-4 shadow"
              />
            </div>
          </div>
          <div className="col-md-8 col-sm-5 offset-sm-2 offset-lg-0">
            <h1 className="display-2 d-flex justify-content-center align-content-center text-end text-sm-start text-uppercase fw-bolder text-danger">
              {movie.title}
            </h1>
            <hr />
            <p className="lead fs-2 text-white text-center my-5">
              {movie.overview}
            </p>
            <p className="fs-2 fw-semibold text-center">
              Date Of Release - {movie.release_date}
            </p>
            <div className="genres text-center my-5">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="mx-4 lead fs-2 text-danger text-uppercase fw-semibold"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p
              className="text-center fw-semibold fs-2"
              style={{ color: "yellow" }}
            >
              IMDB RATING - {movie.vote_average}/10
              <span>
                <i className="fa fa-star"></i>
              </span>
            </p>
            <Link to="/">
              <button className="btn btn-danger fw-semibold fs-2 text-uppercase w-100 p-3">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleMovie;
