import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Image, Placeholder } from "semantic-ui-react";
import { fetchPostDetails } from "../../Store/ActionCreators/post";

function TechDetails(props) {
  const id = props.match.params.id;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetails(id)).then((res) => {
      setDetails(res);
      setLoading(false);
    });
  }, [dispatch]);
  return (
    <Container className="shadow p-3 mt-4">
      <Row>
        <Col>
          {loading ? (
            <Placeholder style={{ height: 150, width: 150 }}>
              <Placeholder.Image />
            </Placeholder>
          ) : (
            <Image
              src={process.env.PUBLIC_URL + "/assets/images/skill.svg"}
              fluid
            />
          )}
        </Col>
        <Col xs={9}>
          {loading ? (
            <Placeholder fluid>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          ) : (
            <>
              <h2 className="text-capitalize text-center">{details.title}</h2>
              <p className="text-muted float-right">
                <NavLink to={`/${details.created_by}`}>
                  - {details.created_by}
                </NavLink>
              </p>
              <Row className="mt-5">
                <Col className="text-justify">{details.description}</Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default TechDetails;
