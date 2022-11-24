import React, {useEffect, useState} from "react";
import {dbService, storageService} from "../fBase";
import NTweet from "../components/NTweet";
import NTweetFactory from "../components/NTweetFactory";

const Home = ({userObj}) => {
    const [nTweets, setNTweets] = useState([]);

    useEffect(() => {
        dbService.collection("nTweets").orderBy("createdAt","desc").onSnapshot(snapshot => {
            const nTweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }));
            setNTweets(nTweetArray);
        });
    },[]);

  return(
      <div className="top__container">
          <div className="container">
              <NTweetFactory userObj={userObj} />
              <div style={{ marginTop: 30 }}>
                  {nTweets.map((nTweet) => (
                      <NTweet key={nTweet.id} nTweetObj={nTweet} isOwner={nTweet.creatorId === userObj.uid}/>
                  ))}
              </div>
          </div>
      </div>
  )
};

export default Home;