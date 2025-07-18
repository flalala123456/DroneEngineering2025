const repo = "j-goodman/drone-engineering-logs";
const path = "data.js";

let githubToken = "";
let currentSHA = "";

const editorDiv = document.getElementById("editor");
const saveBtn = document.getElementById("saveChanges");
const searchInput = document.getElementById("search");

document.getElementById("loadData").addEventListener("click", async () => {
  githubToken = document.getElementById("token").value.trim();
  if (!githubToken) return alert("Enter your GitHub token!");

  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    headers: { "Authorization": `token ${githubToken}` }
  });
  const json = await res.json();
  currentSHA = json.sha;
  renderEditor();
  saveBtn.style.display = "block";
});

searchInput.addEventListener("input", () => renderEditor(searchInput.value));

function renderEditor(filter = "") {
  editorDiv.innerHTML = "";

  const teams = Object.entries(dronePilots)
    .filter(([name]) => name.toLowerCase().includes(filter.toLowerCase()));

  teams.forEach(([team, data]) => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.style.marginBottom = "1rem";

    card.innerHTML = `
      <h2>${team}</h2>
      <p>Pilots:</p>
      <ul class="pilot-list">
        ${data.pilots.map((p, i) => `
          <li>
            <input data-team="${team}" data-type="pilot" data-index="${i}" value="${p}">
            <button onclick="removePilot('${team}', ${i})">❌</button>
          </li>`).join("")}
      </ul>
      <button onclick="addPilot('${team}')">➕ Add Pilot</button>
      <hr>
      <p>Challenges:</p>
      <ul class="challenge-list">
        ${data.feats.map((f, i) => `
          <li>
            <select data-team="${team}" data-type="feats" data-index="${i}">
              ${feats.map(ft => `<option value="${ft.index}" ${ft.index===f?'selected':''}>${ft.name}</option>`).join("")}
            </select>
            <button onclick="removeFeat('${team}', ${i})">❌</button>
          </li>`).join("")}
      </ul>
      <button onclick="addFeat('${team}')">➕ Add Challenge</button>
      <hr>
      <button style="background:#dc3545;color:white;" onclick="deleteTeam('${team}')">🗑 Delete Team</button>
    `;

    editorDiv.appendChild(card);
  });

  const addTeamBtn = document.createElement("button");
  addTeamBtn.textContent = "➕ Add New Team";
  addTeamBtn.onclick = addTeam;
  editorDiv.appendChild(addTeamBtn);
}

function addTeam() {
  const name = prompt("Team Name:");
  if (!name || dronePilots[name]) return;
  dronePilots[name] = { pilots: [], feats: [] };
  renderEditor();
}

function deleteTeam(team) {
  if (confirm(`Delete team "${team}"?`)) {
    delete dronePilots[team];
    renderEditor();
  }
}

function addPilot(team) {
  dronePilots[team].pilots.push("New Pilot");
  renderEditor(searchInput.value);
}

function removePilot(team, index) {
  dronePilots[team].pilots.splice(index, 1);
  renderEditor(searchInput.value);
}

function addFeat(team) {
  dronePilots[team].feats.push(feats[0].index);
  renderEditor(searchInput.value);
}

function removeFeat(team, index) {
  dronePilots[team].feats.splice(index, 1);
  renderEditor(searchInput.value);
}

saveBtn.addEventListener("click", async () => {
  document.querySelectorAll("#editor input, #editor select").forEach(el => {
    const team = el.dataset.team;
    const type = el.dataset.type;
    const index = parseInt(el.dataset.index);

    if (type === "pilot") {
      dronePilots[team].pilots[index] = el.value.trim();
    } else if (type === "feats") {
      dronePilots[team].feats[index] = parseInt(el.value);
    }
  });

  const newDataJS = `feats = ${JSON.stringify(feats, null, 4)};\n\ndronePilots = ${JSON.stringify(dronePilots, null, 4)};`;

  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      "Authorization": `token ${githubToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Update data via admin panel",
      content: btoa(unescape(encodeURIComponent(newDataJS))),
      sha: currentSHA
    })
  });

  if (res.ok) {
    alert("✅ Updated successfully!");
    location.reload();
  } else {
    alert("❌ Error updating! Check console.");
    console.log(await res.text());
  }
});