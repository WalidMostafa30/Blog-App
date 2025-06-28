import { useEffect, useRef, useState } from "react";

const DropDown = ({ onClose, children }) => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Show dropdown with animation
    setTimeout(() => setVisible(true), 10);

    // Close on outside click
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200); // match the duration in Tailwind below
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-40 w-62 flex flex-col gap-1 p-2 top-[calc(100%+15px)] end-0 bg-bg-clr shadow-lg shadow-main-clr/50 rounded-lg overflow-hidden transform transition-all duration-200 ${
        visible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
};

export default DropDown;
