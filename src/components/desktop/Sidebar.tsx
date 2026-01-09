import { Camera, Video, Mail, Music, Terminal, Gamepad2, Gift, MoreHorizontal, Settings, User, Heart, X } from 'lucide-react';

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
          fixed left-0 top-0 h-full w-64 md:w-72 z-50
          glass rounded-r-3xl
          flex flex-col
          transition-transform duration-300 ease-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close Button at Top */}
        <div className="flex justify-end p-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-destructive/20 hover:bg-destructive/40 transition-colors"
          >
            <X className="w-5 h-5 text-destructive" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="px-4 pb-4 border-b border-border/30">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-pixel text-sm text-foreground">User</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-400 animate-heartbeat" />
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center py-4 px-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl animate-float">🌸</span>
            <h1 className="font-pixel text-2xl text-primary">Kawaii OS</h1>
            <span className="text-2xl animate-float delay-200">✨</span>
          </div>
          <p className="text-xs text-muted-foreground">Your cute digital world</p>
        </div>

        {/* App buttons */}
        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto kawaii-scrollbar px-3 py-2">
          {apps.map((app, index) => (
            <button
              key={app.id}
              onClick={() => {
                onOpenApp(app.id);
                onClose();
              }}
              className="
                kawaii-btn glass-strong
                flex items-center gap-3 px-4 py-3
                rounded-xl text-left
                hover:bg-primary/20
                group relative overflow-hidden
              "
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200 relative z-10">
                {app.emoji}
              </span>
              <span className="font-medium text-foreground relative z-10 flex-1">{app.label}</span>
              <app.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
            </button>
          ))}

          {/* Settings button - separated */}
          <div className="mt-2 pt-2 border-t border-border/30">
            <button
              onClick={() => {
                onOpenApp('settings');
                onClose();
              }}
              className="
                kawaii-btn glass-strong
                flex items-center gap-3 px-4 py-3 w-full
                rounded-xl text-left
                hover:bg-primary/20
                group
              "
            >
              <span className="text-2xl group-hover:animate-spin-slow">⚙️</span>
              <span className="font-medium text-foreground flex-1">Settings</span>
              <Settings className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/30">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">Made with 💖</p>
            <div className="flex justify-center gap-1">
              {['🌸', '💜', '✨', '💝', '🎀'].map((emoji, i) => (
                <span 
                  key={i} 
                  className="text-sm animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
