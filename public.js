const API_KEY = "AIzaSyBMNIx8X3XmR_gMrTIrX-0NL5NQSDEPDKU";

let lastSong = null; // pamti zadnju pjesmu

async function load() {
    const current = JSON.parse(localStorage.getItem("current"));
    const list = JSON.parse(localStorage.getItem("playlist")) || [];

    if (current) {
        document.getElementById("now").textContent =
            `🎤 Sada pjeva: Stol ${current.table} – ${current.song}`;

        // ✅ učitaj YouTube SAMO ako je nova pjesma
        if (current.song !== lastSong) {
            lastSong = current.song;

            const q = encodeURIComponent(current.song + " karaoke");
            const r = await fetch(
              `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${q}&key=${API_KEY}`
            );
            const d = await r.json();

            document.getElementById("yt").src =
              "https://www.youtube.com/embed/" +
              d.items[0].id.videoId +
              "?autoplay=1&controls=0";
        }
    }

    document.getElementById("next").textContent =
        list[0]
            ? `➡️ Sljedeći: Stol ${list[0].table} – ${list[0].song}`
            : "➡️ Sljedeći: —";
}

// ⏱ može ostati, ali više NE RESTARTUJE PJESMU
setInterval(load, 3000);
