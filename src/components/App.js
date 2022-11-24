import AppRouter from "components/Router";
import React, {useEffect, useState} from "react";
import {authService} from "fBase";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if(user) {
                setUserObj({
                    displayName: user.displayName !== null ? user.displayName : user.email.split('@')[0],
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setUserObj(null);
            }
            setInit(true);
        });
    },[]);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName !== null ? user.displayName : user.email.split('@')[0],
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };

    return (
        <>
            {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}/> : "Initializing"}
            {/*<footer>&copy; {new Date().getFullYear()} twitter-clone-coding</footer>*/}
        </>
    );
}

export default App;
