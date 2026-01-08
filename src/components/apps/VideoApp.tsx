import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';

const VideoApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-pixel text-xl text-primary mb-4">
        🎥 Video Player
      </h2>

      {/* Video container */}
      <div className="flex-1 bg-black rounded-xl overflow-hidden relative">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          poster="/videos/poster.jpg"   // optional poster
        >
          {/* ✅ REAL VIDEO PATH */}
          <source src="/videos/myvideo.mp4" type="video/mp4" />
          Your browser does not support video.
        </video>

        {/* Overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="text-center pointer-events-none">
              <div className="text-6xl mb-2">🎬</div>
              <p className="text-white/80 text-sm">
                Click play to watch
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-4 p-2 glass rounded-full">
        <button
          onClick={togglePlay}
          className="kawaii-btn p-3 rounded-full bg-primary text-white"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="kawaii-btn p-2 rounded-full bg-secondary"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoApp;
