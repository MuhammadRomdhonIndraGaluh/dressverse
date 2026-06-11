const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
        AND password = ?
    `;

    db.query(sql, [email, password], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Server error"
            });

        }

        if (result.length === 0) {

            return res.status(401).json({
                message: "Email atau password salah"
            });

        }

        const user = result[0];

        // LOGIN DESIGNER
        if(user.role === "designer"){

            const sqlDesigner = `
                SELECT *
                FROM desainer
                WHERE username = ?
            `;

            db.query(
                sqlDesigner,
                [user.nama],
                (err, designerResult)=>{

                    if(err){

                        return res.status(500).json({
                            message:"Server error"
                        });

                    }

                    res.json({

                        message:"Login berhasil",

                        role:"designer",

                        user,

                        designer:
                        designerResult[0]

                    });

                }
            );

        }

        // LOGIN ROLE LAIN
        else{

            res.json({

                message:"Login berhasil",

                role:user.role,

                user

            });

        }

    });

});

router.get("/gallery", (req, res) => {

    const { kategori } = req.query;

    let sql = `
        SELECT *
        FROM gallery_karya
    `;

    let values = [];

    if (kategori) {

        sql += `
            WHERE kategori = ?
        `;

        values.push(kategori);

    }

    db.query(sql, values, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.json(result);

    });

});

router.get("/event/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM event
        WHERE id_event = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.json(result[0]);

    });

});

router.get("/fashion/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            gallery_karya.*,
            desainer.nickname,
            desainer.followers,
            desainer.likes,
            desainer.foto_profile
        FROM gallery_karya
        JOIN desainer
        ON gallery_karya.id_desainer =
        desainer.id_desainer
        WHERE id_karya = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.json(result[0]);

    });

});

router.get("/event", (req, res) => {

    const sql = `
        SELECT *
        FROM event
        WHERE status IN ('active', 'aktif')
        ORDER BY tanggal ASC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});



router.get("/event/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM event
        WHERE id_event = ?
    `;

    db.query(
        sql,
        [id],
        (err, result) => {

            if(err){

                return res
                .status(500)
                .json(err);

            }

            res.json(result[0]);

        }
    );

});

router.put("/event/:id", (req, res) => {

    console.log("===== UPDATE EVENT =====");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const { id } = req.params;

    const {
        nama_event,
        deskripsi,
        tanggal,
        waktu_mulai,
        waktu_selesai,
        lokasi
    } = req.body;

    const sql = `
        UPDATE event
        SET
            nama_event = ?,
            deskripsi = ?,
            tanggal = ?,
            waktu_mulai = ?,
            waktu_selesai = ?,
            lokasi = ?
        WHERE id_event = ?
    `;

    db.query(
        sql,
        [
            nama_event,
            deskripsi,
            tanggal,
            waktu_mulai,
            waktu_selesai,
            lokasi,
            id
        ],
        (err, result) => {

            if(err){

                console.log("MYSQL ERROR:");
                console.log(err);

                return res.status(500).json({
                    message:"Gagal update event"
                });

            }

            console.log("HASIL UPDATE:");
            console.log(result);

            res.json({
                message:"Event berhasil diupdate"
            });

        }
    );

});

const multer = require("multer");
const { storage } = require("../config/cloudinary");

const uploadEvent = multer({
    storage: storage
});

router.post(
    "/event",
    uploadEvent.single("gambar"),
    (req, res) => {

        const {
            nama_event,
            kategori,
            deskripsi,
            tanggal,
            waktu_mulai,
            waktu_selesai,
            lokasi,
            status
        } = req.body;

        const gambar =
            req.file
            ? req.file.path
            : null;

        const sql = `
            INSERT INTO event
            (
                id_user,
                nama_event,
                deskripsi,
                tanggal,
                waktu_mulai,
                waktu_selesai,
                lokasi,
                gambar,
                status,
                kategori
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                7,
                nama_event,
                deskripsi,
                tanggal,
                waktu_mulai,
                waktu_selesai,
                lokasi,
                gambar,
                status,
                kategori
            ],
            (err, result) => {

                if(err){

    console.log("MYSQL ERROR:");
    console.log(err);

    return res.status(500).json({
        message: err.message
    });

}

                res.json({
                    message:
                    "Event berhasil dibuat"
                });

            }
        );

    }
);

router.delete("/event/:id", (req,res)=>{

    const { id } = req.params;

    db.query(
        "DELETE FROM event WHERE id_event = ?",
        [id],
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    message: err.message
                });

            }

            res.json({
                message:"Event berhasil dihapus"
            });

        }
    );

});


router.get("/event", (req, res) => {

    const sql = `
        SELECT *
        FROM event
    `;

    db.query(sql, (err, result) => {

        if(err){

            console.log(err);

            return res.status(500).json({
                message: "Gagal mengambil data event"
            });

        }

        res.json(result);

    });

});

router.get("/eo/event/:id", (req,res)=>{

    const id_user = req.params.id;

    const sql = `
        SELECT *
        FROM event
        WHERE id_user = ?
        ORDER BY id_event DESC
    `;

    db.query(
        sql,
        [id_user],
        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json(result);

        }
    );

});

router.get("/karya/:id", (req,res)=>{

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM gallery_karya
        WHERE id_karya = ?
    `;

    db.query(
        sql,
        [id],
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    message:"Server error"
                });

            }

            res.json(result[0]);

        }
    );

});





// Re-use Cloudinary storage configuration
const upload = multer({
    storage: storage
});

router.post(
    "/apply-model",
    upload.single("foto"),
    (req, res) => {

        const {
            nama,
            kontak,
            portof
        } = req.body;

        const foto = req.file.path;

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
                    message: "Pendaftaran berhasil"
                });

            }
        );

    }
);

router.post("/register", (req, res) => {

    const { nama, email, password, role } = req.body;

    const sql = `
        INSERT INTO users (nama, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nama, email, password, role],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Daftar gagal"
                });

            }

            res.json({
                message: "Daftar berhasil"
            });

        }
    );

});

router.get("/designer/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM desainer
        WHERE id_desainer = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.json(result[0]);

    });

});

router.get("/projects", (req, res) => {

    const sql = `
        SELECT *
        FROM project_model
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Gagal ambil project"
            });

        }

        res.json(result);

    });

});

router.get("/desainer/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM desainer
        WHERE id_desainer = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.json(result[0]);

    });

});

router.get("/designers", (req, res) => {

    const sql = `
        SELECT *
        FROM desainer
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.json(result);

    });

});

router.get("/designer-karya/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM gallery_karya
        WHERE id_desainer = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.json(result);

    });

});

router.put("/follow/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        UPDATE desainer
        SET followers = followers + 1
        WHERE id_desainer = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.json({
            message: "Follow berhasil"
        });

    });

});

router.put("/unfollow/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        UPDATE desainer
        SET followers = followers - 1
        WHERE id_desainer = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.json({
            message: "Unfollow berhasil"
        });

    });

});

// router.get("/project/:id", (req, res) => {

//     const { id } = req.params;

//     const sql = `
//         SELECT *
//         FROM project_model
//         WHERE id_project = ?
//     `;

//     db.query(sql, [id], (err, result) => {

//         if (err) {

//             console.log(err);

//             return res.status(500).json({
//                 message: "Server error"
//             });

//         }

//         res.json(result[0]);

//     });

// });

router.get("/project/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM project_model
        WHERE id_project = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.json(result[0]);

    });

});

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM event
        WHERE id_event = ?
    `;

    db.query(sql, [id], (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

});

module.exports = router;