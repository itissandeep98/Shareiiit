import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";

const updateChildrenWithProps = (props, children) =>
  React.Children.map(children, (child, i) => {
    return React.cloneElement(child, {
      //this properties are available as a props in child components
      ...props,
      index: i,
    });
  });

const PublicRouteComponent = (props) => {
  if (props.render) {
    return props.render({ match: props.computedMatch });
  }
  return (
    <Route
      {...props.routeProps}
      render={(renderProps) =>
        props.logged_in && props.restricted ? (
          <Redirect to="/home"></Redirect>
        ) : (
          <div>{updateChildrenWithProps(renderProps, props.children)}</div>
        )
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    logged_in: state.auth?.user?.name,
  };
};

const PublicRoute = connect(mapStateToProps, null, null, { pure: false })(
  PublicRouteComponent
);
export default PublicRoute;
