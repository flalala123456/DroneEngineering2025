async function loadLiveData() {
  const res = await fetch("https://raw.githubusercontent.com/j-goodman/drone-engineering-logs/main/data.js");
  const text = await res.text();

  // ✅ Evaluate the JS to load feats & dronePilots into global scope
  eval(text);

  renderTeams();
}

function renderTeams() {
  const container = document.getElementById("teams");
  container.innerHTML = "";
  const totalFeats = feats.length;

  for (const [teamName, teamData] of Object.entries(dronePilots)) {
    const completedFeats = teamData.feats.map(index =>
      feats.find(f => f.index === index)
    ).filter(Boolean);

    const progress = Math.round((completedFeats.length / totalFeats) * 100);

    const card = document.createElement("div");
    card.className = "team-card";
    card.style.setProperty("--progress", progress + "%");

    card.innerHTML = `
      <h2>${teamName}</h2>
      <p class="pilots">👥 ${teamData.pilots.join(", ")}</p>
      <p>✅ Completed: ${completedFeats.length} / ${totalFeats}</p>
      <div class="progress"><div></div></div>
      <div class="toggle">Show Challenges ▼</div>
      <div class="feats">
        <ul>
          ${completedFeats.map(f => `<li><strong>${f.name}</strong>: ${f.description}</li>`).join("")}
        </ul>
      </div>
    `;

    const toggle = card.querySelector(".toggle");
    const featsDiv = card.querySelector(".feats");
    toggle.addEventListener("click", () => {
      featsDiv.style.display = featsDiv.style.display === "block" ? "none" : "block";
      toggle.textContent = featsDiv.style.display === "block" ? "Hide Challenges ▲" : "Show Challenges ▼";
    });

    container.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", loadLiveData);
