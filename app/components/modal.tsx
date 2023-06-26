import { Children, ReactNode, MouseEvent } from "react";

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
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          x
        </button>
        <div className="bg-white p-2 round">{children}</div>
      </div>
    </div>
  );
}
