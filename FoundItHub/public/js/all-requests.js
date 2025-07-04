const container = document.getElementById("requestsContainer");

async function loadRequests() {
  const res = await fetch("/api/requests");
  const data = await res.json();

  if (data.success) {
    container.innerHTML = "";

    data.requests.forEach((req) => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded-xl shadow-md";

      card.innerHTML = `
        <h2 class="text-xl font-semibold text-blue-800">${req.productName}</h2>
        <p class="text-sm text-gray-600">📍 ${req.location}</p>
        <p class="mt-2 text-gray-700">${req.description || "No description"}</p>
        ${req.reward ? `<p class="text-green-700 mt-1">🎁 Reward: ${req.reward}</p>` : ""}
        <button class="mt-4 bg-red-500 text-white px-3 py-1 rounded delete-btn" data-id="${req._id}">
          Delete (if yours)
        </button>
      `;

      container.appendChild(card);
    });

    setupDeleteHandlers();
  }
}

function setupDeleteHandlers() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const email = prompt("Enter your email to delete this request:");

      if (!email) return;

      const res = await fetch(`/api/requests/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      alert(result.message);
      if (result.success) loadRequests();
    });
  });
}

loadRequests();
