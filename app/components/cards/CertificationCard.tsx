type CertificationCardProps = {
    title: string;
    issuer: string;
    year: string;
    description: string;
    skills: string[];
};


    export default function CertificationCard({
        title,
        issuer,
        year,
        description,
        skills = [],
    }: CertificationCardProps) {
        return (
            <div className="bg-slate-800 rounded-xl p-8 hover:-translate-y-1
                                                        hover:shadow-xl
                                                        transition-all
                                                        duration-300 transition duration-300">

                <h3 className="text-2xl font-bold">
                    {title}
                </h3>
                <p className="text-blue-400 font-semibold mt-2">
                    {issuer} • {year}
                </p>
                <p className="text-gray-300 mt-4">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

