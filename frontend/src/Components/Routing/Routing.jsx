import React, { lazy, Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Loading from "../Loading";
import TopHeader from "../Navigation/TopHeader";

const Home = lazy(() => import("../Home/Home"));
const Feed = lazy(() => import("../Feed/Feed"));
const AuthComp = lazy(() => import("../Authorization/AuthComp"));
const Profile = lazy(() => import("../Profile/Profile"));
const PostDetail = lazy(() => import("../Posts/PostDetail"));

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
      path: "/profile",
      private: true,
      layout: true,
      render: () => <Profile />,
    },
    {
      path: "/feed",
      private: true,
      layout: true,
      render: () => <Feed active="feed" />,
    },
    {
      path: "/create",
      private: true,
      layout: true,
      render: () => <Feed active="create" />,
    },
    {
      path: "/interest",
      private: true,
      layout: true,
      render: () => <Feed active="interest" />,
    },
    {
      path: "/myposts",
      private: true,
      layout: true,
      render: () => <Feed active="myposts" />,
    },
    {
      path: "/login",
      private: false,
      restricted: true,
      layout: false,
      render: () => <AuthComp right="login" />,
    },
    {
      path: "/register",
      private: false,
      restricted: true,
      layout: false,
      render: () => <AuthComp right="register" />,
    },
    {
      path: "/posts/:postId",
      private: true,
      layout: true,
      render: (props) => (
        <PostDetail key={props.match.params.postId} {...props} />
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
