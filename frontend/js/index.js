// Home Page Logic

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize search bar
    if (window.searchBar) {
        window.searchBar.render();
    }

    // Load listings
    await loadListings();
});

async function loadListings() {
    const grid = document.getElementById('listings-grid');
    const skeleton = document.getElementById('loading-skeleton');

    // Show skeleton loading
    if (skeleton) {
        skeleton.innerHTML = Array(8).fill(`
            <div class="animate-pulse">
                <div class="bg-gray-200 rounded-xl h-64 mb-3"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
        `).join('');
    }

    try {
        // Get favorites for heart state
        const favorites = JSON.parse(localStorage.getItem('airbnb_favorites') || '[]');
        
        // Fetch listings from API (or mock data)
        const response = await API.getListings();
        const listings = response.listings || mockData.listings;

        // Hide skeleton
        if (skeleton) skeleton.innerHTML = '';

        // Render listings
        if (grid) {
            grid.innerHTML = listings.map(listing => {
                const isFavorite = favorites.includes(listing.id);
                const card = new ListingCard(listing, { isFavorite });
                return card.render();
            }).join('');
        }

    } catch (error) {
        console.error('Error loading listings:', error);
        if (skeleton) skeleton.innerHTML = '';
        if (grid) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-circle text-4xl text-red-400 mb-4"></i>
                    <p class="text-gray-600">Une erreur est survenue lors du chargement des logements.</p>
                    <button onclick="location.reload()" class="mt-4 px-6 py-2 bg-[#FF385C] text-white rounded-lg">
                        Réessayer
                    </button>
                </div>
            `;
        }
    }
}

// Category filter functionality
document.querySelectorAll('#categories button').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active state from all
        document.querySelectorAll('#categories button').forEach(b => {
            b.classList.remove('border-black', 'text-black');
            b.classList.add('border-transparent', 'text-gray-500');
        });
        
        // Add active state to clicked
        btn.classList.remove('border-transparent', 'text-gray-500');
        btn.classList.add('border-black', 'text-black');
        
        // Filter logic would go here
        const category = btn.querySelector('span').textContent;
        console.log('Selected category:', category);
    });
});