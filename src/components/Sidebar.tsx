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
                className={`flex items-center py-0.5 px-2 cursor-pointer text-[13px] transition-colors ${
                    isActive 
                        ? 'bg-[#37373d] text-white' 
                        : 'text-[#cccccc] hover:bg-[#2a2d2e]'
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
    const { files } = useExplorer();

    return (
        <div className="w-64 bg-vscode-sidebar flex flex-col border-r border-[#252526] h-full select-none">
            <div className="h-[35px] px-4 flex items-center text-[11px] font-bold tracking-wide text-[#cccccc] uppercase border-b border-[#252526]">
                Explorer
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="px-2 py-1.5 font-bold text-[11px] flex items-center cursor-pointer hover:bg-[#2a2d2e] text-white uppercase tracking-wide">
                    <ChevronDown size={16} className="mr-1" />
                    PORTFOLIO
                </div>
                <div>
                    {files[0].children?.map(node => (
                        <FileTreeItem key={node.id} node={node} depth={1} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
