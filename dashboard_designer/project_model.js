const user =
JSON.parse(
localStorage.getItem("user")
);

const id_desainer =
user.id_user;

fetch(
`/api/designer/dashboard/${id_desainer}`
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
        src="${getImageUrl(item.foto)}"
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

function approve(id){

    fetch(

    `/api/project-model/approve/${id}`,

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

    `/api/project-model/reject/${id}`,

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
        `${foto}`,
        "_blank"
    );

}

window.approve = function(id) {
    fetch(
        `/api/project-model/approve/${id}`,
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
        `/api/project-model/reject/${id}`,
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

function getImageUrl(foto){
    if(!foto){
        return "";
    }
    if(foto.startsWith("http") || foto.startsWith("../")){
        return foto;
    }
    if(foto.startsWith("/")){
        return `/api${foto}`;
    }
    if(foto.includes("uploads/")){
        return `/api/${foto}`;
    }
    return `../foto/${foto}`;
}