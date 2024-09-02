import React from "react";
import { Routes, Route } from "react-router-dom";
import Display from "./components/Display/Display";
import Operation from "./components/Operation/Operation";
import Request from "./components/Request/Request";

function Router() {
    const basename = process.env.PUBLIC_URL;

    return (
        <Routes>
            <Route exact path={`${basename}/`} element={<Display />} />
            <Route exact path={`${basename}/display`}element={<Display />} />
            <Route exact path={`${basename}/operation`} element={<Operation />} />
            <Route exact path={`${basename}/request`} element={<Request />} />
        </Routes>
    );
}

export default Router;