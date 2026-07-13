"use client";

import { useState } from "react";

type ProjectCardProps = {
    company: string;
    project: string;
    role: string;
    duration: string;
    description: string;
    businessProblem: string;
    responsibilities: string[];
    technologies: string[];
    architecture: string[];
    achievements: string[];
};

export default function ProjectCard({
    company,
    project,
    role,
    duration,
    description,
    technologies,
    responsibilities,
    businessProblem,
    architecture,
    achievements
}: ProjectCardProps) {
    const [expanded, setExpanded] = useState(false);
    return (

        <div className="bg-slate-800 rounded-xl p-8 hover:bg-slate-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

            <h3 className="text-2xl font-bold text-blue-400">
                {company}
            </h3>

            <p className="text-xl font-semibold mt-2">
                {project}
            </p>
            <p className="text-slate-400 mt-2">
                {role} • {duration}
            </p>

            <p className="text-gray-300 mt-6 leading-7">
                {description}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">

                {technologies.map((tech) => (

                    <span
                        key={tech}
                        className="bg-slate-700 px-3 py-1 rounded-full text-sm"
                    >
                        {tech}
                    </span>

                ))}

            </div>

          <div
              className={`overflow-hidden
                  transition-all
                  duration-500
                  ease-in-out
                  ${
                      expanded
                          ? "max-h-[1200px] opacity-100 mt-8"
                          : "max-h-0 opacity-0"
                  }
              `}
          >
                <div className="border-t border-slate-700 pt-6">

                    <h4 className="text-lg font-semibold text-blue-400">
                        Business Problem
                    </h4>

                    <p className="text-slate-300 mt-2">
                        {businessProblem}
                    </p>

                    <h4 className="text-lg font-semibold text-blue-400 mt-8">
                                        Responsibilities
                                    </h4>

                                    <ul className="list-disc list-inside mt-3 space-y-2 text-slate-300">
                                        {responsibilities.map((item, index) => (
                                            <li key={item}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                     <h4 className="text-lg font-semibold text-blue-400 mt-8">
                      Architecture
                      </h4>
                        <ul className="list-disc list-inside mt-3 space-y-2 text-slate-300">
                                {architecture.map((item, index) => (
                                    <li key={item}>
                                  {item}
                                   </li>
                                   ))}
                           </ul>
                       <h4 className="text-lg font-semibold text-blue-400 mt-8">
                           Achievements
                         </h4>
                    <ul className="list-disc list-inside mt-3 space-y-2 text-slate-300">
                        {achievements.map((item, index) => (
                          <li key={item}>
                         {item}
                         </li>
                        ))}
                    </ul>


                </div>

        </div>

            <button onClick={() => setExpanded(!expanded)} className="mt-8 text-blue-400 hover:text-white transition">
               {expanded ? "▲ Show Less" : "▼ View Details"}
            </button>

        </div>

    );

}