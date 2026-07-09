import { profile } from "../../data/profile";
import Button from "../ui/Button";


export default function Hero() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center">
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

        <div className="mt-10 flex gap-5">

          <Button  text="View Projects" variant="primary" />

          <Button text="Download Resume" variant="secondary" />

        </div>

      </div>
    </section>
  );
}