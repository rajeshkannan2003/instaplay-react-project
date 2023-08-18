import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import arrow from "../Images/svg/arrow.svg"
import play from "../Images/svg/movieplay.svg";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player/youtube'

const HomeDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [movie, setMovie] = useState({});
    const [video, setVideo] = useState({});
    const [playVideo, setPlayVideo] = useState(false);
    const [hideBtn, setHideBtn] = useState(false);

    const getMovie = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=8ec065dc5c7fd191cd99ead2b741b51f&language=en-US`)
            .then((res) => {
                setMovie(res.data)
            })
    }
    useEffect(() => {
        getMovie();
        getVideo();
        const token = localStorage.getItem("newtoken")
        if (token == null) {
            navigate("/");
        } else {

        }
    }, [])

    const getVideo = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=8ec065dc5c7fd191cd99ead2b741b51f&language=en-US`)
            .then((response) => {

                const data = response.data.results
                data.map((movie) => {

                    setVideo(movie.key)
                });
            })

    }

    const clickPlay = () => {
        setPlayVideo(true);
        setHideBtn(true);
    }
    return (
        <>
            <Header />
            <div className="detailcon">
                <div>
                    <Link to="/Home">
                        <img src={arrow} className="arrow" />
                    </Link>
                    <h5 className="detailtitle" > {movie.title} </h5>
                    <p className="detailtext"> Rating : {`${(movie && movie.vote_average) / 2}`} / 5 </p>
                    <p className="detailpara"> {movie.overview} </p>
                    <p className="detailtext">Release Date  <span className="spanr">{movie.release_date}</span> </p>
                    <p className="detailtext">Orginal Language  <span className="spano">{movie.original_language}</span> </p>
                </div>
                {!hideBtn && <><div className="style"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`,
                        backgroundRepeat: "no-repeat",
                        width: "100vw",
                        height: "80vh",
                        backgroundSize: "cover"
                    }} >
                    <div className="movieplay" >
                        <img src={play} onClick={clickPlay} />
                    </div>
                </div></>}
                {playVideo && <div className="player">
                    <button className="closebtn"
                        onClick={() => {
                            setPlayVideo(false)
                            setHideBtn(false);
                        }}
                    >X</button>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${video}`}
                        width="100%"
                        height="80%"
                        playing={true}
                        controls={true}
                        id="video"
                    />
                </div>}
            </div>
        </>
    )
}

export default HomeDetail;

