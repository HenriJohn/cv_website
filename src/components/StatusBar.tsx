import React from 'react';
import { GitBranch, Check, Bell, X } from 'lucide-react';

const StatusBar: React.FC = () => {
    return (
        <div className="h-[22px] bg-vscode-statusBar text-vscode-statusBarItem flex items-center justify-between px-2 text-[12px] select-none">
            <div className="flex items-center h-full">
                <div className="flex items-center gap-1 hover:bg-white/20 px-2 h-full cursor-pointer">
                    <GitBranch size={14} />
                    <span>main</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/20 px-2 h-full cursor-pointer">
                    <Check size={14} />
                    <span>0</span>
                    <X size={14} />
                    <span>0</span>
                </div>
            </div>
            <div className="flex items-center h-full">
                <div className="flex items-center gap-1 hover:bg-white/20 px-2 h-full cursor-pointer">
                    <span>Ln 1, Col 1</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/20 px-2 h-full cursor-pointer">
                    <span>Spaces: 2</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/20 px-2 h-full cursor-pointer">
                    <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/20 px-2 h-full cursor-pointer">
                    <span>TypeScript React</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/20 px-2 h-full cursor-pointer">
                    <Bell size={14} />
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
