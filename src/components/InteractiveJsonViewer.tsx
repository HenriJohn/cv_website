import React, { useState } from 'react';

interface InteractiveJsonViewerProps {
    content: string;
}

const InteractiveJsonViewer: React.FC<InteractiveJsonViewerProps> = ({ content }) => {
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    const parseJson = (jsonString: string) => {
        try {
            return JSON.parse(jsonString);
        } catch {
            return null;
        }
    };

    const renderValue = (value: any, path: string, depth: number = 0): React.ReactElement => {

        if (Array.isArray(value)) {
            return (
                <div>
                    <span className="text-[#d4d4d4]">[</span>
                    {value.map((item, index) => (
                        <div key={index} className="ml-4">
                            {renderValue(item, `${path}[${index}]`, depth + 1)}
                            {index < value.length - 1 && <span className="text-[#d4d4d4]">,</span>}
                        </div>
                    ))}
                    <span className="text-[#d4d4d4]">]</span>
                </div>
            );
        }

        if (typeof value === 'object' && value !== null) {
            const keys = Object.keys(value);
            return (
                <div>
                    <span className="text-[#d4d4d4]">{'{'}</span>
                    {keys.map((key, index) => (
                        <div key={key} className="ml-4">
                            <span className="text-[#9cdcfe]">"{key}"</span>
                            <span className="text-[#d4d4d4]">: </span>
                            {renderValue(value[key], `${path}.${key}`, depth + 1)}
                            {index < keys.length - 1 && <span className="text-[#d4d4d4]">,</span>}
                        </div>
                    ))}
                    <span className="text-[#d4d4d4]">{'}'}</span>
                </div>
            );
        }

        if (typeof value === 'string') {
            const isHovered = hoveredPath === path;
            return (
                <span
                    className={`text-[#ce9178] transition-all duration-200 cursor-pointer ${
                        isHovered
                            ? 'bg-[#264f78] px-1 rounded shadow-[0_0_10px_rgba(78,201,176,0.4)] scale-105 inline-block'
                            : 'hover:bg-[#2a2d2e] hover:px-1 hover:rounded'
                    }`}
                    onMouseEnter={() => setHoveredPath(path)}
                    onMouseLeave={() => setHoveredPath(null)}
                >
                    "{value}"
                </span>
            );
        }

        if (typeof value === 'number') {
            return <span className="text-[#b5cea8]">{value}</span>;
        }

        if (typeof value === 'boolean') {
            return <span className="text-[#569cd6]">{value.toString()}</span>;
        }

        return <span className="text-[#d4d4d4]">null</span>;
    };

    const data = parseJson(content);

    if (!data) {
        return (
            <div className="p-4 text-red-400">
                Invalid JSON
            </div>
        );
    }

    return (
        <div className="p-5 font-mono text-sm leading-relaxed overflow-auto">
            <div className="flex">
                <div className="select-none text-[#858585] text-right pr-5 min-w-[50px]">
                    {content.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
                <div className="flex-1">
                    {renderValue(data, 'root')}
                </div>
            </div>
        </div>
    );
};

export default InteractiveJsonViewer;
