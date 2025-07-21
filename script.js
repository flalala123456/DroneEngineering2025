let allTeams = {}; // store dronePilots after fetching
let allFeats = [];

async function loadLiveData() {
  const res = await fetch("https://raw.githubusercontent.com/j-goodman/drone-engineering-logs/main/data.js");
  const text = await res.text();
  eval(text); // Loads feats & dronePilots from data.js

  allTeams = dronePilots;
  allFeats = feats;

  initDarkMode();
  initSearch();
  renderTeams();
}

function renderTeams(filter = "") {
  const container = document.getElementById("teams");
  container.innerHTML = "";
  const totalFeats = allFeats.length;

  for (const [teamName, teamData] of Object.entries(allTeams)) {
    const completedFeats = teamData.feats.map(index =>
      allFeats.find(f => f.index === index)
    ).filter(Boolean);

    // ✅ Search filtering
    const matchString = [
      teamName,
      ...teamData.pilots,
      ...completedFeats.map(f => f.name)
    ].join(" ").toLowerCase();
    if (!matchString.includes(filter.toLowerCase())) continue;

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

function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    darkModeToggle.textContent = "☀️ Light Mode";
  }

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
    darkModeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
}

function initSearch() {
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", (e) => {
    renderTeams(e.target.value);
  });
}

document.addEventListener("DOMContentLoaded", loadLiveData);
