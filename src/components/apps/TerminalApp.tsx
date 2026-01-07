import { useState, useEffect, useRef } from 'react';

const terminalLines = [
  '> Initializing Kawaii OS...',
  '> Loading memories... ████████████ 100%',
  '> Connecting to heart database... ❤️',
  '> Fetching cute cat pictures... 🐱',
  '> Applying sparkle filters... ✨',
  '> Calibrating happiness levels... 📈',
  '> System status: MAXIMUM KAWAII',
  '> ',
  '> Welcome, user! You are wonderful! 💖',
  '> Type "help" for available commands~',
  '> ',
];

const commands: Record<string, string[]> = {
  help: [
    '> Available commands:',
    '>   hello  - Say hi!',
    '>   love   - Get some love',
    '>   cat    - See a cat',
    '>   clear  - Clear terminal',
    '>   about  - About this OS',
  ],
  hello: ['> Hello there! (◕‿◕)♡', '> Nice to meet you!'],
  love: ['> Sending love your way! 💕💖💗💓💝'],
  cat: ['> Here\'s a cat for you!', '>   /\\_/\\', '>  ( o.o )', '>   > ^ <', '> Meow~ 🐱'],
  about: [
    '> Kawaii OS v1.0',
    '> A cute mini operating system',
    '> Made with love and sparkles ✨',
  ],
};

const TerminalApp = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing animation for initial lines
  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, terminalLines[currentLine]]);
        setCurrentLine((prev) => prev + 1);
      }, 200 + Math.random() * 300);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentLine]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.toLowerCase().trim();
    setLines((prev) => [...prev, `> ${cmd}`]);

    if (trimmedCmd === 'clear') {
      setLines([]);
      return;
    }

    const response = commands[trimmedCmd];
    if (response) {
      response.forEach((line, i) => {
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
        }, i * 100);
      });
    } else if (trimmedCmd) {
      setLines((prev) => [
        ...prev,
        `> Command not found: "${trimmedCmd}"`,
        '> Type "help" for available commands~',
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div 
      className="h-full flex flex-col bg-terminal-bg rounded-lg overflow-hidden font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-black/50">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-white/60 text-xs">kawaii-terminal</span>
      </div>

      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-auto kawaii-scrollbar"
      >
        {lines.map((line, index) => (
          <div 
            key={index} 
            className="terminal-text text-sm leading-relaxed whitespace-pre"
          >
            {line}
          </div>
        ))}
        
        {/* Blinking cursor during typing */}
        {isTyping && (
          <span className="terminal-text animate-pulse">▋</span>
        )}
      </div>

      {/* Input */}
      {!isTyping && (
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-2 bg-black/30">
          <span className="terminal-text mr-2">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent terminal-text outline-none text-sm"
            placeholder="Type a command..."
            autoFocus
          />
        </form>
      )}
    </div>
  );
};

export default TerminalApp;