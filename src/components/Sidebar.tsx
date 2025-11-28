import React from 'react';
import { ChevronRight, ChevronDown, FileJson, FileCode, FileType, FileText, Folder, FolderOpen } from 'lucide-react';
import { useExplorer } from '../context/ExplorerContext';
import type { FileNode } from '../data/fileSystem';

const FileIcon = ({ name }: { name: string }) => {
    if (name.endsWith('.ts')) return <FileCode size={16} className="mr-2 text-[#3178c6]" />;
    if (name.endsWith('.json')) return <FileJson size={16} className="mr-2 text-[#cbcb41]" />;
    if (name.endsWith('.md')) return <FileText size={16} className="mr-2 text-[#519aba]" />;
    if (name.endsWith('.env')) return <FileType size={16} className="mr-2 text-[#e8bf6a]" />;
    if (name.endsWith('.pdf')) return <FileText size={16} className="mr-2 text-[#e25041]" />;
    return <FileText size={16} className="mr-2 text-[#858585]" />;
};

const FileTreeItem = ({ node, depth }: { node: FileNode; depth: number }) => {
    const { toggleFolder, openFile, activeFile } = useExplorer();
    const isFolder = node.type === 'folder';
    const isActive = activeFile?.id === node.id;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFolder) {
            toggleFolder(node.id);
        } else {
            if (node.name === 'download-cv.pdf') {
                // Trigger download
                const link = document.createElement('a');
                link.href = '/cv.pdf'; // Assuming the file is in public folder
                link.download = 'Henri-John_Plaatjies_CV.pdf';
                link.click();
            } else {
                openFile(node);
            }
        }
    };

    return (
        <div>
            <div
                data-testid={`file-tree-item-${node.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={`flex items-center py-0.5 px-2 cursor-pointer text-[13px] transition-all duration-200 ${
                    isActive 
                        ? 'bg-vscode-selection text-white shadow-[2px_0_0_0_#007acc_inset]' 
                        : 'text-vscode-text hover:bg-vscode-lineHighlight hover:text-white hover:shadow-[2px_0_0_0_rgba(0,122,204,0.3)_inset]'
                }`}
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
                onClick={handleClick}
            >
                {isFolder && (
                    <span className="mr-1">
                        {node.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                )}
                {!isFolder && <span className="w-4 mr-1" />} {/* Spacer for alignment */}

                {isFolder ? (
                    node.isOpen ? <FolderOpen size={16} className="mr-2 text-[#dcb67a]" /> : <Folder size={16} className="mr-2 text-[#dcb67a]" />
                ) : (
                    <FileIcon name={node.name} />
                )}

                <span className={isActive ? 'text-white' : ''}>{node.name}</span>
            </div>
            {isFolder && node.isOpen && node.children && (
                <div>
                    {node.children.map(child => (
                        <FileTreeItem key={child.id} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar: React.FC = () => {
    const { files, isSidebarVisible } = useExplorer();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    if (!isSidebarVisible) return null;

    return (
        <div data-testid="sidebar" className="flex flex-col w-64 bg-vscode-sidebar border-r border-vscode-border overflow-y-auto">
            <div data-testid="sidebar-title" className="px-4 py-2 text-[11px] uppercase tracking-wider text-gray-500 font-semibold border-b border-vscode-border">
                Explorer
            </div>
            <div className="flex-1 overflow-y-auto">
                <div 
                    data-testid="portfolio-section-toggle"
                    className="px-2 py-1 text-[11px] uppercase tracking-wider text-gray-500 font-semibold flex items-center justify-between cursor-pointer hover:bg-vscode-lineHighlight"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <div className="flex items-center">
                        {isCollapsed ? <ChevronRight size={16} className="mr-1" /> : <ChevronDown size={16} className="mr-1" />}
                        <span>PORTFOLIO</span>
                    </div>
                </div>
                {!isCollapsed && (
                    <div className="py-1">
                        {files.map(node => (
                            <FileTreeItem key={node.id} node={node} depth={0} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
