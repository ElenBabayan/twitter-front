import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import Icon from "../icon";
import Modal from "../modal";
import { Header, MenuItem, MenuTitle, Button } from "../styles/menubar";
import TweetModal from "./tweetModal";
import { LOGOUT_USER, SET_THEME } from "../../redux/actions";

const MenuBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.profile.user);
  const theme = useSelector((state) => state.theme);
  const mode = theme.mode;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
    history.replace("/");
    useSelector((state) => (state.profile.user.token.set(null)));
  };

  const brand = [
    "M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z",
  ];
  const paths = {
    home: [
      "M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z",
    ],
    explore: [
      "M21 7.337h-3.93l.372-4.272c.036-.412-.27-.775-.682-.812-.417-.03-.776.27-.812.683l-.383 4.4h-6.32l.37-4.27c.037-.413-.27-.776-.68-.813-.42-.03-.777.27-.813.683l-.382 4.4H3.782c-.414 0-.75.337-.75.75s.336.75.75.75H7.61l-.55 6.327H3c-.414 0-.75.336-.75.75s.336.75.75.75h3.93l-.372 4.272c-.036.412.27.775.682.812l.066.003c.385 0 .712-.295.746-.686l.383-4.4h6.32l-.37 4.27c-.036.413.27.776.682.813l.066.003c.385 0 .712-.295.746-.686l.382-4.4h3.957c.413 0 .75-.337.75-.75s-.337-.75-.75-.75H16.39l.55-6.327H21c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-6.115 7.826h-6.32l.55-6.326h6.32l-.55 6.326z",
    ],
    profile: [
      "M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z",
    ],
  };

  const dark = [
    "M15.692 11.205l6.383-7.216c.45-.45.45-1.18 0-1.628-.45-.45-1.178-.45-1.627 0l-7.232 6.402s.782.106 1.595.93c.548.558.882 1.51.882 1.51z",
    "M17.45 22.28H3.673c-1.148 0-2.083-.946-2.083-2.11V7.926c0-1.165.934-2.112 2.082-2.112h5.836c.414 0 .75.336.75.75s-.336.75-.75.75H3.672c-.32 0-.583.274-.583.612V20.17c0 .336.26.61.582.61h13.78c.32 0 .583-.273.583-.61v-6.28c0-.415.336-.75.75-.75s.75.335.75.75v6.28c0 1.163-.934 2.11-2.084 2.11z",
    "M8.18 16.99c-.19.154-.476.032-.504-.21-.137-1.214-.234-4.053 1.483-5.943.908-1 3.02-1.52 4.475-.198s1.14 3.473.23 4.473c-2.07 2.15-3.428.058-5.686 1.878z",
  ];
  const logout = [
    "M349.85,62.196c-10.797-4.717-23.373,0.212-28.09,11.009c-4.717,10.797,0.212,23.373,11.009,28.09c69.412,30.324,115.228,98.977,115.228,176.035c0,106.034-85.972,192-192,192c-106.042,0-192-85.958-192-192c0-77.041,45.8-145.694,115.192-176.038c10.795-4.72,15.72-17.298,10.999-28.093c-4.72-10.795-17.298-15.72-28.093-10.999C77.306,99.275,21.331,183.181,21.331,277.329c0,129.606,105.061,234.667,234.667,234.667c129.592,0,234.667-105.068,234.667-234.667C490.665,183.159,434.667,99.249,349.85,62.196z",
    "M255.989,234.667c11.782,0,21.333-9.551,21.333-21.333v-192C277.323,9.551,267.771,0,255.989,0c-11.782,0-21.333,9.551-21.333,21.333v192C234.656,225.115,244.207,234.667,255.989,234.667z",
  ];

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      {isModalOpen && (
        <Modal
          children={<TweetModal handleClose={handleClose} />}
          handleClose={handleClose}
          padding="15px"
        />
      )}
      <Header>
        <Link to="/home">
          <MenuItem logo>
            <div>
              <Icon
                d={brand}
                width="35px"
                height="35px"
                fill="rgba(29,161,242,1.00)"
              />
            </div>
          </MenuItem>
        </Link>
        {Object.keys(paths).map((item) => {
          return (
            <NavLink
              to={item === "profile" ? `/${item}/${user.username}` : `/${item}`}
              activeClassName="selected"
              key={item}
            >
              <MenuItem className="active" color={theme.color}>
                <div>
                  <Icon
                    d={paths[item]}
                    width="26.25px"
                    height="26.25px"
                    fill={theme.color}
                  />
                  <MenuTitle>{item}</MenuTitle>
                </div>
              </MenuItem>
            </NavLink>
          );
        })}
        <MenuItem
          color={theme.color}
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: SET_THEME,
              payload: mode === "dark" ? "default" : "dark",
            })
          }
        >
          <div>
            <Icon
              d={dark}
              width="26.25px"
              height="26.25px"
              fill={theme.color}
            />
            <MenuTitle>{mode === "dark" ? "Light" : "Dark"} mode</MenuTitle>
          </div>
        </MenuItem>
        <div style={{ marginBottom: "10px" }}></div>
        {window.matchMedia("(max-width: 768px)").matches ? (
          <Button
            width="40px"
            height="40px"
            padding="0"
            onClick={() => setIsModalOpen(true)}
          >
            +
          </Button>
        ) : (
          <Button
            width="100%"
            padding="12px 30px"
            onClick={() => setIsModalOpen(true)}
          >
            Tweet
          </Button>
        )}
        <div style={{ marginBottom: "10px" }}></div>
        {window.matchMedia("(max-width: 768px)").matches ? (
          <Button width="40px" height="40px" padding="0" onClick={handleLogout}>
            <Icon
              d={logout}
              viewBox="0 0 511.996 511.996"
              width="18.75px"
              height="18.75px"
              fill="rgb(255,255,255)"
            />
            {/* logout */}
          </Button>
        ) : (
          <Button
            width="100%"
            padding="12px 30px"
            style={{
              position: "absolute",
              left: 0,
              bottom: "20px",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Header>
    </React.Fragment>
  );
};

export default MenuBar;
