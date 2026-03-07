import { X } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

const apps = [
  { id: 'photos', icon: '📸', title: 'Photos', description: 'View memories' },
  { id: 'video', icon: '🎥', title: 'Video', description: 'Watch videos' },
  { id: 'letter', icon: '💌', title: 'Letter', description: 'Read love letters' },
  { id: 'music', icon: '🎵', title: 'Music Player', description: 'Listen to music' },
  { id: 'terminal', icon: '💻', title: 'Terminal', description: 'Developer mode' },
  { id: 'game', icon: '🎮', title: 'Memory Game', description: 'Play games' },
  { id: 'gift', icon: '🎁', title: 'Gift', description: 'Surprise!' },
  { id: 'more', icon: '➕', title: 'More', description: 'Additional apps' },
  { id: 'settings', icon: '⚙️', title: 'Settings', description: 'Customize OS' },
];

const StartMenu = ({ isOpen, onClose, onOpenApp }: StartMenuProps) => {
  if (!isOpen) return null;

  const handleAppClick = (appId: string) => {
    onOpenApp(appId);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/20 backdrop-blur-sm z-[998]"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 md:left-[calc(50%+140px)] z-[999] animate-scale-in">
        <div className="glass rounded-2xl p-4 w-[320px] sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <h2 className="font-pixel text-lg text-primary">Kawaii OS</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-destructive/20 hover:bg-destructive/40 transition-colors"
            >
              <X className="w-4 h-4 text-destructive" />
            </button>
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-4 gap-3">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className="
                  flex flex-col items-center gap-1 p-3
                  rounded-xl bg-primary/10 hover:bg-primary/30
                  transition-all duration-200 hover:scale-105
                  group
                "
              >
                <span className="text-2xl group-hover:animate-bounce">{app.icon}</span>
                <span className="text-xs font-medium text-foreground truncate w-full text-center">
                  {app.title}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-border/50 text-center">
            <span className="text-xs text-muted-foreground font-pixel">
               Made with love 
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
