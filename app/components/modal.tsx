import { ReactNode, MouseEvent } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  reserved: number[];
}

export default function Modal({
  isVisible,
  onClose,
  children,
  reserved,
}: ModalProps) {
  if (!isVisible) {
    return null;
  }

  const handleClose = (e: MouseEvent) => {
    const target = e.target as Element;
    if (target.id === "wrapper") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-20"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-black bg-opacity-25 absolute inset-0"></div>
        <div className="bg-yellow-300 p-2 bg-opacity-25 rounded max-w-md w-full overflow-auto">
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
}
