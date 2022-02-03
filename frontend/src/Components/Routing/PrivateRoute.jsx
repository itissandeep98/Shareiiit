import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const updateChildrenWithProps = (props, children) =>
	React.Children.map(children, (child, i) => {
		return React.cloneElement(child, {
			...props,
			index: i,
		});
	});

const PrivateRouteComponent = props => {
	return (
		<Route
			{...props.routeProps}
			render={renderProps => {
				if (!props.logged_in) {
					return (
						<Redirect
							to={{
								pathname: '/',
								state: { from: props.computedMatch.url },
							}}
						/>
					);
				}

				if (props.render) {
					return props.render({ match: props.computedMatch });
				}

				return <>{updateChildrenWithProps(renderProps, props.children)}</>;
			}}
		/>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		logged_in: state?.auth?.key,
		routeProps: {
			exact: ownProps.exact,
			path: ownProps.path,
			component: ownProps.component,
		},
	};
};

export default connect(mapStateToProps, null, null, { pure: false })(
	PrivateRouteComponent
);
