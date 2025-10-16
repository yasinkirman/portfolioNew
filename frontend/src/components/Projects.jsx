import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import SectionDivider from "./SectionDivider";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  console.log(projects);

  return (
    <section id="projects" className="projects-section">
      <SectionDivider text="PROJECTS" color="#64b5f6" />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
