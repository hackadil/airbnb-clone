// Favorites Page Logic

document.addEventListener('DOMContentLoaded', async () => {
    await loadFavoritesPage();
});

async function loadFavoritesPage() {
    const notLoggedIn = document.getElementById('not-logged-in');
    const emptyFavorites = document.getElementById('empty-favorites');
    const favoritesGrid = document.getElementById('favorites-grid');

    // Check authentication
    if (!API.isAuthenticated()) {
        if (notLoggedIn) notLoggedIn.classList.remove('hidden');
        if (emptyFavorites) emptyFavorites.classList.add('hidden');
        if (favoritesGrid) favoritesGrid.classList.add('hidden');
        return;
    }

    // Get favorites from localStorage (or API)
    const favoriteIds = JSON.parse(localStorage.getItem('airbnb_favorites') || '[]');

    if (favoriteIds.length === 0) {
        // No favorites
        if (notLoggedIn) notLoggedIn.classList.add('hidden');
        if (emptyFavorites) emptyFavorites.classList.remove('hidden');
        if (favoritesGrid) favoritesGrid.classList.add('hidden');
        return;
    }

    // Show loading state
    if (favoritesGrid) {
        Utils.showSkeleton('favorites-grid', 4);
    }

    try {
        // Fetch favorite listings
        const favorites = await API.getListingsByIds(favoriteIds);

        // Hide skeleton
        Utils.hideSkeleton('favorites-grid');

        // Show grid
        if (notLoggedIn) notLoggedIn.classList.add('hidden');
        if (emptyFavorites) emptyFavorites.classList.add('hidden');
        if (favoritesGrid) favoritesGrid.classList.remove('hidden');

        // Render favorites
        if (favoritesGrid) {
            favoritesGrid.innerHTML = favorites.map(listing => {
                const card = new ListingCard(listing, { 
                    isFavorite: true,
                    showRemoveButton: true 
                });
                return card.render();
            }).join('');
        }

    } catch (error) {
        console.error('Error loading favorites:', error);
        Utils.hideSkeleton('favorites-grid');
        if (favoritesGrid) {
            favoritesGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-circle text-4xl text-red-400 mb-4"></i>
                    <p class="text-gray-600">Une erreur est survenue lors du chargement de vos favoris.</p>
                    <button onclick="location.reload()" class="mt-4 px-6 py-2 bg-[#FF385C] text-white rounded-lg">
                        Réessayer
                    </button>
                </div>
            `;
        }
    }
}