import { Card, Row, Col, Badge } from "react-bootstrap";
import ActionButton from "./ActionButton";

const SinglePost = ({ post: { _id, title, url, desc, status } }) => {
  return (
    <Card
      className="shadow"
      border={
        status === "TO LEARN"
          ? "success"
          : status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                bg={
                  status === "TO LEARN"
                    ? "success"
                    : status === "LEARNING"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButton url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{desc}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
