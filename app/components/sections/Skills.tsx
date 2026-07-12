import {skills} from "../../data/skills";
import SkillCategoryCard from "../cards/SkillCategoryCard";

export default function Skills() {

    return (

        <section
            id="skills"
            className="bg-slate-900 text-white py-24"
        >

            <div className="max-w-6xl mx-auto px-8">

                <h2 className="text-4xl font-bold mb-4">
                    Skills
                </h2>

                <p className="text-lg text-slate-300 mb-12 max-w-2xl">
                    A comprehensive overview of my technical expertise and tools I work with
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skillCategory) => (
                        <SkillCategoryCard
                            key={skillCategory.category}
                            category={skillCategory.category}
                            skills={skillCategory.skills}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

