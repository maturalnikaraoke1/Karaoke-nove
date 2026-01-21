const API_KEY = "AIzaSyBMNIx8X3XmR_gMrTIrX-0NL5NQSDEPDKU";

function renderPlaylist() {
    const list = JSON.parse(localStorage.getItem("playlist")) || [];
    const ul = document.getElementById("playlist");
    ul.innerHTML = "";

    list.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `Stol ${item.table} – ${item.song} `;

        const del = document.createElement("button");
        del.textContent = "Obriši";
        del.onclick = () => {
            list.splice(index, 1);
            localStorage.setItem("playlist", JSON.stringify(list));
            renderPlaylist();
        };

        li.appendChild(del);
        ul.appendChild(li);
    });
}

function loadCurrent() {
    const current = JSON.parse(localStorage.getItem("current"));
    const list = JSON.parse(localStorage.getItem("playlist")) || [];

    document.getElementById("now").textContent =
        current ? `🎤 Sada pjeva: Stol ${current.table} – ${current.song}` : "🎤 Sada pjeva: —";

    document.getElementById("next").textContent =
        list[0] ? `➡️ Sljedeći: Stol ${list[0].table} – ${list[0].song}` : "➡️ Sljedeći: —";
}

document.getElementById("nextBtn").onclick = () => {
    const list = JSON.parse(localStorage.getItem("playlist")) || [];

    if (list.length === 0) return;

    const next = list.shift();
    localStorage.setItem("current", JSON.stringify(next));
    localStorage.setItem("playlist", JSON.stringify(list));

    loadCurrent();
    renderPlaylist();
};

document.getElementById("publicBtn").onclick = () => {
    window.open("public.html", "_blank");
};

renderPlaylist();
loadCurrent();

