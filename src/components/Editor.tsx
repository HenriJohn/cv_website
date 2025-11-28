import React, { useState } from 'react';
import { X, Eye, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useExplorer } from '../context/ExplorerContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import type { FileNode } from '../data/fileSystem';
import ParticleBackground from './ParticleBackground';
import InteractiveJsonViewer from './InteractiveJsonViewer';
import TypingAnimation from './TypingAnimation';

const Editor: React.FC = () => {
    const { activeFile, openFiles, closeFile, setActiveFile } = useExplorer();
    const [showPreview, setShowPreview] = useState(true);
    const navigate = useNavigate();

    if (!activeFile) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-vscode-editor text-gray-500 p-4 relative overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-vscode-bg via-vscode-sidebar to-vscode-bg animate-gradient-shift" />
                <ParticleBackground />
                <div className="text-center max-w-md relative z-10">
                    <div 
                        className="text-4xl md:text-6xl font-light mb-4 text-vscode-text opacity-20 transition-all duration-500 hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(0,168,232,0.6)] cursor-pointer group relative"
                        onClick={() => navigate('/test-showcase')}
                        data-testid="hidden-showcase-link"
                    >
                        <svg className="inline-block" width="60" height="60" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0L0 8l8 8 8-8z"/>
                        </svg>
                        {/* Tooltip */}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-vscode-bg text-white text-xs px-3 py-2 rounded shadow-lg border border-vscode-border whitespace-nowrap">
                                🎯 Test Automation Showcase
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-vscode-bg border-t border-l border-vscode-border"></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-lg md:text-xl font-light mb-2 text-vscode-text transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        <TypingAnimation text="Henri-John Plaatjies" speed={80} showCursor={false} />
                    </div>
                    <div className="text-xs md:text-sm mb-4 transition-all duration-300 hover:text-[#4fc3f7]">
                        <TypingAnimation text="Senior Test Automation Engineer" speed={60} delay={2000} />
                    </div>
                    <div className="text-xs md:text-sm mb-8 text-gray-500">
                        <span className="hidden md:inline">Select a file from the explorer or </span>
                        <span className="md:hidden">Type </span>
                        <span className="text-yellow-400 font-semibold transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">help</span> in the terminal below
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
        <div data-testid="editor" className="flex-1 flex flex-col bg-vscode-editor overflow-hidden">
            {/* Tabs */}
            <div data-testid="editor-tabs" className="flex bg-vscode-tabInactive overflow-x-auto scrollbar-hide h-[35px] border-b border-vscode-border">
                {openFiles.map(file => (
                    <div
                        key={file.id}
                        data-testid={`editor-tab-${file.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        className={`flex items-center px-3 py-2 min-w-fit cursor-pointer text-[13px] border-r border-vscode-border transition-all duration-200 ${
                            activeFile.id === file.id
                                ? 'bg-vscode-editor text-white shadow-[0_-2px_0_0_#007acc_inset]'
                                : 'bg-vscode-tabInactive text-gray-400 hover:bg-vscode-lineHighlight hover:text-white'
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
                            data-testid={`close-tab-${file.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
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
            <div className="flex items-center justify-between px-4 py-1.5 text-[11px] text-gray-500 bg-vscode-editor border-b border-vscode-border">
                <div className="flex items-center">
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
                {activeFile.language === 'markdown' && (
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-1 px-2 py-1 text-[11px] text-vscode-text hover:bg-vscode-lineHighlight rounded transition-colors"
                        title={showPreview ? 'Show Source' : 'Show Preview'}
                    >
                        {showPreview ? (
                            <>
                                <Code size={14} />
                                <span>Source</span>
                            </>
                        ) : (
                            <>
                                <Eye size={14} />
                                <span>Preview</span>
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto relative" style={{ fontFamily: 'Consolas, "Courier New", monospace' }}>
                {activeFile.language === 'json' ? (
                    <InteractiveJsonViewer content={activeFile.content || ''} />
                ) : activeFile.language === 'markdown' && showPreview ? (
                    <div className="markdown-preview p-8 text-vscode-text max-w-4xl mx-auto">
                        <ReactMarkdown
                            components={{
                                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4 text-white border-b border-[#404040] pb-2" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3 mt-6 text-white" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-2 mt-4 text-white" {...props} />,
                                p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                                li: ({node, ...props}) => <li className="ml-4" {...props} />,
                                a: ({node, ...props}) => <a className="text-[#4fc3f7] hover:underline" {...props} />,
                                code: ({node, inline, ...props}: any) => 
                                    inline ? (
                                        <code className="bg-[#2d2d2d] px-1.5 py-0.5 rounded text-[#ce9178] text-sm" {...props} />
                                    ) : (
                                        <code className="block bg-[#1e1e1e] p-4 rounded my-4 overflow-x-auto" {...props} />
                                    ),
                                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#404040] pl-4 italic my-4 text-[#858585]" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                                em: ({node, ...props}) => <em className="italic" {...props} />,
                            }}
                        >
                            {activeFile.content || ''}
                        </ReactMarkdown>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default Editor;
