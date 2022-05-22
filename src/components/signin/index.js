import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import LoginForm from "./loginForm";
import Icon from "../icon";
import {LogoWrapper, Motto, Button, Flex} from "../styles/signin";
import {SET_USER, SET_THEME} from "../../redux/actions";
import SignupForm from "./signupForm";
import Modal from "../modal";
import {logo} from "./paths";
import {Row, Col} from "antd";

const URL = process.env.REACT_APP_SERVER_URL;

const SignIn = (props) => {
    const [credentialError, setCredentialError] = useState({
        user: null,
        password: null,
    });
    const [userError, setUserError] = useState({
        username: null,
        email: null,
    });
    const [loginDisabled, setLoginDisabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const history = useHistory();
    const profile = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const handleSubmit = async (data) => {
        try {
            setLoginDisabled(true);
            const login = await axios.post(`${URL}/user/login-user`, data);
            setCredentialError({user: null, password: null});
            setLoginDisabled(false);
            dispatch({type: SET_USER, payload: login.data.user});
            dispatch({type: SET_THEME, payload: "default"});
            history.push("/home");
        } catch (err) {
            setCredentialError(err.response.data);
            setLoginDisabled(false);
        }
    };

    const handleSignupSubmit = async (data) => {
        try {
            setLoginDisabled(true);
            const signup = await axios.post(`${URL}/user/add-user`, {
                firstname: data.firstname,
                lastname: data.lastname,
                username: data.username,
                email: data.email,
                password: data.password,
                dob: data.dob,
            });
            setUserError({username: null, email: null});
            setLoginDisabled(false);
            dispatch({type: SET_USER, payload: signup.data.user});
            history.push("/home");
        } catch (err) {
            setUserError(err.response.data.errors);
            setLoginDisabled(false);
        }
    };

    return (
        <React.Fragment>
            {isModalOpen && (
                <Modal
                    children={
                        <SignupForm
                            onSubmit={handleSignupSubmit}
                            userError={userError}
                            loginDisabled={loginDisabled}
                        />
                    }
                    handleClose={() => setIsModalOpen(!isModalOpen)}
                    padding="15px"
                />
            )}
            <Row>
                <Col
                    md={12}
                    xs={24}
                    style={{overflow: "hidden", position: "relative"}}
                >
                    <LogoWrapper>
                        <img
                            src={"https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"}
                            alt="App"
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%,-50%)",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%,-50%)",
                            }}
                        >
                        </div>
                    </LogoWrapper>
                </Col>
                <Col md={12} xs={24} style={{padding: "15px"}}>
                    <LoginForm
                        onSubmit={handleSubmit}
                        credentialError={credentialError}
                        loginDisabled={loginDisabled}
                    />
                    <Flex>
                        <div>
                            <Icon
                                d={logo}
                                width="41.25px"
                                height="41.25px"
                                fill="rgb(29,161,242)"
                            />
                            <h1>Welcome to our app!</h1>
                            <Button
                                bg="rgb(29,160,240)"
                                color="rgb(255,255,255)"
                                hovbg="rgb(26, 146, 220)"
                                onClick={() => setIsModalOpen(!isModalOpen)}
                            >
                                Sign up
                            </Button>
                        </div>
                    </Flex>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SignIn;
