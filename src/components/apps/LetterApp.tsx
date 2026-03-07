import { useState, useEffect } from 'react';
import { Heart, Mail, MailOpen } from 'lucide-react';

const paragraphs = [
  "Dear iram,",
  "I don't know if you'll ever read this, but I wanted these words to exist somewhere — honestly, quietly.",
  "You were never just a chapter of my life. You were a whole feeling, a season that changed me in ways I still can't fully explain.",
  "I know our paths are different now. I know your heart belongs to another journey, and I respect that more than you'll ever know. Loving someone also means knowing when to step back and let them be happy — even if that happiness isn't with you.",
  "I won't pretend that I stopped caring. Some feelings don't leave, they only learn how to stay silent. And mine will always wish you peace, love, and a life that feels gentle to you.",
  "Wherever life takes you, I hope it treats you kindly. And if you ever think of me, I hope it's with a small smile — not sadness.",
];

const LetterApp = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    if (!isOpened) return;
    setVisibleLines(0);
    setShowSignature(false);

    const timers: NodeJS.Timeout[] = [];
    paragraphs.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), (i + 1) * 600));
    });
    timers.push(setTimeout(() => setShowSignature(true), (paragraphs.length + 1) * 600));

    return () => timers.forEach(clearTimeout);
  }, [isOpened]);

  if (!isOpened) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-32 h-24 bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg shadow-xl flex items-center justify-center animate-pulse">
            <Mail className="w-12 h-12 text-rose-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
            1
          </div>
        </div>
        <p className="font-pixel text-muted-foreground text-sm">You have a letter 💌</p>
        <button
          onClick={() => setIsOpened(true)}
          className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-pixel shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
        >
          <MailOpen className="w-4 h-4" />
          Open Letter
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-pixel text-xl text-primary flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
          A Letter For You
        </h2>
        <button
          onClick={() => setIsOpened(false)}
          className="text-xs text-muted-foreground hover:text-primary transition-colors font-pixel"
        >
          Close ✕
        </button>
      </div>

      <div className="flex-1 paper-note rounded-lg p-6 overflow-auto kawaii-scrollbar shadow-inner relative">
        {/* Decorative corner */}
        <div className="absolute top-2 right-3 text-2xl opacity-30">🌸</div>
        <div className="absolute bottom-2 left-3 text-2xl opacity-30">🎀</div>

        <div className="max-w-md mx-auto space-y-4 text-foreground leading-relaxed">
          {paragraphs.map((text, i) => (
            <p
              key={i}
              className={`transition-all duration-700 ${
                i < visibleLines
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              } ${i === 0 ? 'text-lg font-medium text-primary' : ''}`}
            >
              {text}
            </p>
          ))}

          {showSignature && (
            <div className="text-right mt-8 animate-fade-in">
              <p className="text-foreground">
                Always wishing you the best,
              </p>
              <span className="font-pixel text-primary text-lg inline-flex items-center gap-1">
                ~ Rehan <Heart className="w-4 h-4 text-rose-400 inline" />
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 mt-3">
        {paragraphs.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              i < visibleLines ? 'bg-primary scale-100' : 'bg-muted scale-75'
            }`}
          />
        ))}
      </div>

      <p className="text-center text-muted-foreground text-xs mt-2">
        Written with love, just for you iram 💖
      </p>
    </div>
  );
};

export default LetterApp;
