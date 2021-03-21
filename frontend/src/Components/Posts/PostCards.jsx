import { Button, Card, Icon } from "semantic-ui-react";

function PostCards(props) {
  const {
    id,
    body,
    book,
    category,
    created_by,
    is_request,
    title,
    votes,
  } = props;
  return (
    <Card fluid className=" h-100">
      <Card.Content header={title} />
      <Card.Content extra>{book?.author}</Card.Content>

      <Card.Content className="text-justify">{body}</Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {votes?.length} People Reacted to this post
      </Card.Content>
      <Card.Content extra>
        <div className="ui three buttons">
          <Button basic color="green">
            Interested
          </Button>
          <Button basic color="green">
            Upvote
          </Button>
          <Button basic color="red">
            Dismiss
          </Button>
        </div>
      </Card.Content>
      <Card.Content>{created_by}</Card.Content>
    </Card>
  );
}

export default PostCards;
