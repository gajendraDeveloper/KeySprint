import React from 'react';
import HeroSection from './components/HeroSection';
import SupportedToolsSection from './components/SupportedToolsSection';
import ProjectFlowSession from './components/ProjectFlowSession';

export default function LandingPage() {
    return (
        <main className="bg-black min-h-screen">
            <HeroSection />
            <ProjectFlowSession />
            <SupportedToolsSection />
        </main>
    );
}
