// Property Detail Page Logic

document.addEventListener('DOMContentLoaded', async () => {
    // Get listing ID from URL
    const params = Utils.getUrlParams();
    const listingId = params.id;

    if (!listingId) {
        showErrorState();
        return;
    }

    // Load property details
    await loadPropertyDetails(listingId);
});

async function loadPropertyDetails(id) {
    const loadingState = document.getElementById('loading-state');
    const content = document.getElementById('property-content');
    const errorState = document.getElementById('error-state');

    try {
        // Fetch listing details
        const listing = await API.getListing(id);
        
        // Hide loading, show content
        if (loadingState) loadingState.classList.add('hidden');
        if (content) content.classList.remove('hidden');

        // Populate page with data
        populatePropertyData(listing);

        // Setup booking form
        setupBookingForm(listing);

        // Setup favorite button
        setupFavoriteButton(listing.id);

    } catch (error) {
        console.error('Error loading property:', error);
        if (loadingState) loadingState.classList.add('hidden');
        if (errorState) errorState.classList.remove('hidden');
    }
}

function populatePropertyData(listing) {
    // Title and basic info
    document.getElementById('property-title').textContent = listing.title;
    document.getElementById('property-rating').textContent = listing.rating || 'Nouveau';
    document.getElementById('property-reviews').textContent = `${listing.reviews || 0} commentaires`;
    document.getElementById('property-location').textContent = `${listing.city}, ${listing.country}`;

    // Image gallery
    const gallery = document.getElementById('image-gallery');
    if (gallery && listing.images) {
        gallery.innerHTML = `
            <img src="${listing.images[0]}" class="image-main w-full h-full object-cover" alt="${listing.title}">
            ${listing.images.slice(1, 3).map((img, i) => `
                <img src="${img}" class="image-sub w-full h-full object-cover ${i === 1 ? 'rounded-tr-xl' : ''}" alt="${listing.title}">
            `).join('')}
        `;
    }

    // Host info
    document.getElementById('host-avatar').src = listing.host?.avatar || 'https://via.placeholder.com/56';
    document.getElementById('property-type').textContent = listing.type;
    document.getElementById('property-guests').textContent = `${listing.guests} voyageur${listing.guests > 1 ? 's' : ''}`;
    document.getElementById('property-bedrooms').textContent = `${listing.bedrooms} chambre${listing.bedrooms > 1 ? 's' : ''}`;
    document.getElementById('property-beds').textContent = `${listing.beds} lit${listing.beds > 1 ? 's' : ''}`;
    document.getElementById('property-bathrooms').textContent = `${listing.bathrooms} salle de bain${listing.bathrooms > 1 ? 's' : ''}`;

    // Description
    document.getElementById('property-description').textContent = listing.description;

    // Amenities
    const amenitiesList = document.getElementById('amenities-list');
    if (amenitiesList && listing.amenities) {
        amenitiesList.innerHTML = listing.amenities.map(amenity => {
            const info = mockData.amenitiesMap[amenity] || { icon: 'fa-check', label: amenity };
            return `
                <div class="flex items-center space-x-3">
                    <i class="fas ${info.icon} text-gray-600 w-6"></i>
                    <span>${info.label}</span>
                </div>
            `;
        }).join('');
    }

    // Reviews
    document.getElementById('review-rating').textContent = listing.rating || 'Nouveau';
    document.getElementById('review-count').textContent = `${listing.reviews || 0} commentaires`;

    // Rating breakdown
    const ratingBreakdown = document.getElementById('rating-breakdown');
    if (ratingBreakdown) {
        const categories = mockData.ratingCategories;
        ratingBreakdown.innerHTML = Object.entries(categories).map(([key, data]) => `
            <div class="flex items-center justify-between">
                <span class="text-sm">${data.label}</span>
                <div class="flex items-center space-x-2">
                    <div class="review-bar w-24">
                        <div class="review-fill" style="width: ${(data.value / 5) * 100}%"></div>
                    </div>
                    <span class="text-sm font-medium">${data.value}</span>
                </div>
            </div>
        `).join('');
    }

    // Reviews list
    const reviewsList = document.getElementById('reviews-list');
    if (reviewsList) {
        const reviews = mockData.reviews.slice(0, 4);
        reviewsList.innerHTML = reviews.map(review => `
            <div class="space-y-3">
                <div class="flex items-center space-x-3">
                    <img src="${review.avatar}" alt="${review.author}" class="w-12 h-12 rounded-full object-cover">
                    <div>
                        <div class="font-semibold">${review.author}</div>
                        <div class="text-sm text-gray-500">${review.date}</div>
                    </div>
                </div>
                <p class="text-gray-700">${review.text}</p>
            </div>
        `).join('');
    }

    // Location
    document.getElementById('location-address').textContent = `${listing.city}, ${listing.country}`;

    // Booking card
    document.getElementById('booking-price').textContent = `${listing.price}€`;
    document.getElementById('booking-rating').textContent = listing.rating || 'Nouveau';
}

