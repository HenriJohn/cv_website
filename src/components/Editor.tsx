import React from 'react';
import { X } from 'lucide-react';
import { useExplorer } from '../context/ExplorerContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { FileNode } from '../data/fileSystem';

const Editor: React.FC = () => {
    const { activeFile, openFiles, closeFile, setActiveFile } = useExplorer();

    if (!activeFile) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-vscode-editor text-[#858585] p-4">
                <div className="text-center max-w-md">
                    <div className="text-4xl md:text-6xl font-light mb-4 text-[#cccccc] opacity-20">
                        <svg className="inline-block" width="60" height="60" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0L0 8l8 8 8-8z"/>
                        </svg>
                    </div>
                    <div className="text-lg md:text-xl font-light mb-2 text-[#cccccc]">Henri-John Plaatjies</div>
                    <div className="text-xs md:text-sm mb-4">Senior Test Automation Engineer</div>
                    <div className="text-xs md:text-sm mb-8 text-[#858585]">
                        <span className="hidden md:inline">Select a file from the explorer or </span>
                        <span className="md:hidden">Type </span>
                        <span className="text-yellow-400">help</span> in the terminal below
                    </div>
                </div>
            </div>
        );
    }

    const getLanguage = (file: FileNode) => {
        if (file.language === 'typescript') return 'typescript';
        if (file.language === 'json') return 'json';
        if (file.language === 'markdown') return 'markdown';
        if (file.language === 'env') return 'bash';
        return 'text';
    };

    return (
        <div className="flex-1 flex flex-col bg-vscode-editor overflow-hidden">
            {/* Tabs */}
            <div className="flex bg-vscode-tabInactive overflow-x-auto scrollbar-hide h-[35px] border-b border-[#252526]">
                {openFiles.map(file => (
                    <div
                        key={file.id}
                        className={`flex items-center px-3 py-2 min-w-fit cursor-pointer text-[13px] border-r border-[#252526] transition-colors ${
                            activeFile.id === file.id
                                ? 'bg-vscode-editor text-white'
                                : 'bg-vscode-tabInactive text-[#969696] hover:bg-[#2d2d2d]'
                        }`}
                        onClick={() => setActiveFile(file)}
                    >
                        <span className={`mr-2 text-xs font-bold ${file.name.endsWith('.ts') ? 'text-[#3178c6]' :
                            file.name.endsWith('.json') ? 'text-[#cbcb41]' :
                                file.name.endsWith('.md') ? 'text-[#519aba]' :
                                    file.name.endsWith('.env') ? 'text-[#e8bf6a]' :
                                        'text-[#858585]'
                            }`}>
                            {file.name.endsWith('.ts') ? '◈' : file.name.endsWith('.json') ? '{}' : file.name.endsWith('.md') ? '≡' : file.name.endsWith('.env') ? '⚙' : '📄'}
                        </span>
                        <span className="mr-2">{file.name}</span>
                        <X
                            size={14}
                            className="hover:bg-white/20 rounded-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeFile(file.id);
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center px-4 py-1.5 text-[11px] text-[#858585] bg-vscode-editor border-b border-[#252526]">
                <span>portfolio</span>
                <span className="mx-1">&gt;</span>
                {activeFile.id.includes('experience') && (
                    <>
                        <span>experience</span>
                        <span className="mx-1">&gt;</span>
                    </>
                )}
                <span>{activeFile.name}</span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto relative" style={{ fontFamily: 'Consolas, "Courier New", monospace' }}>
                <SyntaxHighlighter
                    language={getLanguage(activeFile)}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: '20px',
                        background: 'transparent',
                        fontSize: '14px',
                        lineHeight: '21px',
                        fontFamily: 'Consolas, "Courier New", monospace',
                    }}
                    showLineNumbers={true}
                    lineNumberStyle={{ 
                        minWidth: '50px', 
                        paddingRight: '20px', 
                        color: '#858585', 
                        textAlign: 'right',
                        userSelect: 'none'
                    }}
                >
                    {activeFile.content || ''}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default Editor;
