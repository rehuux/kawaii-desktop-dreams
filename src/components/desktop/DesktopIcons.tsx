interface DesktopIconsProps {
  onOpenApp: (appId: string) => void;
}

const desktopApps = [
  { id: 'photos', icon: '📸', title: 'Photos' },
  { id: 'video', icon: '🎥', title: 'Video' },
  { id: 'letter', icon: '💌', title: 'Letter' },
  { id: 'music', icon: '🎵', title: 'Music' },
  { id: 'game', icon: '🎮', title: 'Game' },
  { id: 'gift', icon: '🎁', title: 'Gift' },
];

const DesktopIcons = ({ onOpenApp }: DesktopIconsProps) => {
  return (
    <div className="fixed top-20 right-4 md:right-8 z-10 flex flex-col gap-4">
      {desktopApps.map((app, index) => (
        <button
          key={app.id}
          onClick={() => onOpenApp(app.id)}
          onDoubleClick={() => onOpenApp(app.id)}
          className="
            desktop-icon group flex flex-col items-center gap-1
            p-3 rounded-xl
            bg-white/10 backdrop-blur-sm
            hover:bg-white/30 
            transition-all duration-200
            hover:scale-110
            animate-fade-in
          "
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <span className="text-3xl md:text-4xl group-hover:animate-bounce drop-shadow-lg">
            {app.icon}
          </span>
          <span className="text-xs font-medium text-white drop-shadow-md px-2 py-0.5 rounded bg-black/20">
            {app.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default DesktopIcons;
