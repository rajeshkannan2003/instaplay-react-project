import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/svg/logo.svg";
import searchicon from "../Images/svg/search.svg";

const Header = (props) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }


    if (localStorage.getItem("newtoken") == null) {
        var menu = (
            <></>
        )
    } else {
        var menu = (
            <>

                <div className="searchbox">
                    <input
                        className="inputsearch"
                        type="text"
                        onChange={props.onChangeHandler}
                        placeholder="Search Movies"
                    />
                    <button
                        className="searchbtn"
                        onClick={props.searchMovie}
                        type="submit">
                        <img src={searchicon} />
                    </button>
                </div>
                <div>
                    <Link to="/">
                        <span className="logouttext" onClick={logout} >
                            Logout
                        </span>
                    </Link>
                </div>
            </>
        )
    }
    return (
        <div className="header">
            <img src={Logo} alt="logo" />
            {menu}
        </div>
    )
}

export default Header;