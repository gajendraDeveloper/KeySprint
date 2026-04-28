import React from 'react';
import { FiUserPlus, FiPlayCircle, FiBarChart2 } from 'react-icons/fi';
import { MdOutlineEmojiEvents } from 'react-icons/md';

const steps = [
    {
        title: "Create Account",
        desc: "Sign up in seconds to track your progress and unlock advanced modules.",
        icon: <FiUserPlus className="w-8 h-8" />
    },
    {
        title: "Choose Module",
        desc: "Select your preferred tool and difficulty level to start practicing.",
        icon: <FiPlayCircle className="w-8 h-8" />
    },
    {
        title: "Master Keys",
        desc: "Respond to real-time shortcut prompts. Build muscle memory through repetition.",
        icon: <MdOutlineEmojiEvents className="w-8 h-8" />
    },
    {
        title: "Analyze Stats",
        desc: "View detailed performance charts and watch your speed improve weekly.",
        icon: <FiBarChart2 className="w-8 h-8" />
    }
];

export default function ProjectFlowSession() {
    return (
        <section id="projectFlow" className="py-24 bg-zinc-50 border-y border-zinc-200">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-20">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">How it Works</h2>
                        <p className="text-zinc-500 text-lg max-w-xl">
                            A scientifically proven approach to mastering keyboard shortcuts and boosting your productivity.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                    {/* Connecting Line (hidden on mobile) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-zinc-200 z-0" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative z-10 space-y-6 group">
                            <div className="w-24 h-24 rounded-3xl bg-white border border-zinc-200 flex items-center justify-center text-blue-600 shadow-md group-hover:border-blue-500 transition-colors">
                                {step.icon}
                                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 font-bold text-sm">
                                    0{idx + 1}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-zinc-900">{step.title}</h3>
                                <p className="text-zinc-500 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
