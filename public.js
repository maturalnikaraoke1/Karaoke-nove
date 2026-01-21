const API_KEY = "AIzaSyBMNIx8X3XmR_gMrTIrX-0NL5NQSDEPDKU";

async function load() {
    const current = JSON.parse(localStorage.getItem("current"));
    const list = JSON.parse(localStorage.getItem("playlist")) || [];

    if (current) {
        document.getElementById("now").textContent =
            `🎤 Sada pjeva: Stol ${current.table} – ${current.song}`;

        const q = encodeURIComponent(current.song + " karaoke");
        const r = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${q}&key=${API_KEY}`
        );
        const d = await r.json();
        document.getElementById("yt").src =
          "https://www.youtube.com/embed/" + d.items[0].id.videoId + "?autoplay=1";
    }

    document.getElementById("next").textContent =
        list[0] ? `➡️ Sljedeći: Stol ${list[0].table} – ${list[0].song}` : "➡️ Sljedeći: —";
}

setInterval(load, 3000);
