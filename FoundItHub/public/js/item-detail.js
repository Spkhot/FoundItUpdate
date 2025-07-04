const itemDetails = document.getElementById("itemDetails");
const deleteSection = document.getElementById("deleteSection");
const deleteBtn = document.getElementById("deleteBtn");
const deleteEmail = document.getElementById("deleteEmail");
const message = document.getElementById("message");

// 🧠 Extract ID from URL
const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

async function loadItem() {
  const res = await fetch(`/api/items/${itemId}`);
  const data = await res.json();

  if (data.success) {
    const item = data.item;

    itemDetails.innerHTML = `
      <img src="${item.imageUrl}" class="w-full h-64 object-cover rounded-xl mb-4" />
      <h2 class="text-2xl font-bold text-gray-800 mb-2">${item.productName}</h2>
      <p class="text-gray-600 mb-1"><strong>📍 Location:</strong> ${item.location}</p>
      <p class="text-gray-600 mb-1"><strong>📅 Posted:</strong> ${new Date(item.createdAt).toLocaleString()}</p>
      <p class="text-gray-600 mb-1"><strong>📂 Category:</strong> ${item.category}</p>
      <p class="text-gray-600 mb-1"><strong>📞 Contact:</strong> ${item.contact}</p>
      <p class="text-gray-600 mb-1"><strong>📧 Email:</strong> ${item.email}</p>
      ${item.description ? `<p class="text-gray-700 mt-3">${item.description}</p>` : ""}
    `;

    // Show delete section
    deleteSection.classList.remove("hidden");
  } else {
    itemDetails.innerHTML = `<p class="text-red-500">Item not found</p>`;
  }
}

deleteBtn.addEventListener("click", async () => {
  const email = deleteEmail.value;
  if (!email) return alert("Enter your email to delete");

  const res = await fetch(`/api/items/${itemId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  message.textContent = data.message;

  if (data.success) {
    deleteSection.classList.add("hidden");
    deleteBtn.disabled = true;
    deleteBtn.textContent = "Deleted ✅";
  }
});

loadItem();
