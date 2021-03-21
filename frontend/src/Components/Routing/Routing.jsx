import React, { lazy, Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Loading from "../Loading";

const Home = lazy(() => import("../Home/Home"));
const Feed = lazy(() => import("../Feed/Feed"));
const TopHeader = lazy(() => import("../Navigation/TopHeader"));
const AuthComp = lazy(() => import("../Authorization/AuthComp"));

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
      path: "/postings",
      private: true,
      layout: true,
      render: () => <Feed active="postings" />,
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
      path: "/",
      private: false,
      restricted: true,
      layout: false,
      render: () => <AuthComp />,
    },
  ];
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
}

function Layout(params) {
  const { children, layout, ...props } = params;
  return (
    <>
      {layout && <TopHeader />}
      {React.cloneElement(children, { ...props })}
    </>
  );
}
export default Routing;
