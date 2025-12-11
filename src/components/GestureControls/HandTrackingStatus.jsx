import { motion } from 'framer-motion';
import { FaVideo, FaVideoSlash, FaHandPaper, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const HandTrackingStatus = ({ isTracking, isLoading, error, handState, scale }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-white text-sm font-semibold">Gesture Control</h3>
      
      <div className="space-y-2">
        {/* Camera Status */}
        <div className="flex items-center gap-2 px-3 py-2 bg-black-100/30 rounded-lg">
          {isLoading ? (
            <>
              <FaSpinner className="text-blue-400 animate-spin" />
              <span className="text-white text-sm">Initializing camera...</span>
            </>
          ) : isTracking ? (
            <>
              <FaVideo className="text-green-400" />
              <span className="text-white text-sm">Camera Active</span>
            </>
          ) : (
            <>
              <FaVideoSlash className="text-red-400" />
              <span className="text-white/60 text-sm">
                {error ? 'Camera Error' : 'Camera Inactive'}
              </span>
            </>
          )}
        </div>

        {/* Hand States */}
        {isTracking && (
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 py-2 bg-black-100/30 rounded-lg">
              <div className="flex items-center gap-2">
                <FaHandPaper className="text-blue-400" />
                <span className="text-white text-sm">Left Hand</span>
              </div>
              <span className="text-white/70 text-xs capitalize">{handState.left}</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-black-100/30 rounded-lg">
              <div className="flex items-center gap-2">
                <FaHandPaper className="text-purple-400" />
                <span className="text-white text-sm">Right Hand</span>
              </div>
              <span className="text-white/70 text-xs capitalize">{handState.right}</span>
            </div>
          </div>
        )}

        {/* Scale Display */}
        <div className="px-3 py-2 bg-black-100/30 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm">Scale</span>
            <span className="text-[#915EFF] text-sm font-semibold">
              {(scale * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-2 bg-tertiary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#915EFF] to-[#f272c8]"
              initial={{ width: `${scale * 100}%` }}
              animate={{ width: `${scale * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <FaExclamationTriangle className="text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-400 text-xs font-semibold mb-1">Error</p>
                <p className="text-red-300 text-xs leading-relaxed">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        {isTracking && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg"
          >
            <p className="text-blue-300 text-xs leading-relaxed">
              <strong>Tip:</strong> Spread your hands apart to increase scale, bring them together to decrease. Both hands must be visible.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HandTrackingStatus;

