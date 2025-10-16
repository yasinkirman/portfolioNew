import { Paper, Typography } from "@mui/material";

export default function ExperienceCard({ experience }) {
  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: "80%" }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {experience.position}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {experience.company} | {experience.durationStart} -{" "}
        {experience.durationEnd}
      </Typography>
      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
        {experience.description}
      </Typography>
    </Paper>
  );
}
