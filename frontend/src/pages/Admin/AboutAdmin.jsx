import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";

export default function AboutAdmin({ token }) {
  const [about, setAbout] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    avatar: null, // File objesi
    avatarPreview: "", // Önizleme için URL
    description: [],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const API_URL = "http://localhost:5000/api/about";

  const fetchAbout = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch about data");
      const data = await res.json();
      console.log("Fetched about data: ", data);
      setAbout(data[0] || null);
      if (data[0]) {
        setForm({
          name: data[0].name,
          title: data[0].title,
          avatar: null,
          avatarPreview: data[0].avatar,
          description: data[0].description || [],
        });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not fetch about data",
        severity: "error",
      });
    }
  }, [token]);

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.title ||
      (!form.avatar && !form.avatarPreview) ||
      !form.description.length
    ) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("title", form.title);
      formData.append("description", JSON.stringify(form.description));
      if (form.avatar) {
        formData.append("avatar", form.avatar);
      }

      const res = await fetch(`${API_URL}/${about._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      setSnackbar({
        open: true,
        message: "About updated successfully",
        severity: "success",
      });
      fetchAbout();
      setOpen(false);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Could not update about",
        severity: "error",
      });
    }
  };

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Manage About
      </Typography>

      <Button variant="contained" onClick={openDialog}>
        Edit About
      </Button>

      {/* About Preview */}
      {about && (
        <Box sx={{ mt: 3, display: "flex", gap: 4, alignItems: "center" }}>
          <Avatar
            src={form.avatarPreview}
            alt={about.name}
            sx={{ width: 120, height: 120, border: "4px solid gray" }}
          />
          <Box>
            <Typography variant="h6">{about.name}</Typography>
            <Typography variant="subtitle1">{about.title}</Typography>
            {about.description.map((desc, i) => (
              <Typography key={i} variant="body2">
                {desc}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      {/* Dialog */}
      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>Edit About</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            fullWidth
          />

          <Button variant="outlined" component="label">
            Upload Avatar
            <input type="file" hidden onChange={handleAvatarChange} />
          </Button>

          {form.avatarPreview && (
            <Avatar
              src={form.avatarPreview}
              alt="Preview"
              sx={{ width: 120, height: 120, mt: 1 }}
            />
          )}

          {form.description.map((desc, i) => (
            <TextField
              key={i}
              label={`Description ${i + 1}`}
              value={desc}
              onChange={(e) => {
                const newDesc = [...form.description];
                newDesc[i] = e.target.value;
                setForm({ ...form, description: newDesc });
              }}
              fullWidth
              multiline
              rows={2}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Update
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
