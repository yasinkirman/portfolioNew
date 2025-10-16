import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ProjectsAdmin({ token }) {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    github: "",
    live: "",
    tags: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const API_URL = "http://localhost:5000/api/projects";

  const fetchProjects = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not fetch projects",
        severity: "error",
      });
    }
  }, [token]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSubmit = async () => {
    const { title, description, github, live, tags } = form;
    if (!title || !description || !github || !live || !tags) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    const options = {
      method: editProject ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    };

    try {
      const res = await fetch(
        editProject ? `${API_URL}/${editProject._id}` : API_URL,
        options
      );
      if (!res.ok) throw new Error("Operation failed");

      setOpen(false);
      setForm({ title: "", description: "", github: "", live: "", tags: "" });
      setEditProject(null);
      fetchProjects();
      setSnackbar({
        open: true,
        message: editProject ? "Project updated" : "Project added",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not save project",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchProjects();
      setSnackbar({
        open: true,
        message: "Project deleted",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not delete project",
        severity: "error",
      });
    }
  };

  const openDialog = (project = null) => {
    setEditProject(project);
    setForm(
      project
        ? {
            title: project.title,
            description: project.description,
            github: project.github,
            live: project.live,
            tags: project.tags,
          }
        : { title: "", description: "", github: "", live: "", tags: "" }
    );
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditProject(null);
  };

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Manage Projects
      </Typography>

      <Button variant="contained" onClick={() => openDialog()}>
        Add Project
      </Button>

      <Paper sx={{ mt: 3, p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Title</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
              <TableCell>
                <b>GitHub</b>
              </TableCell>
              <TableCell>
                <b>Live</b>
              </TableCell>
              <TableCell>
                <b>Tags</b>
              </TableCell>
              <TableCell align="right">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((proj) => (
              <TableRow key={proj._id}>
                <TableCell>{proj.title}</TableCell>
                <TableCell>{proj.description}</TableCell>
                <TableCell>{proj.github}</TableCell>
                <TableCell>{proj.live}</TableCell>
                <TableCell>{proj.tags}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => openDialog(proj)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(proj._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog */}
      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>
          {editProject ? "Edit Project" : "Add Project"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="GitHub URL"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            fullWidth
          />
          <TextField
            label="Live URL"
            value={form.live}
            onChange={(e) => setForm({ ...form, live: e.target.value })}
            fullWidth
          />
          <TextField
            label="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editProject ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
