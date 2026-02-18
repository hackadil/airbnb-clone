// Search Results Page Logic

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize mini search bar
    const miniSearchBar = new SearchBar('mini');
    miniSearchBar.render();

    // Get URL parameters
    const params = Utils.getUrlParams();
    
    // Update page title based on search
    updateSearchTitle(params);

    // Load search results
    await loadSearchResults(params);

    // Initialize filter chips
    initFilters();
});

function updateSearchTitle(params) {
    const titleEl = document.getElementById('results-title');
    if (titleEl) {
        if (params.lieu) {
            titleEl.textContent = `Logements à ${params.lieu}`;
        } else {
            titleEl.textContent = 'Tous les logements';
        }
    }
}

async function loadSearchResults(params) {
    const grid = document.getElementById('listings-grid');
    const emptyState = document.getElementById('empty-state');
    const countEl = document.getElementById('results-count');

    // Show loading skeleton
    if (grid) {
        Utils.showSkeleton('listings-grid', 8);
    }

    try {
        // Get favorites
        const favorites = JSON.parse(localStorage.getItem('airbnb_favorites') || '[]');

        // Fetch filtered listings
        const response = await API.getListings(params);
        const listings = response.listings || [];

        // Update count
        if (countEl) {
            countEl.textContent = `${listings.length} logement${listings.length > 1 ? 's' : ''}`;
        }

        // Hide skeleton
        Utils.hideSkeleton('listings-grid');

        // Show empty state or results
        if (listings.length === 0) {
            if (grid) grid.classList.add('hidden');
            if (emptyState) emptyState.classList.remove('hidden');
        } else {
            if (grid) {
                grid.classList.remove('hidden');
                grid.innerHTML = listings.map(listing => {
                    const isFavorite = favorites.includes(listing.id);
                    const card = new ListingCard(listing, { isFavorite });
                    return card.render();
                }).join('');
            }
            if (emptyState) emptyState.classList.add('hidden');
        }

    } catch (error) {
        console.error('Error loading search results:', error);
        Utils.hideSkeleton('listings-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-circle text-4xl text-red-400 mb-4"></i>
                    <p class="text-gray-600">Une erreur est survenue lors de la recherche.</p>
                    <button onclick="location.reload()" class="mt-4 px-6 py-2 bg-[#FF385C] text-white rounded-lg">
                        Réessayer
                    </button>
                </div>
            `;
        }
    }
}

function initFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Toggle active state
            const isActive = chip.classList.contains('active');
            
            // Remove active from all
            filterChips.forEach(c => c.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                chip.classList.add('active');
                
                // Apply filter logic
                const filterType = chip.textContent.trim();
                applyFilter(filterType);
            }
        });
    });
}

function applyFilter(filterType) {
    console.log('Applying filter:', filterType);
    
    // Get current listings and sort/filter
    const grid = document.getElementById('listings-grid');
    if (!grid) return;

    // This is a simplified filter - in production, you'd refetch from API
    switch(filterType) {
        case 'Prix: Croissant':
            // Sort by price ascending
            console.log('Sorting by price ascending');
            break;
        case 'Prix: Décroissant':
            // Sort by price descending
            console.log('Sorting by price descending');
            break;
        case '4.5+':
            // Filter by rating
            console.log('Filtering by rating 4.5+');
            break;
        default:
            break;
    }
}