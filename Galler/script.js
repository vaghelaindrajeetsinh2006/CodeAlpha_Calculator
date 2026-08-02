/**
 * Lumina Image Gallery - Pure Vanilla JavaScript Implementation
 * Features: Responsive grid, category filtering, search, pagination,
 * custom lightbox with zoom controls, image preloading, and keyboard navigation.
 */

// ==========================================================================
// 1. Image Dataset
// ==========================================================================
const galleryData = [
  // NATURE
  {
    id: 1,
    title: "Alpine Mirror Lake",
    category: "nature",
    tags: ["mountain", "lake", "reflection", "serene"],
    author: "Elena Rostova",
    description: "Crystalline reflections of towering mountain peaks across a calm alpine lake at sunrise.",
    thumbUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=90"
  },
  {
    id: 2,
    title: "Emerald Forest Canopy",
    category: "nature",
    tags: ["forest", "trees", "green", "sunlight"],
    author: "Marcus Vance",
    description: "Golden morning rays filtering through dense evergreen pine forest canopy.",
    thumbUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=90"
  },
  {
    id: 3,
    title: "Misty Valley Morning",
    category: "nature",
    tags: ["fog", "hills", "sunrise", "landscape"],
    author: "Sarah Jenkins",
    description: "Rolling fog blanketing a lush valley during early dawn in the Pacific Northwest.",
    thumbUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=90"
  },
  {
    id: 4,
    title: "Golden Coast Sunset",
    category: "nature",
    tags: ["ocean", "waves", "sunset", "beach"],
    author: "David K.",
    description: "Fiery orange clouds overlooking crash waves along a rugged Pacific coastline.",
    thumbUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90"
  },

  // CITY
  {
    id: 5,
    title: "Tokyo Neon Streets",
    category: "city",
    tags: ["japan", "night", "neon", "metropolis"],
    author: "Kenji Sato",
    description: "Vibrant neon signs reflecting off rain-slicked pavement in downtown Shinjuku.",
    thumbUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=90"
  },
  {
    id: 6,
    title: "Manhattan Sunset Horizon",
    category: "city",
    tags: ["new york", "skyscrapers", "architecture", "dusk"],
    author: "Alexander Wright",
    description: "Iconic Manhattan skyline glowing warmly under a twilight purple horizon.",
    thumbUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=90"
  },
  {
    id: 7,
    title: "Historic European Alley",
    category: "city",
    tags: ["cobblestone", "old town", "travel", "italy"],
    author: "Giulia Rossi",
    description: "Charming cobblestone lane adorned with blooming bougainvillea in coastal Italy.",
    thumbUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=90"
  },

  // ANIMALS
  {
    id: 8,
    title: "Majestic Savanna Lion",
    category: "animals",
    tags: ["lion", "safari", "wildlife", "africa"],
    author: "Siddharth Nair",
    description: "A proud male lion resting peacefully amidst golden grass in the Serengeti.",
    thumbUrl: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=90"
  },
  {
    id: 9,
    title: "Arctic Red Fox",
    category: "animals",
    tags: ["fox", "snow", "winter", "predator"],
    author: "Erik Lindqvist",
    description: "Curious red fox gazing intently across a pristine snow-covered winter meadow.",
    thumbUrl: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1600&q=90"
  },
  {
    id: 10,
    title: "Vibrant Rainforest Toucan",
    category: "animals",
    tags: ["bird", "tropical", "feathers", "jungle"],
    author: "Carlos Mendez",
    description: "A colorful rainbow-billed toucan perched atop a mossy tropical rainforest branch.",
    thumbUrl: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?auto=format&fit=crop&w=1600&q=90"
  },

  // ARCHITECTURE
  {
    id: 11,
    title: "Curved Glass Pavilion",
    category: "architecture",
    tags: ["modern", "glass", "minimalist", "design"],
    author: "Hana Takahashi",
    description: "Sleek contemporary architectural structure with sweeping glass curves and ambient lighting.",
    thumbUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=90"
  },
  {
    id: 12,
    title: "Spiral Atrium Staircase",
    category: "architecture",
    tags: ["stairs", "interior", "geometry", "white"],
    author: "Lucas Meyer",
    description: "Geometric Fibonacci-inspired white spiral staircase inside a modern art museum.",
    thumbUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=90"
  },

  // FOOD
  {
    id: 13,
    title: "Artisanal Woodfired Pizza",
    category: "food",
    tags: ["pizza", "italian", "cheese", "gourmet"],
    author: "Chef Marco",
    description: "Crispy woodfired Margherita pizza topped with fresh basil leaves and melted mozzarella.",
    thumbUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=90"
  },
  {
    id: 14,
    title: "Fresh Berry Tart",
    category: "food",
    tags: ["dessert", "berries", "pastry", "sweet"],
    author: "Claire Dubois",
    description: "Decadent French pastry tart loaded with ripe raspberries, blueberries, and powdered sugar.",
    thumbUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1600&q=90"
  },
  {
    id: 15,
    title: "Espresso Craft Pour",
    category: "food",
    tags: ["coffee", "espresso", "latte art", "cafe"],
    author: "Liam O'Connor",
    description: "A freshly brewed espresso with silky cream microfoam forming smooth rosette latte art.",
    thumbUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    fullUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=90"
  }
];

