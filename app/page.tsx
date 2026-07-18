import Hero from "./components/sections/Hero";
import Navbar from "./components/layouts/Navbar";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Education from "./components/sections/Education";
import Certification from "./components/sections/Certification";
import  Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import BackToTop from "./components/ui/BackToTop";
import Github from "./components/sections/Github";
import ContactForm from "./components/contact/ContactForm";
import AIAssistant from "./components/sections/AIAssistant";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AIAssistant/>
        <About />
        <Experience/>
        <Skills/>
         <Projects/>
         <Github/>
        <Education/>
        <Certification/>
        <Contact/>
        <Footer/>
        <BackToTop />
    </>
  );
}