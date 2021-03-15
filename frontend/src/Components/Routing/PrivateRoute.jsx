import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteComponent = ({
  component: Component,
  logged_in,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        logged_in ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    logged_in: state.auth.user.name,
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(
  PrivateRouteComponent
);
