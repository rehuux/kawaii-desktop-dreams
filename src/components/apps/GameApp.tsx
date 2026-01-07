import { useState, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

const emojis = ['🌸', '🎀', '💖', '⭐', '🌈', '🦋', '🍰', '🎁'];
const allCards = [...emojis, ...emojis];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const GameApp = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = () => {
    const shuffled = shuffleArray(allCards);
    const newCards: Card[] = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsLocked(false);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matches === emojis.length) {
      setGameWon(true);
    }
  }, [matches]);

  const handleCardClick = (id: number) => {
    if (isLocked) return;
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsLocked(true);

      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        // Match found!
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setMatches((prev) => prev + 1);
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-pixel text-xl text-primary">🎮 Memory Game</h2>
        <button
          onClick={initializeGame}
          className="kawaii-btn flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-white text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Restart
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-6 mb-4 text-sm">
        <span className="glass px-3 py-1 rounded-full">
          Moves: <span className="font-bold text-primary">{moves}</span>
        </span>
        <span className="glass px-3 py-1 rounded-full">
          Matches: <span className="font-bold text-primary">{matches}/{emojis.length}</span>
        </span>
      </div>

      {/* Game board */}
      <div className="flex-1 flex items-center justify-center">
        {gameWon ? (
          <div className="text-center animate-bounce-in">
            <Trophy className="w-16 h-16 text-kawaii-yellow mx-auto mb-4" />
            <h3 className="font-pixel text-2xl text-primary mb-2">You Won! 🎉</h3>
            <p className="text-muted-foreground mb-4">
              Completed in {moves} moves!
            </p>
            <button
              onClick={initializeGame}
              className="kawaii-btn px-6 py-2 rounded-full bg-primary text-white"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 p-2">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isFlipped || card.isMatched}
                className={`
                  w-14 h-14 sm:w-16 sm:h-16 rounded-xl
                  flex items-center justify-center
                  text-2xl sm:text-3xl
                  transition-all duration-300
                  ${card.isFlipped || card.isMatched
                    ? 'bg-white shadow-lg scale-100'
                    : 'glass cursor-pointer hover:scale-105 hover:shadow-md'
                  }
                  ${card.isMatched ? 'opacity-70' : ''}
                `}
                style={{
                  transform: card.isFlipped || card.isMatched 
                    ? 'rotateY(0deg)' 
                    : 'rotateY(180deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {card.isFlipped || card.isMatched ? (
                  card.emoji
                ) : (
                  <span className="text-primary">✿</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-muted-foreground text-xs mt-4">
        Match all the pairs! 💕
      </p>
    </div>
  );
};

export default GameApp;