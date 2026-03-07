import { useState, useRef, useEffect } from 'react';
import { Wifi, Battery, Volume2, VolumeX, Sun, Moon, Play, Pause, Music } from 'lucide-react';

const SystemTray = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMute = () => setIsMuted(!isMuted);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsMusicPlaying(true);
    const onPause = () => setIsMusicPlaying(false);
    const onEnded = () => setIsMusicPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/music/bg-music.mp3" loop preload="auto" />
      <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-20 z-40">
        <div className="glass rounded-full px-4 py-2 flex items-center gap-3">
          {/* WiFi */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Wifi className="w-4 h-4" />
          </div>

          {/* Volume */}
          <button onClick={toggleMute} className="p-1 rounded-full hover:bg-primary/20 transition-colors">
            {isMuted ? <VolumeX className="w-4 h-4 text-muted-foreground" /> : <Volume2 className="w-4 h-4 text-muted-foreground" />}
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleDarkMode} className="p-1 rounded-full hover:bg-primary/20 transition-colors">
            {isDarkMode ? <Moon className="w-4 h-4 text-muted-foreground" /> : <Sun className="w-4 h-4 text-muted-foreground" />}
          </button>

          {/* Music Control */}
          <button onClick={toggleMusic} className="p-1 rounded-full hover:bg-primary/20 transition-colors" title={isMusicPlaying ? 'Pause BG Music' : 'Play BG Music'}>
            {isMusicPlaying ? <Pause className="w-4 h-4 text-primary" /> : <Music className="w-4 h-4 text-muted-foreground" />}
          </button>

          {/* Battery */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Battery className="w-4 h-4" />
            <span className="text-xs">100%</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemTray;
