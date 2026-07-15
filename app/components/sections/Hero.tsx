import { profile } from "../../data/profile";
import Button from "../ui/Button";


export default function Hero() {
  return (
    <section id="home" className="min-h-screen bg-slate-950 text-white flex items-center">
      <div className="max-w-6xl mx-auto px-8">

        <p className="text-blue-400 text-lg font-semibold">
          Hello, I'm
        </p>

        <h1 className="text-6xl font-bold mt-3">
          {profile.name}
        </h1>

        <h2 className="text-3xl text-gray-300 mt-4">
          {profile.title}
        </h2>

        <p className="text-xl text-blue-300 mt-6 max-w-3xl">
          {profile.subtitle}
        </p>

        <p className="text-xl text-gray-400 mt-8 max-w-3xl leading-8">
         {profile.description}
        </p>
        <div className="flex flex-wrap gap-3 mt-8">

            <span className="bg-slate-800 px-4 py-2 rounded-full">
                Java 17
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full">
                Spring Boot
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full">
                Kafka
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full">
                Kubernetes
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full">
                AWS
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full">
                Microservices
            </span>

        </div>

        <div className="mt-10 flex gap-5">

          <Button href="#projects" text="View Projects" variant="primary" />

          <Button href="/resume/Mahesh Shankar-Resume (Java).pdf" target="_blank" download text="Download Resume" variant="secondary" />

        </div>

      </div>
    </section>
  );
}