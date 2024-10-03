import Link from 'next/link';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FaGithub, FaInstagram } from 'react-icons/fa6';

const data = [
    {
        icon: <FaInstagram />,
        name: "Instagram",
        href: "https://www.instagram.com/rizzcode"
    },
    {
        icon: <AiOutlineYoutube />,
        name: "YouTube",
        href: "https://www.youtube.com/@farisofc"
    },
    {
        icon: <FaGithub />,
        name: "Github",
        href: "https://github.com/farisofc"
    }
];

export default function ContactDashboard() {
    return (
        <div className="w-full">
            <div className="background rounded-xl w-full p-4 border border-a">
                <div className="text-2xl mb-2">Contact Me</div>
                <div className="text-sm font-normal mb-2">Tertarik dengan Premium Plan atau VIP Plan? Menemukan bug atau punya ide fitur baru? Jangan ragu untuk menghubungi saya melalui info di bawah ini!</div>
                <div className="flex flex-col gap-2">
                    {data.map((item, index) => (
                        <Link key={index} href={item.href} className="font-normal text-sm flex gap-1 items-center" target='_blank'>
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
