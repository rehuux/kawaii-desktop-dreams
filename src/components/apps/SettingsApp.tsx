import { useState } from 'react';
import { Palette, Volume2, Monitor, Heart, Sparkles } from 'lucide-react';

const themes = [
  { id: 'pink', name: 'Sakura Pink', color: 'hsl(330 70% 65%)', emoji: '🌸' },
  { id: 'purple', name: 'Lavender Dream', color: 'hsl(280 60% 65%)', emoji: '💜' },
  { id: 'mint', name: 'Mint Fresh', color: 'hsl(160 50% 55%)', emoji: '🍃' },
  { id: 'peach', name: 'Peachy Keen', color: 'hsl(20 70% 65%)', emoji: '🍑' },
  { id: 'sky', name: 'Sky Blue', color: 'hsl(200 70% 60%)', emoji: '☁️' },
];

const wallpapers = [
  { id: 'video', name: 'Video Background', emoji: '🎥' },
  { id: 'stars', name: 'Starry Night', emoji: '⭐' },
  { id: 'clouds', name: 'Fluffy Clouds', emoji: '☁️' },
  { id: 'hearts', name: 'Floating Hearts', emoji: '💕' },
];

const SettingsApp = () => {
  const [selectedTheme, setSelectedTheme] = useState('pink');
  const [selectedWallpaper, setSelectedWallpaper] = useState('video');
  const [volume, setVolume] = useState(80);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
        <div className="p-2 rounded-full bg-primary/20">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="font-pixel text-lg text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">Customize your experience</p>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          <h3 className="font-pixel text-sm text-foreground">Theme Color</h3>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`
                p-3 rounded-xl transition-all duration-200 flex flex-col items-center gap-1
                ${selectedTheme === theme.id 
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105' 
                  : 'hover:scale-105'
                }
              `}
              style={{ backgroundColor: theme.color + '33' }}
            >
              <span className="text-xl">{theme.emoji}</span>
              <span className="text-xs text-foreground">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Wallpaper Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-primary" />
          <h3 className="font-pixel text-sm text-foreground">Wallpaper</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {wallpapers.map((wallpaper) => (
            <button
              key={wallpaper.id}
              onClick={() => setSelectedWallpaper(wallpaper.id)}
              className={`
                p-4 rounded-xl bg-muted/50 transition-all duration-200
                flex flex-col items-center gap-2
                ${selectedWallpaper === wallpaper.id 
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                  : 'hover:bg-muted'
                }
              `}
            >
              <span className="text-2xl">{wallpaper.emoji}</span>
              <span className="text-xs text-foreground">{wallpaper.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Volume Control */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-primary" />
          <h3 className="font-pixel text-sm text-foreground">System Volume</h3>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="flex-1 h-2 rounded-full appearance-none bg-muted cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-primary
                       [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <span className="text-sm text-muted-foreground w-12 text-right">{volume}%</span>
        </div>
      </div>

      {/* Notifications Toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">Cute Notifications</span>
        </div>
        <button
          onClick={() => setNotifications(!notifications)}
          className={`
            w-12 h-6 rounded-full transition-all duration-200 relative
            ${notifications ? 'bg-primary' : 'bg-muted'}
          `}
        >
          <div
            className={`
              absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200
              ${notifications ? 'left-7' : 'left-1'}
            `}
          />
        </button>
      </div>

      {/* About Section */}
      <div className="text-center pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          ✨ Kawaii OS v1.0.0 ✨
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Made with 💕 and lots of sparkles
        </p>
      </div>
    </div>
  );
};

export default SettingsApp;
