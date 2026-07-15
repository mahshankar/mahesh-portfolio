"use client";
import { navigation } from "../../data/navigation";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";

export default function Navbar() {
    const activeSection = useActiveSection(navigation, "home");



    return (


        <nav className="fixed top-0 left-0 right-0 bg-slate-900 text-white shadow-lg">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

                <h1 className="text-xl font-bold text-blue-400">
                    {profile.name}
                </h1>

                <ul className="flex gap-8 text-gray-300">

                    {navigation.map((item) => (
                        <li key={item.id}>
                         <a href={item.href} className={
                                                     activeSection === item.id
                                                          ? "text-blue-400 border-b-2 border-blue-400 pb-1 transition-all duration-300"
                                                                 : "text-gray-300 hover:text-white pb-1 border-b-2 border-transparent transition-all duration-300"
                                                         }>
                            {item.label}
                           </a>
                        </li>
                    ))}

                </ul>

            </div>

        </nav>

    );
}

