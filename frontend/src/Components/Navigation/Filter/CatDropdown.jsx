import { Dropdown, Icon } from "semantic-ui-react";

function CatDropdown(props) {
  const { category, changeCategory } = props;
  return (
    <Dropdown
      item
      direction="right"
      icon={<Icon name="chevron down" />}
      text={category}
      className="border bg-white p-2  shadow-sm mb-3"
      simple
    >
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeCategory("All")}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => changeCategory("Books")}>
          Books
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeCategory("Electronics")}>
          Electronic Items
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeCategory("Groups")}>
          Groups
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeCategory("Other")}>
          Other
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CatDropdown;
