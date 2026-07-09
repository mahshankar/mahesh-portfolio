import { about } from "../../data/about";

export default function About() {
    return (
        <section id="about" className="bg-slate-900 text-white py-24">

            <div className="max-w-6xl mx-auto px-8">

                <h2  className="text-4xl font-bold mb-8">
                    About Me
                </h2>

                <h3 className="text-2xl text-blue-400 mt-4">
                    {about.heading}
                </h3>

               {about.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-gray-300 mt-4 leading-8 text-lg">
                        {paragraph}
                    </p>
                ))}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                                    {about.stats.map((item) => (

                                       <div
                                           key={item.label}
                                           className="bg-slate-800 rounded-xl p-6 text-center hover:bg-slate-700
                                                                                              transition
                                                                                              duration-300"
                                       >
                                           <h4 className="text-3xl font-bold text-blue-400">
                                               {item.value}
                                           </h4>

                                           <p className="text-gray-300 mt-2">
                                               {item.label}
                                           </p>
                                       </div>

                                    ))}

            </div>

            </div>

        </section>
    );
}