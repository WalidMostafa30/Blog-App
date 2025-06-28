import { useEffect, useState } from "react";

const ModalContainer = ({ onClose, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show animation after mount
    setTimeout(() => setVisible(true), 10);

    // Push a new history entry
    window.history.pushState({ isImageModal: true }, "");

    // Listen to browser back button
    const handlePopState = () => {
      handleClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);

      // Go back if modal closed manually
      if (window.history.state?.isImageModal) {
        window.history.back();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default ModalContainer;
