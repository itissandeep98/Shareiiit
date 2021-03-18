import React, { lazy, Suspense } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Loading from "../Loading";

const Home = lazy(() => import("../Home/Home"));
const Postings = lazy(() => import("../Postings/Postings"));
const TopHeader = lazy(() => import("../Navigation/TopHeader"));
const Create = lazy(() => import("../Posts/Create"));
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
      path: "/posts",
      private: true,
      layout: true,
      render: () => <Postings />,
    },
    {
      path: "/login",
      private: false,
      restricted: true,
      layout: false,
      render: () => <AuthComp />,
    },
    {
      path: "/create",
      private: true,
      layout: true,
      render: () => <Create />,
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
