const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const db = require("./config/db");
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});

const upload = multer({
    storage: storage
});

const authRoutes = require("./routes/auth");

const app = express();

const path = require("path");

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.use("/", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/gallery", (req, res) => {

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

app.post(
    "/apply-model",
    upload.single("foto"),
    (req, res) => {

        const {
            nama,
            kontak,
            portof
        } = req.body;

        const foto = req.file.filename;

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

app.use("/designer", designerRoutes);

const projectModelRoutes =
require("./routes/project_model");

app.use(
    "/project-model",
    projectModelRoutes
);

// app.use(
// "/uploads",
// express.static(
// path.join(__dirname,"uploads")
// )
// );