// ==========================================================================
// 2. Application State Variables
// ==========================================================================
let currentCategory = "all";
let searchQuery = "";
let currentPage = 1;
const itemsPerPage = 8;

let currentFilteredImages = [...galleryData];
let lightboxActiveIndex = -1;
let currentZoom = 1;

// ==========================================================================
// 3. DOM Element References
// ==========================================================================
const galleryGrid = document.getElementById("gallery-grid");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const totalCountBadge = document.getElementById("total-count");
const filterStatusText = document.getElementById("filter-status");
const resetFilterBtn = document.getElementById("reset-filter-btn");

// Pagination elements
const gridPrevBtn = document.getElementById("grid-prev-btn");
const gridNextBtn = document.getElementById("grid-next-btn");
const pageIndicator = document.getElementById("page-indicator");

// Lightbox elements
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxOverlay = document.getElementById("lightbox-overlay");
const lightboxCloseBtn = document.getElementById("lightbox-close");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxSpinner = document.getElementById("lightbox-spinner");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCategory = document.getElementById("lightbox-category");
const lightboxDesc = document.getElementById("lightbox-desc");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxTags = document.getElementById("lightbox-tags");

const lightboxPrevBtn = document.getElementById("lightbox-prev");
const lightboxNextBtn = document.getElementById("lightbox-next");

const zoomInBtn = document.getElementById("zoom-in-btn");
const zoomOutBtn = document.getElementById("zoom-out-btn");
const zoomResetBtn = document.getElementById("zoom-reset-btn");
const zoomLevelText = document.getElementById("zoom-level");

// ==========================================================================
// 4. Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  renderGallery();
});

// ==========================================================================
// 5. Core Rendering Logic
// ==========================================================================

