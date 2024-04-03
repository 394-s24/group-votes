import { useState } from 'react';
import Modal from './Modal'; // Modal component
import NewPost from './NewPost'; // NewPost component

const PostButton = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div>
      {/* Button to trigger modal for new post creation */}
      {!open && <button className="btn btn-primary" onClick={openModal}>+ Post</button>}
      
      {/* Modal dialog for NewPost component */}
      <Modal open={open} close={closeModal}>
        <NewPost groupId="testGroupID" userID="testUserID" />
      </Modal>
    </div>
  );
};

export default PostButton;
