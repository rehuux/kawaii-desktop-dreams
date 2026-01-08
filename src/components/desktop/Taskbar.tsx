import { Menu, Sparkles } from 'lucide-react';

interface MinimizedWindow {
  id: string;
  title: string;
  icon: string;
}

interface TaskbarProps {
  minimizedWindows: MinimizedWindow[];
  onRestore: (id: string) => void;
  onMenuClick: () => void;
  onStartClick: () => void;
  isStartMenuOpen: boolean;
}

const Taskbar = ({ minimizedWindows, onRestore, onMenuClick, onStartClick, isStartMenuOpen }: TaskbarProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:left-[calc(50%+140px)]">
      <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
        {/* Start Button */}
        <button
          onClick={onStartClick}
          className={`
            p-2 rounded-full transition-all duration-200
            flex items-center gap-2
            ${isStartMenuOpen 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-primary/20 hover:bg-primary/40'
            }
          `}
        >
          <Sparkles className={`w-5 h-5 ${isStartMenuOpen ? 'text-primary-foreground' : 'text-primary'}`} />
          <span className={`hidden sm:inline text-sm font-pixel ${isStartMenuOpen ? 'text-primary-foreground' : 'text-primary'}`}>
            Start
          </span>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-border/50" />

        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
        >
          <Menu className="w-5 h-5 text-primary" />
        </button>

        {/* Minimized windows */}
        {minimizedWindows.length > 0 ? (
          minimizedWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => onRestore(window.id)}
              className="
                kawaii-btn p-2 rounded-full
                bg-primary/20 hover:bg-primary/40
                transition-all duration-200
                flex items-center gap-2
              "
              title={window.title}
            >
              <span className="text-lg">{window.icon}</span>
              <span className="hidden sm:inline text-sm font-medium text-foreground max-w-20 truncate">
                {window.title}
              </span>
            </button>
          ))
        ) : (
          <span className="text-sm text-muted-foreground px-2 hidden sm:inline">
            ✨ No minimized apps
          </span>
        )}

        {/* Clock */}
        <div className="pl-2 border-l border-border/50 text-sm text-muted-foreground font-pixel">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;