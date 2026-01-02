const API = "https://daily-journal-app-ps2h.onrender.com/api";

async function saveJournal() {
  await fetch(`${API}/journal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: date.value,
      content: content.value
    })
  });
  alert("Saved");
}

async function setGoal() {
  await fetch(`${API}/goal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      month: month.value,
      target: targetInput.value
    })
  });
  alert("Goal saved");
}

async function loadDashboard() {
  const month = new Date().toISOString().slice(0,7);
  const res = await fetch(`${API}/dashboard/${month}`);
  const data = await res.json();

  days.innerText = data.completed;
  target.innerText = data.target;

  const pct = data.target
    ? Math.min(Math.round((data.completed / data.target) * 100), 100)
    : 0;

  percent.innerText = pct + "%";
  bar.style.width = pct + "%";

  status.innerText =
    pct === 0 ? "😴 Start today" :
    pct < 50 ? "🔥 Building consistency" :
    pct < 100 ? "🚀 Almost there" :
    "🏆 Goal achieved!";
}

