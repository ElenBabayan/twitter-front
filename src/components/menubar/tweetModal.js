import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import UploadButton from "../uploadButton";
import { Flex, Button } from "../styles/modal";
import { SET_UPDATE } from "../../redux/actions";

const URL = process.env.REACT_APP_SERVER_URL;

const TweetModal = (props) => {
  const [text, setText] = useState("");
  const [isTweetDisabled, setIsTweetDisabled] = useState(true);
  const [preview, setPreview] = useState({ image: "", video: "", media: null });

  const user = useSelector((state) => state.profile.user);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const { handleClose, rows } = props;

  const addTweet = async () => {
    setIsTweetDisabled(true);
    const data = new FormData();
    data.append("userId", user.id);
    data.append("text", text);
    if (preview.media) data.append("media", preview.media);
    if (preview.image || preview.video)
      data.append("resource_type", preview.image ? "image" : "video");
    const res = await axios.post(`${URL}/tweet/add-tweet`, data);
    setIsTweetDisabled(false);
    setText("");
    setPreview({ image: "", video: "", media: null });
    toast("Your tweet was sent");
    dispatch({ type: SET_UPDATE });
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
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div style={{ width: "100%" }}>
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
          <div style={{ marginBottom: "10px" }}>
            {preview.image && (
              <img src={preview.image} style={{ width: "100%" }} />
            )}
            {preview.video && (
              <video
    src={preview.video}
    style={{width: "100%"}}
    controls
    />
            )}
          </div>
          <Flex style={{ alignItems: "center", justifyContent: "flex-end" }}>
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
