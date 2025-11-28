import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useExplorer } from '../context/ExplorerContext';

const Terminal: React.FC = () => {
    const { toggleTheme } = useExplorer();
    const [isMinimized, setIsMinimized] = useState(false);
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
                        <br />📄 <a href="/cv.pdf" download className="text-blue-400 underline">Click here to download CV</a>
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
                    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                    "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
                    "Why do Java developers wear glasses? Because they don't C#! 👓",
                    "A SQL query walks into a bar, walks up to two tables and asks... 'Can I JOIN you?' 🍺",
                    "Why did the programmer quit his job? Because he didn't get arrays! 📊",
                    "What's a programmer's favorite hangout place? Foo Bar! 🍻",
                    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25! 🎃🎄",
                    "There are 10 types of people in the world: those who understand binary, and those who don't. 😄"
                ];
                output = (
                    <div className="text-cyan-400">
                        😄 {jokes[Math.floor(Math.random() * jokes.length)]}
                    </div>
                );
                break;
            case 'quote':
                const quotes = [
                    '"First, solve the problem. Then, write the code." - John Johnson',
                    '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
                    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
                    '"Testing leads to failure, and failure leads to understanding." - Burt Rutan',
                    '"The best error message is the one that never shows up." - Thomas Fuchs',
                    '"Quality is not an act, it is a habit." - Aristotle',
                    '"The only way to go fast, is to go well." - Robert C. Martin',
                    '"Make it work, make it right, make it fast." - Kent Beck'
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
        <div data-testid="terminal" className={`${isMinimized ? 'h-[35px]' : 'h-48 md:h-56'} bg-vscode-terminal border-t border-vscode-border flex flex-col transition-all duration-200`}>
            {/* Terminal Tabs */}
            <div className="flex items-center justify-between px-2 md:px-4 py-1.5 border-b border-vscode-border bg-vscode-terminal">
                <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-[11px] uppercase tracking-wide text-vscode-text">
                    <span className="hidden md:inline cursor-pointer hover:text-white opacity-60">Problems</span>
                    <span className="hidden md:inline cursor-pointer hover:text-white opacity-60">Output</span>
                    <span data-testid="terminal-tab" className="cursor-pointer text-white border-b-2 border-vscode-accent pb-1">Terminal</span>
                </div>
                <div className="flex items-center gap-3 text-vscode-text">
                    <div data-testid="terminal-clear-btn" title="Clear terminal" onClick={(e) => { e.stopPropagation(); setHistory([]); }}>
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
