import { projects } from "@/data/content";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <SectionHeading
        kicker="PROJECTS"
        title="Selected work"
        description="Four systems, four different problems — real-time inventory, e-commerce, applied NLP, and generative sequence modeling."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
