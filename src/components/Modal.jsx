// src/components/Modal.jsx
import './Modal.css';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  const onBgClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-bg" onClick={onBgClick}>
      <div className="modal">
        <div className="modal__head">
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close" onClick={onClose} aria-label="Закрыть">×</button>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
}
