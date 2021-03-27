import { Search } from "semantic-ui-react";

function SearchBar() {
  return (
    <Search
      category
      placeholder="Search for some post"
      maxLength={50}
      size="small"
      input={{ fluid: true }}
    />
  );
}

export default SearchBar;
