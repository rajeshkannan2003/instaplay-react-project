import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import HomeDetail from "../components/HomeDetail";
import Login from "../components/Login";
import PrivateRoutes from "../utils/PrivateRoutes";

function AllRoutes() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route component={<PrivateRoutes />}>
                    <Route exact path="/Home" element={<Home />} />
                    <Route exact path="/HomeDetail/:id" element={<HomeDetail />} />
                </Route>
            </Routes>
        </Router>

    )
}

export default AllRoutes;