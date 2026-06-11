const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const db = require("./config/db");
const { storage } = require("./config/cloudinary");

const upload = multer({
    storage: storage
});

const api = express.Router();

const authRoutes = require("./routes/auth");

const app = express();

const path = require("path");

app.use(cors());
app.use(express.json());

// app.use(
//     "/uploads",
//     express.static(
//         path.join(__dirname, "uploads")
//     )
// );

api.use("/", authRoutes);

const PORT = process.env.PORT || 5000;

api.get("/gallery", (req, res) => {

    const gallery = [

        {
            id: 1,
            image: "../foto/Rectangle 51.png"
        },

        {
            id: 2,
            image: "../foto/Rectangle 56.png"
        },

        {
            id: 3,
            image: "../foto/bajuhome2.png"
        },

        {
            id: 4,
            image: "../foto/Rectangle 70.png"
        },

        {
            id: 5,
            image: "../foto/Rectangle 72.png"
        },

        {
            id: 6,
            image: "../foto/bajuhome3.png"
        }

    ];

    res.json(gallery);

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

api.post(
    "/apply-model",
    upload.single("foto"),
    (req, res) => {

        const {
            nama,
            kontak,
            portof
        } = req.body;

        const foto = req.file.path; // Save Cloudinary URL instead of local filename

        const sql = `
            INSERT INTO pendaftaran_model
            (nama, kontak, portof, foto, tanggal_daftar)
            VALUES (?, ?, ?, ?, NOW())
        `;

        db.query(
            sql,
            [
                nama,
                kontak,
                portof,
                foto
            ],
            (err, result) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        message: "Pendaftaran gagal"
                    });

                }

                res.json({
                    message: "Pendaftaran berhasil 🎀"
                });

            }
        );

    }
);

const designerRoutes =
require("./routes/designer");

api.use("/designer", designerRoutes);

const projectModelRoutes =
require("./routes/project_model");

api.use(
    "/project-model",
    projectModelRoutes
);

// Mount API router
app.use("/api", api);
app.use("/", api); // Fallback if Vercel strips /api during rewrite

// app.use(
// "/uploads",
// express.static(
// path.join(__dirname,"uploads")
// )
// );

module.exports = app;
