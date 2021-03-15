import { Button, Card, Icon } from "semantic-ui-react";

function PostCards() {
  return (
    <Card fluid>
      <Card.Content header="Does anyone have X" />
      <Card.Content className="text-justify">
        Lorem ipsum dolor sit amet, consectetur commodo consequat. cupidatat non
        proident, sunt in culpa qui officia deserunttat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />4 People need this
      </Card.Content>
      <Card.Content extra>
        <div className="ui three buttons">
          <Button basic color="green">
            I can Help
          </Button>
          <Button basic color="green">
            I need this
          </Button>
          <Button basic color="red">
            Dismiss
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

export default PostCards;
