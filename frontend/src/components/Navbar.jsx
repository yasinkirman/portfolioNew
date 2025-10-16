import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Hakkımda", href: "#about" },
    { text: "Yeteneklerim", href: "#skills" },
    { text: "Tecrübelerim", href: "#experiences" },
    { text: "Projelerim", href: "#projects" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ background: "#1a237e", boxShadow: 3 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "center" },
          }}
        >
          {/* Masaüstü Menü */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
            }}
          >
            {menuItems.map((item) => (
              <Button key={item.text} color="inherit" href={item.href}>
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Mobil Hamburger */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobil Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 200,
            backgroundColor: "#1a237e",
            color: "white",
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component="a"
                href={item.href}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
