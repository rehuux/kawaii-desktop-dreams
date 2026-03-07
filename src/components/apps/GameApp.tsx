import { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Trophy, ArrowLeft, Star } from 'lucide-react';

// ==================== GAME MENU ====================
interface GameMenuProps {
  onSelect: (game: string) => void;
  highScores: Record<string, number>;
}

const games = [
  { id: 'memory', name: 'Memory Match', emoji: '🃏', desc: 'Match emoji pairs' },
  { id: 'tictactoe', name: 'Tic Tac Toe', emoji: '❌⭕', desc: 'Beat the AI!' },
  { id: 'snake', name: 'Snake', emoji: '🐍', desc: 'Eat & grow!' },
  { id: 'blocks', name: 'Block Breaker', emoji: '🧱', desc: 'Break all blocks' },
  { id: 'reaction', name: 'Reaction Time', emoji: '⚡', desc: 'Test your speed' },
  { id: 'puzzle', name: 'Number Puzzle', emoji: '🔢', desc: 'Slide to solve' },
];

const GameMenu = ({ onSelect, highScores }: GameMenuProps) => (
  <div className="h-full flex flex-col">
    <h2 className="font-pixel text-xl text-primary mb-3 text-center">🎮 Game Center</h2>
    <div className="grid grid-cols-2 gap-2.5 flex-1 overflow-y-auto kawaii-scrollbar">
      {games.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          className="glass rounded-xl p-3 flex flex-col items-center gap-1.5 hover:scale-105 transition-all group relative"
        >
          <span className="text-3xl group-hover:animate-bounce">{g.emoji}</span>
          <span className="font-pixel text-xs text-foreground">{g.name}</span>
          <span className="text-[10px] text-muted-foreground">{g.desc}</span>
          {highScores[g.id] !== undefined && (
            <span className="absolute top-1.5 right-1.5 flex items-center gap-0.5 text-[9px] text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded-full">
              <Star className="w-2.5 h-2.5 fill-yellow-500" />
              {highScores[g.id]}
            </span>
          )}
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
    <h2 className="font-pixel text-sm text-primary flex-1">{title}</h2>
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

const MemoryGame = ({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) => {
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
        setTimeout(() => { const m2 = [...cards]; m2[a].isMatched = m2[b].isMatched = true; setCards(m2); setMatches(m => { const newM = m + 1; if (newM === emojis.length) onScore(moves + 1); return newM; }); setFlipped([]); setLocked(false); }, 500);
      } else {
        setTimeout(() => { const r = [...cards]; r[a].isFlipped = r[b].isFlipped = false; setCards(r); setFlipped([]); setLocked(false); }, 800);
      }
    }
  };

  const won = matches === emojis.length;

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="🃏 Memory Match" onBack={onBack} />
      <div className="flex justify-center gap-3 mb-2 text-xs">
        <span className="glass px-2.5 py-1 rounded-full">Moves: <b className="text-primary">{moves}</b></span>
        <span className="glass px-2.5 py-1 rounded-full">Matches: <b className="text-primary">{matches}/{emojis.length}</b></span>
        <button onClick={init} className="p-1.5 rounded-full bg-primary/20 hover:bg-primary/40"><RotateCcw className="w-3.5 h-3.5 text-primary" /></button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {won ? (
          <div className="text-center animate-bounce-in">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
            <p className="font-pixel text-lg text-primary mb-2">You Won! 🎉</p>
            <p className="text-muted-foreground text-sm mb-3">In {moves} moves</p>
            <button onClick={init} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm">Play Again</button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1.5">
            {cards.map(c => (
              <button key={c.id} onClick={() => click(c.id)} className={`w-11 h-11 sm:w-13 sm:h-13 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${c.isFlipped || c.isMatched ? 'bg-card shadow-md scale-105' : 'glass cursor-pointer hover:scale-105'} ${c.isMatched ? 'opacity-50 scale-95' : ''}`}>
                {c.isFlipped || c.isMatched ? c.emoji : '✿'}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== TIC TAC TOE (with AI) ====================
const TicTacToe = ({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [wins, setWins] = useState(0);

  const check = (b: (string | null)[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a, bb, c] of lines) if (b[a] && b[a] === b[bb] && b[a] === b[c]) return b[a];
    return b.every(Boolean) ? 'Draw' : null;
  };

  // Simple AI
  const aiMove = (b: (string | null)[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    // Try to win
    for (const line of lines) {
      const vals = line.map(i => b[i]);
      if (vals.filter(v => v === '⭕').length === 2 && vals.includes(null)) return line[vals.indexOf(null)];
    }
    // Block player
    for (const line of lines) {
      const vals = line.map(i => b[i]);
      if (vals.filter(v => v === '❌').length === 2 && vals.includes(null)) return line[vals.indexOf(null)];
    }
    // Center
    if (b[4] === null) return 4;
    // Random
    const empty = b.map((v, i) => v === null ? i : -1).filter(i => i >= 0);
    return empty[Math.floor(Math.random() * empty.length)];
  };

  useEffect(() => {
    if (!isX && !winner) {
      const timer = setTimeout(() => {
        const move = aiMove(board);
        if (move === undefined) return;
        const b = [...board]; b[move] = '⭕'; setBoard(b);
        const w = check(b);
        if (w) setWinner(w);
        else setIsX(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isX, winner, board]);

  const click = (i: number) => {
    if (board[i] || winner || !isX) return;
    const b = [...board]; b[i] = '❌'; setBoard(b);
    const w = check(b);
    if (w) {
      setWinner(w);
      if (w === '❌') { setWins(v => v + 1); onScore(wins + 1); }
    } else setIsX(false);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setIsX(true); setWinner(null); };

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="❌⭕ Tic Tac Toe vs AI" onBack={onBack} />
      <div className="text-center mb-2">
        <span className="glass px-3 py-1 rounded-full text-xs">Wins: <b className="text-primary">{wins}</b></span>
        {winner ? (
          <p className="font-pixel text-base text-primary mt-2">{winner === 'Draw' ? "Draw! 🤝" : winner === '❌' ? 'You Win! 🎉' : 'AI Wins! 🤖'}</p>
        ) : (
          <p className="text-xs text-muted-foreground mt-2">{isX ? 'Your turn ❌' : 'AI thinking... ⭕'}</p>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, i) => (
            <button key={i} onClick={() => click(i)} className={`w-14 h-14 sm:w-18 sm:h-18 glass rounded-xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-200 ${!cell && isX && !winner ? 'cursor-pointer hover:scale-110 hover:bg-accent/30' : ''} ${cell ? 'scale-100' : 'scale-95'}`}>
              {cell}
            </button>
          ))}
        </div>
      </div>
      {winner && (
        <div className="text-center mt-2">
          <button onClick={reset} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm">Play Again</button>
        </div>
      )}
    </div>
  );
};

// ==================== SNAKE GAME ====================
const GRID = 15;
const SnakeGame = ({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) => {
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
        if (head[0] === food[0] && head[1] === food[1]) {
          setScore(s => { const ns = s + 1; onScore(ns); return ns; });
          setFood(spawnFood(next)); return next;
        }
        next.pop(); return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [running, gameOver, food]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const dirMap: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (dirMap[e.key]) { e.preventDefault(); setDir(dirMap[e.key]); }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  const cellSize = 'w-[17px] h-[17px] sm:w-[20px] sm:h-[20px]';

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="🐍 Snake" onBack={onBack} />
      <div className="text-center mb-2">
        <span className="glass px-3 py-1 rounded-full text-xs">Score: <b className="text-primary">{score}</b></span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        {!running && !gameOver ? (
          <button onClick={reset} className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-pixel text-sm">Start Game</button>
        ) : (
          <>
            <div className="glass rounded-lg p-1" style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: '1px' }}>
              {Array.from({ length: GRID * GRID }).map((_, i) => {
                const r = Math.floor(i / GRID), c = i % GRID;
                const isSnake = snake.some(([sr, sc]) => sr === r && sc === c);
                const isHead = snake[0][0] === r && snake[0][1] === c;
                const isFood = food[0] === r && food[1] === c;
                return (
                  <div key={i} className={`${cellSize} rounded-sm transition-colors ${isHead ? 'bg-green-500' : isSnake ? 'bg-green-400/80' : isFood ? 'bg-red-400 animate-pulse' : 'bg-muted/30'}`} />
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-1 w-24">
              <div />
              <button onClick={() => setDir([-1, 0])} className="glass rounded-lg p-1.5 text-center text-sm">↑</button>
              <div />
              <button onClick={() => setDir([0, -1])} className="glass rounded-lg p-1.5 text-center text-sm">←</button>
              <button onClick={() => setDir([1, 0])} className="glass rounded-lg p-1.5 text-center text-sm">↓</button>
              <button onClick={() => setDir([0, 1])} className="glass rounded-lg p-1.5 text-center text-sm">→</button>
            </div>
          </>
        )}
        {gameOver && (
          <div className="text-center animate-bounce-in">
            <p className="font-pixel text-base text-primary mb-2">Game Over! Score: {score}</p>
            <button onClick={reset} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm">Retry</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== BLOCK BREAKER ====================
const BlockBreaker = ({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) => {
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
      if (ball.y >= H - paddle.h - ball.r && ball.x >= paddle.x && ball.x <= paddle.x + paddle.w) ball.dy = -Math.abs(ball.dy);
      if (ball.y > H) { setGameOver(true); onScore(s.score); return; }
      for (const b of blocks) {
        if (!b.alive) continue;
        if (ball.x >= b.x && ball.x <= b.x + b.w && ball.y - ball.r <= b.y + b.h && ball.y + ball.r >= b.y) {
          b.alive = false; ball.dy *= -1; s.score++; setScore(s.score);
        }
      }
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
        <span className="glass px-3 py-1 rounded-full text-xs">Score: <b className="text-primary">{score}</b></span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {!started ? (
          <button onClick={init} className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-pixel text-sm">Start</button>
        ) : gameOver ? (
          <div className="text-center animate-bounce-in">
            <p className="font-pixel text-base text-primary mb-2">Game Over! Score: {score}</p>
            <button onClick={init} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm">Retry</button>
          </div>
        ) : (
          <canvas ref={canvasRef} width={300} height={250} className="glass rounded-xl cursor-pointer touch-none" />
        )}
      </div>
    </div>
  );
};

// ==================== REACTION TIME ====================
const ReactionGame = ({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) => {
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
      if (t < best) { setBest(t); onScore(t); }
      setState('done');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="⚡ Reaction Time" onBack={onBack} />
      <div className="flex-1 flex items-center justify-center">
        <button
          onClick={state === 'idle' || state === 'done' ? start : click}
          className={`w-40 h-40 rounded-full flex flex-col items-center justify-center text-white font-pixel transition-all duration-300 ${
            state === 'waiting' ? 'bg-red-400 scale-95' :
            state === 'ready' ? 'bg-green-400 scale-110 animate-pulse' :
            'bg-primary hover:scale-105'
          }`}
        >
          {state === 'idle' && <><span className="text-2xl mb-1">⚡</span><span className="text-sm">Tap to Start</span></>}
          {state === 'waiting' && <><span className="text-xl mb-1">🔴</span><span className="text-xs">Wait for green...</span></>}
          {state === 'ready' && <><span className="text-2xl mb-1">🟢</span><span className="text-sm">TAP NOW!</span></>}
          {state === 'done' && <><span className="text-2xl mb-1">{result < 300 ? '🏆' : result < 500 ? '⚡' : '🐢'}</span><span className="text-xl">{result}ms</span><span className="text-[10px] mt-1">Best: {best}ms</span><span className="text-[10px] mt-1">Tap to retry</span></>}
        </button>
      </div>
    </div>
  );
};

// ==================== NUMBER PUZZLE ====================
const NumberPuzzle = ({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) => {
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
      if (next.slice(0, -1).every((v, j) => v === j + 1)) { setWon(true); onScore(moves + 1); }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="🔢 Number Puzzle" onBack={onBack} />
      <div className="flex justify-center gap-3 mb-2 text-xs">
        <span className="glass px-2.5 py-1 rounded-full">Moves: <b className="text-primary">{moves}</b></span>
        <button onClick={init} className="p-1.5 rounded-full bg-primary/20 hover:bg-primary/40"><RotateCcw className="w-3.5 h-3.5 text-primary" /></button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {won ? (
          <div className="text-center animate-bounce-in">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
            <p className="font-pixel text-lg text-primary mb-2">Solved! 🎉</p>
            <p className="text-muted-foreground text-sm mb-3">In {moves} moves</p>
            <button onClick={init} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm">Play Again</button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1">
            {tiles.map((t, i) => (
              <button
                key={i}
                onClick={() => click(i)}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-lg flex items-center justify-center font-pixel text-base transition-all duration-200 ${
                  t === 0 ? 'bg-transparent' : 'glass cursor-pointer hover:scale-110 text-foreground shadow-sm active:scale-95'
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
  const [highScores, setHighScores] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem('game-scores') || '{}'); } catch { return {}; }
  });

  const updateScore = (game: string, score: number, lowerIsBetter = false) => {
    setHighScores(prev => {
      const current = prev[game];
      const isBetter = current === undefined || (lowerIsBetter ? score < current : score > current);
      if (!isBetter) return prev;
      const next = { ...prev, [game]: score };
      localStorage.setItem('game-scores', JSON.stringify(next));
      return next;
    });
  };

  if (!currentGame) return <GameMenu onSelect={setCurrentGame} highScores={highScores} />;

  const back = () => setCurrentGame(null);
  switch (currentGame) {
    case 'memory': return <MemoryGame onBack={back} onScore={(s) => updateScore('memory', s, true)} />;
    case 'tictactoe': return <TicTacToe onBack={back} onScore={(s) => updateScore('tictactoe', s)} />;
    case 'snake': return <SnakeGame onBack={back} onScore={(s) => updateScore('snake', s)} />;
    case 'blocks': return <BlockBreaker onBack={back} onScore={(s) => updateScore('blocks', s)} />;
    case 'reaction': return <ReactionGame onBack={back} onScore={(s) => updateScore('reaction', s, true)} />;
    case 'puzzle': return <NumberPuzzle onBack={back} onScore={(s) => updateScore('puzzle', s, true)} />;
    default: return <GameMenu onSelect={setCurrentGame} highScores={highScores} />;
  }
};

export default GameApp;
