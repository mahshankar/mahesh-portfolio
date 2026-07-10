import {experience} from "../../data/experience";
import ExperienceCard from "../cards/ExperienceCard";

export default function Experience() {
    return (

        <section
            id="experience"
            className="bg-slate-950 text-white py-24"
        >

            <div className="max-w-6xl mx-auto px-8">

                <h2 className="text-4xl font-bold">
                    Experience
                </h2>

                <p className="text-gray-400 mt-4">
                    Building enterprise software for banking, government, telecommunications, and public sector organizations.
                </p>

                <div className="space-y-8 mt-12">

                    {experience.map((job) => (

                        <ExperienceCard

                            key={job.id}

                            company={job.company}

                            role={job.role}

                            duration={job.duration}

                            project={job.project}

                            description={job.description}

                            technologies={job.technologies}

                        />

                    ))}

                </div>

            </div>

        </section>

    );
}