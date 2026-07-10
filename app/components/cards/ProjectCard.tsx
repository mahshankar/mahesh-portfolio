type ProjectCardProps = {

    title: string;

    client: string;

    description: string;

    technologies: string[];

};

export default function ProjectCard({
    title,
    client,
    description,
    technologies,
}: ProjectCardProps) {

    return (

        <div className="bg-slate-800 rounded-xl p-8 hover:bg-slate-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

            <p className="text-blue-400 font-semibold">
                {client}
            </p>

            <h3 className="text-3xl font-bold mt-2">
                {title}
            </h3>

            <p className="text-gray-400 mt-5 leading-7">
                {description}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">

                {technologies.map((tech) => (

                    <span
                        key={tech}
                        className="bg-slate-900 text-blue-400 px-4 py-2 rounded-full text-sm font-medium"
                    >
                        {tech}
                    </span>

                ))}

            </div>

            <button className="mt-8 text-blue-400 hover:text-white transition">
                View Details →
            </button>

        </div>

    );

}