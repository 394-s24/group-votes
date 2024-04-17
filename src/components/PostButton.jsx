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
    const body = document.body;
    if (open) {
      body.classList.add("blur-background");
      document.addEventListener("keydown", handleEscapePress);
    }

    return () => {
      body.classList.remove("blur-background");
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [open]);


  return (
    <div>
      {/* Button to trigger modal for new post creation */}
      {!open && (
        <button className="bg-sky-900 border-2 border-cyan-100 hover:border-sky-900 hover:bg-cyan-100 text-cyan-100 hover:text-sky-900 font-bold py-2 px-3 text-base rounded" onClick={openModal}>
          + Post
        </button>
      )}

      {/* Modal dialog for NewPost component */}
      <Modal open={open} close={closeModal}>
        <NewPost groupId="testGroupID" userID="testUserID" closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default PostButton;
