type SkillCategoryCardProps = {

    category: string;

    skills: string[];

};

export default function SkillCategoryCard({
    category,
    skills = [],
}: SkillCategoryCardProps) {
    return (
        <div className="bg-slate-900 text-blue-400 p-6 rounded-lg">

            <h3 className="text-2xl
                           font-semibold
                           text-blue-400">
                {category}
            </h3>

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
                        duration-300
                        "
                    >
                        {skill}
                    </span>

                ))}

            </div>

        </div>
    );
}