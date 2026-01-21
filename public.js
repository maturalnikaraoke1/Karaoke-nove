const API_KEY = "AIzaSyBMNIx8X3XmR_gMrTIrX-0NL5NQSDEPDKU";
let player;
let lastSong = null;

async function loadSong() {
    const current = JSON.parse(localStorage.getItem("current"));
    const list = JSON.parse(localStorage.getItem("playlist")) || [];

    document.getElementById("now").textContent =
        current ? `🎤 Sada pjeva: Stol ${current.table} – ${current.song}` : "🎤 Sada pjeva: —";

    document.getElementById("next").textContent =
        list[0] ? `➡️ Sljedeći: Stol ${list[0].table} – ${list[0].song}` : "➡️ Sljedeći: —";

    if (!current) return;

    // učitaj video SAMO ako je nova pjesma
    if (current.song !== lastSong) {
        lastSong = current.song;

        const q = encodeURIComponent(current.song + " karaoke");
        const r = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${q}&key=${API_KEY}`
        );
        const d = await r.json();
        const videoId = d.items[0].id.videoId;

        if (!player) {
            player = new YT.Player("yt", {
                height: "100%",
                width: "100%",
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0
                },
                events: {
                    onStateChange: onPlayerStateChange
                }
            });
        } else {
            player.loadVideoById(videoId);
        }
    }
}

function onPlayerStateChange(event) {
    // 0 = video je završio
    if (event.data === 0) {
        nextSong();
    }
}

function nextSong() {
    const list = JSON.parse(localStorage.getItem("playlist")) || [];

    if (list.length === 0) {
        localStorage.removeItem("current");
        document.getElementById("now").textContent = "🎤 Sada pjeva: —";
        document.getElementById("next").textContent = "➡️ Sljedeći: —";
        return;
    }

    const next = list.shift();
    localStorage.setItem("current", JSON.stringify(next));
    localStorage.setItem("playlist", JSON.stringify(list));

    loadSong();
}

// start
loadSong();

