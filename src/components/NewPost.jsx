import React, { useState } from "react";
import useFirebase from "../utilities/firebase";

const NewPost = ({ groupId, userID, closeModal }) => {
  const { addPostToGroup } = useFirebase();
  const [postType, setPostType] = useState("Event");
  const [formData, setFormData] = useState({
    author: userID,
    postType: postType,
    eventName: "",
    eventStart: "",
    eventEnd: "",
    eventLocation: "",
    description: "",
    question: "",
    options: ["", ""], // add question to option
    text: "",
    link: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "postType") {
      setPostType(value);
      // TODO: reset formData
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addPollOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, ""],
    });
  };

  const handlePollOptionChange = (index, value) => {
    const updatedOptions = formData.options.map((option, i) =>
      i === index ? value : option
    );
    setFormData({
      ...formData,
      options: updatedOptions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPostToGroup(groupId, formData);
  };

  return (
    <div className="flex items-center justify-center bg-slate-50 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className=" container w-full max-w-4xl mx-4 md:mx-8 p-6"
      >
        <div className="mb-3">
          <label htmlFor="postType" className="form-label">
            Post Type:
          </label>
          <select
            id="postType"
            className="form-select"
            value={postType}
            name="postType"
            onChange={handleInputChange}
          >
            <option value="Event">Event</option>
            <option value="Vote">Vote</option>
            <option value="Poll">Poll</option>
            <option value="Reminder">Reminder</option>
          </select>
        </div>

        {postType === "Event" && (
          <>
            <div className="mb-3">
              <input
                className="form-control"
                name="eventName"
                placeholder="Event Name"
                value={formData.eventName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="datetime-local"
                className="form-control"
                name="eventStart"
                placeholder="Event Start"
                value={formData.eventStart}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="datetime-local"
                className="form-control"
                name="eventEnd"
                placeholder="Event End"
                value={formData.eventEnd}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                name="eventLocation"
                placeholder="Event Location"
                value={formData.eventLocation}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                name="link"
                placeholder="Link"
                value={formData.link}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {postType === "Vote" && (
          <>
            <div className="mb-3">
              <input
                className="form-control"
                name="question"
                placeholder="Question"
                value={formData.question}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                name="link"
                placeholder="Link"
                value={formData.link}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {postType === "Poll" && (
          <>
            {formData.options.map((option, index) => (
              <div className="mb-3" key={index}>
                <input
                  className="form-control"
                  value={option}
                  onChange={(e) =>
                    handlePollOptionChange(index, e.target.value)
                  }
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addPollOption}
              >
                Add Option
              </button>
            </div>
          </>
        )}

        {postType === "Reminder" && (
          <>
            <div className="mb-3">
              <textarea
                className="form-control"
                name="text"
                placeholder="Text"
                value={formData.text}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                name="link"
                placeholder="Link"
                value={formData.link}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary" onClick={closeModal}>
          Send to Group
        </button>
      </form>
    </div>
  );
};

export default NewPost;
