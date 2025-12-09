import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, children, maxWidth = "max-w-4xl" }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus trap - focus on modal when it opens
      const modalContent = document.querySelector('[data-modal-content]');
      if (modalContent) {
        modalContent.focus();
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className={`w-full ${maxWidth} max-h-[90vh] overflow-y-auto bg-tertiary rounded-2xl shadow-2xl border border-[#915EFF]/30 pointer-events-auto relative`}
              data-modal-content
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              style={{ willChange: "transform, opacity" }}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;

