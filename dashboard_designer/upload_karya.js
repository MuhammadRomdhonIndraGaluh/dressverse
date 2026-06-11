const user =
JSON.parse(
localStorage.getItem("user")
);

const id_desainer =
user.id_user;

document
.getElementById("uploadForm")
.addEventListener(
"submit",

async (e) => {

    e.preventDefault();

    const formData =
    new FormData();

    formData.append(
        "id_desainer",
        user.id_user
    );

    formData.append(
        "judul",
        document.getElementById("judul").value
    );

    formData.append(
        "kategori",
        document.getElementById("kategori").value
    );

    formData.append(
        "deskripsi",
        document.getElementById("deskripsi").value
    );

    formData.append(
        "foto_karya",
        document.getElementById("foto_karya").files[0]
    );

    try {

        const response =
        await fetch(

            "/api/designer/karya",

            {
                method: "POST",
                body: formData
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
            "Gagal upload karya"
        );

    }

});