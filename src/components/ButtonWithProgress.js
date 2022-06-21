const ButtonWithProgress = (props) => {
  return (
    <button
      className={props.className || "btn btn-primary"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.pendingApiCall && (
        <div
          className="spinner-border text-light spinner-border-sm me-sm-1"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {props.text}
    </button>
  );
};

export default ButtonWithProgress;
