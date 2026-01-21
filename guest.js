const ADMIN_PASSWORD = "laltm123";

document.getElementById("sendSong").onclick = () => {
    const table = document.getElementById("table").value;
    const song = document.getElementById("song").value;

    if (!table || !song) return;

    const list = JSON.parse(localStorage.getItem("playlist")) || [];
    list.push({ table, song });
    localStorage.setItem("playlist", JSON.stringify(list));

    document.getElementById("msg").textContent = "✅ Prijava poslana";
    document.getElementById("table").value = "";
    document.getElementById("song").value = "";
};

document.getElementById("adminLogin").onclick = () => {
    const pass = document.getElementById("adminPass").value;
    if (pass === ADMIN_PASSWORD) {
        window.location.href = "admin.html";
    } else {
        alert("Pogrešna lozinka");
    }
};
