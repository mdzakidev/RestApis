import { FaInstagram } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

export default function FooterLanding() {
    return (
        <footer className="w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-44 py-8 text-black gap-4">
            <div className="flex gap-4">
                <a href="https://www.instagram.com/xyzencode" target="_blank" title="instagram" className="font-medium text-sm flex gap-1 items-center"><FaInstagram />@xyzencode</a>
                <a href="mailto:creator@xyzen.tech" target="_blank" title={"email"} className={"font-medium text-sm flex gap-1 items-center"}>
                    <MdOutlineEmail />creator@xyzen.tech
                </a>
            </div>
            <div>Powered by <span className={"text-primary-500 font-semibold"}>Zayden</span></div>
        </footer>
    )
}