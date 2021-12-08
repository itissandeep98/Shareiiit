import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { fetchNotification } from "../../Store/ActionCreators/notification";

function Notification(props) {
  const { notification } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotification());
  }, []);
  return (
    <Dropdown item direction="left" icon="bell" simple>
      <Dropdown.Menu>
        <Dropdown.Item value={false}>asdas</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps)(Notification);
