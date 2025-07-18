document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("teams");
  const totalFeats = feats.length;
  const searchInput = document.getElementById("search");
  const darkModeToggle = document.getElementById("darkModeToggle");

  // DARK MODE TOGGLE
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkModeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
  });

  function renderTeams(filter = "") {
    container.innerHTML = "";
    for (const [teamName, teamData] of Object.entries(dronePilots)) {
      const completedFeats = teamData.feats.map(index =>
        feats.find(f => f.index === index)
      ).filter(Boolean);

      const progress = Math.round((completedFeats.length / totalFeats) * 100);
      const matchString = [
        teamName,
        ...teamData.pilots,
        ...completedFeats.map(f => f.name)
      ].join(" ").toLowerCase();

      if (!matchString.includes(filter.toLowerCase())) continue;

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

  searchInput.addEventListener("input", e => renderTeams(e.target.value));
  renderTeams();
});
