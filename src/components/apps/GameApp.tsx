import { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Trophy, ArrowLeft, Gamepad2 } from 'lucide-react';

// ==================== GAME MENU ====================
interface GameMenuProps {
  onSelect: (game: string) => void;
}

const games = [
  { id: 'memory', name: 'Memory Match', emoji: '🃏', color: 'from-pink-400 to-rose-400', desc: 'Match emoji pairs' },
  { id: 'tictactoe', name: 'Tic Tac Toe', emoji: '❌⭕', color: 'from-blue-400 to-cyan-400', desc: 'Classic XO game' },
  { id: 'snake', name: 'Snake', emoji: '🐍', color: 'from-green-400 to-emerald-400', desc: 'Eat & grow!' },
  { id: 'blocks', name: 'Block Breaker', emoji: '🧱', color: 'from-orange-400 to-amber-400', desc: 'Break all blocks' },
  { id: 'reaction', name: 'Reaction Time', emoji: '⚡', color: 'from-yellow-400 to-orange-400', desc: 'Test your speed' },
  { id: 'puzzle', name: 'Number Puzzle', emoji: '🔢', color: 'from-purple-400 to-violet-400', desc: 'Slide to solve' },
];

const GameMenu = ({ onSelect }: GameMenuProps) => (
  <div className="h-full flex flex-col">
    <h2 className="font-pixel text-xl text-primary mb-4 text-center">🎮 Game Center</h2>
    <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto kawaii-scrollbar">
      {games.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          className="glass rounded-xl p-3 flex flex-col items-center gap-2 hover:scale-105 transition-all group"
        >
          <span className="text-3xl group-hover:animate-bounce">{g.emoji}</span>
          <span className="font-pixel text-sm text-foreground">{g.name}</span>
          <span className="text-xs text-muted-foreground">{g.desc}</span>
        </button>
      ))}
    </div>
  </div>
);

// ==================== BACK HEADER ====================
const BackHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
  <div className="flex items-center gap-2 mb-3">
    <button onClick={onBack} className="p-1.5 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors">
      <ArrowLeft className="w-4 h-4 text-primary" />
    </button>
    <h2 className="font-pixel text-lg text-primary flex-1">{title}</h2>
  </div>
);

// ==================== MEMORY GAME ====================
const emojis = ['🌸', '🎀', '💖', '⭐', '🌈', '🦋', '🍰', '🎁'];
const allCards = [...emojis, ...emojis];

