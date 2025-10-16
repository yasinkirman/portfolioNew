import { Box, Typography, Chip, Paper, Link, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

export default function ProjectCard({ project }) {
  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 3,
        width: "80%",
      }}
    >
      <Box mb={3}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
      </Box>

      <Box mb={3}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {project.tags?.split(",").map((tag, index) => (
            <Chip key={index} label={tag.trim()} color="primary" size="small" />
          ))}
        </Stack>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Link
          href={project.github}
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <GitHubIcon fontSize="small" /> GitHub
        </Link>
        <Link
          href={project.live}
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <LaunchIcon fontSize="small" /> Live
        </Link>
      </Box>
    </Paper>
  );
}
