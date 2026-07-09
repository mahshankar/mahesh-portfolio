import { navigation } from "../../data/navigation";
import {profile} from "../../data/profile";

export default function Navbar() {
    return (

        <nav className="fixed top-0 left-0 right-0 bg-slate-900 text-white shadow-lg">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

                <h1 className="text-xl font-bold text-blue-400">
                    {profile.name}
                </h1>

                <ul className="flex gap-8 text-gray-300">

                    {navigation.map((item) => (
                        <li key={item.id}>
                         <a href={item.href} className="hover:text-white cursor-pointer">
                            {item.label}
                           </a>
                        </li>
                    ))}

                </ul>

            </div>

        </nav>

    );
}

