import React from 'react';
import { Minus, Square, X } from 'lucide-react';

const TitleBar: React.FC = () => {
    return (
        <div className="h-9 bg-[#3c3c3c] flex items-center justify-between px-2 text-xs select-none border-b border-black/20">
            {/* Left: Menu items - hidden on mobile */}
            <div className="hidden md:flex items-center gap-1">
                <div className="px-2 py-1 hover:bg-white/10 cursor-pointer rounded">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%2300a8e8' d='M8 0L0 8l8 8 8-8z'/%3E%3C/svg%3E" alt="VS Code" className="w-4 h-4" />
                </div>
                <div className="flex items-center text-[#cccccc]">
                    <span className="px-2 py-1 hover:bg-white/10 cursor-pointer">File</span>
                    <span className="px-2 py-1 hover:bg-white/10 cursor-pointer">Edit</span>
                    <span className="px-2 py-1 hover:bg-white/10 cursor-pointer">Selection</span>
                    <span className="px-2 py-1 hover:bg-white/10 cursor-pointer">View</span>
                    <span className="px-2 py-1 hover:bg-white/10 cursor-pointer">Go</span>
                    <span className="px-2 py-1 hover:bg-white/10 cursor-pointer">Run</span>
                    <span className="px-2 py-1 hover:bg-white/10 cursor-pointer">Terminal</span>
                    <span className="px-2 py-1 hover:bg-white/10 cursor-pointer">Help</span>
                </div>
            </div>

            {/* Center: Title */}
            <div className="flex-1 text-center text-[#cccccc] font-normal text-[10px] md:text-xs">
                Henri-John Plaatjies - Senior Test Automation Engineer
            </div>

            {/* Right: Window controls - hidden on mobile */}
            <div className="hidden md:flex items-center">
                <div className="p-2 hover:bg-white/10 cursor-pointer text-white">
                    <Minus size={14} />
                </div>
                <div className="p-2 hover:bg-white/10 cursor-pointer text-white">
                    <Square size={12} />
                </div>
                <div className="p-2 hover:bg-red-600 cursor-pointer text-white">
                    <X size={14} />
                </div>
            </div>
        </div>
    );
};

export default TitleBar;
