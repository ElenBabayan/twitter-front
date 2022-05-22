import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {toast} from "react-toastify";
import {Flex, Button} from "../styles/modal";
import {SET_UPDATE} from "../../redux/actions";

const URL = process.env.REACT_APP_SERVER_URL;

const TweetModal = (props) => {
    const [text, setText] = useState("");
    const [isTweetDisabled, setIsTweetDisabled] = useState(true);

    const user = useSelector((state) => state.profile.user);
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    const {handleClose, rows} = props;

    const addTweet = async () => {
        setIsTweetDisabled(true);
        const data = new FormData();
        data.append("userId", user.id);
        data.append("text", text);

        const res = await axios.post(`${URL}/tweet/add-tweet`, data);
        setIsTweetDisabled(false);
        setText("");
        toast("Your tweet was sent");
        dispatch({type: SET_UPDATE});
        handleClose && handleClose();
    };

    return (
        <React.Fragment>
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
              placeholder="What's happening?"
              value={text}
              onChange={(e) => {
                  setText(e.target.value);
                  e.target.value
                      ? setIsTweetDisabled(false)
                      : setIsTweetDisabled(true);
              }}
          />
                    <Flex style={{alignItems: "center", justifyContent: "flex-end"}}>
                        <div>
                            <Button
                                onClick={addTweet}
                                disabled={isTweetDisabled}
                                defaultBg={theme.defaultBg}
                                darkBg={theme.darkBg}
                            >
                                Tweet
                            </Button>
                        </div>
                    </Flex>
                </div>
            </Flex>
        </React.Fragment>
    );
};

export default TweetModal;