/** Filters dataset based on current category and search query */
function updateFilteredData() {
  currentFilteredImages = galleryData.filter(item => {
    const matchesCategory = (currentCategory === "all") || (item.category === currentCategory);
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Reset to page 1 whenever filters change
  const totalPages = Math.ceil(currentFilteredImages.length / itemsPerPage) || 1;
  if (currentPage > totalPages) {
    currentPage = 1;
  }
}

/** Renders gallery grid items with pagination and smooth animation */
function renderGallery() {
  updateFilteredData();
  totalCountBadge.textContent = currentFilteredImages.length;

  // Update filter status text
  const categoryName = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
  if (searchQuery) {
    filterStatusText.innerHTML = `Search results for "<strong>${escapeHtml(searchQuery)}</strong>" (${currentFilteredImages.length} items)`;
  } else {
    filterStatusText.innerHTML = `Showing <strong>${categoryName}</strong> photos (${currentFilteredImages.length} items)`;
  }

  // Handle Empty State
  if (currentFilteredImages.length === 0) {
    galleryGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    updatePaginationControls(0, 0);
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  // Paginate items
  const totalPages = Math.ceil(currentFilteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = currentFilteredImages.slice(startIndex, startIndex + itemsPerPage);

  // Trigger grid fade animation
  galleryGrid.classList.add("fade-out");

  setTimeout(() => {
    galleryGrid.innerHTML = "";

    pageItems.forEach((item, pageIdx) => {
      const globalIndex = startIndex + pageIdx;
      const card = createCardElement(item, globalIndex);
      galleryGrid.appendChild(card);
    });

    galleryGrid.classList.remove("fade-out");
  }, 150);

  updatePaginationControls(currentPage, totalPages);
}

/** Creates individual gallery card element */
function createCardElement(item, globalIndex) {
  const card = document.createElement("article");
  card.className = "gallery-card";
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `${item.title} by ${item.author}`);

  card.innerHTML = `
    <div class="card-image-wrapper">
      <div class="card-skeleton"></div>
      <img
        src="${item.thumbUrl}"
        alt="${escapeHtml(item.title)}"
        loading="lazy"
        referrerpolicy="no-referrer"
      />
      <div class="card-overlay">
        <span class="card-badge">${item.category}</span>
        <div class="card-zoom-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div>
        <div class="card-title">${escapeHtml(item.title)}</div>
        <div class="card-author">By ${escapeHtml(item.author)}</div>
      </div>
    </div>
  `;

  // Image load event to remove skeleton
  const img = card.querySelector("img");
  const skeleton = card.querySelector(".card-skeleton");

  if (img.complete) {
    img.classList.add("loaded");
    if (skeleton) skeleton.remove();
  } else {
    img.addEventListener("load", () => {
      img.classList.add("loaded");
      if (skeleton) skeleton.remove();
    });
    img.addEventListener("error", () => {
      // Fallback placeholder image on error
      img.src = `https://picsum.photos/seed/${item.id}/800/600`;
      img.classList.add("loaded");
      if (skeleton) skeleton.remove();
    });
  }

  // Open Lightbox on click or Enter keypress
  card.addEventListener("click", () => openLightbox(globalIndex));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(globalIndex);
    }
  });

  return card;
}

/** Updates Pagination Buttons and Page Counter */
function updatePaginationControls(page, totalPages) {
  if (totalPages <= 1) {
    pageIndicator.textContent = `Page 1 of 1`;
    gridPrevBtn.disabled = true;
    gridNextBtn.disabled = true;
    return;
  }

  pageIndicator.textContent = `Page ${page} of ${totalPages}`;
  gridPrevBtn.disabled = (page <= 1);
  gridNextBtn.disabled = (page >= totalPages);
}

// ==========================================================================
// 6. Lightbox View & Navigation Logic
// ==========================================================================

/** Opens Lightbox at specific filtered image index */
function openLightbox(index) {
  if (index < 0 || index >= currentFilteredImages.length) return;

  lightboxActiveIndex = index;
  resetZoom();
  updateLightboxContent();

  lightboxModal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent scrolling body
}

/** Closes Lightbox */
function closeLightbox() {
  lightboxModal.classList.add("hidden");
  document.body.style.overflow = "";
  lightboxImg.src = "";
  lightboxActiveIndex = -1;
}

/** Updates Lightbox content for currently selected image */
function updateLightboxContent() {
  if (lightboxActiveIndex < 0 || lightboxActiveIndex >= currentFilteredImages.length) return;

  const item = currentFilteredImages[lightboxActiveIndex];

  // Show spinner while large image loads
  lightboxSpinner.classList.remove("hidden");
  lightboxImg.style.opacity = "0";

  lightboxImg.src = item.fullUrl;
  lightboxImg.alt = item.title;

  lightboxImg.onload = () => {
    lightboxSpinner.classList.add("hidden");
    lightboxImg.style.opacity = "1";
  };

  lightboxImg.onerror = () => {
    lightboxSpinner.classList.add("hidden");
    lightboxImg.src = item.thumbUrl; // Fallback to thumb if full image fails
    lightboxImg.style.opacity = "1";
  };

  lightboxTitle.textContent = item.title;
  lightboxCategory.textContent = item.category;
  lightboxDesc.textContent = item.description || `Photo by ${item.author}`;
  lightboxCounter.textContent = `${lightboxActiveIndex + 1} / ${currentFilteredImages.length}`;

  // Render Tags
  lightboxTags.innerHTML = item.tags.map(tag => `<span class="meta-tag">#${escapeHtml(tag)}</span>`).join("");

  // Preload adjacent images for instantaneous navigation!
  preloadAdjacentImages(lightboxActiveIndex);
}

