import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = () => {
  //context
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);
  //state
  const [updateAnPost, setUpdateAnPost] = useState(post);
  useEffect(() => setUpdateAnPost(post), [post]);
  const { title, desc, url, status } = updateAnPost;
  const onChangeUpdatePostForm = (event) => {
    setUpdateAnPost({
      ...updateAnPost,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updateAnPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };
  const closeDialog = () => {
    setShowUpdatePostModal(false);
    setUpdateAnPost(post);
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making process ?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={onChangeUpdatePostForm}
              required
              placeholder="title"
              aria-describedby="title-help"
            />
            <Form.Text id="title-help" muted>
              Require
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              name="desc"
              value={desc}
              onChange={onChangeUpdatePostForm}
              row={3}
              placeholder="desc"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="url"
              placeholder="url"
              value={url}
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group className="mb-3" muted>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatePostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            CANCEL
          </Button>
          <Button variant="primary" type="submit">
            ACCEPT
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
