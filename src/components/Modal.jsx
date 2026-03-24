const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  )
}

export default Modal
