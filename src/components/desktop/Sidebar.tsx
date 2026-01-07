import { Camera, Video, Mail, Music, Terminal, Gamepad2, Gift, MoreHorizontal } from 'lucide-react';

interface SidebarProps {
  onOpenApp: (appId: string) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

const apps = [
  { id: 'photos', icon: Camera, label: 'Photos', emoji: '📸' },
  { id: 'video', icon: Video, label: 'Video', emoji: '🎥' },
  { id: 'letter', icon: Mail, label: 'Letter', emoji: '💌' },
  { id: 'music', icon: Music, label: 'Music', emoji: '🎵' },
  { id: 'terminal', icon: Terminal, label: 'Terminal', emoji: '💻' },
  { id: 'game', icon: Gamepad2, label: 'Game', emoji: '🎮' },
  { id: 'gift', icon: Gift, label: 'Gift', emoji: '🎁' },
  { id: 'more', icon: MoreHorizontal, label: 'More', emoji: '➕' },
];

const Sidebar = ({ onOpenApp, isMobileOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-64 md:w-72 z-50
          glass rounded-r-3xl
          flex flex-col p-4 gap-2
          transition-transform duration-300 ease-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="text-center py-4 mb-2">
          <h1 className="font-pixel text-2xl text-primary">✨ Kawaii OS ✨</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome! 🎀</p>
        </div>

        {/* App buttons */}
        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto kawaii-scrollbar">
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
                rounded-2xl text-left
                hover:bg-primary/20
                group
              "
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="text-2xl group-hover:float-animation">{app.emoji}</span>
              <span className="font-medium text-foreground">{app.label}</span>
              <app.icon className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="text-center py-2 text-xs text-muted-foreground">
          Made with 💖
        </div>
      </aside>
    </>
  );
};

export default Sidebar;