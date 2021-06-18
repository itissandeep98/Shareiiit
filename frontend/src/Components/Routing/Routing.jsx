import React, { lazy, Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Loading from "../Loading";
import TopHeader from "../Navigation/TopHeader";

const Home = lazy(() => import("../Home/Home"));
const Feed = lazy(() => import("../Feed/Feed"));
const AuthComp = lazy(() => import("../Authorization/AuthComp"));
const ProfileSettings = lazy(() => import("../ProfileSettings/Profile"));
const Profile = lazy(() => import("../Profile/Profile"));
const PostDetail = lazy(() => import("../Posts/PostDetail"));
const MyPosts = lazy(() => import("../Interests/MyPosts/MyPosts"));
const Interactions = lazy(() =>
  import("../Interests/Interactions/Interactions")
);
const Technical = lazy(() => import("../Technical/Technical"));

// private => Route requires authentication
// layout => header should be visible or not
// restricted => authenticated user cannot visit login type restriction

function Routing() {
  const routes = [
    {
      path: "/home",
      private: true,
      layout: true,
      render: () => <Home />,
    },
    {
      path: "/profile/myposts",
      private: true,
      layout: true,
      render: () => <MyPosts />,
    },
    {
      path: "/profile/interactions",
      private: true,
      layout: true,
      render: () => <Interactions />,
    },
    {
      path: "/profile",
      private: true,
      layout: true,
      render: () => <ProfileSettings />,
    },
    {
      path: "/feed",
      private: true,
      layout: true,
      render: () => <Feed />,
    },
    {
      path: "/technical",
      private: true,
      layout: true,
      render: () => <Technical />,
    },
    {
      path: "/login",
      private: false,
      restricted: true,
      layout: false,
      render: () => <AuthComp />,
    },
    // {
    //   path: "/register",
    //   private: false,
    //   restricted: true,
    //   layout: false,
    //   render: () => <AuthComp right="register" />,
    // },
    {
      path: "/posts/:postId",
      private: true,
      layout: true,
      render: (props) => (
        <PostDetail key={props.match.params.postId} {...props} />
      ),
    },
    {
      path: "/:user",
      private: true,
      layout: true,
      render: (props) => (
        <Profile key={props.match.params.username} {...props} />
      ),
    },
    {
      path: "/",
      private: false,
      restricted: true,
      layout: false,
      render: () => <AuthComp />,
    },
  ];
  return (
    <Switch>
      {routes.map((route, index) =>
        route.private ? (
          <PrivateRoute
            restricted={route.restricted}
            key={index}
            exact
            path={route.path}
          >
            <Layout layout={route.layout}>
              <route.render />
            </Layout>
          </PrivateRoute>
        ) : (
          <PublicRoute
            restricted={route.restricted}
            exact
            path={route.path}
            key={index}
          >
            <Layout layout={route.layout}>
              <route.render />
            </Layout>
          </PublicRoute>
        )
      )}
      <Redirect to="/" />
    </Switch>
  );
}

function Layout(params) {
  const { children, layout, ...props } = params;
  return (
    <>
      <div>
        {layout && <TopHeader />}
        <Suspense fallback={<Loading />}>
          {React.cloneElement(children, { ...props })}
        </Suspense>
      </div>
      {layout && (
        <footer className="text-center bg-dark p-3 text-white">
          Copyright © 2021 IIITD | All rights reserved
        </footer>
      )}
    </>
  );
}
export default Routing;
