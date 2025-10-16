import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";

export default function Dashboard({ token }) {
  const [stats, setStats] = useState({
    skills: 0,
    experiences: 0,
    projects: 0,
  });

  const API_URL = "https://portfolionew-zx2z.onrender.com/api";

  useEffect(() => {
    if (!token) {
      console.log("No token provided");
      return;
    }

    const fetchStats = async () => {
      try {
        console.log("Fetching skills...");
        const skillsRes = await fetch(`${API_URL}/skills`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const skillsData = await skillsRes.json();
        console.log("Skills response:", skillsData);

        console.log("Fetching experiences...");
        const experiencesRes = await fetch(`${API_URL}/experiences`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const experiencesData = await experiencesRes.json();
        console.log("Experiences response:", experiencesData);

        console.log("Fetching projects...");
        const projectsRes = await fetch(`${API_URL}/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const projectsData = await projectsRes.json();
        console.log("Projects response:", projectsData);

        setStats({
          skills: Array.isArray(skillsData) ? skillsData.length : 0,
          experiences: Array.isArray(experiencesData)
            ? experiencesData.length
            : 0,
          projects: Array.isArray(projectsData) ? projectsData.length : 0,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6">Total Skills</Typography>
              <Typography variant="h4">{stats.skills}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6">Total Experiences</Typography>
              <Typography variant="h4">{stats.experiences}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6">Total Projects</Typography>
              <Typography variant="h4">{stats.projects}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
