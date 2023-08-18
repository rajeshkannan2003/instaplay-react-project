import React from 'react'
import play from "../Images/svg/play.svg";
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';


const MovieBox = ({ list }) => {

    const star = {
        size: 20,
        edit: false,
        value: `${(list && list.vote_average) / 2}`
    };

    return (
        <div className="movie-box">
            <Link to={`/homedetail/${list.id}`}>
                <img src={`https://image.tmdb.org/t/p/w200/${list && list.backdrop_path}`} alt={`${list && list.title} Poster`} height="115" width="100%" />
                <div className='rectangle'>
                    <div>
                        <img src={play} className="play" />
                        <h5 className="title">{`${list && list.title}`} </h5>
                        <div className="star">
                            <ReactStars {...star} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default MovieBox;