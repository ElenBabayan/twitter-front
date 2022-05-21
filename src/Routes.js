import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { Row, Col } from "./components/styles/common";
import { Row, Col } from "antd";
const MenuBar = React.lazy(() => import("./components/menubar/index"));
const SignIn = React.lazy(() => import("./components/signin/index"));
const Home = React.lazy(() => import("./components/home/index"));
const Explore = React.lazy(() => import("./components/explore/index"));
const Profile = React.lazy(() => import("./components/profile/index"));
const Tweet = React.lazy(() => import("./components/tweet/index"));
const Likes = React.lazy(() => import("./components/tweet/likes"));
const Retweet = React.lazy(() => import("./components/tweet/retweets"));
const SideBar = React.lazy(() => import("./components/sidebar/index"));
const PageNotFound = React.lazy(() => import("./components/pageNotFound"));
import PrivateRoute from "./privateRoute";

const Routes = () => {
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch({ type: "SET_THEME", payload: "dark" });
  // }, []);
  const theme = useSelector((state) => state.theme);
  const withMenuBar = (WrappedComponent) => (props) => (
    <React.Fragment>
      <Row style={{ background: theme.bg }}>
        <Col lg={7} md={5} xs={5}>
          <MenuBar />
        </Col>
        <Col lg={9} md={19} xs={19}>
          <WrappedComponent />
        </Col>
        <Col lg={8} md={0} xs={0}>
          <SideBar />
        </Col>
      </Row>
    </React.Fragment>
  );

  const withLikeModal = (WrappedComponent) => (props) => (
    <React.Fragment>
      <Likes />
      <WrappedComponent />
    </React.Fragment>
  );

  const withRetweetModal = (WrappedComponent) => (props) => (
    <React.Fragment>
      <Retweet />
      <WrappedComponent />
    </React.Fragment>
  );

  const withOnlyMenuBar = (WrappedComponent) => (props) => (
    <Row>
      <Col md={7} xs={5}>
        <MenuBar />
      </Col>
      <Col md={17} xs={19}>
        <WrappedComponent />
      </Col>
    </Row>
  );

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={SignIn} homeAuthenticated />
        <PrivateRoute exact path="/home" component={withMenuBar(Home)} />
        <PrivateRoute path="/explore" component={withMenuBar(Explore)} />
        <PrivateRoute
          exact
          path="/profile/:username"
          component={withMenuBar(Profile)}
        />
        <PrivateRoute
          path="/profile/:username/:activity"
          component={withMenuBar(Profile)}
        />
        <PrivateRoute
          exact
          path="/:username/status/:tweetId"
          component={withMenuBar(Tweet)}
        />
        <PrivateRoute
          path="/:username/status/:tweetId/likes"
          component={withMenuBar(withLikeModal(Tweet))}
        />
        <PrivateRoute
          path="/:username/status/:tweetId/retweets"
          component={withMenuBar(withRetweetModal(Tweet))}
        />
        <Route component={withOnlyMenuBar(PageNotFound)} />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
