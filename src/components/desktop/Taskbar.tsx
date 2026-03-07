import { Menu } from 'lucide-react';
import LiveClock from './LiveClock';

interface MinimizedWindow {
  id: string;
  title: string;
  icon: string;
}

interface TaskbarProps {
  minimizedWindows: MinimizedWindow[];
  openWindows?: MinimizedWindow[];
  onRestore: (id: string) => void;
  onMenuClick: () => void;
  onFocusWindow?: (id: string) => void;
}

const Taskbar = ({ 
  minimizedWindows, 
  openWindows = [], 
  onRestore, 
  onMenuClick, 
  onFocusWindow 
}: TaskbarProps) => {
  return (
    <div className="fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="glass rounded-full px-4 py-2 flex items-center gap-2 animate-slide-up">
        {/* Menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
        >
          <Menu className="w-5 h-5 text-primary" />
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-border/50" />

        {/* Open (non-minimized) windows */}
        {openWindows.length > 0 && (
          <>
            {openWindows.map((window) => (
              <button
                key={`open-${window.id}`}
                onClick={() => onFocusWindow?.(window.id)}
                className="
                  p-2 rounded-full
                  bg-primary/40 hover:bg-primary/60
                  transition-all duration-200
                  flex items-center gap-2
                  ring-2 ring-primary/50
                "
              >
                <span className="text-lg">{window.icon}</span>
                <span className="hidden lg:inline text-sm font-medium text-foreground max-w-16 truncate">
                  {window.title}
                </span>
              </button>
            ))}
            <div className="w-px h-4 bg-border/30" />
          </>
        )}

        {/* Minimized windows */}
        {minimizedWindows.length > 0 ? (
          minimizedWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => onRestore(window.id)}
              className="
                kawaii-btn p-2 rounded-full
                bg-muted/50 hover:bg-primary/40
                transition-all duration-200
                flex items-center gap-2
                opacity-70 hover:opacity-100
              "
            >
              <span className="text-lg grayscale hover:grayscale-0 transition-all">{window.icon}</span>
              <span className="hidden sm:inline text-sm font-medium text-muted-foreground max-w-20 truncate">
                {window.title}
              </span>
            </button>
          ))
        ) : openWindows.length === 0 ? (
          <span className="text-sm text-muted-foreground px-2 hidden sm:inline">
             No apps running
          </span>
        ) : null}

        {/* Live Clock */}
        <div className="pl-2 border-l border-border/50 text-sm text-muted-foreground">
          <LiveClock />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
