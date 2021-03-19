import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../checkAuth";

const updateChildrenWithProps = (props, children) =>
  React.Children.map(children, (child, i) => {
    return React.cloneElement(child, {
      ...props,
      index: i,
    });
  });

const PrivateRouteComponent = (props) => {
  return (
    <Route
      {...props.routeProps}
      render={(renderProps) => {
        if (!isLoggedIn()) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.computedMatch.url },
              }}
            />
          );
        }

        if (props.render) {
          return props.render({ match: props.computedMatch });
        }

        return (
          <div>{updateChildrenWithProps(renderProps, props.children)}</div>
        );
      }}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    logged_in: state?.auth?.key,
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(
  PrivateRouteComponent
);
