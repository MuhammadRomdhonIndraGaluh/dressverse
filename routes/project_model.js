const express = require("express");
const router = express.Router();

const db = require("../config/db");

// ==========================
// LIHAT SEMUA PENDAFTAR
// BERDASARKAN KARYA DESIGNER
// ==========================

router.get("/:id_desainer", (req, res) => {

    const { id_desainer } = req.params;

    const sql = `
        SELECT
            pm.id_pendaftaran,
            pm.nama,
            pm.kontak,
            pm.portof,
            pm.foto,
            pm.status,
            pm.tanggal_daftar,

            gk.id_karya,
            gk.judul,
            gk.kategori,
            gk.foto_karya

        FROM pendaftaran_model pm

        JOIN gallery_karya gk
            ON pm.id_karya = gk.id_karya

        WHERE gk.id_desainer = ?

        ORDER BY pm.tanggal_daftar DESC
    `;

    db.query(sql,[id_desainer],(err,result)=>{

        if(err){

            console.log(err);

            return res.status(500).json({
                message:"Gagal mengambil data"
            });

        }

        res.json(result);

    });

});

// ==========================
// APPROVE MODEL
// ==========================

router.put("/approve/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        UPDATE pendaftaran_model
        SET status = 'Disetujui'
        WHERE id_pendaftaran = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Lamaran disetujui"
        });

    });

});


// ==========================
// REJECT MODEL
// ==========================

router.put("/reject/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        UPDATE pendaftaran_model
        SET status = 'Ditolak'
        WHERE id_pendaftaran = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Lamaran ditolak"
        });

    });

});

module.exports = router;