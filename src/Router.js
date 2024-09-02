import React from "react";
import { Routes, Route } from "react-router-dom";

import Display from "./components/Display/Display";
import Operation from "./components/Operation/Operation";
import Request from "./components/Request/Request";

function Router() {
    return (
        <Routes>
            <Route exact path="/" element={<Display />} />
            <Route exact path="/display" element={<Display />} />
            <Route exact path="/operation" element={<Operation />} />
            <Route exact path="/request" element={<Request />} />
        </Routes>
    );
}

export default Router;