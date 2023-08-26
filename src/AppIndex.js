import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./components/mainpage";
function AppIndex() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact Component={MainPage}> </Route>
                <Route path="/mainIndex" exact Component={MainPage}> </Route>
            </Routes>
        </Router>
    )

}
export default AppIndex;