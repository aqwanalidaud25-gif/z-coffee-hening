import Button from "./Button";
import Modal from "./Modal";

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmLabel = "Hapus", cancelLabel = "Batal" }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-sm leading-6 text-stone-600">{description}</p>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
