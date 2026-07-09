import Hero from "./components/sections/Hero";
import Navbar from "./components/layouts/Navbar";
import About from "./components/sections/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
        <About />
    </>
  );
}