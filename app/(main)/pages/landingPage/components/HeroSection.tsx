import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 h-72 w-72 bg-blue-100 rounded-full blur-3xl opacity-40" />
                <div className="absolute bottom-10 right-10 h-72 w-72 bg-purple-100 rounded-full blur-3xl opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <div>
                    {/* Tag */}
                    <p className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 mb-6">
                        ⚡ Learn faster with shortcuts
                    </p>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                        Master Keyboard Shortcuts, Faster Than Ever
                    </h1>

                    {/* Subheading */}
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                        Practice and memorize shortcuts for Figma, VS Code, Photoshop, and Notion
                        through interactive drills designed to boost your productivity.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href="/auth/sign-in" className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition">
                            Start Practicing
                        </Link>

                        <Link href="/#projectFlow" className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                            How to start
                        </Link>
                    </div>

                    {/* Small stats */}
                    <div className="mt-10 flex gap-8 text-sm text-gray-500">
                        <div>
                            <p className="font-semibold text-gray-900">4+</p>
                            Tools Supported
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">100+</p>
                            Shortcuts
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Daily</p>
                            Practice Mode
                        </div>
                    </div>
                </div>

                {/* Right Visual */}
                <div className="relative">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 space-y-4">

                        {/* Fake app header */}
                        <div className="flex gap-2">
                            <span className="h-3 w-3 bg-red-300 rounded-full"></span>
                            <span className="h-3 w-3 bg-yellow-300 rounded-full"></span>
                            <span className="h-3 w-3 bg-green-300 rounded-full"></span>
                        </div>

                        {/* Shortcut cards */}
                        <div className="space-y-3 mt-4">
                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                <span className="text-gray-700">Duplicate Layer</span>
                                <span className="font-mono text-sm bg-white px-3 py-1 rounded-lg border">
                                    Ctrl + D
                                </span>
                            </div>

                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                <span className="text-gray-700">Command Palette</span>
                                <span className="font-mono text-sm bg-white px-3 py-1 rounded-lg border">
                                    Ctrl + K
                                </span>
                            </div>

                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                <span className="text-gray-700">Group Selection</span>
                                <span className="font-mono text-sm bg-white px-3 py-1 rounded-lg border">
                                    Ctrl + G
                                </span>
                            </div>
                        </div>

                        {/* Floating keys */}
                        <div className="absolute -top-4 -right-10 bg-white shadow-md border rounded-xl px-3 py-2 text-sm font-mono">
                            Shift + A
                        </div>

                        <div className="absolute -bottom-3 -left-10 bg-white shadow-md border rounded-xl px-3 py-2 text-sm font-mono">
                            Ctrl + Z
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}