import { Grid, Container } from "@mui/material";
import SectionDivider from "./SectionDivider";
import SkillCard from "./SkillCard";
import { useEffect, useState } from "react";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  return (
    <section id="skills" className="skills-section">
      <SectionDivider text="SKILLS" color="#64b5f6" />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {skills.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill._id}>
              <SkillCard skill={skill} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
