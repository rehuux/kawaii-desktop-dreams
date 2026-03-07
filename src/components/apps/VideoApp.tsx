import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const VideoApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = time;
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };
    const onLoaded = () => setDuration(video.duration);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('ended', onEnded);
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full flex flex-col min-h-0">
      {/* Video container - takes all available space */}
      <div
        className="flex-1 min-h-0 bg-black rounded-xl overflow-hidden relative cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/myvideo.mp4" type="video/mp4" />
          Your browser does not support video.
        </video>

        {/* Overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="text-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                <Play className="w-7 h-7 text-primary-foreground ml-1" />
              </div>
              <p className="text-white/70 text-xs font-pixel">
                Tap to play
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="px-1 pt-2 flex-shrink-0">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-muted accent-primary"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) ${progress}%, hsl(var(--muted)) ${progress}%)`
          }}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground font-pixel mt-0.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 p-2 glass rounded-full flex-shrink-0">
        <button
          onClick={() => skip(-10)}
          className="p-2 rounded-full hover:bg-accent/50 transition-colors"
        >
          <SkipBack className="w-4 h-4 text-foreground" />
        </button>

        <button
          onClick={togglePlay}
          className="kawaii-btn p-3 rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <button
          onClick={() => skip(10)}
          className="p-2 rounded-full hover:bg-accent/50 transition-colors"
        >
          <SkipForward className="w-4 h-4 text-foreground" />
        </button>

        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-accent/50 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-foreground" /> : <Volume2 className="w-4 h-4 text-foreground" />}
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full hover:bg-accent/50 transition-colors"
        >
          <Maximize className="w-4 h-4 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default VideoApp;
