import React from "react";
import {Route, Routes} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "../routes/Profile";
import {Navigate} from "react-router-dom";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <div>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            {isLoggedIn ?
                <Routes>
                    <Route path="/" element={<Home userObj={userObj}/>}/>
                    <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                :
                <Routes>
                    <Route path="/" element={<Auth />}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            }
        </div>
    )
}

export default AppRouter;