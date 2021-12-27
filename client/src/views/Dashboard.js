import { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import {
  Spinner,
  Card,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Toast,
} from "react-bootstrap";
import SinglePost from "../components/post/SinglePost";
import AddPostModal from "../components/post/AddPostModal";
import UpdatePostModal from "../components/post/UpdatePostModal";
import AddIcon from "../assets/plus-circle-fill.svg";

const Dashboard = () => {
  //Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    postState: { post, posts, postLoading },
    getPost,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);
  //Start get post
  useEffect(() => getPost(), []);
  //Posts
  let body = null;
  if (postLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <div>
        <Card style={{ width: "100%" }} className="text-center">
          <Card.Header>Hi {username} </Card.Header>
          <Card.Body>
            <Card.Title>Wellcome to learnIt</Card.Title>
            <Card.Text>Click button below to track skill to learn</Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddPostModal.bind(this, true)}
            >
              Add Your Skill
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    body = (
      <div>
        <Row className="row-cols-1 row-cols-md-3 g-4 mt-3 ">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add new Skill</Tooltip>}
        >
          <Button
            className="btn-floating"
            variant="primary"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={AddIcon} width="24" height="24" />
          </Button>
        </OverlayTrigger>
      </div>
    );
  }
  return (
    <div>
      {body}
      <AddPostModal />
      {post ? <UpdatePostModal /> : null}
      {/* After post is added */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          type: null,
          message: "",
        })}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">CONGRATULATIONS</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Dashboard;
