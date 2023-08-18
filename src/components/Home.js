import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import MovieBox from "./MovieBox";
import Pager from "./Pager";
import banner from "../Images/svg/banner.svg";
import gif from "../Images/Gif/loader.gif";
import Header from "./Header";

const Home = () => {
  const navigate = useNavigate();
  const [list, setList] = useState();
  const [textQuery, setTextQuery] = useState("");
  const [noDataFound, setNoDataFound] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getList();
    const token = localStorage.getItem("newtoken");
    if (token == null) {
      navigate("/");
    }
  }, [page]);

  const getList = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=8ec065dc5c7fd191cd99ead2b741b51f&language=en-US&page=${page}`
      )
      .then(({ data }) => {
        setList(data.results);
        console.log(data.results);
      });
    fetchData();
  };

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  };

  const searchMovie = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=8ec065dc5c7fd191cd99ead2b741b51f&language=en-US&query=${textQuery}`
    );
    const data = await response.data.results;
    setList(data);
    if (data.length === 0) {
      setNoDataFound(true);
    }
    fetchData();
  };

  const onChangeHandler = (e) => {
    setTextQuery(e.target.value, "handler");
  };

  return (
    <>
      <div>
        <Header onChangeHandler={onChangeHandler} searchMovie={searchMovie} />
        <div>
          <img className="banner" src={banner} alt="" />
        </div>
        <div>
          <p className="text"> Trending </p>
        </div>
        {noDataFound && (
          <div className="nodatacont">
            <h1 className="nodata">NO Data Found</h1>
          </div>
        )}
        <div className="container">
          {isLoading ? (
            ""
          ) : (
            <div className="grid">
              {list && list.map((movie) => <MovieBox list={movie} />)}
            </div>
          )}
          {isLoading ? (
            <div>
              <h4 className="fetch">Fetching Your Movie...!!</h4>
              <img className="gif" src={gif} alt="" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <ToastContainer />
      <Pager page={page} setPage={setPage} />
    </>
  );
};

export default Home;
