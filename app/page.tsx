import Hero from "./components/sections/Hero";
import Navbar from "./components/layouts/Navbar";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
        <About />
        <Experience/>
        <Projects/>
    </>
  );
}