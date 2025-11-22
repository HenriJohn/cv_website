import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { fileSystem, type FileNode } from '../data/fileSystem';

interface ExplorerContextType {
    files: FileNode[];
    activeFile: FileNode | null;
    openFiles: FileNode[];
    toggleFolder: (id: string) => void;
    openFile: (file: FileNode) => void;
    closeFile: (id: string) => void;
    setActiveFile: (file: FileNode) => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

const ExplorerContext = createContext<ExplorerContextType | undefined>(undefined);

export const ExplorerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [files, setFiles] = useState<FileNode[]>(fileSystem);
    const [activeFile, setActiveFile] = useState<FileNode | null>(null);
    const [openFiles, setOpenFiles] = useState<FileNode[]>([]);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
        document.documentElement.classList.toggle('light-theme');
    };

    const toggleFolder = (id: string) => {
        const toggleNode = (nodes: FileNode[]): FileNode[] => {
            return nodes.map(node => {
                if (node.id === id) {
                    return { ...node, isOpen: !node.isOpen };
                }
                if (node.children) {
                    return { ...node, children: toggleNode(node.children) };
                }
                return node;
            });
        };
        setFiles(toggleNode(files));
    };

    const openFile = (file: FileNode) => {
        if (!openFiles.find(f => f.id === file.id)) {
            setOpenFiles([...openFiles, file]);
        }
        setActiveFile(file);
    };

    const closeFile = (id: string) => {
        const newOpenFiles = openFiles.filter(f => f.id !== id);
        setOpenFiles(newOpenFiles);
        if (activeFile?.id === id) {
            setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null);
        }
    };

    return (
        <ExplorerContext.Provider value={{
            files,
            activeFile,
            openFiles,
            toggleFolder,
            openFile,
            closeFile,
            setActiveFile,
            theme,
            toggleTheme
        }}>
            {children}
        </ExplorerContext.Provider>
    );
};

export const useExplorer = () => {
    const context = useContext(ExplorerContext);
    if (context === undefined) {
        throw new Error('useExplorer must be used within an ExplorerProvider');
    }
    return context;
};
