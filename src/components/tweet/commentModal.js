import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {Flex, Button} from "../styles/modal";
import {SET_UPDATE} from "../../redux/actions";

const URL = process.env.REACT_APP_SERVER_URL;

const CommentModal = (props) => {
    const [text, setText] = useState("");
    const [isCommentDisabled, setIsCommentDisabled] = useState(true);

    const user = useSelector((state) => state.profile.user);
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    const {handleClose, rows, tweetId} = props;

    const addComment = async () => {
        setIsCommentDisabled(true);
        const data = new FormData();
        data.append("tweetId", tweetId);
        data.append("userId", user.id);
        data.append("text", text);

        const res = await axios.post(`${URL}/tweet/comment/add`, data);
        setIsCommentDisabled(false);
        setText("");
        dispatch({type: SET_UPDATE});
        handleClose && handleClose();
    };

    return (
        <Flex bg={theme.bg} color={theme.color}>
            <div>
                <img
                    src={user.avatar}
                    width="49px"
                    height="49px"
                    style={{borderRadius: "50%"}}
                />
            </div>
            <div style={{width: "100%"}}>
        <textarea
            rows={rows || 5}
            placeholder="Tweet your reply"
            value={text}
            onChange={(e) => {
                setText(e.target.value);
                e.target.value
                    ? setIsCommentDisabled(false)
                    : setIsCommentDisabled(true);
            }}
        ></textarea>
                <Flex style={{alignItems: "center", justifyContent: "flex-end"}}>
                    <div>
                        <Button
                            onClick={addComment}
                            disabled={isCommentDisabled}
                            defaultBg={theme.defaultBg}
                            darkBg={theme.darkBg}
                        >
                            Reply
                        </Button>
                    </div>
                </Flex>
            </div>
        </Flex>
    );
};

export default CommentModal;
