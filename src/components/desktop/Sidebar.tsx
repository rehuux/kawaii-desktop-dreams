import { Camera, Video, Mail, Music, Terminal, Gamepad2, Gift, MoreHorizontal, Settings, X } from 'lucide-react';

interface SidebarProps {
  onOpenApp: (appId: string) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

const apps = [
  { id: 'photos', icon: Camera, label: 'Photos', emoji: '📸', color: 'from-pink-400 to-rose-400' },
  { id: 'video', icon: Video, label: 'Video', emoji: '🎥', color: 'from-purple-400 to-violet-400' },
  { id: 'letter', icon: Mail, label: 'Letter', emoji: '💌', color: 'from-red-400 to-pink-400' },
  { id: 'music', icon: Music, label: 'Music', emoji: '🎵', color: 'from-cyan-400 to-blue-400' },
  { id: 'terminal', icon: Terminal, label: 'Terminal', emoji: '💻', color: 'from-green-400 to-emerald-400' },
  { id: 'game', icon: Gamepad2, label: 'Game', emoji: '🎮', color: 'from-orange-400 to-amber-400' },
  { id: 'gift', icon: Gift, label: 'Gift', emoji: '🎁', color: 'from-yellow-400 to-orange-400' },
  { id: 'more', icon: MoreHorizontal, label: 'More', emoji: '➕', color: 'from-gray-400 to-slate-400' },
];

const Sidebar = ({ onOpenApp, isMobileOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-56 sm:w-64 z-50
          glass rounded-r-3xl
          flex flex-col
          transition-transform duration-300 ease-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close Button + Header combined for landscape */}
        <div className="flex items-center justify-between p-2 landscape:py-1">
          <div className="flex items-center gap-1.5">
            <span className="text-lg animate-float">🌸</span>
            <h1 className="font-pixel text-base sm:text-lg text-primary">Kawaii OS</h1>
            <span className="text-lg animate-float delay-200">✨</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-destructive/20 hover:bg-destructive/40 transition-colors"
          >
            <X className="w-4 h-4 text-destructive" />
          </button>
        </div>

        {/* App buttons - compact in landscape */}
        <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto kawaii-scrollbar px-2 py-1">
          {apps.map((app, index) => (
            <button
              key={app.id}
              onClick={() => {
                onOpenApp(app.id);
                onClose();
              }}
              className="
                kawaii-btn glass-strong
                flex items-center gap-2 px-3 py-1.5 landscape:py-1
                rounded-lg text-left
                hover:bg-primary/20
                group relative overflow-hidden
                min-h-0
              "
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-200 relative z-10">
                {app.emoji}
              </span>
              <span className="font-medium text-sm text-foreground relative z-10 flex-1">{app.label}</span>
              <app.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
            </button>
          ))}

          {/* Settings */}
          <div className="mt-1 pt-1 border-t border-border/30">
            <button
              onClick={() => {
                onOpenApp('settings');
                onClose();
              }}
              className="
                kawaii-btn glass-strong
                flex items-center gap-2 px-3 py-1.5 landscape:py-1 w-full
                rounded-lg text-left
                hover:bg-primary/20
                group
              "
            >
              <span className="text-lg sm:text-xl group-hover:animate-spin-slow">⚙️</span>
              <span className="font-medium text-sm text-foreground flex-1">Settings</span>
              <Settings className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </nav>

        {/* Footer - hide in landscape to save space */}
        <div className="p-2 border-t border-border/30 landscape:hidden">
          <p className="text-center text-xs text-muted-foreground">Made with 💖</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
