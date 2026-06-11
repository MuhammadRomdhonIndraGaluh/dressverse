const params =
new URLSearchParams(
window.location.search
);

const id_karya =
params.get("id");

console.log("ID KARYA:", id_karya);

const user =
JSON.parse(
localStorage.getItem("user")
);

const id_desainer =
user.id_user;

// =====================
// DASHBOARD
// =====================

let fotoLama = "";

// ======================
// LOAD DATA
// ======================

fetch(
`http://localhost:5000/designer/karya/${id_karya}`
)

.then(res => res.json())

.then(data => {

    console.log(data);

    document.getElementById(
        "judul"
    ).value =
    data.judul || "";

    document.getElementById(
        "kategori"
    ).value =
    data.kategori || "";

    document.getElementById(
        "deskripsi"
    ).value =
    data.deskripsi || "";

    fotoLama =
    data.foto_karya;

    document.getElementById(
        "previewFoto"
    ).src =
    `http://localhost:5000/uploads/${data.foto_karya}`;

});

// ======================
// UPDATE
// ======================

document
.getElementById("editForm")
.addEventListener(
"submit",

async(e)=>{

e.preventDefault();

const judul =
document.getElementById(
"judul"
).value;

const kategori =
document.getElementById(
"kategori"
).value;

const deskripsi =
document.getElementById(
"deskripsi"
).value;

const fotoBaru =
document.getElementById(
"foto_karya"
).files[0];

const formData =
new FormData();

formData.append(
"judul",
judul
);

formData.append(
"kategori",
kategori
);

formData.append(
"deskripsi",
deskripsi
);

formData.append(
"foto_lama",
fotoLama
);

if(fotoBaru){

    formData.append(
    "foto_karya",
    fotoBaru
    );

}

try{

    const response =
    await fetch(

    `http://localhost:5000/designer/karya/${id_karya}`,

    {
        method:"PUT",
        body:formData
    }

    );

    const data =
    await response.json();

    alert(
    data.message
    );

    window.location.href =
    "mygallery.html";

}

catch(error){

    console.log(error);

    alert(
    "Gagal update karya"
    );

}

});