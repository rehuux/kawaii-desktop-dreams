import { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';

const gifts = [
  { emoji: '🧸', message: 'A cuddly teddy bear for you!' },
  { emoji: '🌺', message: 'A beautiful flower to brighten your day!' },
  { emoji: '🍪', message: 'A freshly baked cookie, just for you!' },
  { emoji: '💎', message: 'A precious gem, as precious as you!' },
  { emoji: '🌟', message: 'A star from the sky, because you shine!' },
  { emoji: '🎂', message: 'A slice of cake to celebrate you!' },
  { emoji: '🦄', message: 'A magical unicorn friend!' },
  { emoji: '🌈', message: 'A rainbow to color your world!' },
];

const GiftApp = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [currentGift, setCurrentGift] = useState(gifts[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const openGift = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Pick random gift
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
    setCurrentGift(randomGift);
    
    setTimeout(() => {
      setIsOpened(true);
      setIsAnimating(false);
    }, 500);
  };

  const resetGift = () => {
    setIsOpened(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="font-pixel text-xl text-primary mb-6">🎁 Surprise Gift!</h2>
      
      <div className="relative">
        {/* Sparkles */}
        {isOpened && (
          <>
            {[...Array(8)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-kawaii-yellow sparkle"
                style={{
                  left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 80}px`,
                  top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 80}px`,
                  animationDelay: `${i * 0.1}s`,
                  width: '20px',
                  height: '20px',
                }}
              />
            ))}
          </>
        )}

        {/* Gift box */}
        <button
          onClick={isOpened ? resetGift : openGift}
          disabled={isAnimating}
          className={`
            relative kawaii-btn
            w-40 h-40 rounded-2xl
            flex items-center justify-center
            transition-all duration-500
            ${isOpened 
              ? 'bg-gradient-to-br from-kawaii-pink to-kawaii-purple' 
              : 'bg-gradient-to-br from-kawaii-purple to-kawaii-lavender hover:scale-110'
            }
            ${isAnimating ? 'animate-bounce' : ''}
          `}
        >
          {isOpened ? (
            <div className="text-center animate-bounce-in">
              <span className="text-6xl block mb-2">{currentGift.emoji}</span>
            </div>
          ) : (
            <div className="text-center">
              <Gift className="w-16 h-16 text-white mb-2 mx-auto" />
              <span className="text-white text-sm font-pixel">Click to open!</span>
            </div>
          )}

          {/* Ribbon */}
          {!isOpened && (
            <>
              <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-kawaii-pink opacity-80" />
              <div className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 bg-kawaii-pink opacity-80" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-6 bg-kawaii-pink rounded-t-full" />
            </>
          )}
        </button>
      </div>

      {/* Message */}
      <div className="mt-6 text-center">
        {isOpened ? (
          <div className="animate-fade-in">
            <p className="text-lg font-medium text-foreground mb-2">
              {currentGift.message}
            </p>
            <p className="text-sm text-muted-foreground">
              Click the gift to try again! ✨
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">
            A special surprise awaits you! 💝
          </p>
        )}
      </div>
    </div>
  );
};

export default GiftApp;