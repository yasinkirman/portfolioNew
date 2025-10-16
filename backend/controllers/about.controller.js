import * as aboutService from "../services/about.service.js";

// 🔹 Tüm About verisini getir
export const getAbout = async (req, res) => {
  try {
    const about = await aboutService.getAbout();
    console.log("About verisi çekildi:", about);
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 About güncelle
export const editAbout = async (req, res) => {
  try {
    const { name, title, description, description2 } = req.body;
    let avatar;

    // Eğer multer ile dosya yüklenmişse
    if (req.file) {
      avatar = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const about = await aboutService.updateAbout(req.params.id, {
      name,
      title,
      description,
      description2,
      avatar,
    });

    if (!about) return res.status(404).json({ error: "About bulunamadı" });

    res.json(about);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
