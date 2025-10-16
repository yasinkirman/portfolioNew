import { Typography, Grid, Avatar } from "@mui/material";
import SectionDivider from "./SectionDivider";
import { useEffect, useState } from "react";

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch("https://portfolionew-zx2z.onrender.com/api/about")
      .then((res) => res.json())
      .then((data) => setAbout(data[0]));
  }, []);

  console.log(about);

  if (!about) return <p>Loading...</p>; // Yüklenene kadar göster

  return (
    <section id="about" className="about-section">
      <SectionDivider text="ABOUT ME" color="white" />
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        maxWidth="lg"
        sx={{ margin: "0 auto" }}
      >
        {/* Sol: Fotoğraf */}
        <Grid item xs={12} md={6}>
          <Avatar
            src={"/yasin_kirman.JPG"}
            alt={about.name}
            sx={{
              width: 220,
              height: 220,
              border: "6px solid white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              margin: "0 auto",
            }}
          />
        </Grid>

        {/* Sağ: Yazı */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {about.name}
          </Typography>
          <Typography variant="h6" color="#ddd" gutterBottom>
            {about.title}
          </Typography>
          {about.description.map((desc, idx) => (
            <Typography
              key={idx}
              variant="body1"
              color="#ddd"
              sx={{ lineHeight: 1.8, fontSize: "1.1rem", mb: 2 }}
            >
              {desc}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </section>
  );
}
