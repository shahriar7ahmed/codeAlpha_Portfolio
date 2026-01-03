import { useState, useEffect, useRef, useCallback } from 'react';
import { Hands } from '@mediapipe/hands';

const useHandTracking = (onGestureUpdate) => {
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [handState, setHandState] = useState({ left: 'unknown', right: 'unknown' });
  
  const handsRef = useRef(null);
  const videoRef = useRef(null);
  const isProcessingRef = useRef(false);
  const lastScaleRef = useRef(1.0);
  const initializationRef = useRef(false);

  // Calculate distance between two 3D points
  const calculateDistance = (point1, point2) => {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    const dz = point1.z - point2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  // Detect if hand is open or closed
  const detectHandState = (landmarks) => {
    if (!landmarks || landmarks.length < 21) return 'unknown';

    // Get key points
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    // Calculate distances from finger tips to wrist
    const distances = [
      calculateDistance(thumbTip, wrist),
      calculateDistance(indexTip, wrist),
      calculateDistance(middleTip, wrist),
      calculateDistance(ringTip, wrist),
      calculateDistance(pinkyTip, wrist),
    ];

    // Average distance
    const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
    
    // Threshold: if average distance is large, hand is open
    return avgDistance > 0.15 ? 'open' : 'closed';
  };

  // Process hand detection results
  const onResults = useCallback((results) => {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      setHandState({ left: 'unknown', right: 'unknown' });
      // Reset to default scale when no hands detected
      const newScale = lastScaleRef.current + (1.0 - lastScaleRef.current) * 0.05;
      lastScaleRef.current = newScale;
      setScale(newScale);
      return;
    }

    let leftHand = null;
    let rightHand = null;
    let leftPalm = null;
    let rightPalm = null;

    results.multiHandLandmarks.forEach((landmarks, index) => {
      const handedness = results.multiHandedness[index];
      const isLeft = handedness.label === 'Left';
      
      // Get palm position (wrist landmark)
      const palm = landmarks[0];
      
      if (isLeft) {
        leftHand = landmarks;
        leftPalm = palm;
        setHandState(prev => ({ ...prev, left: detectHandState(landmarks) }));
      } else {
        rightHand = landmarks;
        rightPalm = palm;
        setHandState(prev => ({ ...prev, right: detectHandState(landmarks) }));
      }
    });

    // Calculate scale based on distance between palms
    if (leftPalm && rightPalm) {
      const distance = calculateDistance(leftPalm, rightPalm);
      
      // Normalize distance to scale (0.5 to 2.0)
      // Base distance is around 0.2-0.4 for normal hand spread
      const normalizedScale = Math.max(0.5, Math.min(2.0, (distance / 0.3) * 1.5));
      
      // Smooth the scale change
      const smoothedScale = lastScaleRef.current + (normalizedScale - lastScaleRef.current) * 0.1;
      lastScaleRef.current = smoothedScale;
      setScale(smoothedScale);

      // Callback with gesture data
      if (onGestureUpdate) {
        onGestureUpdate({
          scale: smoothedScale,
          handState: {
            left: leftHand ? detectHandState(leftHand) : 'unknown',
            right: rightHand ? detectHandState(rightHand) : 'unknown',
          },
          hasBothHands: true,
        });
      }
    } else {
      // Single hand or no hands - reset to default scale
      const newScale = lastScaleRef.current + (1.0 - lastScaleRef.current) * 0.05;
      lastScaleRef.current = newScale;
      setScale(newScale);
    }
  }, [onGestureUpdate]);

  // Initialize MediaPipe Hands model (only once)
  useEffect(() => {
    if (typeof window === 'undefined' || initializationRef.current) return;

    const initializeHandTracking = async () => {
      try {
        console.log('Initializing MediaPipe Hands...');
        const hands = new Hands({
          locateFile: (file) => {
            // Use version-pinned CDN URL for reliability
            const baseUrl = `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/`;
            console.log(`Loading MediaPipe file: ${file}`);
            return `${baseUrl}${file}`;
          },
        });

        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        hands.onResults(onResults);
        
        // Test if hands object is properly initialized
        if (!hands || typeof hands.send !== 'function') {
          throw new Error('MediaPipe Hands failed to initialize properly');
        }
        
        handsRef.current = hands;
        initializationRef.current = true;
        setError(null);
        console.log('MediaPipe Hands initialized successfully');
      } catch (err) {
        console.error('Error initializing hand tracking:', err);
        const errorMessage = err.message || 'Failed to initialize hand tracking model. Please refresh the page.';
        setError(errorMessage);
        initializationRef.current = false;
      }
    };

    initializeHandTracking();

    return () => {
      if (handsRef.current) {
        try {
          handsRef.current.close();
        } catch (err) {
          console.error('Error closing MediaPipe:', err);
        }
      }
    };
  }, [onResults]);

  // Stop tracking
  const stopTracking = useCallback(() => {
    isProcessingRef.current = false;
    
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (videoRef.current && videoRef.current.parentNode) {
      videoRef.current.parentNode.removeChild(videoRef.current);
    }
    
    videoRef.current = null;
    setIsTracking(false);
  }, []);

  // Start tracking
  const startTracking = useCallback(async () => {
    if (!handsRef.current) {
      const errorMsg = 'Hand tracking model not initialized. Please wait a moment and try again.';
      setError(errorMsg);
      console.error(errorMsg);
      return;
    }

    if (isTracking) {
      console.log('Already tracking, skipping...');
      return; // Already tracking
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Edge.');
      }

      console.log('Requesting camera access...');
      
      // Create video element
      const video = document.createElement('video');
      videoRef.current = video;
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.style.display = 'none';
      video.style.position = 'fixed';
      video.style.top = '-9999px';
      document.body.appendChild(video);

      // Request camera with timeout
      const cameraPromise = navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Camera access timeout. Please check your camera permissions and try again.')), 10000);
      });

      const stream = await Promise.race([cameraPromise, timeoutPromise]);

      console.log('Camera access granted, setting up video...');
      video.srcObject = stream;

      // Wait for video to be ready
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Video failed to load. Please try again.'));
        }, 5000);

        video.onloadedmetadata = () => {
          clearTimeout(timeout);
          video.play()
            .then(() => {
              console.log('Video started playing');
              resolve();
            })
            .catch((err) => {
              console.error('Error playing video:', err);
              reject(new Error('Failed to start video playback.'));
            });
        };

        video.onerror = (err) => {
          clearTimeout(timeout);
          console.error('Video error:', err);
          reject(new Error('Video playback error occurred.'));
        };
      });

      // Process video frames
      isProcessingRef.current = true;
      let frameCount = 0;
      
      const processFrame = async () => {
        if (!isProcessingRef.current || !videoRef.current) {
          return;
        }

        try {
          if (video.readyState === video.HAVE_ENOUGH_DATA && handsRef.current) {
            await handsRef.current.send({ image: video });
            frameCount++;
            
            // Log first few frames for debugging
            if (frameCount <= 3) {
              console.log(`Processing frame ${frameCount}`);
            }
          }
        } catch (frameError) {
          console.error('Error processing frame:', frameError);
          // Don't stop processing on single frame errors
        }

        if (isProcessingRef.current) {
          requestAnimationFrame(processFrame);
        }
      };

      // Start processing after a short delay to ensure video is ready
      setTimeout(() => {
        if (isProcessingRef.current) {
          processFrame();
        }
      }, 100);

      setIsTracking(true);
      setIsLoading(false);
      setError(null);
      console.log('Hand tracking started successfully');
    } catch (err) {
      console.error('Error starting camera:', err);
      
      let errorMessage = 'Failed to access camera. ';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage += 'Please grant camera permissions in your browser settings and try again.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage += 'No camera found. Please connect a camera and try again.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage += 'Camera is being used by another application. Please close other apps and try again.';
      } else {
        errorMessage += err.message || 'Please check your camera and try again.';
      }
      
      setError(errorMessage);
      setIsTracking(false);
      setIsLoading(false);
      
      // Cleanup on error
      if (videoRef.current) {
        if (videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
        if (videoRef.current.parentNode) {
          videoRef.current.parentNode.removeChild(videoRef.current);
        }
        videoRef.current = null;
      }
    }
  }, [isTracking]);

  return {
    isTracking,
    isLoading,
    error,
    scale,
    handState,
    stopTracking,
    startTracking,
  };
};

export default useHandTracking;
