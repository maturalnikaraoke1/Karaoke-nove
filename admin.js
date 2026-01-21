const ul = document.getElementById("playlist");

function render() {
    const list = JSON.parse(localStorage.getItem("playlist")) || [];
    ul.innerHTML = "";

    list.forEach((p, i) => {
        const li = document.createElement("li");
        li.textContent = `${i+1}. Stol ${p.table} – ${p.song}`;

        const del = document.createElement("button");
        del.textContent = "❌";
        del.onclick = () => {
            list.splice(i, 1);
            localStorage.setItem("playlist", JSON.stringify(list));
            render();
        };

        li.appendChild(del);
        ul.appendChild(li);
    });
}

document.getElementById("next").onclick = () => {
    const list = JSON.parse(localStorage.getItem("playlist")) || [];
    if (list.length === 0) return;

    const current = list.shift();
    localStorage.setItem("current", JSON.stringify(current));
    localStorage.setItem("playlist", JSON.stringify(list));
    render();
};

render();
