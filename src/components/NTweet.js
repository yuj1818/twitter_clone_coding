import React, {useState} from "react";
import {dbService, storageService} from "../fBase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

const NTweet = ({nTweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(nTweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if(ok) {
            //트윗 삭제
            await dbService.doc(`nTweets/${nTweetObj.id}`).delete();
            await storageService.refFromURL(nTweetObj.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => setEditing(prev => !prev);

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`nTweets/${nTweetObj.id}`).update({
            text: newTweet,
        });
        setEditing(false);
    }

    const onChange = (e) => {
        setNewTweet(e.target.value);
    }

    return (
        <div className="nweet">
            {
                editing ?
                    <>
                        {isOwner &&
                            <>
                                <form onSubmit={onSubmit} className="container nweetEdit">
                                    <input
                                        type="text"
                                        placeholder="Edit your tweet"
                                        value={newTweet}
                                        onChange={onChange}
                                        required
                                        autoFocus
                                        className="formInput"
                                    />
                                    <input
                                        type="submit"
                                        value="Update Tweet"
                                        className="formBtn"
                                    />
                                </form>
                                <span onClick={toggleEditing} className="formBtn cancelBtn">
                                    Cancel
                                </span>
                            </>
                        }
                    </>
                    :
                    <>
                        <h4>{nTweetObj.text}</h4>
                        {nTweetObj.attachmentUrl && <img src={nTweetObj.attachmentUrl} />}
                        {isOwner &&
                            <div className="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        }
                    </>
            }
        </div>
    );
}

export default NTweet;