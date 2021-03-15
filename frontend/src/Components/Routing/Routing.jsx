import React, { lazy, Suspense } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
// import PublicRoute from './PublicRoute';
// import PrivateRoute from './PrivateRoute';
import Loading from "../Loading";

const Home = lazy(() => import("../Home/Home"));
const Postings = lazy(() => import("../Postings/Postings"));
const TopHeader = lazy(() => import("../Navigation/TopHeader"));
const Create = lazy(() => import("../Posts/Create"));
const AuthComp = lazy(() => import("../Authorization/AuthComp"));

function Routing() {
  const routes = [
    {
      path: "/",
      component: () => <Home />,
    },
    {
      path: "/home",
      component: () => <Home />,
    },
    {
      path: "/posts",
      component: () => <Postings />,
    },
    {
      path: "/login",
      component: () => <AuthComp />,
    },
    {
      path: "/create",
      component: () => <Create />,
    },
  ];
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* <PublicRoute exact path="/" component={() => <AuthComp />} />
					<PrivateRoute exact path="/home" component={() => <Home />} /> */}

        {routes.map((route, index) => (
          <Route key={index} exact path={route.path}>
            <Layout>
              <route.component />
            </Layout>
          </Route>
        ))}
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}

function Layout(params) {
  const { children, ...props } = params;
  return (
    <>
      <TopHeader />
      {React.cloneElement(children, { ...props })}
    </>
  );
}
export default Routing;
