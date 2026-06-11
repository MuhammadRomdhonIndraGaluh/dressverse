const user =
JSON.parse(
localStorage.getItem("user")
);

const id_desainer =
user.id_user;

// =====================
// DASHBOARD
// =====================

fetch(
`/api/designer/dashboard/${id_desainer}`
)

.then(res => res.json())

.then(data => {

    document.getElementById(
"welcomeText"
).innerText =
`${data.nickname}`;

    document.getElementById(
        "totalKarya"
    ).innerText =
    data.totalKarya || 0;

    document.getElementById(
        "totalLikes"
    ).innerText =
    data.totalLikes || 0;

    document.getElementById(
        "totalKomentar"
    ).innerText =
    data.totalKomentar || 0;

    document.getElementById(
"followers"
).innerText =
data.followers;

});

// =====================
// GALLERY
// =====================

function getFotoUrl(foto){
    if(!foto) return "";
    if(foto.startsWith("http") || foto.startsWith("../")) return foto;
    if(foto.startsWith("/")) return `/api${foto}`;
    if(foto.includes("uploads/")) return `/api/${foto}`;
    return `../foto/${foto}`;
}

fetch(
`/api/designer/karya/${id_desainer}`
)
.then(res => res.json())
.then(data => {

    const gallery = document.getElementById("galleryContainer");
    
    if(!gallery) return;

    data.forEach(karya => {
        gallery.innerHTML += `
        <div class="quick-card" style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <img src="${getFotoUrl(karya.foto_karya)}" style="width:100%; height:120px; object-fit:cover; border-radius:8px;">
            <div style="padding:0 5px;">
                <h4 style="font-size:14px; margin-bottom:4px;">${karya.judul}</h4>
                <p style="font-size:11px; color:#68636a;">${karya.kategori}</p>
            </div>
        </div>
        `;
    });
});

function getDesignerName(){
    const keys = [
        "nama",
        "name",
        "username",
        "designerName",
        "nama_designer"
    ];

    for(let key of keys){
        const value = localStorage.getItem(key);
        if(value){
            return value;
        }
    }

    const dataKeys = ["user", "designer", "loggedInUser"];

    for(let key of dataKeys){
        const value = localStorage.getItem(key);

        if(value){
            try{
                const data = JSON.parse(value);

                return data.nama || 
                       data.name || 
                       data.username || 
                       data.nama_designer || 
                       "Designer";
            }catch(error){}
        }
    }

    return "Designer";
}

const designerName = getDesignerName();

const welcomeText = document.getElementById("welcomeText");
if(welcomeText){
    welcomeText.textContent = designerName;
}

const profileBox = document.querySelector(".profile");
if(profileBox){
    profileBox.innerHTML = `
        <div class="profile-avatar">${designerName.charAt(0).toUpperCase()}</div>
        <span class="profile-name">${designerName}</span>
        <i class="fa-solid fa-chevron-down"></i>
    `;
}

