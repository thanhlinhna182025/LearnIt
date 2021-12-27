import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  //context
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);
  //state
  const [newPost, setNewPost] = useState({
    title: "",
    desc: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, desc, url } = newPost;
  const onChangeNewpostForm = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };
  const closeDialog = () => {
    setShowAddPostModal(false);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostModal();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "error",
    });
  };
  const resetAddPostModal = () => {
    setNewPost({ title: "", desc: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);
  };
  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you learn ?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={onChangeNewpostForm}
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
              onChange={onChangeNewpostForm}
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
              onChange={onChangeNewpostForm}
            />
          </Form.Group>
          <Form.Group className="mb-3" muted>
            <Form.Select>
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            CANCEL
          </Button>
          <Button variant="primary" type="submit">
            ADD
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
