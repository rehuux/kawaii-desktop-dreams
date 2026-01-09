import { useState, useEffect } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Starting up...');
  const [isExiting, setIsExiting] = useState(false);

  const bootMessages = [
    'Loading cuteness...',
    'Initializing sparkles ✨',
    'Preparing kawaii modules...',
    'Loading your memories...',
    'Almost ready!',
    'Welcome! 💖',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        // Update status text based on progress
        const messageIndex = Math.min(
          Math.floor((newProgress / 100) * bootMessages.length),
          bootMessages.length - 1
        );
        setStatusText(bootMessages[messageIndex]);

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onBootComplete, 600);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/90
        transition-all duration-500
        ${isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
      `}
    >
      {/* Logo */}
      <div className="relative mb-8">
        <div className="text-6xl md:text-8xl animate-float-slow">🌸</div>
        <div className="absolute -top-2 -right-2 text-2xl animate-sparkle">✨</div>
        <div className="absolute -bottom-1 -left-2 text-xl animate-sparkle delay-300">💫</div>
      </div>

      {/* Title */}
      <h1 className="font-pixel text-4xl md:text-5xl text-white mb-2 drop-shadow-lg animate-pulse-slow">
        Kawaii OS
      </h1>
      <p className="text-white/80 mb-8 text-lg">Your cutest digital space</p>

      {/* Progress Bar */}
      <div className="w-64 md:w-80 h-3 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-white via-kawaii-peach to-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status Text */}
      <p className="mt-4 text-white/90 text-sm font-medium animate-pulse">
        {statusText}
      </p>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-4xl opacity-50 animate-float">💝</div>
      <div className="absolute top-20 right-16 text-3xl opacity-40 animate-float delay-100">🌟</div>
      <div className="absolute bottom-20 left-20 text-3xl opacity-50 animate-float delay-200">🎀</div>
      <div className="absolute bottom-16 right-12 text-4xl opacity-40 animate-float delay-150">💖</div>
      <div className="absolute top-1/3 left-8 text-2xl opacity-30 animate-sparkle">⭐</div>
      <div className="absolute top-1/2 right-10 text-2xl opacity-30 animate-sparkle delay-500">✨</div>
    </div>
  );
};

export default BootScreen;
