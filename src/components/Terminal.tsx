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

    const availableCommands = ['help', 'about', 'skills', 'experience', 'contact', 'theme', 'clear', 'projects', 'download-cv', 'sudo make-coffee', 'npm install happiness'];

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
            case 'sudo make-coffee':
                output = (
                    <div className="text-yellow-400">
                        ☕ Brewing coffee...
                        <br />Error: Coffee machine not found. Please install coffee-maker package.
                        <br />💡 Tip: Try 'npm install coffee' instead!
                    </div>
                );
                break;
            case 'npm install happiness':
                output = (
                    <div className="text-green-400">
                        📦 Installing happiness@latest...
                        <br />✓ happiness@1.0.0 installed successfully!
                        <br />💚 You now have +100 happiness points!
                        <br />🎉 Remember: Happiness is not a package, it's a mindset!
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
        <div className={`${isMinimized ? 'h-[35px]' : 'h-48 md:h-56'} bg-vscode-terminal border-t border-[#252526] flex flex-col transition-all duration-200`}>
            {/* Terminal Tabs */}
            <div className="flex items-center justify-between px-2 md:px-4 py-1.5 border-b border-[#252526] bg-vscode-terminal">
                <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-[11px] uppercase tracking-wide text-[#cccccc]">
                    <span className="hidden md:inline cursor-pointer hover:text-white opacity-60">Problems</span>
                    <span className="hidden md:inline cursor-pointer hover:text-white opacity-60">Output</span>
                    <span className="cursor-pointer text-white border-b-2 border-[#007acc] pb-1">Terminal</span>
                </div>
                <div className="flex items-center gap-3 text-[#cccccc]">
                    <div title="Clear terminal" onClick={(e) => { e.stopPropagation(); setHistory([]); }}>
                        <Trash2 size={14} className="cursor-pointer hover:text-white" />
                    </div>
                    <div title={isMinimized ? "Maximize terminal" : "Minimize terminal"} onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
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
                        <div className="text-[#cccccc] ml-4">{entry.output}</div>
                    </div>
                ))}
                <div className="relative">
                    <div className="flex items-center">
                        <span className="text-green-400 mr-2">➜</span>
                        <span className="text-blue-400 mr-2">~</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-[#cccccc] flex-1"
                            autoFocus
                        />
                    </div>
                    {suggestions.length > 0 && (
                        <div className="ml-10 mt-1 text-[#858585] text-xs">
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
