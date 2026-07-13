"use client";
import { useState } from "react";
import {projects} from "../../data/projects";
import ProjectCard from "../cards/ProjectCard";
import Button from "../ui/Button";

const categories = [
        "All",
        ...new Set(projects.map(project => project.category))
    ];

export default function Projects() {

    const [selectedCategory, setSelectedCategory] = useState("All");
    
    const visibleProjects =
       selectedCategory === "All"
           ? projects
           : projects.filter(
                 project =>
                     project.category === selectedCategory
             );

    return (

       <section
                   id="projects"
                   className="bg-slate-950 text-white py-24"
               >
               <div className="max-w-6xl mx-auto px-8">
                   <div className="flex gap-4 mb-8 flex-wrap">
                       {categories.map(category => (
                         <Button
                             key={category}
                             text={category}
                             variant={
                                 selectedCategory === category
                                     ? "primary"
                                     : "secondary"
                             }
                             onClick={() => setSelectedCategory(category)}
                         />
                       ))}
                   </div>

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
                       {visibleProjects.map((project) => (
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