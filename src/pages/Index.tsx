import { useState, useCallback } from 'react';
import VideoBackground from '@/components/desktop/VideoBackground';
import Sidebar from '@/components/desktop/Sidebar';
import Window from '@/components/desktop/Window';
import Taskbar from '@/components/desktop/Taskbar';

import DesktopWidget from '@/components/desktop/DesktopWidget';

import ContextMenu from '@/components/desktop/ContextMenu';
import NotificationCenter from '@/components/desktop/NotificationCenter';
import SystemTray from '@/components/desktop/SystemTray';
import PhotosApp from '@/components/apps/PhotosApp';
import VideoApp from '@/components/apps/VideoApp';
import LetterApp from '@/components/apps/LetterApp';
import MusicApp from '@/components/apps/MusicApp';
import TerminalApp from '@/components/apps/TerminalApp';
import GameApp from '@/components/apps/GameApp';
import GiftApp from '@/components/apps/GiftApp';
import MoreApp from '@/components/apps/MoreApp';
import SettingsApp from '@/components/apps/SettingsApp';

interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

const appConfig: Record<string, Omit<WindowState, 'isOpen' | 'isMinimized' | 'isMaximized' | 'zIndex'>> = {
  photos: { id: 'photos', title: 'Photos', icon: '📸', defaultPosition: { x: 320, y: 60 }, defaultSize: { width: 600, height: 450 } },
  video: { id: 'video', title: 'Video', icon: '🎥', defaultPosition: { x: 340, y: 80 }, defaultSize: { width: 640, height: 400 } },
  letter: { id: 'letter', title: 'Letter', icon: '💌', defaultPosition: { x: 360, y: 100 }, defaultSize: { width: 500, height: 450 } },
  music: { id: 'music', title: 'Music Player', icon: '🎵', defaultPosition: { x: 380, y: 120 }, defaultSize: { width: 380, height: 320 } },
  terminal: { id: 'terminal', title: 'Terminal', icon: '💻', defaultPosition: { x: 400, y: 80 }, defaultSize: { width: 550, height: 380 } },
  game: { id: 'game', title: 'Memory Game', icon: '🎮', defaultPosition: { x: 350, y: 60 }, defaultSize: { width: 450, height: 520 } },
  gift: { id: 'gift', title: 'Gift', icon: '🎁', defaultPosition: { x: 420, y: 100 }, defaultSize: { width: 400, height: 350 } },
  more: { id: 'more', title: 'More', icon: '➕', defaultPosition: { x: 380, y: 80 }, defaultSize: { width: 400, height: 400 } },
  settings: { id: 'settings', title: 'Settings', icon: '⚙️', defaultPosition: { x: 360, y: 70 }, defaultSize: { width: 420, height: 500 } },
};

const Index = () => {
  
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(100);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const openApp = useCallback((appId: string) => {
    setWindows((prev) => {
      const existingWindow = prev.find((w) => w.id === appId);
      if (existingWindow) {
        return prev.map((w) =>
          w.id === appId
            ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 }
            : w
        );
      }
      const config = appConfig[appId];
      if (!config) return prev;
      return [
        ...prev,
        {
          ...config,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: highestZIndex + 1,
        },
      ];
    });
    setHighestZIndex((prev) => prev + 1);
    
  }, [highestZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w
      )
    );
    setHighestZIndex((prev) => prev + 1);
  }, [highestZIndex]);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w
      )
    );
    setHighestZIndex((prev) => prev + 1);
  }, [highestZIndex]);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const minimizedWindows = windows
    .filter((w) => w.isMinimized)
    .map((w) => ({ id: w.id, title: w.title, icon: w.icon }));

  const openWindows = windows
    .filter((w) => !w.isMinimized)
    .map((w) => ({ id: w.id, title: w.title, icon: w.icon }));

  const renderAppContent = (appId: string) => {
    switch (appId) {
      case 'photos':
        return <PhotosApp />;
      case 'video':
        return <VideoApp />;
      case 'letter':
        return <LetterApp />;
      case 'music':
        return <MusicApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'game':
        return <GameApp />;
      case 'gift':
        return <GiftApp />;
      case 'more':
        return <MoreApp />;
      case 'settings':
        return <SettingsApp />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden" key={refreshKey}>
      {/* Video Background */}
      <VideoBackground />

      {/* Context Menu */}
      <ContextMenu onOpenApp={openApp} onRefresh={handleRefresh} />

      {/* System Tray */}
      <SystemTray />

      {/* Notification Center */}
      <NotificationCenter />


      {/* Desktop Widget */}
      <DesktopWidget />

      {/* Sidebar */}
      <Sidebar
        onOpenApp={openApp}
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          isOpen={window.isOpen}
          isMinimized={window.isMinimized}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          defaultPosition={window.defaultPosition}
          defaultSize={window.defaultSize}
        >
          {renderAppContent(window.id)}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar
        minimizedWindows={minimizedWindows}
        openWindows={openWindows}
        onRestore={restoreWindow}
        onMenuClick={() => setIsMobileSidebarOpen(true)}
        onFocusWindow={focusWindow}
      />
    </div>
  );
};

export default Index;
