import React, {useEffect, useState} from "react";
import {authService, dbService} from "../fBase";

const Profile = ({userObj, refreshUser}) => {

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogoutClick = () => {
        authService.signOut();
    };

    const getMyNTweets = async () => {
        const nTweets = await dbService
            .collection("nTweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
    };

    const onChange = (e) => {
        const { target: { value } } = e;
        setNewDisplayName(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
        }
        refreshUser();
    }

    return (
        <div className="top__container">
            <div className="container">
                <form onSubmit={onSubmit} className="profileForm">
                    <input
                        type="text"
                        placeholder="Display name"
                        onChange={onChange}
                        value={newDisplayName}
                        className="formInput"
                        autoFocus
                    />
                    <input
                        type="submit"
                        value="Update Profile"
                        className="formBtn"
                        style={{
                            marginTop: 10,
                        }}
                    />
                </form>
                <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
                    Log Out
                </span>
            </div>
        </div>
    )
}

export default Profile;