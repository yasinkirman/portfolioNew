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

export default function SkillsAdmin({ token }) {
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [editSkill, setEditSkill] = useState(null);
  const [form, setForm] = useState({ name: "", level: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const API_URL = "http://localhost:5000/api/skills";

  // 🔹 fetchSkills fonksiyonunu useCallback ile tanımla
  const fetchSkills = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch skills");
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not fetch skills",
        severity: "error",
      });
    }
  }, [token]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // 🔹 Skill ekle veya güncelle
  const handleSubmit = async () => {
    const level = Number(form.level);
    if (!form.name || isNaN(level) || level < 0 || level > 100) {
      setSnackbar({
        open: true,
        message: "Level must be between 0 and 100",
        severity: "error",
      });
      return;
    }

    const options = {
      method: editSkill ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    };

    try {
      const res = await fetch(
        editSkill ? `${API_URL}/${editSkill._id}` : API_URL,
        options
      );
      if (!res.ok) throw new Error("Operation failed");

      setOpen(false);
      setForm({ name: "", level: "" });
      setEditSkill(null);
      fetchSkills();
      setSnackbar({
        open: true,
        message: editSkill ? "Skill updated" : "Skill added",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not save skill",
        severity: "error",
      });
    }
  };

  // 🔹 Skill sil
  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğine emin misin?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchSkills();
      setSnackbar({
        open: true,
        message: "Skill deleted",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not delete skill",
        severity: "error",
      });
    }
  };

  // 🔹 Dialog aç/kapat
  const openDialog = (skill = null) => {
    setEditSkill(skill);
    setForm(
      skill ? { name: skill.name, level: skill.level } : { name: "", level: "" }
    );
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditSkill(null);
  };

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Manage Skills
      </Typography>

      <Button variant="contained" onClick={() => openDialog()}>
        Add Skill
      </Button>

      <Paper sx={{ mt: 3, p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Level (%)</b>
              </TableCell>
              <TableCell align="right">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill._id}>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.level}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => openDialog(skill)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(skill._id)}
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
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{editSkill ? "Edit Skill" : "Add Skill"}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Skill Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Level (0-100)"
            type="number"
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
            fullWidth
            slotProps={{ input: { min: 0, max: 100 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editSkill ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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
