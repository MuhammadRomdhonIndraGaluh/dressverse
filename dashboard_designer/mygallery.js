const user =
JSON.parse(
localStorage.getItem("user")
);

const id_desainer =
user.id_user;

const gallery =
document.getElementById(
"galleryContainer"
);

fetch(
`http://localhost:5000/designer-karya/${id_desainer}`
)
.then(res => res.json())

.then(data => {

    let html = "";

    data.forEach(karya => {

        html += `

        <div class="card">

            <img
            src="http://localhost:5000/uploads/${karya.foto_karya}"
            >

            <div class="content">

                <h3>
                    ${karya.judul}
                </h3>

                <p>
                    ${karya.kategori}
                </p>

                <p>
                    ❤️ ${karya.jumlah_likes}
                </p>

                <p>
                    💬 ${karya.jumlah_komentar}
                </p>

                <div class="btn-group">

                    <button
                    class="edit-btn"
                    onclick="
                    editKarya(
                    ${karya.id_karya}
                    )
                    ">
                        Edit
                    </button>

                    <button
                    class="delete-btn"
                    onclick="
                    deleteKarya(
                    ${karya.id_karya}
                    )
                    ">
                        Delete
                    </button>

                </div>

            </div>

        </div>

        `;

    });

    gallery.innerHTML =
    html;

});

function editKarya(id){

    window.location.href =
    `edit_karya.html?id=${id}`;

}

function deleteKarya(id){

    if(
    confirm(
    "Hapus karya?"
    )
    ){

        fetch(

        `http://localhost:5000/designer/karya/${id}`,

        {
            method:"DELETE"
        }

        )

        .then(() => {

            alert(
            "Karya berhasil dihapus"
            );

            location.reload();

        });

    }

}

// =====================
// TOP PROFILE MY GALLERY
// =====================

function getFotoUrl(foto){
    if(!foto){
        return "";
    }

    if(
        foto.startsWith("http") ||
        foto.startsWith("../")
    ){
        return foto;
    }

    if(foto.startsWith("/")){
        return `http://localhost:5000${foto}`;
    }

    if(foto.includes("uploads/")){
        return `http://localhost:5000/${foto}`;
    }

    return `http://localhost:5000/uploads/${foto}`;
}

function tampilkanTopProfile(data){
    const namaDesigner =
        data.nickname ||
        user.nickname ||
        user.nama ||
        user.username ||
        "Designer";

    const fotoDesigner =
        data.foto ||
        data.foto_profil ||
        data.profile_picture ||
        data.gambar ||
        user.foto ||
        user.foto_profil ||
        "";

    const fotoUrl = getFotoUrl(fotoDesigner);

    let topRight =
    document.querySelector(".top-right");

    if(!topRight){
        topRight =
        document.createElement("div");

        topRight.className =
        "top-right";

        const topbar =
        document.querySelector(".topbar");

        if(topbar){
            topbar.appendChild(topRight);
        }
    }

    topRight.innerHTML = `
        <div class="notification"></div>

        <div class="profile">
            <div class="profile-avatar">
                ${
                    fotoUrl
                    ? `<img src="${fotoUrl}" alt="Profile">`
                    : namaDesigner.charAt(0).toUpperCase()
                }
            </div>

            <span class="profile-name">${namaDesigner}</span>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
    `;
}

fetch(
`http://localhost:5000/designer/dashboard/${id_desainer}`
)

.then(res => res.json())

.then(data => {
    tampilkanTopProfile(data);
});