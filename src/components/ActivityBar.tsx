import React from 'react';
import { Files, Moon, Sun } from 'lucide-react';
import { useExplorer } from '../context/ExplorerContext';

const ActivityBar: React.FC = () => {
    const { theme, toggleTheme } = useExplorer();
    
    return (
        <div className="flex w-12 flex-col items-center py-2 bg-vscode-activityBar border-r border-[#252526] justify-between">
            <div className="flex flex-col w-full items-center">
                <div className="w-full p-3 border-l-2 border-white cursor-pointer flex items-center justify-center hover:bg-white/10">
                    <Files size={24} className="text-white" />
                </div>
            </div>
            <div className="flex flex-col w-full items-center">
                <div 
                    className="w-full p-3 cursor-pointer flex items-center justify-center hover:bg-white/10"
                    onClick={toggleTheme}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    {theme === 'dark' ? (
                        <Sun size={24} className="text-[#858585] hover:text-white" />
                    ) : (
                        <Moon size={24} className="text-[#858585] hover:text-white" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityBar;
