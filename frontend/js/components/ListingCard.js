// ListingCard Component - Reusable card for property listings
class ListingCard {
    constructor(listing, options = {}) {
        this.listing = listing;
        this.isFavorite = options.isFavorite || false;
        this.showRemoveButton = options.showRemoveButton || false;
        this.onFavoriteToggle = options.onFavoriteToggle || (() => {});
        this.onRemove = options.onRemove || (() => {});
    }

    // Format price
    formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0
        }).format(price);
    }

    // Calculate distance (mock)
    getDistance() {
        return (Math.random() * 20 + 1).toFixed(1);
    }

    // Get rating display
    getRating() {
        if (this.listing.rating) {
            return `
                <span class="flex items-center">
                    <i class="fas fa-star text-xs mr-1"></i>
                    ${this.listing.rating}
                </span>
            `;
        }
        return '<span class="text-gray-500">Nouveau</span>';
    }

    // Get image gallery HTML
    getImageGallery() {
        const images = this.listing.images || [this.listing.image || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'];
        
        if (images.length === 1) {
            return `<img src="${images[0]}" alt="${this.listing.title}" class="w-full h-64 object-cover rounded-xl">`;
        }

        // Carousel for multiple images
        const dots = images.map((_, i) => `
            <button class="w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}" onclick="event.stopPropagation(); listingCard.goToSlide(${i})"></button>
        `).join('');

        return `
            <div class="relative group">
                <div class="overflow-hidden rounded-xl">
                    <div class="flex transition-transform duration-300" id="carousel-${this.listing.id}">
                        ${images.map(img => `
                            <img src="${img}" alt="${this.listing.title}" class="w-full h-64 object-cover flex-shrink-0">
                        `).join('')}
                    </div>
                </div>
                ${images.length > 1 ? `
                    <button class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition" onclick="event.stopPropagation(); listingCard.prevSlide()">
                        <i class="fas fa-chevron-left text-sm"></i>
                    </button>
                    <button class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition" onclick="event.stopPropagation(); listingCard.nextSlide()">
                        <i class="fas fa-chevron-right text-sm"></i>
                    </button>
                    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                        ${dots}
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Render the card
    render() {
        const heartIcon = this.isFavorite ? 'fas fa-heart' : 'far fa-heart';
        const heartColor = this.isFavorite ? 'text-[#FF385C]' : 'text-white';
        const heartBg = this.isFavorite ? '' : 'drop-shadow-lg';

        return `
            <article class="group cursor-pointer card-hover transition duration-300" onclick="window.location.href='logement.html?id=${this.listing.id}'">
                <div class="relative">
                    ${this.getImageGallery()}
                    
                    <!-- Favorite Button -->
                    <button onclick="event.stopPropagation(); listingCard.toggleFavorite(${this.listing.id})" 
                            class="absolute top-3 right-3 z-10 heart-animation">
                        <i class="${heartIcon} ${heartColor} ${heartBg} text-2xl"></i>
                    </button>

                    ${this.showRemoveButton ? `
                        <button onclick="event.stopPropagation(); listingCard.remove(${this.listing.id})" 
                                class="absolute top-3 left-3 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100">
                            <i class="fas fa-times text-gray-600"></i>
                        </button>
                    ` : ''}

                    <!-- Guest Favorite Badge -->
                    ${this.listing.isGuestFavorite ? `
                        <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">
                            Préféré des voyageurs
                        </div>
                    ` : ''}
                </div>

                <div class="mt-3 space-y-1">
                    <div class="flex justify-between items-start">
                        <h3 class="font-semibold text-gray-900 truncate">${this.listing.location || this.listing.city}, ${this.listing.country || 'France'}</h3>
                        ${this.getRating()}
                    </div>
                    <p class="text-gray-500 text-sm">${this.listing.distance || this.getDistance()} kilomètres de distance</p>
                    <p class="text-gray-500 text-sm">${this.listing.dates || 'Dates flexibles'}</p>
                    <div class="flex items-baseline space-x-1 pt-1">
                        <span class="font-semibold">${this.formatPrice(this.listing.price)}</span>
                        <span class="text-gray-600">/ nuit</span>
                    </div>
                    ${this.listing.totalPrice ? `
                        <p class="text-gray-500 text-sm underline">${this.formatPrice(this.listing.totalPrice)} total</p>
                    ` : ''}
                </div>
            </article>
        `;
    }

    // Static methods for event handling
    static toggleFavorite(id) {
        const favorites = JSON.parse(localStorage.getItem('airbnb_favorites') || '[]');
        const index = favorites.indexOf(id);
        
        if (index > -1) {
            favorites.splice(index, 1);
            showToast('Retiré des favoris');
        } else {
            favorites.push(id);
            showToast('Ajouté aux favoris');
        }
        
        localStorage.setItem('airbnb_favorites', JSON.stringify(favorites));
        
        // Refresh display if on favorites page
        if (window.location.pathname.includes('favoris')) {
            window.location.reload();
        } else {
            // Update heart icon
            const btn = event.target.closest('button');
            const icon = btn.querySelector('i');
            if (index > -1) {
                icon.classList.remove('fas', 'text-[#FF385C]');
                icon.classList.add('far', 'text-white', 'drop-shadow-lg');
            } else {
                icon.classList.remove('far', 'text-white', 'drop-shadow-lg');
                icon.classList.add('fas', 'text-[#FF385C]');
            }
        }
    }

    static remove(id) {
        if (confirm('Retirer ce logement de vos favoris ?')) {
            const favorites = JSON.parse(localStorage.getItem('airbnb_favorites') || '[]');
            const index = favorites.indexOf(id);
            if (index > -1) {
                favorites.splice(index, 1);
                localStorage.setItem('airbnb_favorites', JSON.stringify(favorites));
                window.location.reload();
            }
        }
    }

    // Carousel navigation
    static currentSlide = 0;
    
    static nextSlide() {
        // Implementation for carousel
    }
    
    static prevSlide() {
        // Implementation for carousel
    }
    
    static goToSlide(index) {
        this.currentSlide = index;
    }
}

// Toast notification helper
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Make available globally
window.ListingCard = ListingCard;
window.listingCard = ListingCard;