import {projects} from "../../data/projects";
import ProjectCard from "../cards/ProjectCard";

export default function Projects() {

    return (

        <section
                    id="projects"
                    className="bg-slate-950 text-white py-24"
                >
                    <div className="max-w-6xl mx-auto px-8">

                        <h2 className="text-4xl font-bold mb-4">
                            Featured Projects
                        </h2>

                        <p className="text-lg text-slate-300 mb-12 max-w-3xl">
                            A selection of enterprise platforms and modernization initiatives
                            I've contributed to over the past 19+ years, delivering scalable,
                            secure, and cloud-ready solutions across financial services,
                            government, and telecommunications.
                        </p>

                        <div className="grid gap-8">

                    {projects.map((project) => (

                        <ProjectCard

                            key={project.id}
                            {...project}

                        />

                    ))}

                </div>

            </div>

        </section>

    );

}