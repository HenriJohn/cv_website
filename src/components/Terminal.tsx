import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useExplorer } from '../context/ExplorerContext';

const Terminal: React.FC = () => {
    const { toggleTheme } = useExplorer();
    const [isMinimized, setIsMinimized] = useState(false);
    const [terminalHeight, setTerminalHeight] = useState(200); // Default height in pixels
    const [isDragging, setIsDragging] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
        { command: '', output: 'Welcome to the interactive terminal! Type "help" to see available commands.' }
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const availableCommands = [
        'help', 'about', 'skills', 'experience', 'contact', 'theme', 'clear', 'projects', 'download-cv',
        // Easter eggs
        'sudo', 'hack', 'matrix', 'coffee', 'joke', 'quote', 'konami'
    ];

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Handle terminal resize by dragging
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const newHeight = window.innerHeight - e.clientY;
                // Constrain height between 100px and 80% of window height
                const constrainedHeight = Math.max(100, Math.min(newHeight, window.innerHeight * 0.8));
                setTerminalHeight(constrainedHeight);
            }
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

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode = '';

        switch (cleanCmd) {
            case 'help':
                output = (
                    <div className="text-gray-300">
                        Available commands:
                        <br />  <span className="text-yellow-400">about</span>       - Display profile summary
                        <br />  <span className="text-yellow-400">skills</span>      - List technical skills
                        <br />  <span className="text-yellow-400">experience</span>  - Show work experience
                        <br />  <span className="text-yellow-400">contact</span>     - Show contact info
                        <br />  <span className="text-yellow-400">projects</span>    - View featured projects
                        <br />  <span className="text-yellow-400">download-cv</span> - Download CV as PDF
                        <br />  <span className="text-yellow-400">theme</span>       - Toggle light/dark theme
                        <br />  <span className="text-yellow-400">clear</span>       - Clear terminal
                        <br />
                        <br />  <span className="text-gray-500">💡 Tip: Use ↑/↓ arrows for command history, Tab for autocomplete</span>
                    </div>
                );
                break;
            case 'about':
                output = "Henri-John Plaatjies - Senior Test Automation Engineer. Designing robust automation frameworks and leading QA initiatives across fintech, retail, and mobile platforms.";
                break;
            case 'skills':
                output = (
                    <div>
                        <span className="text-green-400">Automation:</span> Playwright, Robot Framework, Selenium, Appium
                        <br />
                        <span className="text-blue-400">Languages:</span> Java, JavaScript, TypeScript, Python, SQL
                        <br />
                        <span className="text-purple-400">CI/CD:</span> GitLab, Jenkins, Docker, GitHub Actions
                        <br />
                        <span className="text-yellow-400">API Testing:</span> Postman, Newman, GraphQL, REST
                    </div>
                );
                break;
            case 'experience':
                output = (
                    <div>
                        <div className="mb-2">
                            <span className="text-blue-400 font-bold">Scrums.com</span> (Aug 2024 - Present)
                            <br />Senior QA Engineer for PayFast at Network International
                        </div>
                        <div className="mb-2">
                            <span className="text-blue-400 font-bold">Tata Consultancy Services</span> (Feb 2021 - Jul 2024)
                            <br />Test Automation Engineer at Clicks Group
                        </div>
                        <div>
                            <span className="text-blue-400 font-bold">GameSmart</span> (2019 - 2020)
                            <br />Intern - QA Tester
                        </div>
                    </div>
                );
                break;
            case 'contact':
                output = (
                    <div>
                        Email: <a href="mailto:henriplaatjies@gmail.com" className="text-blue-400 underline">henriplaatjies@gmail.com</a>
                        <br />
                        Phone: <span className="text-gray-300">082 389 1647</span>
                        <br />
                        Location: <span className="text-gray-300">Cape Town, South Africa</span>
                    </div>
                );
                break;
            case 'theme':
            case 'theme toggle':
                toggleTheme();
                output = "Theme toggled.";
                break;
            case 'clear':
                setHistory([]);
                setCommandHistory([]);
                setHistoryIndex(-1);
                return;
            case 'projects':
                output = (
                    <div>
                        <span className="text-yellow-400 font-bold">Featured Projects:</span>
                        <br />• Automated PayFast payment gateway testing suite
                        <br />• CI/CD pipeline integration for Clicks Group
                        <br />• Mobile test automation framework with Appium
                        <br />• API testing framework with Playwright
                    </div>
                );
                break;
            case 'download-cv':
            case 'download cv':
                output = (
                    <div>
                        <span className="text-green-400">✓</span> Initiating CV download...
                        <br />📄 <a href="/cv_website/cv.pdf" download="Henri-John_Plaatjies_CV.pdf" className="text-blue-400 underline">Click here to download CV</a>
                    </div>
                );
                break;
            case 'sudo':
            case 'sudo su':
                output = (
                    <div className="text-red-400">
                        [sudo] password for henri-john: 
                        <br />Sorry, try again.
                        <br />[sudo] password for henri-john:
                        <br />Sorry, try again.
                        <br />[sudo] password for henri-john:
                        <br />sudo: 3 incorrect password attempts
                        <br />
                        <br /><span className="text-yellow-400">Nice try! 😄 But you don't have sudo access here.</span>
                    </div>
                );
                break;
            case 'hack':
            case 'hack the planet':
                output = (
                    <div className="text-green-400">
                        <span className="animate-pulse">Initializing hack sequence...</span>
                        <br />▓▓▓▓▓▓▓▓▓▓ 100%
                        <br />
                        <br />Access granted to: <span className="text-red-400">mainframe.gibson.net</span>
                        <br />Bypassing firewall...
                        <br />Decrypting files...
                        <br />
                        <br /><span className="text-yellow-400">🎉 Congratulations! You're now a 1337 h4x0r!</span>
                        <br /><span className="text-gray-400">(Just kidding - this is just a portfolio site 😉)</span>
                    </div>
                );
                break;
            case 'matrix':
                output = (
                    <div className="text-green-400 font-mono">
                        <span className="animate-pulse">Wake up, Neo...</span>
                        <br />The Matrix has you...
                        <br />Follow the white rabbit 🐰
                        <br />
                        <br />01001000 01100101 01101100 01101100 01101111
                        <br />01010111 01101111 01110010 01101100 01100100
                        <br />
                        <br /><span className="text-white">Knock, knock, Neo.</span>
                    </div>
                );
                break;
            case 'coffee':
            case 'make coffee':
                output = (
                    <div className="text-yellow-400">
                        ☕ Brewing fresh coffee...
                        <br />
                        <br />        (  )   (   )  )
                        <br />         ) (   )  (  (
                        <br />         ( )  (    ) )
                        <br />         _____________
                        <br />        {'<_____________>'} ___
                        <br />        |             |/ _ \\
                        <br />        |               | | |
                        <br />        |               |_| |
                        <br />     ___|             |\\___/
                        <br />    /    \\___________/    \\
                        <br />    \\_____________________/
                        <br />
                        <br /><span className="text-green-400">✓ Coffee ready!</span> Time to code! 💻
                    </div>
                );
                break;
            case 'joke':
                const jokes = [
                    "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
                    "QA engineer walks into a bar… Orders 1 beer, 0 beers, -1 beers, \"asdf\" beers, 999999 beers. The bar collapses. 🍺",
                    "Why do Java developers wear glasses? Because they don't C#. 👓",
                    "My code never fails. It just… develops unexpected features. ✨",
                    "What's a programmer's favourite place to hang out? The Foo Bar. 🍻",
                    "How many programmers does it take to change a light bulb? None — that's a hardware problem. 💡",
                    "Why did the developer go broke? Because he used up all his cache. 💸",
                    "I told my computer I needed a break… It said \"No problem, installing updates.\" 🔄",
                    "Why did the QA tester stay calm during production outages? Because they're used to everything breaking. 😌",
                    "Debugging: Being the detective in a crime movie where you are also the murderer. 🔍",
                    "What do testers and magicians have in common? They can both make things disappear — like your assumptions. 🎩",
                    "Why don't programmers like nature? Too many bugs. 🦟",
                    "What do you call a programmer from Finland? Nerdic. 🇫🇮",
                    "What's the most used language in software? Profanity. 🤬",
                    "Why do testers love coffee? Because they turn caffeine into test cases. ☕",
                    "Why did the SQL query break up with the database? There were too many joins. 💔",
                    "My boss told me to stop testing the edge cases… I guess he wants the app to crash in style. 💥",
                    "What do you call 8 Hobbits? A Hobbyte. 🧙",
                    "Why did the developer get locked out of the house? He lost his keys… again. 🔑",
                    "Why don't QAs like surprises? Because surprises are just undocumented features. 📝"
                ];
                output = (
                    <div className="text-cyan-400">
                        😄 {jokes[Math.floor(Math.random() * jokes.length)]}
                    </div>
                );
                break;
            case 'quote':
                const quotes = [
                    '"Programs must be written for people to read, and only incidentally for machines to execute." - Harold Abelson',
                    '"First, solve the problem. Then, write the code." - John Johnson',
                    '"Talk is cheap. Show me the code." - Linus Torvalds',
                    '"Simplicity is the soul of efficiency." - Austin Freeman',
                    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
                    '"Fix the cause, not the symptom." - Steve Maguire',
                    '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
                    '"Before software can be reusable it first has to be usable." - Ralph Johnson',
                    '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
                    '"Programming isn\'t about what you know; it\'s about what you can figure out." - Chris Pine',
                    '"Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday\'s code." - Dan Salomon',
                    '"The best error message is the one that never shows up." - Thomas Fuchs',
                    '"If debugging is the process of removing bugs, then programming must be the process of putting them in." - Edsger Dijkstra',
                    '"The function of good software is to make the complex appear simple." - Grady Booch',
                    '"Your most unhappy customers are your greatest source of learning." - Bill Gates',
                    '"Good software, like wine, takes time." - Joel Spolsky',
                    '"Testing leads to failure, and failure leads to understanding." - Burt Rutan',
                    '"There are only two kinds of programming languages: those people complain about, and those nobody uses." - Bjarne Stroustrup',
                    '"You can\'t improve what you don\'t measure." - Unknown',
                    '"I am what happens when you try to carve god out of the wood of your own hunger." - ChatGPT'
                ];
                output = (
                    <div className="text-purple-400 italic">
                        💭 {quotes[Math.floor(Math.random() * quotes.length)]}
                    </div>
                );
                break;
            case 'konami':
            case '↑↑↓↓←→←→ba':
                output = (
                    <div className="text-yellow-400">
                        <span className="text-2xl">🎮 KONAMI CODE ACTIVATED! 🎮</span>
                        <br />
                        <br />+30 Lives
                        <br />+Unlimited Continues
                        <br />+God Mode Enabled
                        <br />
                        <br /><span className="text-green-400">Achievement Unlocked: "Old School Gamer" 🏆</span>
                        <br />
                        <br /><span className="text-gray-400">You've discovered the secret! You're awesome! 🌟</span>
                    </div>
                );
                break;
            default:
                if (cleanCmd === '') return;
                output = <span className="text-red-400">Command not found: {cleanCmd}. Type "help" for available commands.</span>;
        }

        setHistory([...history, { command: cmd, output }]);
        setCommandHistory([...commandHistory, cmd]);
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
            setSuggestions([]);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex < commandHistory.length) {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (suggestions.length > 0) {
                setInput(suggestions[0]);
                setSuggestions([]);
            }
        }
    };

    const handleInputChange = (value: string) => {
        setInput(value);
        if (value.trim()) {
            const matches = availableCommands.filter(cmd => 
                cmd.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div data-testid="terminal" className="bg-vscode-terminal border-t border-vscode-border flex flex-col relative" style={{ height: isMinimized ? '35px' : `${terminalHeight}px` }}>
            {/* Drag Handle */}
            {!isMinimized && (
                <div 
                    className={`absolute top-0 left-0 right-0 h-1 cursor-ns-resize transition-colors z-10 ${isDragging ? 'bg-vscode-accent' : 'hover:bg-vscode-accent/50'}`}
                    onMouseDown={handleDragStart}
                    title="Drag to resize terminal"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full opacity-50 hover:opacity-100" />
                </div>
            )}
            
            {/* Terminal Tabs */}
            <div className="flex items-center justify-between px-2 md:px-4 py-1.5 border-b border-vscode-border bg-vscode-terminal">
                <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-[11px] uppercase tracking-wide text-vscode-text">
                    <span className="hidden md:inline cursor-pointer hover:text-white opacity-60">Problems</span>
                    <span className="hidden md:inline cursor-pointer hover:text-white opacity-60">Output</span>
                    <span data-testid="terminal-tab" className="cursor-pointer text-white border-b-2 border-vscode-accent pb-1">Terminal</span>
                </div>
                <div className="flex items-center gap-3 text-vscode-text">
                    <div data-testid="terminal-clear-btn" title="Clear terminal and reset size" onClick={(e) => { e.stopPropagation(); setHistory([]); setTerminalHeight(200); }}>
                        <Trash2 size={14} className="cursor-pointer hover:text-white" />
                    </div>
                    <div data-testid="terminal-toggle-btn" title={isMinimized ? "Maximize terminal" : "Minimize terminal"} onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
                        {isMinimized ? (
                            <ChevronUp size={14} className="cursor-pointer hover:text-white" />
                        ) : (
                            <ChevronDown size={14} className="cursor-pointer hover:text-white" />
                        )}
                    </div>
                </div>
            </div>

            {/* Terminal Content */}
            {!isMinimized && (
                <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden cursor-text" style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '13px', lineHeight: '19px' }} onClick={() => inputRef.current?.focus()}>
                {history.map((entry, i) => (
                    <div key={i} className="mb-2">
                        {entry.command && (
                            <div className="flex items-center">
                                <span className="text-green-400 mr-2">➜</span>
                                <span className="text-blue-400 mr-2">~</span>
                                <span className="text-gray-400">{entry.command}</span>
                            </div>
                        )}
                        <div className="text-vscode-text ml-4">{entry.output}</div>
                    </div>
                ))}
                <div className="relative">
                    <div className="flex items-center">
                        <span className="text-green-400 mr-2">➜</span>
                        <span className="text-blue-400 mr-2">~</span>
                        <input
                            data-testid="terminal-input"
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-vscode-text flex-1"
                            autoFocus
                        />
                    </div>
                    {suggestions.length > 0 && (
                        <div className="ml-10 mt-1 text-gray-500 text-xs">
                            💡 Suggestions: {suggestions.map((s, i) => (
                                <span key={s}>
                                    <span className="text-yellow-400">{s}</span>
                                    {i < suggestions.length - 1 && ', '}
                                </span>
                            ))}
                            <span className="text-[#666]"> (Press Tab to autocomplete)</span>
                        </div>
                    )}
                </div>
                <div ref={bottomRef} />
            </div>
            )}
        </div>
    );
};

export default Terminal;
