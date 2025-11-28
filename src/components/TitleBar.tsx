import React from 'react';
import { Minus, Square, X } from 'lucide-react';

const TitleBar: React.FC = () => {
    return (
        <div data-testid="title-bar" className="h-9 bg-vscode-activityBar flex items-center justify-between px-2 text-xs select-none border-b border-vscode-border">
            {/* Left: Menu items */}
            <div className="flex items-center gap-1 flex-shrink-0">
                <div data-testid="vscode-logo" className="px-2 py-1 hover:bg-white/10 cursor-pointer rounded">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%2300a8e8' d='M8 0L0 8l8 8 8-8z'/%3E%3C/svg%3E" alt="VS Code" className="w-4 h-4" />
                </div>
                <div data-testid="menu-bar" className="hidden md:flex items-center text-vscode-text">
                    <span data-testid="menu-file" className="px-2 py-1 hover:bg-white/10 cursor-pointer">File</span>
                    <span data-testid="menu-edit" className="px-2 py-1 hover:bg-white/10 cursor-pointer">Edit</span>
                    <span data-testid="menu-selection" className="px-2 py-1 hover:bg-white/10 cursor-pointer">Selection</span>
                    <span data-testid="menu-view" className="px-2 py-1 hover:bg-white/10 cursor-pointer">View</span>
                    <span data-testid="menu-go" className="px-2 py-1 hover:bg-white/10 cursor-pointer">Go</span>
                    <span data-testid="menu-run" className="px-2 py-1 hover:bg-white/10 cursor-pointer">Run</span>
                    <span data-testid="menu-terminal" className="px-2 py-1 hover:bg-white/10 cursor-pointer">Terminal</span>
                    <span data-testid="menu-help" className="px-2 py-1 hover:bg-white/10 cursor-pointer">Help</span>
                </div>
            </div>

            {/* Center: Title */}
            <div className="flex-1 text-center text-vscode-text font-normal text-xs px-2 overflow-hidden">
                <span className="hidden sm:inline">Henri-John Plaatjies - Senior Test Automation Engineer</span>
                <span className="sm:hidden truncate block">Henri-John Plaatjies</span>
            </div>

            {/* Right: Window controls */}
            <div data-testid="window-controls" className="flex items-center flex-shrink-0">
                <div data-testid="window-minimize" className="p-2 hover:bg-white/10 cursor-pointer text-white hidden sm:block">
                    <Minus size={14} />
                </div>
                <div data-testid="window-maximize" className="p-2 hover:bg-white/10 cursor-pointer text-white hidden sm:block">
                    <Square size={12} />
                </div>
                <div data-testid="window-close" className="p-2 hover:bg-red-600 cursor-pointer text-white">
                    <X size={14} />
                </div>
            </div>
        </div>
    );
};

export default TitleBar;
