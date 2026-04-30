import Link from "next/link"
import { BsGithub } from "react-icons/bs"
import { AiTwotoneMail } from "react-icons/ai";
import { LiaLinkedin } from "react-icons/lia"
import { MdOutlineKeyboard } from "react-icons/md"

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-zinc-200 pt-8 pb-6">
            <div className="container mx-auto px-6 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                    <div>
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-2">
                            <div className="p-2 bg-zinc-100 rounded-lg">
                                <MdOutlineKeyboard size={20} className="text-zinc-900" />
                            </div>
                            <h2 className="text-2xl font-black text-zinc-900">Key<span className="text-blue-600">Sprint</span></h2>
                        </Link>
                    </div>
                    <div className="flex gap-4">
                        <Link href="mailto:gajendrasrathore20@gmail.com" className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-400 hover:text-zinc-900 transition-colors">
                            <AiTwotoneMail size={18} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/gajendra-singh-rathore-7868612b4?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-400 hover:text-zinc-900 transition-colors">
                            <LiaLinkedin size={18} />
                        </Link>
                        <Link href="https://github.com/gajendraDeveloper" target="_blank" className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-400 hover:text-zinc-900 transition-colors">
                            <BsGithub size={18} />
                        </Link>
                    </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-3 text-center">
                    <p className="text-zinc-400 text-sm">© 2026 KeySprint. All rights reserved.</p>
                    <div className="text-zinc-500 text-sm">
                        Made with <span title="love" className="animate-pulse inline-block">❤️</span> by <span className="text-indigo-600 font-medium">Gajendra Rathore</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
