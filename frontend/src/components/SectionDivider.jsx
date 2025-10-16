import { Divider, Typography } from "@mui/material";

export default function SectionDivider({ text, color }) {
  return (
    <Divider
      sx={{
        mt: { xs: 10, md: 0 },
        mb: 10,
        "&::before, &::after": { borderColor: color, borderWidth: "4px" },
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: color, letterSpacing: 1 }}
      >
        {text}
      </Typography>
    </Divider>
  );
}
