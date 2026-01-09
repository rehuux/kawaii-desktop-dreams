import { useState } from 'react';
import { Wifi, Battery, Volume2, VolumeX, Sun, Moon } from 'lucide-react';

const SystemTray = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMute = () => setIsMuted(!isMuted);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-20 z-40">
      <div className="glass rounded-full px-4 py-2 flex items-center gap-3">
        {/* WiFi */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <Wifi className="w-4 h-4" />
        </div>

        {/* Volume */}
        <button
          onClick={toggleMute}
          className="p-1 rounded-full hover:bg-primary/20 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Volume2 className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-1 rounded-full hover:bg-primary/20 transition-colors"
        >
          {isDarkMode ? (
            <Moon className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Sun className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Battery */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <Battery className="w-4 h-4" />
          <span className="text-xs">100%</span>
        </div>
      </div>
    </div>
  );
};

export default SystemTray;
