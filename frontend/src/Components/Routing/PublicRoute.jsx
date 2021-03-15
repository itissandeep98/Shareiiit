import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PublicRouteComponent = ({ component: Component, logged_in, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !logged_in ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    logged_in: state.auth.user.name,
  };
};

const PublicRoute = connect(mapStateToProps, null, null, { pure: false })(
  PublicRouteComponent
);
export default PublicRoute;
