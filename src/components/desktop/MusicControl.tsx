import { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';

const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        console.log('Autoplay blocked - user interaction required');
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Sync state with audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <>
      {/* 🎵 Background Music */}
      <audio
        ref={audioRef}
        src="/music/bg-music.mp3"   // ✅ UPDATED PATH
        loop
        preload="auto"
      />

      {/* Floating music control button */}
      <div
        className="fixed top-4 right-4 z-50"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div
          className={`
            glass rounded-full flex items-center gap-2
            transition-all duration-300 ease-out
            ${isExpanded ? 'px-4 py-2' : 'p-3'}
          `}
        >
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className={`
              p-2 rounded-full transition-all duration-200
              ${isPlaying
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary/20 hover:bg-primary/40 text-primary'
              }
            `}
            title={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          {/* Expanded controls */}
          {isExpanded && (
            <>
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-primary" />
                ) : (
                  <Volume2 className="w-4 h-4 text-primary" />
                )}
              </button>

              <span className="text-xs text-muted-foreground px-1 flex items-center gap-1">
                <Music className="w-3 h-3" />
                {isPlaying ? 'Playing' : 'Paused'}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicControl;
