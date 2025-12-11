import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCog, FaTimes, FaHandPaper, FaSpinner } from 'react-icons/fa';
import TemplateSelector from './TemplateSelector';
import ColorPicker from './ColorPicker';
import HandTrackingStatus from './HandTrackingStatus';
import useHandTracking from '../../hooks/useHandTracking';

const GestureControlPanel = ({
  template,
  onTemplateChange,
  color,
  onColorChange,
  scale: externalScale,
  onScaleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [enableGesture, setEnableGesture] = useState(false);

  const handleGestureUpdate = useCallback(
    (gestureData) => {
      if (onScaleChange && enableGesture) {
        onScaleChange(gestureData.scale);
      }
    },
    [onScaleChange, enableGesture]
  );

  const {
    isTracking,
    isLoading,
    error,
    scale: gestureScale,
    handState,
    stopTracking,
    startTracking,
  } = useHandTracking(enableGesture ? handleGestureUpdate : null);

  const currentScale = enableGesture && isTracking ? gestureScale : externalScale || 1.0;

  const handleToggleGesture = async () => {
    if (enableGesture) {
      stopTracking();
      setEnableGesture(false);
    } else {
      try {
        await startTracking();
        setEnableGesture(true);
      } catch (err) {
        console.error('Failed to start tracking:', err);
      }
    }
  };

  return (
    <>
      {/* Toggle Button - Moved to top-right to avoid overlap with scroll-to-top */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 w-14 h-14 bg-[#915EFF] rounded-full flex items-center justify-center shadow-lg hover:bg-[#a575ff] transition-colors z-[1001]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle particle controls"
      >
        <FaCog className="text-white text-xl" />
      </motion.button>

      {/* Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-black-100/95 backdrop-blur-md border-l border-white/10 shadow-2xl z-[1001] overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-bold">Particle Controls</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close panel"
                  >
                    <FaTimes className="text-white" />
                  </button>
                </div>

                {/* Template Selector */}
                <TemplateSelector
                  selectedTemplate={template}
                  onSelect={onTemplateChange}
                />

                {/* Color Picker */}
                <ColorPicker color={color} onChange={onColorChange} label="Particle Color" />

                {/* Gesture Control Toggle */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-sm font-semibold">Hand Gesture Control</h3>
                    <button
                      onClick={handleToggleGesture}
                      disabled={isLoading}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        enableGesture && isTracking
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                          : isLoading
                          ? 'bg-gray-500/20 text-gray-400 border border-gray-500/50 cursor-not-allowed'
                          : 'bg-black-100/50 text-white/70 border border-white/10 hover:border-[#915EFF]/50'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Starting...</span>
                        </>
                      ) : (
                        <>
                          <FaHandPaper className="inline" />
                          <span>{enableGesture && isTracking ? 'Active' : 'Enable'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Hand Tracking Status */}
                  {enableGesture && (
                    <HandTrackingStatus
                      isTracking={isTracking}
                      isLoading={isLoading}
                      error={error}
                      handState={handState}
                      scale={currentScale}
                    />
                  )}
                </div>

                {/* Manual Scale Control (Fallback) */}
                {(!enableGesture || !isTracking) && (
                  <div className="space-y-2">
                    <label className="text-white text-sm font-semibold block">
                      Scale: {(currentScale * 100).toFixed(0)}%
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={currentScale}
                      onChange={(e) => onScaleChange && onScaleChange(parseFloat(e.target.value))}
                      className="w-full h-2 bg-tertiary rounded-lg appearance-none cursor-pointer accent-[#915EFF]"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default GestureControlPanel;

