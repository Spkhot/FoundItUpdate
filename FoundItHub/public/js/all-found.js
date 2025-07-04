const container = document.getElementById("itemsContainer");

async function loadItems() {
  const res = await fetch("/api/items");
  const data = await res.json();

  if (data.success) {
    container.innerHTML = "";

    data.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow-md overflow-hidden";

      card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.productName}" class="h-48 w-full object-cover" />
        <div class="p-4">
          <h2 class="text-xl font-semibold text-gray-800">${item.productName}</h2>
          <p class="text-sm text-gray-500 mb-2">📍 ${item.location}</p>
          <a href="item-detail.html?id=${item._id}" class="text-blue-600 hover:underline font-medium">View Details</a>
        </div>
      `;

      container.appendChild(card);
    });
  }
}

loadItems();
