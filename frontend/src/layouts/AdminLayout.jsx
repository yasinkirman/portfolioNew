import { Box, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const menu = [
    { text: "Dashboard", path: "/admin" },
    { text: "About", path: "/admin/about" },
    { text: "Skills", path: "/admin/skills" },
    { text: "Projects", path: "/admin/projects" },
    { text: "Experiences", path: "/admin/experiences" },
  ];

  return (
    <Box display="flex">
      <Drawer
        variant="permanent"
        sx={{
          width: 200,
          [`& .MuiDrawer-paper`]: {
            width: 200,
            boxSizing: "border-box",
            backgroundColor: "#1976d2",
            color: "white",
          },
        }}
      >
        <List>
          {menu.map((item) => (
            <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
