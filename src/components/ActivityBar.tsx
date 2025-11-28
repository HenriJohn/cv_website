import React from 'react';
import { Files, Moon, Sun } from 'lucide-react';
import { useExplorer } from '../context/ExplorerContext';

const ActivityBar: React.FC = () => {
    const { theme, toggleTheme, isSidebarVisible, toggleSidebar } = useExplorer();
    
    return (
        <div data-testid="activity-bar" className="flex w-12 flex-col items-center py-2 bg-vscode-activityBar border-r border-vscode-border justify-between">
            <div className="flex flex-col w-full items-center">
                <div 
                    data-testid="toggle-sidebar-btn"
                    className={`w-full p-3 cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-white/10 ${isSidebarVisible ? 'border-l-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : ''}`}
                    onClick={toggleSidebar}
                    title="Toggle Sidebar"
                >
                    <Files size={24} className="text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                </div>
            </div>
            <div className="flex flex-col w-full items-center">
                <div 
                    data-testid="toggle-theme-btn"
                    className="w-full p-3 cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-white/10"
                    onClick={toggleTheme}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    {theme === 'dark' ? (
                        <Sun size={24} className="text-gray-400 transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                    ) : (
                        <Moon size={24} className="text-gray-400 transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityBar;
