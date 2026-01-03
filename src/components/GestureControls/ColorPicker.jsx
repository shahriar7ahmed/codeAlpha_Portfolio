import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion, AnimatePresence } from 'framer-motion';

const ColorPicker = ({ color, onChange, label = 'Color' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-black-100/50 backdrop-blur-sm rounded-lg border border-white/10 hover:border-[#915EFF]/50 transition-colors"
        aria-label={`${label} picker`}
      >
        <div
          className="w-6 h-6 rounded-full border-2 border-white/30"
          style={{ backgroundColor: color }}
        />
        <span className="text-white text-sm">{label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-full left-0 mb-2 p-4 bg-black-100/95 backdrop-blur-md rounded-lg border border-white/10 shadow-2xl z-[1001]"
            >
              <HexColorPicker color={color} onChange={onChange} />
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="flex-1 px-2 py-1 bg-tertiary rounded text-white text-sm"
                  placeholder="#ffffff"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 bg-[#915EFF] text-white rounded text-sm hover:bg-[#a575ff] transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;

