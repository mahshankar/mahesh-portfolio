import {projects} from "../../data/projects";
import ProjectCard from "../cards/ProjectCard";

export default function Projects() {

    return (

        <section
            id="projects"
            className="bg-slate-900 text-white py-24"
        >

            <div className="max-w-6xl mx-auto px-8">

                <h2 className="text-4xl font-bold">
                    Featured Projects
                </h2>

                <p className="text-gray-400 mt-4">
                    A selection of enterprise platforms I've helped design, modernize, and deliver.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-12">

                    {projects.map((project) => (

                        <ProjectCard

                            key={project.id}

                            title={project.title}

                            client={project.client}

                            description={project.description}

                            technologies={project.technologies}

                        />

                    ))}

                </div>

            </div>

        </section>

    );

}