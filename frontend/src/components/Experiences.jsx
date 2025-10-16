import { Grid, Container } from "@mui/material";
import SectionDivider from "./SectionDivider";
import ExperienceCard from "./ExperienceCard";
import { useEffect, useState } from "react";

export default function Experiences() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch("https://portfolionew-zx2z.onrender.com/api/experiences")
      .then((res) => res.json())
      .then((data) => setExperiences(data));
  }, []);
  console.log(experiences);

  return (
    <section id="experiences" className="experiences-section">
      <SectionDivider text="EXPERIENCES" color="white" />
      <Container maxWidth="lg">
        <Grid container spacing={12}>
          {experiences.map((experience) => (
            <Grid item xs={12} sm={6} md={4} key={experience._id}>
              <ExperienceCard experience={experience} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
