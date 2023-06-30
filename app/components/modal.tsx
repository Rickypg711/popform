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
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center my-24 mx-3 z-20"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-full max-w-md">
        {/* <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          x
        </button> */}
        <div className="bg-yellow-300 backdrop-blur-sm p-2 bg-opacity-25 rounded">
          {children}
        </div>
      </div>
    </div>
  );
}
