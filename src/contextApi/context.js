import { useState, useEffect, createContext, useContext } from "react";

const API_URl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false`;

const IMG_PATH = `https://image.tmdb.org/t/p/w200`;
const IMG_PATH_300 = `https://image.tmdb.org/t/p/w400`;
const IMG_NOT_AVAILABLE = `https://www.movienewz.com/img/films/poster-holder.jpg`;

const ContextApi = createContext();

const Provider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [userQuery, setUserQuery] = useState("");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data?.total_results !== 0) {
        setIsLoading(false);
        setMovie(data.results);
      } else {
        setIsError({
          show: true,
          msg: `The Movie name must be provided`,
        });
        console.log(isError);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovies((userQuery === "") ? `${API_URl}&query=killer` : `${API_URl}&query=${userQuery}`);
    }, 800);

    return () => clearTimeout(timeOut);
    // eslint-disable-next-line
  }, [userQuery]);

  return (
    <ContextApi.Provider
      value={{
        isError,
        isLoading,
        movie,
        IMG_PATH,
        IMG_PATH_300,
        IMG_NOT_AVAILABLE,
        userQuery,
        setUserQuery,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(ContextApi);
};

export { ContextApi, Provider, useGlobalContext };
