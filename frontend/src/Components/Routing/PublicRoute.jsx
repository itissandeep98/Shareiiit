import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const updateChildrenWithProps = (props, children) =>
	React.Children.map(children, (child, i) => {
		return React.cloneElement(child, {
			//this properties are available as a props in child components
			...props,
			index: i,
		});
	});

const PublicRouteComponent = props => {
	if (props.render) {
		return props.render({ match: props.computedMatch });
	}
	return (
		<Route
			{...props.routeProps}
			render={renderProps =>
				props.logged_in && props.restricted ? (
					<Redirect to="/feed"></Redirect>
				) : (
					<div>{updateChildrenWithProps(renderProps, props.children)}</div>
				)
			}
		/>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		logged_in: state.auth?.key,
	};
};

const PublicRoute = connect(mapStateToProps, null, null, { pure: false })(
	PublicRouteComponent
);
export default PublicRoute;
