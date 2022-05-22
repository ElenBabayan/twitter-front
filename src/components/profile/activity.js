import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Like from "./like";
import Retweet from "./retweet";
import Comment from "./comment";
import {
    PeopleFlex,
    TweetDetails,
    EmptyMsg,
    User,
    UserImage,
} from "../styles/profile";
import Loading from "../loading";
import Modal from "../modal";
import CommentModal from "../tweet/commentModal";

const URL = process.env.REACT_APP_SERVER_URL;

const Activity = (props) => {
    const [tweets, setTweets] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tweetId, setTweetId] = useState(null);

    const {username} = useParams();
    const user = useSelector((state) => state.profile.user);
    const myId = user.id;
    const token = user.token;
    const refresh = useSelector((state) => state.update.refresh);
    const theme = useSelector((state) => state.theme);

    const {
        url,
        dataKey,
        header,
        handleHeaderText,
        feed,
    } = props;

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        getData(source);
        return () => {
            source.cancel();
        };
    }, [url, refresh]);

    const getData = async (source) => {
        try {
            const res = await axios.get(url, {
                cancelToken: source.token,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTweets(res.data.tweets);
            handleHeaderText &&
            handleHeaderText(`${res.data.tweets.length} ${header}`);
        } catch (err) {
            console.log(err);
        }
    };

    const updateDetails = (idx, newState) => {
        setTweets([
            ...tweets.slice(0, idx),
            {
                ...tweets[idx],
                [newState[0][0]]: newState[0][1],
                [newState[1][0]]: newState[1][1],
            },
            ...tweets.slice(idx + 1),
        ]);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    if (!tweets) return <Loading/>;

    if (!tweets.length)
        return (
            <EmptyMsg>
                {feed
                    ? "You are all caught up!"
                    : `@${username} has no ${dataKey} yet!`}
            </EmptyMsg>
        );
    return (
        <React.Fragment>
            {isModalOpen && (
                <Modal
                    children={
                        <CommentModal handleClose={handleClose} tweetId={tweetId}/>
                    }
                    handleClose={handleClose}
                    padding="15px"
                />
            )}
            {tweets.map((tweet, idx) => {
                const date = new Date(tweet["Tweets.createdAt"]);
                return (
                    <React.Fragment>
                        <Link
                            key={tweet["Tweets.id"]}
                            to={`/${tweet.username}/status/${tweet["Tweets.id"]}`}
                        >
                            <PeopleFlex hover border={theme.border} tweetHov={theme.tweetHov}>
                                <User>
                                    <UserImage src={tweet.avatar}/>
                                </User>
                                <div style={{width: "80%"}}>
                                    <TweetDetails color={theme.color}>
                                        <object>
                                            <Link to={`/profile/${tweet.username}`}>
                                                <h3>
                                                    {tweet.firstname} {tweet.lastname}
                                                </h3>
                                            </Link>
                                        </object>
                                        <p
                                            style={{
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                maxWidth: "18%",
                                            }}
                                        >
                                            @{tweet.username}
                                        </p>
                                        <span>
                      {date.toLocaleString("default", {month: "short"})}{" "}
                                            {date.getDate()}{" "}
                                            {new Date().getFullYear() !== date.getFullYear() &&
                                                date.getFullYear()}
                    </span>
                                    </TweetDetails>
                                    <div style={{color: theme.color}}>
                                        {tweet["Tweets.text"]}
                                    </div>
                                    <TweetDetails style={{justifyContent: "space-between"}}>
                                        <Comment
                                            tweets={tweets}
                                            tweet={tweet}
                                            idx={idx}
                                            myId={myId}
                                            getData={getData}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setTweetId(tweet["Tweets.id"]);
                                                setIsModalOpen(true);
                                            }}
                                        />

                                        <Retweet
                                            tweets={tweets}
                                            tweet={tweet}
                                            idx={idx}
                                            updateDetails={updateDetails}
                                            myId={myId}
                                            getData={getData}
                                        />
                                        <Like
                                            tweets={tweets}
                                            tweet={tweet}
                                            idx={idx}
                                            updateDetails={updateDetails}
                                            myId={myId}
                                            getData={getData}
                                        />
                                    </TweetDetails>
                                </div>
                            </PeopleFlex>
                        </Link>
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
};

export default Activity;
