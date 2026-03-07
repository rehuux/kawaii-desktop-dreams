import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Heart, ListMusic } from 'lucide-react';

const playlist = [
  { id: 1, title: 'My soul is your', artist: 'Arabic Beats', src: '/music/song1.mp3', cover: 'https://iili.io/fe1Dq3N.md.jpg' },
  { id: 2, title: 'Young & Beautiful', artist: 'Lana del rey', src: '/music/song2.mp3', cover: 'https://iili.io/feEJuON.md.jpg' },
  { id: 3, title: 'TV', artist: 'Billie Eilish', src: '/music/song3.mp3', cover: 'https://iili.io/feEYqXt.md.jpg' },
  { id: 4, title: 'back to friends', artist: 'Sombr', src: '/music/song4.mp3', cover: 'https://iili.io/feEjpg2.md.jpg' },
  { id: 5, title: 'I Think They Call This Love', artist: 'Matthew Ifield', src: '/music/song5.mp3', cover: 'https://iili.io/feEsynR.md.jpg' },
];

const formatTime = (t: number) => {
  if (!t || isNaN(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const MusicApp = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showPlaylist, setShowPlaylist] = useState(false);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    setCurrentTrack(p => (p === 0 ? playlist.length - 1 : p - 1));
    setProgress(0);
  };

  const handleNext = () => {
    if (isShuffle) {
      let next;
      do { next = Math.floor(Math.random() * playlist.length); } while (next === currentTrack && playlist.length > 1);
      setCurrentTrack(next);
    } else {
      setCurrentTrack(p => (p === playlist.length - 1 ? 0 : p + 1));
    }
    setProgress(0);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index);
    setProgress(0);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !duration) return;
    const time = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = time;
  };

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = playlist[currentTrack].src;
    audio.load();
    if (isPlaying) audio.play();
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (!audio.duration) return;
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnd = () => {
      if (isRepeat) { audio.currentTime = 0; audio.play(); }
      else handleNext();
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
    };
  }, [isRepeat, isShuffle, currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = (isMuted ? 0 : volume) / 100;
  }, [volume, isMuted]);

  const track = playlist[currentTrack];

  return (
    <div className="h-full flex flex-col">
      <audio ref={audioRef} src={track.src} />

      {/* Now Playing - Main View */}
      {!showPlaylist ? (
        <>
          {/* Album art with spinning animation */}
          <div className="flex justify-center mb-3">
            <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-2xl border-4 border-primary/20 ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '4s' }}
            >
              <img
                src={track.cover}
                alt="Album cover"
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/150?text=♫'; }}
              />
            </div>
          </div>

          {/* Track info */}
          <div className="text-center mb-2">
            <div className="flex items-center justify-center gap-2">
              <h3 className="font-medium text-foreground truncate text-lg">{track.title}</h3>
              <button onClick={() => toggleLike(track.id)} className="flex-shrink-0">
                <Heart className={`w-4 h-4 transition-all ${liked.has(track.id) ? 'fill-rose-400 text-rose-400 scale-110' : 'text-muted-foreground hover:text-rose-400'}`} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>

          {/* Seek bar with time */}
          <div className="px-2 mb-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) ${progress}%, hsl(var(--muted)) ${progress}%)`
              }}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-pixel mt-0.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main controls */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <button onClick={() => setIsShuffle(!isShuffle)} className={`p-1.5 rounded-full transition-colors ${isShuffle ? 'text-primary bg-primary/20' : 'text-muted-foreground hover:text-foreground'}`}>
              <Shuffle className="w-4 h-4" />
            </button>
            <button onClick={handlePrev} className="kawaii-btn p-2 rounded-full bg-muted hover:bg-accent transition-colors">
              <SkipBack className="w-5 h-5 text-foreground" />
            </button>
            <button onClick={handlePlayPause} className="kawaii-btn p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button onClick={handleNext} className="kawaii-btn p-2 rounded-full bg-muted hover:bg-accent transition-colors">
              <SkipForward className="w-5 h-5 text-foreground" />
            </button>
            <button onClick={() => setIsRepeat(!isRepeat)} className={`p-1.5 rounded-full transition-colors ${isRepeat ? 'text-primary bg-primary/20' : 'text-muted-foreground hover:text-foreground'}`}>
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 justify-center mb-3">
            <button onClick={() => setIsMuted(!isMuted)} className="p-1 text-muted-foreground hover:text-foreground">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range" min="0" max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
              className="w-24 h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) ${isMuted ? 0 : volume}%, hsl(var(--muted)) ${isMuted ? 0 : volume}%)`
              }}
            />
          </div>

          {/* Show playlist button */}
          <button onClick={() => setShowPlaylist(true)} className="mx-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-pixel">
            <ListMusic className="w-4 h-4" />
            Playlist ({playlist.length})
          </button>
        </>
      ) : (
        /* Playlist view */
        <>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-pixel text-lg text-primary flex items-center gap-2">
              <ListMusic className="w-5 h-5" /> Playlist
            </h2>
            <button onClick={() => setShowPlaylist(false)} className="text-xs text-muted-foreground hover:text-primary font-pixel">
              Now Playing ↗
            </button>
          </div>
          <div className="flex-1 overflow-auto kawaii-scrollbar space-y-1">
            {playlist.map((t, index) => (
              <button
                key={t.id}
                onClick={() => handleTrackSelect(index)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200 ${
                  currentTrack === index ? 'bg-primary/20 shadow-sm' : 'hover:bg-muted/50'
                }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <img src={t.cover} alt="" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/40?text=♫'; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${currentTrack === index ? 'text-primary' : 'text-foreground'}`}>{t.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.artist}</p>
                </div>
                <div className="flex items-center gap-2">
                  {currentTrack === index && isPlaying && <span className="text-primary text-xs">♫</span>}
                  <button onClick={(e) => { e.stopPropagation(); toggleLike(t.id); }}>
                    <Heart className={`w-3.5 h-3.5 ${liked.has(t.id) ? 'fill-rose-400 text-rose-400' : 'text-muted-foreground'}`} />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MusicApp;
