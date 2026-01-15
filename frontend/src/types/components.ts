export interface NotificationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  message: string;
  type: "success" | "error";
}
