import { useEffect, useRef } from "react";

const DropDown = ({ open, onClose, children, triggerRef }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose, triggerRef]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-50 w-62 flex flex-col gap-1 p-2 top-[calc(100%+15px)] end-0 bg-bg-clr shadow-lg shadow-main-clr/50 rounded-lg overflow-hidden transform transition-all duration-200 ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
};

export default DropDown;
