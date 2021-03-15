import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Search } from "semantic-ui-react";

class SearchBar extends Component {
  render() {
    var users = this.props.result?.result?.users;
    if (users) {
      users = users.map((user) => ({
        description: user.first_name + " " + user.last_name,
        image: user.profile_pic,
        title: user.username,
        onClick: () => {
          this.props.history.push(`/${user.username}`);
          window.location.reload();
        },
      }));
      users = { results: users, name: "Users" };
    }

    var creator = this.props.result?.result?.creator;
    if (creator) {
      creator = creator.map((user) => ({
        description: user.first_name + " " + user.last_name,
        image: user.profile_pic,
        title: user.username,
        onClick: () => this.props.history.push(`/${user.username}`),
      }));
      creator = { results: creator, name: "Creators" };
    }

    var commissions = this.props.result?.result?.commissions;
    if (commissions) {
      commissions = commissions.map((work) => ({
        description: work.description,
        image: work.image,
        title: work.title,
        onClick: () => {
          this.props.history.push(`/${work.username}/commissions`);
          window.location.reload();
        },
      }));
      commissions = { results: commissions, name: "Commissions" };
    }
    // const handleSearchChange = (e, data) => {
    // 	const query = {
    // 		q: data.value,
    // 	};
    // 	this.props.search(query);
    // };

    var results = {};

    if (users && users?.results?.length > 0) {
      results = { users };
    }
    if (creator && creator?.results?.length > 0) {
      results = { ...results, creator };
    }
    if (commissions && commissions?.results?.length > 0) {
      results = { ...results, commissions };
    }

    return (
      <Search
        category
        // loading={this.props.result.isLoading}
        // onSearchChange={handleSearchChange}
        results={results}
        size="small"
        input={{ fluid: true }}
      />
    );
  }
}
const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
);
