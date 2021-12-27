import React, { lazy, Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Loading from "../Loading";
import TopHeader from "../Navigation/TopHeader";
import TechDetails from "../Technical/TechDetails";
import Meta from "../Meta";
import GroupDetails from "../Posts/GroupDetails";

// const Home = lazy(() => import("../Home"));
const Feed = lazy(() => import("../Feed"));
const Notification = lazy(() => import("../Notification"));
const AuthComp = lazy(() => import("../Authorization"));
const ProfileSettings = lazy(() => import("../ProfileSettings"));
const Profile = lazy(() => import("../Profile"));
const PostDetail = lazy(() => import("../Posts/PostDetail"));
const MyPosts = lazy(() => import("../Interests/MyPosts"));
const Interactions = lazy(() => import("../Interests/MyActivity"));
const Technical = lazy(() => import("../Technical"));
const LandingPage = lazy(() => import("../LandingPage"));

// private => Route requires authentication
// layout => header should be visible or not
// restricted => authenticated user cannot visit login type restriction

function Routing() {
	const routes = [
		// {
		// 	path: "/home",
		// 	private: true,
		// 	layout: true,
		// 	render: () => <Home />,
		// },
		{
			path: "/profile/myposts",
			private: true,
			layout: true,
			render: () => <MyPosts />,
		},
		{
			path: "/profile/myactivity",
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
			path: "/notification",
			private: true,
			layout: true,
			render: () => <Notification page />,
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
		{
			path: "/posts/group/:postId",
			private: true,
			layout: true,
			render: (props) => (
				<GroupDetails key={props.match.params.postId} {...props} />
			),
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
			path: "/tech/:id",
			private: true,
			layout: true,
			render: (props) => <TechDetails key={props.match.params.id} {...props} />,
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
			render: () => <LandingPage />,
		},
	];
	return (
		<>
			<Meta />
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
		</>
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
