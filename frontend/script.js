const API = "http://localhost:3000/api";

/* Auto-load journal */
date.addEventListener("change", async () => {
  const res = await fetch(`${API}/journal/${date.value}`);
  const data = await res.json();

  if (data.content) {
    mood.value = data.mood;
    content.value = data.content;
  } else {
    content.value = "";
  }
});

/* Save journal */
async function saveJournal() {
  await fetch(`${API}/journal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: date.value,
      mood: mood.value,
      content: content.value
    })
  });

  alert("✅ Journal Saved");
}

/* Goals */
async function setGoal() {
  await fetch(`${API}/goal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      month: month.value,
      target: target.value
    })
  });

  loadGoal();
}

async function addProgress() {
  await fetch(`${API}/goal/progress`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ month: month.value })
  });

  loadGoal();
}

async function loadGoal() {
  if (!month.value) return;

  const res = await fetch(`${API}/goal/${month.value}`);
  const goal = await res.json();

  if (!goal.target) return;

  const percent = Math.min(
    Math.round((goal.completed / goal.target) * 100),
    100
  );

  progressText.innerText =
    `${goal.completed} / ${goal.target} projects completed`;
  progressPercent.innerText = `${percent}%`;
  progressFill.style.width = `${percent}%`;

  if (percent === 0)
    motivationText.innerText = "😴 Macha… start first project da";
  else if (percent < 40)
    motivationText.innerText = "🔥 Good start! Keep pushing";
  else if (percent < 70)
    motivationText.innerText = "💪 Halfway there! Don’t stop";
  else if (percent < 100)
    motivationText.innerText = "🚀 Almost there! Finish strong";
  else
    motivationText.innerText = "🏆 GOAL CRUSHED! Beast mode 🔥";
}
