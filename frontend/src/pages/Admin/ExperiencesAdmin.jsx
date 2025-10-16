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

export default function ExperiencesAdmin({ token }) {
  const [experiences, setExperiences] = useState([]);
  const [open, setOpen] = useState(false);
  const [editExperience, setEditExperience] = useState(null);
  const [form, setForm] = useState({
    position: "",
    company: "",
    durationStart: "",
    durationEnd: "",
    description: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const API_URL = "http://localhost:5000/api/experiences";

  const fetchExperiences = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch experiences");
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not fetch experiences",
        severity: "error",
      });
    }
  }, [token]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleSubmit = async () => {
    const { position, company, durationStart, durationEnd, description } = form;
    if (
      !position ||
      !company ||
      !durationStart ||
      !durationEnd ||
      !description
    ) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    const options = {
      method: editExperience ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    };

    try {
      const res = await fetch(
        editExperience ? `${API_URL}/${editExperience._id}` : API_URL,
        options
      );
      if (!res.ok) throw new Error("Operation failed");

      setOpen(false);
      setForm({
        position: "",
        company: "",
        durationStart: "",
        durationEnd: "",
        description: "",
      });
      setEditExperience(null);
      fetchExperiences();
      setSnackbar({
        open: true,
        message: editExperience ? "Experience updated" : "Experience added",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not save experience",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?"))
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchExperiences();
      setSnackbar({
        open: true,
        message: "Experience deleted",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not delete experience",
        severity: "error",
      });
    }
  };

  const openDialog = (experience = null) => {
    setEditExperience(experience);
    setForm(
      experience
        ? {
            position: experience.position,
            company: experience.company,
            durationStart: experience.durationStart,
            durationEnd: experience.durationEnd,
            description: experience.description,
          }
        : {
            position: "",
            company: "",
            durationStart: "",
            durationEnd: "",
            description: "",
          }
    );
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditExperience(null);
  };

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Manage Experiences
      </Typography>

      <Button variant="contained" onClick={() => openDialog()}>
        Add Experience
      </Button>

      <Paper sx={{ mt: 3, p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Position</b>
              </TableCell>
              <TableCell>
                <b>Company</b>
              </TableCell>
              <TableCell>
                <b>Duration</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
              <TableCell align="right">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences.map((exp) => (
              <TableRow key={exp._id}>
                <TableCell>{exp.position}</TableCell>
                <TableCell>{exp.company}</TableCell>
                <TableCell>{`${exp.durationStart} - ${exp.durationEnd}`}</TableCell>
                <TableCell>{exp.description}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => openDialog(exp)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(exp._id)}
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
          {editExperience ? "Edit Experience" : "Add Experience"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Position"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            fullWidth
          />
          <TextField
            label="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            fullWidth
          />
          <TextField
            label="Start Duration"
            value={form.durationStart}
            onChange={(e) =>
              setForm({ ...form, durationStart: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="End Duration"
            value={form.durationEnd}
            onChange={(e) => setForm({ ...form, durationEnd: e.target.value })}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editExperience ? "Update" : "Add"}
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
