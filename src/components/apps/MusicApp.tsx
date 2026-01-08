import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

const playlist = [
  {
    id: 1,
    title: 'My soul is your',
    artist: 'Arabic Beats',
    src: '/music/song1.mp3',
    cover: 'https://iili.io/fe1Dq3N.md.jpg'   // 👈 yaha apna image link
  },
  {
    id: 2,
    title: 'Young & Beautiful',
    artist: 'Lana del rey',
    src: '/music/song2.mp3',
    cover: 'https://iili.io/feEJuON.md.jpg'
  },
  {
    id: 3,
    title: 'Starlight Melody',
    artist: 'Chillwave',
    src: '/music/song3.mp3',
    cover: 'https://your-image-link-3.jpg'
  },
  {
    id: 4,
    title: 'Cotton Candy Sky',
    artist: 'Synth Dreams',
    src: '/music/song4.mp3',
    cover: 'https://your-image-link-4.jpg'
  },
  {
    id: 5,
    title: 'Moonlit Garden',
    artist: 'Ambient Nights',
    src: '/music/song5.mp3',
    cover: 'https://your-image-link-5.jpg'
  },
];

const MusicApp = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);

  // ▶️ Play / Pause
  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // ⏮️ Prev
  const handlePrev = () => {
    setCurrentTrack((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    setProgress(0);
  };

  // ⏭️ Next
  const handleNext = () => {
    setCurrentTrack((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  // 🎯 Select from playlist
  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index);
    setProgress(0);
    setIsPlaying(true);
  };

  // 🔄 When track changes → load & play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = playlist[currentTrack].src;
    audio.load();

    if (isPlaying) {
      audio.play();
    }
  }, [currentTrack]);

  // 📊 Progress tracking
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleNext);
    };
  }, []);

  // 🔊 Volume control
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = (isMuted ? 0 : volume) / 100;
  }, [volume, isMuted]);

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-pixel text-xl text-primary mb-4">🎵 Music Player</h2>

      {/* 🎧 Hidden Audio */}
      <audio ref={audioRef} src={playlist[currentTrack].src} />

      {/* Now Playing */}
      <div className="glass-strong rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-4">
          
          {/* 🖼️ Album Art */}
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted">
            <img
              src={playlist[currentTrack].cover}
              alt="Album cover"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://via.placeholder.com/150?text=No+Cover';
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">
              {playlist[currentTrack].title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {playlist[currentTrack].artist}
            </p>

            {/* Progress bar */}
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-kawaii-pink to-kawaii-purple transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button onClick={handlePrev} className="kawaii-btn p-2 rounded-full bg-muted">
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={handlePlayPause}
            className="kawaii-btn p-4 rounded-full bg-primary text-white shadow-lg"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <button onClick={handleNext} className="kawaii-btn p-2 rounded-full bg-muted">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 mt-4 justify-center">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setIsMuted(false);
            }}
            className="w-24 h-1.5 bg-muted rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-primary"
          />
        </div>
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-auto kawaii-scrollbar">
        <h4 className="font-pixel text-sm text-muted-foreground mb-2">Playlist</h4>
        <div className="space-y-1">
          {playlist.map((track, index) => (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(index)}
              className={`
                w-full flex items-center gap-3 p-2 rounded-lg text-left
                transition-colors duration-200
                ${currentTrack === index
                  ? 'bg-primary/20 text-primary'
                  : 'hover:bg-muted/50 text-foreground'
                }
              `}
            >
              <span className="text-lg">
                {currentTrack === index && isPlaying ? '🎶' : '🎵'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicApp;
