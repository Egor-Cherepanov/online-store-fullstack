import "./confirm-modal.scss"

interface ConfirmModalProps {
  handleDelete: () => void
  message: string
  setShowConfirmModal: (show: boolean) => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  handleDelete,
  message,
  setShowConfirmModal,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={handleDelete} className="confirm-btn">
            Да
          </button>
          <button
            onClick={() => setShowConfirmModal(false)}
            className="cancel-btn"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  )
}
