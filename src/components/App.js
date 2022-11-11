import AppRouter from "components/Router";
import React, {useState} from "react";
import {authService} from "fBase";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn}/>
            <footer>&copy; {new Date().getFullYear()} twitter-clone-coding</footer>
        </>
    );
}

export default App;
