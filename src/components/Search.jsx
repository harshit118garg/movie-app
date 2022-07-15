import React from "react";
import "../styles/Search.scss";
import { useGlobalContext } from "../contextApi/context";

const Search = () => {
  const { userQuery, setUserQuery, isError } = useGlobalContext();

  return (
    <>
      <section className="inputField container d-flex justify-content-center align-items-center flex-column">
        <h3>Enter your favourite movie</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="search here"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
          />
        </form>
        <div className="input-error">
          <p> {isError.show && isError.msg} </p>
        </div>
      </section>
    </>
  );
};

export default Search;
