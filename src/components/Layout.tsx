import React from 'react';
import TitleBar from './TitleBar';
import ActivityBar from './ActivityBar';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Terminal from './Terminal';
import StatusBar from './StatusBar';

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-vscode-bg text-vscode-text overflow-hidden">
            <TitleBar />
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                <ActivityBar />
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                    <Editor />
                    <Terminal />
                </div>
            </div>
            <StatusBar />
        </div>
    );
};

export default Layout;
