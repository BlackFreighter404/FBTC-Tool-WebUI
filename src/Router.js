import React from "react";
import { Routes, Route } from "react-router-dom";

import Display from "./components/Display/Display";
import Operation from "./components/Operation/Operation";
import Request from "./components/Request/Request";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Display />} />
            <Route path="/display" element={<Display />} />
            <Route path="/operation" element={<Operation />} />
            <Route path="/request" element={<Request />} />
        </Routes>
    );
}

export default Router;