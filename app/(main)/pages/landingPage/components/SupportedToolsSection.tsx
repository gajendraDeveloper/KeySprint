import React from 'react';
import { FiCode, FiFramer, FiFileText, FiCamera } from 'react-icons/fi';
import CommonCard from '@/components/commonUI/CommonCard';

const tools = [
    { name: 'VS Code', icon: <FiCode />, color: 'bg-blue-100 text-blue-600', desc: 'Command palette, navigation, and editing shortcuts.' },
    { name: 'Figma', icon: <FiFramer />, color: 'bg-purple-100 text-purple-600', desc: 'Design, prototyping, and layer management keys.' },
    { name: 'Notion', icon: <FiFileText />, color: 'bg-zinc-100 text-zinc-900', desc: 'Quick search, blocks, and navigation commands.' },
    { name: 'Photoshop', icon: <FiCamera />, color: 'bg-blue-100 text-blue-800', desc: 'Image editing, layers, and transformation shortcuts.' },
];

export default function SupportedToolsSection() {
    return (
        <section id="supportedTools" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900">Supported Platforms</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
                        Master the industry's leading creative and development tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tools.map((tool, idx) => (
                        <div key={idx}>
                            <CommonCard
                                title={tool.name}
                                description={tool.desc}
                                icon={tool.icon}
                                styleCard="bg-white border border-zinc-200 p-8 rounded-[2rem] text-left items-start shadow-sm  transition-all h-full"
                                styleIcon={`p-4 rounded-2xl ${tool.color}`}
                                styleTitle="text-xl font-bold text-zinc-900 mt-4"
                                styleDescription="text-zinc-500 mt-2 leading-relaxed"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
