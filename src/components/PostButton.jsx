import { useEffect, useState } from "react";
import Modal from "./Modal"; // Modal component
import NewPost from "./NewPost"; // NewPost component

const PostButton = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ensure the modal is open and the click is not on the modal trigger button
      if (open && !event.target.closest(".btn-primary")) {
        closeModal();
      }
    };

    // Effect for handling the Escape key press
    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapePress);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [open]);
  return (
    <div>
      {/* Button to trigger modal for new post creation */}
      {!open && (
        <button className="btn btn-primary" onClick={openModal}>
          + Post
        </button>
      )}

      {/* Modal dialog for NewPost component */}
      <Modal open={open} close={closeModal}>
        <NewPost groupId="testGroupID" userID="testUserID" />
      </Modal>
    </div>
  );
};

export default PostButton;
