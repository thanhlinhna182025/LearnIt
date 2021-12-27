import { Button } from "react-bootstrap";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

const ActionButton = ({ url, _id }) => {
  const { deletePost ,findPost, setShowUpdatePostModal} = useContext(PostContext);
  const choosePost = (postId)=>{
    findPost(postId);
    setShowUpdatePostModal(true)
  }
  return (
    <div>
      <Button className="post-button mr-1" href={url} target="_blank">
        <img src={playIcon} width="24" height="24" alt="play" />
      </Button>
      <Button className="post-button mr-1" onClick ={choosePost.bind(this,_id)}>
        <img src={editIcon} width="24" height="24" alt="edit" />
      </Button>
      <Button className="post-button mr-1" onClick={deletePost.bind(this, _id)}>
        <img src={deleteIcon} width="24" height="24" alt="delete" />
      </Button>
    </div>
  );
};

export default ActionButton;
