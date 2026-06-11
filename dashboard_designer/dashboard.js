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

