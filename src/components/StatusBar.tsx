import React from 'react';
import { GitBranch, Check, Bell, X } from 'lucide-react';

const StatusBar: React.FC = () => {
    return (
        <div data-testid="status-bar" className="h-[22px] bg-vscode-statusBar text-vscode-statusBarItem flex items-center justify-between px-2 text-[12px] select-none">
            <div className="flex items-center h-full">
                <div data-testid="status-git-branch" className="flex items-center gap-1 transition-all duration-200 hover:bg-white/20 hover:text-white px-2 h-full cursor-pointer">
                    <GitBranch size={14} />
                    <span>main</span>
                </div>
                <div data-testid="status-errors" className="flex items-center gap-1 transition-all duration-200 hover:bg-white/20 hover:text-white px-2 h-full cursor-pointer">
                    <Check size={14} />
                    <span>0</span>
                    <X size={14} />
                    <span>0</span>
                </div>
            </div>
            <div className="flex items-center h-full">
                <div data-testid="status-position" className="flex items-center gap-1 transition-all duration-200 hover:bg-white/20 hover:text-white px-2 h-full cursor-pointer">
                    <span>Ln 1, Col 1</span>
                </div>
                <div data-testid="status-spaces" className="flex items-center gap-1 transition-all duration-200 hover:bg-white/20 hover:text-white px-2 h-full cursor-pointer">
                    <span>Spaces: 2</span>
                </div>
                <div data-testid="status-encoding" className="flex items-center gap-1 transition-all duration-200 hover:bg-white/20 hover:text-white px-2 h-full cursor-pointer">
                    <span>UTF-8</span>
                </div>
                <div data-testid="status-language" className="flex items-center gap-1 transition-all duration-200 hover:bg-white/20 hover:text-white px-2 h-full cursor-pointer">
                    <span>TypeScript React</span>
                </div>
                <div data-testid="status-notifications" className="flex items-center gap-1 transition-all duration-200 hover:bg-white/20 hover:text-white px-2 h-full cursor-pointer">
                    <Bell size={14} />
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
