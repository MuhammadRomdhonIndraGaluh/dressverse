const express = require("express");
const router = express.Router();

const db = require("../config/db");

// =======================
// DASHBOARD DESIGNER
// =======================

router.get("/dashboard/:id_desainer", (req, res) => {

    const { id_desainer } = req.params;

    const sql = `
        SELECT
            d.nickname,
            d.followers,

            COUNT(g.id_karya) AS totalKarya,
            IFNULL(SUM(g.jumlah_likes),0) AS totalLikes,
            IFNULL(SUM(g.jumlah_komentar),0) AS totalKomentar

        FROM desainer d

        LEFT JOIN gallery_karya g
        ON d.id_desainer = g.id_desainer

        WHERE d.id_desainer = ?

        GROUP BY d.id_desainer
    `;

    db.query(sql,[id_desainer],(err,result)=>{

    if(err){
        return res.status(500).json(err);
    }

    console.log(result[0]);

    res.json(result[0]);

});

    

});

// =======================
// MY GALLERY
// =======================

const multer = require("multer");
const { storage } = require("../config/cloudinary");

const upload = multer({
    storage
});



// =======================
// DETAIL KARYA
// =======================

router.get("/karya/detail/:id_karya", (req, res) => {

    const { id_karya } = req.params;

    const sql = `
        SELECT *
        FROM gallery_karya
        WHERE id_karya = ?
    `;

    db.query(sql, [id_karya], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

});

// =======================
// UPLOAD KARYA
// =======================

router.post(
    "/karya",
    upload.single("foto_karya"),

    (req, res) => {

        const {
            id_desainer,
            judul,
            deskripsi,
            kategori
        } = req.body;

        const foto_karya = req.file.path;

        const sql = `
            INSERT INTO gallery_karya
            (
                id_desainer,
                judul,
                foto_karya,
                deskripsi,
                tanggal_upload,
                jumlah_likes,
                jumlah_komentar,
                kategori
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?,
                NOW(),
                0,
                0,
                ?
            )
        `;

        db.query(
            sql,
            [
                id_desainer,
                judul,
                foto_karya,
                deskripsi,
                kategori
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "Karya berhasil upload"
                });

            }
        );

    }
);

// =======================
// EDIT KARYA
// =======================

router.put(
"/karya/:id_karya",
upload.single("foto_karya"),

(req,res)=>{

    const { id_karya } = req.params;

    const {
        judul,
        deskripsi,
        kategori,
        foto_lama
    } = req.body;

    const foto_karya =
    req.file
    ? req.file.path
    : foto_lama;

    const sql = `
        UPDATE gallery_karya
        SET
            judul = ?,
            foto_karya = ?,
            deskripsi = ?,
            kategori = ?
        WHERE id_karya = ?
    `;

    db.query(
        sql,
        [
            judul,
            foto_karya,
            deskripsi,
            kategori,
            id_karya
        ],
        (err,result)=>{

            if(err){
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message:"Karya berhasil diupdate"
            });

        }
    );

});

// =======================
// DELETE KARYA
// =======================

router.delete("/karya/:id_karya", (req, res) => {

    const { id_karya } = req.params;

    const sql = `
        DELETE FROM gallery_karya
        WHERE id_karya = ?
    `;

    db.query(
        sql,
        [id_karya],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Karya berhasil dihapus"
            });

        }
    );

});

router.get("/karya/:id_desainer", (req, res) => {

    const { id_desainer } = req.params;

    const sql = `
        SELECT *
        FROM gallery_karya
        WHERE id_desainer = ?
        ORDER BY tanggal_upload DESC
    `;

    db.query(sql, [id_desainer], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

module.exports = router;