/** Navigates to previous image in Lightbox */
function prevLightboxImage() {
  if (currentFilteredImages.length === 0) return;
  lightboxActiveIndex = (lightboxActiveIndex - 1 + currentFilteredImages.length) % currentFilteredImages.length;
  resetZoom();
  updateLightboxContent();
}

/** Navigates to next image in Lightbox */
function nextLightboxImage() {
  if (currentFilteredImages.length === 0) return;
  lightboxActiveIndex = (lightboxActiveIndex + 1) % currentFilteredImages.length;
  resetZoom();
  updateLightboxContent();
}

/** Preloads adjacent lightbox images in background */
function preloadAdjacentImages(currentIndex) {
  if (currentFilteredImages.length <= 1) return;

  const prevIdx = (currentIndex - 1 + currentFilteredImages.length) % currentFilteredImages.length;
  const nextIdx = (currentIndex + 1) % currentFilteredImages.length;

  const imgPrev = new Image();
  imgPrev.src = currentFilteredImages[prevIdx].fullUrl;

  const imgNext = new Image();
  imgNext.src = currentFilteredImages[nextIdx].fullUrl;
}

// ==========================================================================
// 7. Lightbox Zoom Controls
// ==========================================================================

function applyZoom(newZoom) {
  currentZoom = Math.min(Math.max(newZoom, 0.5), 3); // Clamp zoom between 50% and 300%
  lightboxImg.style.transform = `scale(${currentZoom})`;
  zoomLevelText.textContent = `${Math.round(currentZoom * 100)}%`;
}

function zoomIn() {
  applyZoom(currentZoom + 0.25);
}

function zoomOut() {
  applyZoom(currentZoom - 0.25);
}

function resetZoom() {
  currentZoom = 1;
  applyZoom(1);
}

// ==========================================================================
// 8. Event Listeners Setup
// ==========================================================================
function setupEventListeners() {
  // Category Filter Buttons
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      currentCategory = btn.getAttribute("data-category") || "all";
      currentPage = 1;
      renderGallery();
    });
  });

  // Real-time Search Input
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.hidden = !searchQuery;
    currentPage = 1;
    renderGallery();
  });

  // Clear Search Button
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.hidden = true;
    currentPage = 1;
    renderGallery();
  });

  // Reset Filters Button
  resetFilterBtn.addEventListener("click", () => {
    currentCategory = "all";
    searchQuery = "";
    searchInput.value = "";
    clearSearchBtn.hidden = true;

    filterButtons.forEach(b => b.classList.remove("active"));
    document.querySelector('.filter-btn[data-category="all"]')?.classList.add("active");

    currentPage = 1;
    renderGallery();
  });

  // Pagination Grid Buttons
  gridPrevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderGallery();
    }
  });

  gridNextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(currentFilteredImages.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderGallery();
    }
  });

  // Lightbox Controls
  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxOverlay.addEventListener("click", closeLightbox);

  lightboxPrevBtn.addEventListener("click", prevLightboxImage);
  lightboxNextBtn.addEventListener("click", nextLightboxImage);

  // Zoom Controls
  zoomInBtn.addEventListener("click", zoomIn);
  zoomOutBtn.addEventListener("click", zoomOut);
  zoomResetBtn.addEventListener("click", resetZoom);

  // Global Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (lightboxModal.classList.contains("hidden")) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        prevLightboxImage();
        break;
      case "ArrowRight":
        nextLightboxImage();
        break;
      case "+":
      case "=":
        zoomIn();
        break;
      case "-":
        zoomOut();
        break;
      case "0":
        resetZoom();
        break;
    }
  });
}

// Utility: Escape HTML special characters
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
