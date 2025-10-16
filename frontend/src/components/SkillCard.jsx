import { Box, Typography, Chip, LinearProgress, Paper } from "@mui/material";

export default function SkillCard({ skill }) {
  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Chip label={skill.name} color="primary" />
        <Typography variant="body2" color="text.secondary">
          {skill.level}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={skill.level}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Paper>
  );
}