const shuffleArray = <T,>(array: T[]): T[] => {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const MemoryGame = ({ onBack }: { onBack: () => void }) => {
  const [cards, setCards] = useState<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [locked, setLocked] = useState(false);

  const init = () => {
    setCards(shuffleArray(allCards).map((emoji, i) => ({ id: i, emoji, isFlipped: false, isMatched: false })));
    setFlipped([]); setMoves(0); setMatches(0); setLocked(false);
  };
  useEffect(init, []);

  const click = (id: number) => {
    if (locked || cards[id].isFlipped || cards[id].isMatched) return;
    const c = [...cards]; c[id].isFlipped = true; setCards(c);
    const f = [...flipped, id]; setFlipped(f);
    if (f.length === 2) {
      setMoves(m => m + 1); setLocked(true);
      const [a, b] = f;
      if (cards[a].emoji === cards[b].emoji) {
        setTimeout(() => { const m2 = [...cards]; m2[a].isMatched = m2[b].isMatched = true; setCards(m2); setMatches(m => m + 1); setFlipped([]); setLocked(false); }, 500);
      } else {
        setTimeout(() => { const r = [...cards]; r[a].isFlipped = r[b].isFlipped = false; setCards(r); setFlipped([]); setLocked(false); }, 800);
      }
    }
  };

  const won = matches === emojis.length;

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="🃏 Memory Match" onBack={onBack} />
      <div className="flex justify-center gap-4 mb-3 text-sm">
        <span className="glass px-3 py-1 rounded-full">Moves: <b className="text-primary">{moves}</b></span>
        <span className="glass px-3 py-1 rounded-full">Matches: <b className="text-primary">{matches}/{emojis.length}</b></span>
        <button onClick={init} className="p-1.5 rounded-full bg-primary/20 hover:bg-primary/40"><RotateCcw className="w-4 h-4 text-primary" /></button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {won ? (
          <div className="text-center animate-bounce-in">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
            <p className="font-pixel text-xl text-primary mb-2">You Won! 🎉</p>
            <p className="text-muted-foreground mb-3">In {moves} moves</p>
            <button onClick={init} className="px-4 py-2 rounded-full bg-primary text-primary-foreground">Play Again</button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1.5">
            {cards.map(c => (
              <button key={c.id} onClick={() => click(c.id)} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-xl sm:text-2xl transition-all ${c.isFlipped || c.isMatched ? 'bg-white shadow-md' : 'glass cursor-pointer hover:scale-105'} ${c.isMatched ? 'opacity-60' : ''}`}>
                {c.isFlipped || c.isMatched ? c.emoji : '✿'}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== TIC TAC TOE ====================
const TicTacToe = ({ onBack }: { onBack: () => void }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const check = (b: (string | null)[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a, bb, c] of lines) if (b[a] && b[a] === b[bb] && b[a] === b[c]) return b[a];
    return b.every(Boolean) ? 'Draw' : null;
  };

  const click = (i: number) => {
    if (board[i] || winner) return;
    const b = [...board]; b[i] = isX ? '❌' : '⭕'; setBoard(b);
    const w = check(b); if (w) setWinner(w); else setIsX(!isX);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setIsX(true); setWinner(null); };

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="❌⭕ Tic Tac Toe" onBack={onBack} />
      <div className="text-center mb-3">
        {winner ? (
          <p className="font-pixel text-lg text-primary">{winner === 'Draw' ? "It's a Draw! 🤝" : `${winner} Wins! 🎉`}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Turn: <span className="text-xl">{isX ? '❌' : '⭕'}</span></p>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, i) => (
            <button key={i} onClick={() => click(i)} className="w-16 h-16 sm:w-20 sm:h-20 glass rounded-xl flex items-center justify-center text-3xl sm:text-4xl hover:scale-105 transition-all cursor-pointer">
              {cell}
            </button>
          ))}
        </div>
      </div>
      {winner && (
        <div className="text-center mt-3">
          <button onClick={reset} className="px-4 py-2 rounded-full bg-primary text-primary-foreground">Play Again</button>
        </div>
      )}
    </div>
  );
};

// ==================== SNAKE GAME ====================
const GRID = 15;
const SnakeGame = ({ onBack }: { onBack: () => void }) => {
  const [snake, setSnake] = useState([[7, 7], [7, 8]]);
  const [food, setFood] = useState([3, 3]);
  const [dir, setDir] = useState<[number, number]>([0, -1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  const spawnFood = (s: number[][]) => {
    let f: number[];
    do { f = [Math.floor(Math.random() * GRID), Math.floor(Math.random() * GRID)]; } while (s.some(([x, y]) => x === f[0] && y === f[1]));
    return f;
  };

  const reset = () => { const s = [[7, 7], [7, 8]]; setSnake(s); setFood(spawnFood(s)); setDir([0, -1]); setGameOver(false); setScore(0); setRunning(true); };

  useEffect(() => {
    if (!running || gameOver) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const d = dirRef.current;
        const head = [(prev[0][0] + d[0] + GRID) % GRID, (prev[0][1] + d[1] + GRID) % GRID];
        if (prev.some(([x, y]) => x === head[0] && y === head[1])) { setGameOver(true); setRunning(false); return prev; }
        const next = [head, ...prev];
        if (head[0] === food[0] && head[1] === food[1]) { setScore(s => s + 1); setFood(spawnFood(next)); return next; }
        next.pop(); return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [running, gameOver, food]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const map: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, -1] };
      // Fix: proper direction mapping
      const dirMap: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (dirMap[e.key]) { e.preventDefault(); setDir(dirMap[e.key]); }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  const cellSize = 'w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]';

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="🐍 Snake" onBack={onBack} />
      <div className="text-center mb-2">
        <span className="glass px-3 py-1 rounded-full text-sm">Score: <b className="text-primary">{score}</b></span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        {!running && !gameOver ? (
          <button onClick={reset} className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-pixel">Start Game</button>
        ) : (
          <>
            <div className="glass rounded-lg p-1" style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: '1px' }}>
              {Array.from({ length: GRID * GRID }).map((_, i) => {
                const r = Math.floor(i / GRID), c = i % GRID;
                const isSnake = snake.some(([sr, sc]) => sr === r && sc === c);
                const isHead = snake[0][0] === r && snake[0][1] === c;
                const isFood = food[0] === r && food[1] === c;
                return (
                  <div key={i} className={`${cellSize} rounded-sm ${isHead ? 'bg-green-500' : isSnake ? 'bg-green-400/80' : isFood ? 'bg-red-400' : 'bg-muted/30'}`} />
                );
              })}
            </div>
            {/* Touch controls */}
            <div className="grid grid-cols-3 gap-1 w-28">
              <div />
              <button onClick={() => setDir([-1, 0])} className="glass rounded-lg p-2 text-center text-lg">↑</button>
              <div />
              <button onClick={() => setDir([0, -1])} className="glass rounded-lg p-2 text-center text-lg">←</button>
              <button onClick={() => setDir([1, 0])} className="glass rounded-lg p-2 text-center text-lg">↓</button>
              <button onClick={() => setDir([0, 1])} className="glass rounded-lg p-2 text-center text-lg">→</button>
            </div>
          </>
        )}
        {gameOver && (
          <div className="text-center animate-bounce-in">
            <p className="font-pixel text-lg text-primary mb-2">Game Over! Score: {score}</p>
            <button onClick={reset} className="px-4 py-2 rounded-full bg-primary text-primary-foreground">Retry</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== BLOCK BREAKER ====================
const BlockBreaker = ({ onBack }: { onBack: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const animRef = useRef<number>(0);
  const stateRef = useRef<any>(null);

  const init = useCallback(() => {
    const cols = 7, rows = 4, bw = 38, bh = 14, pad = 4;
    const blocks: { x: number; y: number; w: number; h: number; alive: boolean }[] = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      blocks.push({ x: c * (bw + pad) + 10, y: r * (bh + pad) + 10, w: bw, h: bh, alive: true });
    }
    stateRef.current = {
      ball: { x: 150, y: 200, dx: 2, dy: -2, r: 5 },
      paddle: { x: 120, w: 50, h: 8 },
      blocks, score: 0,
    };
    setScore(0); setGameOver(false); setStarted(true);
  }, []);

  useEffect(() => {
    if (!started || gameOver) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const W = canvas.width, H = canvas.height;

    const loop = () => {
      const s = stateRef.current; if (!s) return;
      const { ball, paddle, blocks } = s;
      ball.x += ball.dx; ball.y += ball.dy;
      if (ball.x <= ball.r || ball.x >= W - ball.r) ball.dx *= -1;
      if (ball.y <= ball.r) ball.dy *= -1;
      if (ball.y >= H - paddle.h - ball.r && ball.x >= paddle.x && ball.x <= paddle.x + paddle.w) { ball.dy = -Math.abs(ball.dy); }
      if (ball.y > H) { setGameOver(true); return; }
      for (const b of blocks) {
        if (!b.alive) continue;
        if (ball.x >= b.x && ball.x <= b.x + b.w && ball.y - ball.r <= b.y + b.h && ball.y + ball.r >= b.y) {
          b.alive = false; ball.dy *= -1; s.score++; setScore(s.score);
        }
      }
      // Draw
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'hsl(330, 70%, 65%)';
      ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'hsl(280, 60%, 75%)';
      ctx.fillRect(paddle.x, H - paddle.h, paddle.w, paddle.h);
      blocks.forEach((b, i) => {
        if (!b.alive) return;
        const hue = [330, 280, 200, 160][Math.floor(i / 7) % 4];
        ctx.fillStyle = `hsl(${hue}, 60%, 70%)`;
        ctx.fillRect(b.x, b.y, b.w, b.h);
      });
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [started, gameOver]);

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!stateRef.current || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
      stateRef.current.paddle.x = Math.max(0, Math.min(x - 25, canvasRef.current.width - 50));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('touchmove', move); };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="🧱 Block Breaker" onBack={onBack} />
      <div className="text-center mb-2">
        <span className="glass px-3 py-1 rounded-full text-sm">Score: <b className="text-primary">{score}</b></span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {!started ? (
          <button onClick={init} className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-pixel">Start</button>
        ) : gameOver ? (
          <div className="text-center animate-bounce-in">
            <p className="font-pixel text-lg text-primary mb-2">Game Over! Score: {score}</p>
            <button onClick={init} className="px-4 py-2 rounded-full bg-primary text-primary-foreground">Retry</button>
          </div>
        ) : (
          <canvas ref={canvasRef} width={300} height={250} className="glass rounded-xl cursor-pointer touch-none" />
        )}
      </div>
    </div>
  );
};

// ==================== REACTION TIME ====================
const ReactionGame = ({ onBack }: { onBack: () => void }) => {
  const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'done'>('idle');
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState(0);
  const [best, setBest] = useState(999);
  const timerRef = useRef<any>(null);

  const start = () => {
    setState('waiting');
    timerRef.current = setTimeout(() => {
      setState('ready'); setStartTime(Date.now());
    }, 1000 + Math.random() * 3000);
  };

  const click = () => {
    if (state === 'waiting') { clearTimeout(timerRef.current); setState('idle'); return; }
    if (state === 'ready') {
      const t = Date.now() - startTime; setResult(t);
      if (t < best) setBest(t); setState('done');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="⚡ Reaction Time" onBack={onBack} />
      <div className="flex-1 flex items-center justify-center">
        <button
          onClick={state === 'idle' || state === 'done' ? start : click}
          className={`w-48 h-48 rounded-full flex flex-col items-center justify-center text-white font-pixel transition-all ${
            state === 'waiting' ? 'bg-red-400 scale-95' :
            state === 'ready' ? 'bg-green-400 scale-110 animate-pulse' :
            'bg-primary hover:scale-105'
          }`}
        >
          {state === 'idle' && <><span className="text-3xl mb-2">⚡</span><span>Tap to Start</span></>}
          {state === 'waiting' && <><span className="text-2xl mb-2">🔴</span><span className="text-sm">Wait for green...</span><span className="text-xs mt-1">(tap = too early)</span></>}
          {state === 'ready' && <><span className="text-3xl mb-2">🟢</span><span>TAP NOW!</span></>}
          {state === 'done' && <><span className="text-3xl mb-1">{result < 300 ? '🏆' : result < 500 ? '⚡' : '🐢'}</span><span className="text-2xl">{result}ms</span><span className="text-xs mt-1">Best: {best}ms</span><span className="text-xs mt-2">Tap to retry</span></>}
        </button>
      </div>
    </div>
  );
};

// ==================== NUMBER PUZZLE (15-puzzle) ====================
const NumberPuzzle = ({ onBack }: { onBack: () => void }) => {
  const SIZE = 4;
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const init = () => {
    let arr: number[];
    do {
      arr = shuffleArray([...Array(15)].map((_, i) => i + 1).concat([0]));
    } while (!isSolvable(arr));
    setTiles(arr); setMoves(0); setWon(false);
  };

  const isSolvable = (arr: number[]) => {
    let inv = 0;
    const flat = arr.filter(n => n !== 0);
    for (let i = 0; i < flat.length; i++) for (let j = i + 1; j < flat.length; j++) if (flat[i] > flat[j]) inv++;
    const blankRow = Math.floor(arr.indexOf(0) / SIZE);
    return (SIZE % 2 === 0) ? (blankRow % 2 === 0 ? inv % 2 === 1 : inv % 2 === 0) : inv % 2 === 0;
  };

  useEffect(init, []);

  const click = (i: number) => {
    if (won || tiles[i] === 0) return;
    const blank = tiles.indexOf(0);
    const [br, bc] = [Math.floor(blank / SIZE), blank % SIZE];
    const [tr, tc] = [Math.floor(i / SIZE), i % SIZE];
    if ((Math.abs(br - tr) === 1 && bc === tc) || (Math.abs(bc - tc) === 1 && br === tr)) {
      const next = [...tiles]; [next[i], next[blank]] = [next[blank], next[i]];
      setTiles(next); setMoves(m => m + 1);
      if (next.slice(0, -1).every((v, j) => v === j + 1)) setWon(true);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="🔢 Number Puzzle" onBack={onBack} />
      <div className="flex justify-center gap-4 mb-3 text-sm">
        <span className="glass px-3 py-1 rounded-full">Moves: <b className="text-primary">{moves}</b></span>
        <button onClick={init} className="p-1.5 rounded-full bg-primary/20 hover:bg-primary/40"><RotateCcw className="w-4 h-4 text-primary" /></button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {won ? (
          <div className="text-center animate-bounce-in">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
            <p className="font-pixel text-xl text-primary mb-2">Solved! 🎉</p>
            <p className="text-muted-foreground mb-3">In {moves} moves</p>
            <button onClick={init} className="px-4 py-2 rounded-full bg-primary text-primary-foreground">Play Again</button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1">
            {tiles.map((t, i) => (
              <button
                key={i}
                onClick={() => click(i)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center font-pixel text-lg transition-all ${
                  t === 0 ? 'bg-transparent' : 'glass cursor-pointer hover:scale-105 text-foreground shadow-sm'
                }`}
              >
                {t || ''}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== MAIN GAME APP ====================
const GameApp = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  if (!currentGame) return <GameMenu onSelect={setCurrentGame} />;

  const back = () => setCurrentGame(null);
  switch (currentGame) {
    case 'memory': return <MemoryGame onBack={back} />;
    case 'tictactoe': return <TicTacToe onBack={back} />;
    case 'snake': return <SnakeGame onBack={back} />;
    case 'blocks': return <BlockBreaker onBack={back} />;
    case 'reaction': return <ReactionGame onBack={back} />;
    case 'puzzle': return <NumberPuzzle onBack={back} />;
    default: return <GameMenu onSelect={setCurrentGame} />;
  }
};

export default GameApp;
