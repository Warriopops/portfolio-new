import Banner from "./components/Banner";
import ScrollBar from "./components/ScrollBar";
import Projects from "./components/Projects";
import Skill from "./components/Skill";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import { EXPERIENCES } from "./data/experiences";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <ScrollBar speed={250}></ScrollBar>
      <Projects projects={EXPERIENCES} />
      <Skill />
      <Contact />
      <Footer />
    </div>
  );
}
