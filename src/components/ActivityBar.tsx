import React from 'react';
import { Files, Search, GitGraph, Bug, Blocks, Settings, User } from 'lucide-react';

const ActivityBar: React.FC = () => {
    return (
        <div className="w-12 flex flex-col items-center py-2 bg-vscode-activityBar border-r border-[#252526] justify-between z-10">
            <div className="flex flex-col w-full items-center">
                <div className="w-full p-3 border-l-2 border-white cursor-pointer flex items-center justify-center hover:bg-white/10">
                    <Files size={24} className="text-white" />
                </div>
                <div className="w-full p-3 border-l-2 border-transparent cursor-pointer flex items-center justify-center hover:bg-white/10">
                    <Search size={24} className="text-[#858585] hover:text-white" />
                </div>
                <div className="w-full p-3 border-l-2 border-transparent cursor-pointer flex items-center justify-center hover:bg-white/10">
                    <GitGraph size={24} className="text-[#858585] hover:text-white" />
                </div>
                <div className="w-full p-3 border-l-2 border-transparent cursor-pointer flex items-center justify-center hover:bg-white/10">
                    <Bug size={24} className="text-[#858585] hover:text-white" />
                </div>
                <div className="w-full p-3 border-l-2 border-transparent cursor-pointer flex items-center justify-center hover:bg-white/10">
                    <Blocks size={24} className="text-[#858585] hover:text-white" />
                </div>
            </div>
            <div className="flex flex-col w-full items-center">
                <div className="w-full p-3 cursor-pointer flex items-center justify-center hover:bg-white/10">
                    <User size={24} className="text-[#858585] hover:text-white" />
                </div>
                <div className="w-full p-3 cursor-pointer flex items-center justify-center hover:bg-white/10">
                    <Settings size={24} className="text-[#858585] hover:text-white" />
                </div>
            </div>
        </div>
    );
};

export default ActivityBar;
