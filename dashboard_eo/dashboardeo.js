const API_URL =
"/api";

const user =
JSON.parse(
    localStorage.getItem("user") ||
    "null"
);
const id_eo =
user ? user.id_user : null;

const namaEO =
user
? (
    user.nama ||
    user.name ||
    user.username ||
    "Event Organizer"
)
: "Event Organizer";
// =====================
// CEK LOGIN DAN ROLE
// =====================

function isEventOrganizer(role){

    return (
        role === "event_orga" ||
        role === "event_organizer"
    );

}

if(
    !user ||
    !isEventOrganizer(user.role)
){

    alert(
        "Silakan login sebagai Event Organizer"
    );

    window.location.href =
    "../login/login.html";

}
else{

    // Jalankan dashboard
    // jika user adalah EO

    loadProfile();

    loadDashboard();

    loadEvents();

}

// =====================
// DATA EO
// =====================

// =====================
// PROFILE
// =====================

function loadProfile(){

    document.getElementById(
        "profileName"
    ).innerText =
    namaEO;

    document.getElementById(
        "welcomeName"
    ).innerText =
    namaEO;

    document.getElementById(
        "avatar"
    ).innerText =
    namaEO
    .charAt(0)
    .toUpperCase();

}

// =====================
// DASHBOARD EO
// =====================

function loadDashboard(){

    fetch(`${API_URL}/eo/event/${id_eo}`)
.then(res => res.json())
.then(events => {

    const totalEvent = events.length;

    const eventAktif = events.filter(event =>
        String(event.status).toLowerCase() === "aktif" ||
        String(event.status).toLowerCase() === "active"
    ).length;

    document.getElementById("totalEvent").innerText =
    totalEvent;

    document.getElementById("eventAktif").innerText =
    eventAktif;

});

}

// =====================
// EVENT MENDATANG
// =====================

function loadEvents(){

    fetch(
        `${API_URL}/eo/event/${id_eo}`
    )

    .then(res => {

        if(!res.ok){

            throw new Error(
                "Event gagal dimuat"
            );

        }

        return res.json();

    })

    .then(data => {

        const eventContainer =
        document.getElementById(
            "eventContainer"
        );

        eventContainer.innerHTML = "";

        if(
            !Array.isArray(data) ||
            data.length === 0
        ){

            eventContainer.innerHTML = `

                <div class="empty-event">

                    Belum ada event mendatang.

                </div>

            `;

            return;

        }

        data.forEach(event => {

            const fotoEvent =
event.gambar
? `${API_URL}/uploads/${event.gambar}`
: "../foto/event-default.jpg";

console.log(event);
console.log(fotoEvent);

            const namaEvent =
            event.nama_event ||
            event.judul ||
            "Event DressVerse";

            const tanggalEvent =
            formatTanggal(
                event.tanggal_event ||
                event.tanggal
            );

            const jamMulai =
            event.jam_mulai || "";

            const jamSelesai =
            event.jam_selesai || "";

            eventContainer.innerHTML += `

                <div class="event-item">

                    <img
                        src="${fotoEvent}"
                        alt="${namaEvent}"
                        onerror="
                            this.src='../foto/event-default.jpg'
                        "
                    >

                    <div>

                        <h3>
                            ${namaEvent}
                        </h3>

                        <p>

                            ${tanggalEvent}

                            ${
                                jamMulai
                                ? ` · ${jamMulai}`
                                : ""
                            }

                            ${
                                jamSelesai
                                ? ` - ${jamSelesai}`
                                : ""
                            }

                        </p>

                    </div>

                </div>

            `;

        });

    })

    .catch(error => {

        console.error(
            "Event EO error:",
            error
        );

        document.getElementById(
            "eventContainer"
        ).innerHTML = `

            <div class="empty-event">

                Event belum dapat dimuat.

            </div>

        `;

    });

}

// =====================
// FORMAT TANGGAL
// =====================

function formatTanggal(tanggal){

    if(!tanggal){

        return "-";

    }

    const date =
    new Date(tanggal);

    if(
        Number.isNaN(
            date.getTime()
        )
    ){

        return tanggal;

    }

    return date.toLocaleDateString(
        "id-ID",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}

// =====================
// LOGOUT
// =====================

function logout(){

    localStorage.clear();

    window.location.href =
    "../login/login.html";

}

// =====================
// ICON
// =====================

if(window.lucide){

    lucide.createIcons();

}