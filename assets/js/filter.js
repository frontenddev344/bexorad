const searchInput = document.getElementById("searchInput");
const teamFilter = document.getElementById("teamFilter");
const priceSort = document.getElementById("priceSort");
const categoryRadios = document.querySelectorAll("input[name='category']");
const grid = document.getElementById("productGrid");
const cards = grid ? Array.from(grid.querySelectorAll(".arrival-card")) : [];

let currentCategory = "all";
let currentTeam = "all";
let currentSearch = "";
let currentSort = "default";

if (searchInput && teamFilter && priceSort && grid && cards.length) {
  // Pre-select category from a ?category= URL param (used by homepage deep links)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedCategory = urlParams.get("category");
  if (requestedCategory) {
    const matchingRadio = Array.from(categoryRadios).find(r => r.value === requestedCategory);
    if (matchingRadio) {
      matchingRadio.checked = true;
      currentCategory = requestedCategory;
    }
  }

  // CATEGORY
  categoryRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      currentCategory = e.target.value;
      filterProducts();
    });
  });

  // TEAM
  teamFilter.addEventListener("change", (e) => {
    currentTeam = e.target.value;
    filterProducts();
  });

  // SEARCH
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.toLowerCase();
    filterProducts();
  });

  // SORT
  priceSort.addEventListener("change", (e) => {
    currentSort = e.target.value;
    filterProducts();
  });

  function filterProducts() {
    let visibleCards = Array.from(cards);

    visibleCards.forEach(card => {
      const categoryMatch =
        currentCategory === "all" || card.dataset.category === currentCategory;

      const teamMatch =
        currentTeam === "all" || card.dataset.team === currentTeam;

      const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
      const searchMatch = title.includes(currentSearch);

      card.style.display = categoryMatch && teamMatch && searchMatch ? "block" : "none";
    });

    let sorted = cards.filter(card => card.style.display !== "none");

    if (currentSort === "low") {
      sorted.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    }

    if (currentSort === "high") {
      sorted.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    }

    sorted.forEach(card => grid.appendChild(card));
  }

  filterProducts();
}