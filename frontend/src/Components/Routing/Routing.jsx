import React, { lazy, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import Loading from '../Loading';
import Meta from '../Meta';
import TopHeader from '../Navigation/TopHeader';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// const Home = lazy(() => import("../Home"));
const Feed = lazy(() => import('../Feed'));
const Discover = lazy(() => import('../Discover'));
const Notification = lazy(() => import('../Notification'));
const AuthComp = lazy(() => import('../Authorization'));
const ProfileSettings = lazy(() => import('../Settings'));
const Profile = lazy(() => import('../Profile'));
const PostDetail = lazy(() => import('../Posts/Details/PostDetail'));
const Following = lazy(() => import('../Settings/Following'));
const MyPosts = lazy(() => import('../Settings/Interests/MyPosts'));
const Interactions = lazy(() => import('../Settings/Interests/MyActivity'));
const Technical = lazy(() => import('../Technical'));
const LandingPage = lazy(() => import('../LandingPage'));
const GroupDetails = lazy(() => import('../Posts/Details/GroupDetails'));
const ElectronicDetails = lazy(() =>
	import('../Posts/Details/ElectronicDetails')
);
const OtherDetails = lazy(() => import('../Posts/Details/OtherDetail'));
const TechDetails = lazy(() => import('../Technical/TechDetails'));

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
			path: '/profile/myposts/books',
			private: true,
			layout: true,
			render: () => <MyPosts active={0} />,
		},
		{
			path: '/profile/myposts/electronics',
			private: true,
			layout: true,
			render: () => <MyPosts active={1} />,
		},
		{
			path: '/profile/myposts/groups',
			private: true,
			layout: true,
			render: () => <MyPosts active={2} />,
		},
		{
			path: '/profile/myposts/others',
			private: true,
			layout: true,
			render: () => <MyPosts active={3} />,
		},
		{
			path: '/profile/myposts',
			private: true,
			layout: true,
			render: () => <MyPosts />,
		},
		{
			path: '/profile/myactivity',
			private: true,
			layout: true,
			render: () => <Interactions />,
		},
		{
			path: '/profile/following',
			private: true,
			layout: true,
			render: () => <Following />,
		},
		{
			path: '/profile',
			private: true,
			layout: true,
			render: () => <ProfileSettings />,
		},
		{
			path: '/feed',
			private: true,
			layout: true,
			render: () => <Feed />,
		},
		{
			path: '/discover',
			private: true,
			layout: true,
			render: () => <Discover />,
		},
		{
			path: '/notification',
			private: true,
			layout: true,
			render: () => <Notification page />,
		},
		{
			path: '/technical',
			private: true,
			layout: true,
			render: () => <Technical />,
		},
		{
			path: '/login',
			private: false,
			restricted: true,
			layout: false,
			render: () => <AuthComp />,
		},
		{
			path: '/posts/group/:postId',
			private: true,
			layout: true,
			render: props => (
				<GroupDetails key={props.match.params.postId} {...props} />
			),
		},
		{
			path: '/posts/electronic/:postId',
			private: true,
			layout: true,
			render: props => (
				<ElectronicDetails key={props.match.params.postId} {...props} />
			),
		},
		{
			path: '/posts/other/:postId',
			private: true,
			layout: true,
			render: props => (
				<OtherDetails key={props.match.params.postId} {...props} />
			),
		},
		{
			path: '/posts/book/:postId',
			private: true,
			layout: true,
			render: props => (
				<PostDetail key={props.match.params.postId} {...props} />
			),
		},
		{
			path: '/posts/:postId',
			private: true,
			layout: true,
			render: props => (
				<PostDetail key={props.match.params.postId} {...props} />
			),
		},

		{
			path: '/skill/:id',
			private: true,
			layout: true,
			render: props => <TechDetails key={props.match.params.id} {...props} />,
		},
		{
			path: '/:user',
			private: true,
			layout: true,
			render: props => <Profile key={props.match.params.username} {...props} />,
		},
		{
			path: '/',
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
							path={route.path}>
							<Layout layout={route.layout}>
								<route.render />
							</Layout>
						</PrivateRoute>
					) : (
						<PublicRoute
							restricted={route.restricted}
							exact
							path={route.path}
							key={index}>
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
					Copyright © 2021 IIITD | All rights reserved | Built by{' '}
					<a href="https://github.com/itissandeep98" target="_blank">
						Sandeep
					</a>{' '}
					and{' '}
					<a href="https://github.com/gupta-anmol" target="_blank">
						Anmol
					</a>
				</footer>
			)}
		</>
	);
}
export default Routing;
