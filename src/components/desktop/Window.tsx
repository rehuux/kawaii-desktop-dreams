import { useState, useRef, useEffect, ReactNode } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  children: ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

const Window = ({
  id,
  title,
  icon,
  children,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  defaultPosition = { x: 300, y: 100 },
  defaultSize = { width: 500, height: 400 },
}: WindowProps) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle window dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    onFocus();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Reset position for new windows on mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setPosition({ x: 20, y: 80 });
      setSize({ width: window.innerWidth - 40, height: window.innerHeight - 160 });
    }
  }, []);

  if (!isOpen) return null;

  const windowStyle = isMaximized
    ? {
        left: '280px',
        top: '0',
        width: 'calc(100vw - 280px)',
        height: '100vh',
        zIndex,
      }
    : {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={`
        fixed glass rounded-2xl overflow-hidden
        flex flex-col shadow-2xl
        transition-all duration-200
        ${isMinimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100 animate-bounce-in'}
        ${isDragging ? 'cursor-grabbing' : ''}
      `}
      style={windowStyle}
      onClick={onFocus}
    >
      {/* Title bar */}
      <div
        className="window-titlebar flex-shrink-0"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-pixel text-white text-sm">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
          >
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
          >
            {isMaximized ? (
              <Minimize2 className="w-3 h-3 text-white" />
            ) : (
              <Maximize2 className="w-3 h-3 text-white" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-red-400 transition-colors"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto kawaii-scrollbar bg-card/80 p-4">
        {children}
      </div>
    </div>
  );
};

export default Window;