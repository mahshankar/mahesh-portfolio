type EducationCardProps = {
    degree: string;
    institution: string;
    duration: string;
    description: string;
    skills: string[];
};

export default function EducationCard({
    degree,
    institution,
    duration,
    description,
    skills,
}: EducationCardProps) {
    return (
        <div className="bg-slate-800 rounded-xl p-8 hover:bg-slate-700 transition duration-300">

            <h3 className="text-3xl font-bold mt-2">
                {degree}
            </h3>
            <p className="text-gray-300  mt-2">
            <span className="text-blue-400 font-semibold">
                            {institution}
            </span>
            </p>

            <p className="text-blue-400 font-semibold">
                                {duration}
            </p>
            <p className="text-gray-400 mt-4 leading-7">
                {description}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">

                {skills.map((skill) => (

                    <span
                        key={skill}
                        className="
                        bg-slate-800
                        rounded-xl
                        p-8
                        hover:bg-slate-700
                        hover:-translate-y-1
                        hover:shadow-xl
                        transition-all
                        duration-300"    >
                        {skill}
                    </span>

                ))}
            </div>
        </div>
    );
}

