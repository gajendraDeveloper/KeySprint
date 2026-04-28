import Link from "next/link"
import { BsGithub } from "react-icons/bs"
import { DiGithub } from "react-icons/di"
import { GiMailbox, GiThunderBlade } from "react-icons/gi"
import { LiaLinkedin } from "react-icons/lia"
import { MdOutlineKeyboard } from "react-icons/md"

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-zinc-200 pt-4 pb-4">
            <div className="container mx-auto px-8">
                <div className="flex justify-between items-start mb-4">
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="p-2 bg-zinc-100 rounded-lg">
                                <MdOutlineKeyboard size={20} className="text-zinc-900" />
                            </div>
                            <h2 className="text-2xl font-black text-zinc-900">Key<span className="text-blue-600">Sprint</span></h2>
                        </Link>

                    </div>
                    <div className="flex gap-4">
                        <Link href="#" className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-400 hover:text-zinc-900 transition-colors">
                            <GiMailbox size={18} />
                        </Link>
                        <Link href="#" className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-400 hover:text-zinc-900 transition-colors">
                            <LiaLinkedin size={18} />
                        </Link>
                        <Link href="#" className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-400 hover:text-zinc-900 transition-colors">
                            <BsGithub size={18} />
                        </Link>
                    </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-400 text-sm">© 2026 KeySprint. All rights reserved.</p>
                    <div >
                        Made with <span title="love" className="animate-pulse">❤️</span> by <span className="text-[#c7a97c] font-medium">Gajendra Rathore</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
