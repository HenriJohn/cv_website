import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Trash2, Maximize2, X } from 'lucide-react';
import { useExplorer } from '../context/ExplorerContext';

const Terminal: React.FC = () => {
    const { toggleTheme } = useExplorer();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
        { command: '', output: 'Welcome to the interactive terminal! Type "help" to see available commands.' }
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

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
                        <br />  <span className="text-yellow-400">about</span>      - Display profile summary
                        <br />  <span className="text-yellow-400">skills</span>     - List technical skills
                        <br />  <span className="text-yellow-400">experience</span> - Show work experience
                        <br />  <span className="text-yellow-400">contact</span>    - Show contact info
                        <br />  <span className="text-yellow-400">theme</span>      - Toggle light/dark theme
                        <br />  <span className="text-yellow-400">clear</span>      - Clear terminal
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
                return;
            default:
                if (cleanCmd === '') return;
                output = <span className="text-red-400">Command not found: {cleanCmd}. Type "help" for available commands.</span>;
        }

        setHistory([...history, { command: cmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div className="h-48 bg-vscode-terminal border-t border-[#252526] flex flex-col" onClick={() => inputRef.current?.focus()}>
            {/* Terminal Tabs */}
            <div className="flex items-center justify-between px-4 py-1.5 border-b border-[#252526] bg-vscode-terminal">
                <div className="flex items-center gap-6 text-[11px] uppercase tracking-wide text-[#cccccc]">
                    <span className="cursor-pointer hover:text-white opacity-60">Problems</span>
                    <span className="cursor-pointer hover:text-white opacity-60">Output</span>
                    <span className="cursor-pointer hover:text-white opacity-60">Debug Console</span>
                    <span className="cursor-pointer text-white border-b-2 border-[#007acc] pb-1">Terminal</span>
                </div>
                <div className="flex items-center gap-2 text-[#cccccc]">
                    <Plus size={14} className="cursor-pointer hover:text-white" />
                    <Trash2 size={14} className="cursor-pointer hover:text-white" onClick={() => setHistory([])} />
                    <ChevronDown size={14} className="cursor-pointer hover:text-white" />
                    <Maximize2 size={14} className="cursor-pointer hover:text-white" />
                    <X size={14} className="cursor-pointer hover:text-white" />
                </div>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 p-4 overflow-auto cursor-text" style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '13px', lineHeight: '19px' }}>
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
                <div className="flex items-center">
                    <span className="text-green-400 mr-2">➜</span>
                    <span className="text-blue-400 mr-2">~</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-[#cccccc] flex-1"
                        autoFocus
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default Terminal;
