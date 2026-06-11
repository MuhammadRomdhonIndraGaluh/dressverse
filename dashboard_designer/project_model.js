const user =
JSON.parse(
localStorage.getItem("user")
);

const id_desainer =
user.id_user;

fetch(
`http://localhost:5000/designer/dashboard/${id_desainer}`
)

.then(res => res.json())

.then(data => {

    let html = "";

    data.forEach(item => {

        let statusClass = "menunggu";

        if(item.status === "Disetujui"){
            statusClass = "disetujui";
        }

        if(item.status === "Ditolak"){
            statusClass = "ditolak";
        }

        html += `

<div class="project-card">

    <div class="left">

        <img
        class="model-photo"
        src="../uploads/${item.foto}"
        >

        <div class="info">

    <h3>
        ${item.nama}
    </h3>

    <p>
        ${item.kontak}
    </p>

    <p>
        Apply ke:
        <b>${item.judul}</b>
    </p>

    <p>
        Tanggal:
        ${item.tanggal_daftar}
    </p>

    <p>

        Status :

        <span
        class="status ${statusClass}">

            ${item.status}

        </span>

    </p>

</div>

    </div>

    <div class="actions">

        <button
class="foto-btn"
onclick="lihatFoto('${item.foto}')"
>
Lihat Foto
</button>

        <button
        class="portfolio-btn"
        onclick="
        window.open(
        '${item.portof}',
        '_blank'
        )
        ">
            Portfolio
        </button>

        <button
        class="approve-btn"
        onclick="
        approve(${item.id_pendaftaran})
        ">
            Terima
        </button>

        <button
        class="reject-btn"
        onclick="
        reject(${item.id_pendaftaran})
        ">
            Tolak
        </button>

    </div>

</div>

`;

    });

    document.getElementById(
        "projectContainer"
    ).innerHTML = html;

});

router.put("/approve/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        UPDATE pendaftaran_model
        SET status = 'Disetujui'
        WHERE id_pendaftaran = ?
    `;

    db.query(sql,[id],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            message:"Lamaran disetujui"
        });

    });

});

router.put("/reject/:id", (req,res)=>{

    const { id } = req.params;

    const sql = `
        UPDATE pendaftaran_model
        SET status = 'Ditolak'
        WHERE id_pendaftaran = ?
    `;

    db.query(sql,[id],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            message:"Lamaran ditolak"
        });

    });

});

function approve(id){

    fetch(

    `http://localhost:5000/project-model/approve/${id}`,

    {
        method:"PUT"
    }

    )

    .then(res=>res.json())

    .then(data=>{

        alert(data.message);

        location.reload();

    });

}

function reject(id){

    fetch(

    `http://localhost:5000/project-model/reject/${id}`,

    {
        method:"PUT"
    }

    )

    .then(res=>res.json())

    .then(data=>{

        alert(data.message);

        location.reload();

    });

}

function lihatFoto(foto){

    window.open(
        `http://localhost:5000/uploads/${foto}`,
        "_blank"
    );

}

window.approve = function(id) {
    fetch(
        `http://localhost:5000/project-model/approve/${id}`,
        {
            method: "PUT"
        }
    )
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        location.reload();
    });
}

window.reject = function(id) {
    fetch(
        `http://localhost:5000/project-model/reject/${id}`,
        {
            method: "PUT"
        }
    )
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        location.reload();
    });
}