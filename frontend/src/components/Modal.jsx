const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
