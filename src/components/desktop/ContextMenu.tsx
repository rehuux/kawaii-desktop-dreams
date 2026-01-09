import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Settings, Info, Palette, Volume2, VolumeX } from 'lucide-react';

interface ContextMenuProps {
  onOpenApp: (appId: string) => void;
  onRefresh: () => void;
}

interface MenuPosition {
  x: number;
  y: number;
}

const ContextMenu = ({ onOpenApp, onRefresh }: ContextMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ x: 0, y: 0 });

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    
    // Don't show if clicking on an app or window
    const target = e.target as HTMLElement;
    if (
      target.closest('.glass') ||
      target.closest('.desktop-icon') ||
      target.closest('button')
    ) {
      return;
    }

    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  }, []);

  const handleClick = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, [handleContextMenu, handleClick]);

  if (!isVisible) return null;

  const menuItems = [
    { icon: RefreshCw, label: 'Refresh', action: onRefresh },
    { type: 'separator' },
    { icon: Settings, label: 'Settings', action: () => onOpenApp('settings') },
    { icon: Palette, label: 'Personalize', action: () => onOpenApp('settings') },
    { type: 'separator' },
    { icon: Info, label: 'About Kawaii OS', action: () => onOpenApp('terminal') },
  ];

  // Adjust position to keep menu in viewport
  const adjustedX = Math.min(position.x, window.innerWidth - 200);
  const adjustedY = Math.min(position.y, window.innerHeight - 250);

  return (
    <div
      className="fixed z-[1000] animate-scale-in"
      style={{ left: adjustedX, top: adjustedY }}
    >
      <div className="glass rounded-xl py-2 min-w-[180px] shadow-xl">
        {menuItems.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div key={index} className="h-px bg-border/50 my-1 mx-2" />
            );
          }

          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => {
                item.action?.();
                setIsVisible(false);
              }}
              className="
                w-full flex items-center gap-3 px-4 py-2
                text-sm text-foreground
                hover:bg-primary/20 transition-colors
                text-left
              "
            >
              {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContextMenu;