function setupBookingForm(listing) {
    const checkInInput = document.getElementById('checkin-date');
    const checkOutInput = document.getElementById('checkout-date');
    const guestsSelect = document.getElementById('guests-select');
    const bookBtn = document.getElementById('book-btn');

    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    if (checkInInput) checkInInput.min = today;
    if (checkOutInput) checkOutInput.min = today;

    // Update price calculation
    function updatePrice() {
        const checkIn = checkInInput?.value;
        const checkOut = checkOutInput?.value;
        const guests = parseInt(guestsSelect?.value || 1);

        if (checkIn && checkOut) {
            const nights = Utils.calculateNights(checkIn, checkOut);
            const subtotal = listing.price * nights;
            const fees = Math.round(subtotal * 0.12); // 12% service fee
            const total = subtotal + fees;

            document.getElementById('price-breakdown-nights').textContent = `${listing.price}€ x ${nights} nuits`;
            document.getElementById('price-subtotal').textContent = `${subtotal}€`;
            document.getElementById('price-fees').textContent = `${fees}€`;
            document.getElementById('price-total').textContent = `${total}€`;
        }
    }

    // Event listeners
    checkInInput?.addEventListener('change', updatePrice);
    checkOutInput?.addEventListener('change', updatePrice);
    guestsSelect?.addEventListener('change', updatePrice);

    // Book button
    bookBtn?.addEventListener('click', async () => {
        const checkIn = checkInInput?.value;
        const checkOut = checkOutInput?.value;
        const guests = parseInt(guestsSelect?.value || 1);

        if (!checkIn || !checkOut) {
            Utils.showToast('Veuillez sélectionner les dates', 'error');
            return;
        }

        if (!API.isAuthenticated()) {
            Utils.showToast('Veuillez vous connecter pour réserver', 'error');
            setTimeout(() => {
                window.location.href = `connexion.html?redirect=${encodeURIComponent(window.location.href)}`;
            }, 1500);
            return;
        }

        try {
            const booking = await API.createBooking({
                listingId: listing.id,
                checkIn,
                checkOut,
                guests
            });
            Utils.showToast('Réservation confirmée !');
        } catch (error) {
            Utils.showToast('Erreur lors de la réservation', 'error');
        }
    });
}

function setupFavoriteButton(listingId) {
    const favBtn = document.getElementById('favorite-btn');
    if (!favBtn) return;

    const favorites = JSON.parse(localStorage.getItem('airbnb_favorites') || '[]');
    const isFavorite = favorites.includes(parseInt(listingId));

    // Update button appearance
    const icon = favBtn.querySelector('i');
    if (isFavorite) {
        icon.classList.remove('far');
        icon.classList.add('fas', 'text-[#FF385C]');
    }

    favBtn.addEventListener('click', () => {
        ListingCard.toggleFavorite(parseInt(listingId));
        
        // Toggle icon
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas', 'text-[#FF385C]');
        } else {
            icon.classList.remove('fas', 'text-[#FF385C]');
            icon.classList.add('far');
        }
    });
}

function showErrorState() {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    
    if (loadingState) loadingState.classList.add('hidden');
    if (errorState) errorState.classList.remove('hidden');
}