import React, { useState } from "react";
import useFirebase from "../utilities/firebase";
import { serverTimestamp } from 'firebase/firestore';


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
    options: [{ text: '', votes: 0 }], // add question to option
    text: "",
    link: "",
    time: null
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
      options: [...formData.options, { text: '', votes: 0 }],
    });
  };

  const handlePollOptionChange = (index, value) => {
    const updatedOptions = formData.options.map((option, i) =>
      i === index ? { ...option, text: value } : option
    );
    setFormData({
      ...formData,
      options: updatedOptions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const completeFormData = {
      ...formData,
      time: serverTimestamp()
    };  

    addPostToGroup(groupId, completeFormData);
    
  };

  return (
    <div className="flex items-center justify-center bg-sky-900 border-2 border-cyan-100 text-cyan-100 font-bold py-2 px-3 text-base rounded" > 
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
            {formData.options.map((option, index) => (
              <div className="mb-3" key={index}>
                <input
                  className="form-control"
                  value={option.text}
                  onChange={(e) => handlePollOptionChange(index, e.target.value)}
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

        <button type="submit" className="bg-sky-900 border-2 border-cyan-100 hover:border-cyan-100 hover:bg-cyan-100 text-cyan-100 hover:text-sky-900 font-bold py-2 px-3 text-base rounded" onClick={closeModal}>
          Send to Group
        </button>

      </form>
    </div>
  );
};

export default NewPost;
