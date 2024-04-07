import "./Modal.css";

// https://codebuckets.com/2021/08/08/bootstrap-modal-dialog-in-react-without-jquery/

const Modal = ({ children, open, close }) => (
  <div
    className={`${
      open
        ? "modal-show fixed inset-0 z-50 flex  items-center justify-center bg-gray-600 bg-opacity-50"
        : "hidden"
    }`}
    tabIndex="-1"
    role="dialog"
    onClick={(evt) => {
      if (evt.target === evt.currentTarget) close();
    }}
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          {/* <button
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ position: "relative", top: "10px", left: "-10px" }}
            onClick={close}
          /> */}
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

export default Modal;
