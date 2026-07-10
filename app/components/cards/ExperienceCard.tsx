type ExperienceCardProps = {
    company: string;
    role: string;
    duration: string;
    project: string;
    description: string;
    technologies: string[];
};

export default function ExperienceCard({
    company,
    role,
    duration,
    project,
    description,
    technologies,
}: ExperienceCardProps) {
    return (
        <div className="bg-slate-800 rounded-xl p-8 hover:bg-slate-700 transition duration-300">

            <p className="text-blue-400 font-semibold">
                {duration}
            </p>

            <h3 className="text-3xl font-bold mt-2">
                {company}
            </h3>

            <h4 className="text-xl text-gray-300 mt-2">
                {role}
            </h4>

            <p className="text-lg text-white mt-4 font-semibold">
                {project}
            </p>

            <p className="text-gray-400 mt-4 leading-7">
                {description}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">

                {technologies.map((tech) => (

                    <span
                        key={tech}
                        className="
                        bg-slate-800
                        rounded-xl
                        p-8
                        hover:bg-slate-700
                        hover:-translate-y-1
                        hover:shadow-xl
                        transition-all
                        duration-300
                        "
                    >
                        {tech}
                    </span>

                ))}

            </div>

        </div>
    );
}