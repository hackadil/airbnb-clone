// API Functions - Centralized API calls
// Replace mock implementations with actual fetch calls when backend is ready

const API = {
    baseUrl: '/api',
    
    // Helper for making requests
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
        
        // Add auth token if available
        const token = localStorage.getItem('airbnb_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || `HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // ===== LISTINGS =====
    
    // Get all listings with optional filters
    async getListings(filters = {}) {
        // Mock implementation - replace with actual API
        // const queryParams = new URLSearchParams(filters).toString();
        // return this.request(`/logements?${queryParams}`);
        
        // Mock data fallback
        let listings = [...mockData.listings];
        
        if (filters.lieu) {
            const searchTerm = filters.lieu.toLowerCase();
            listings = listings.filter(l => 
                l.city.toLowerCase().includes(searchTerm) || 
                l.location.toLowerCase().includes(searchTerm)
            );
        }
        
        if (filters.voyageurs) {
            listings = listings.filter(l => l.guests >= parseInt(filters.voyageurs));
        }
        
        return { listings, total: listings.length };
    },

    // Get single listing by ID
    async getListing(id) {
        // Mock implementation
        // return this.request(`/logement/${id}`);
        
        const listing = mockData.listings.find(l => l.id === parseInt(id));
        if (!listing) throw new Error('Logement non trouvé');
        return listing;
    },

    // Get listings by IDs (for favorites)
    async getListingsByIds(ids) {
        // Mock implementation
        return mockData.listings.filter(l => ids.includes(l.id));
    },

    // Get suggestions for search autocomplete
    async getSuggestions(query) {
        // Mock implementation
        // return this.request(`/recherche-suggestions?q=${encodeURIComponent(query)}`);
        
        if (!query || query.length < 2) return [];
        
        const suggestions = [
            { id: 1, name: 'Paris', type: 'Ville', country: 'France' },
            { id: 2, name: 'Lyon', type: 'Ville', country: 'France' },
            { id: 3, name: 'Marseille', type: 'Ville', country: 'France' },
            { id: 4, name: 'Nice', type: 'Ville', country: 'France' },
            { id: 5, name: 'Bordeaux', type: 'Ville', country: 'France' },
            { id: 6, name: 'Toulouse', type: 'Ville', country: 'France' },
            { id: 7, name: 'Nantes', type: 'Ville', country: 'France' },
            { id: 8, name: 'Strasbourg', type: 'Ville', country: 'France' },
        ];
        
        return suggestions.filter(s => 
            s.name.toLowerCase().includes(query.toLowerCase())
        );
    },

    // ===== AUTH =====
    
    // Login
    async login(credentials) {
        // Mock implementation
        // return this.request('/connexion', {
        //     method: 'POST',
        //     body: JSON.stringify(credentials)
        // });
        
        // Mock successful login
        if (credentials.email && credentials.password) {
            const mockUser = {
                id: 1,
                email: credentials.email,
                firstName: 'Jean',
                lastName: 'Dupont',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
            };
            const mockToken = 'mock_jwt_token_' + Date.now();
            
            localStorage.setItem('airbnb_token', mockToken);
            localStorage.setItem('airbnb_user', JSON.stringify(mockUser));
            
            return { user: mockUser, token: mockToken };
        }
        throw new Error('Identifiants invalides');
    },

    // Register
    async register(userData) {
        // Mock implementation
        // return this.request('/inscription', {
        //     method: 'POST',
        //     body: JSON.stringify(userData)
        // });
        
        // Mock successful registration
        const mockUser = {
            id: Date.now(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            avatar: null
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        
        localStorage.setItem('airbnb_token', mockToken);
        localStorage.setItem('airbnb_user', JSON.stringify(mockUser));
        
        return { user: mockUser, token: mockToken };
    },

    // Logout
    logout() {
        localStorage.removeItem('airbnb_token');
        localStorage.removeItem('airbnb_user');
    },

    // Get current user
    getCurrentUser() {
        const userData = localStorage.getItem('airbnb_user');
        return userData ? JSON.parse(userData) : null;
    },

    // Check if authenticated
    isAuthenticated() {
        return !!localStorage.getItem('airbnb_token');
    },

    // ===== FAVORITES =====
    
    // Get user favorites
    async getFavorites() {
        // Mock implementation
        // return this.request('/utilisateur/favoris');
        
        const favorites = JSON.parse(localStorage.getItem('airbnb_favorites') || '[]');
        return favorites;
    },

    // Add to favorites
    async addFavorite(listingId) {
        // Mock implementation
        // return this.request('/utilisateur/favoris', {
        //     method: 'POST',
        //     body: JSON.stringify({ listingId })
        // });
        
        const favorites = JSON.parse(localStorage.getItem('airbnb_favorites') || '[]');
        if (!favorites.includes(listingId)) {
            favorites.push(listingId);
            localStorage.setItem('airbnb_favorites', JSON.stringify(favorites));
        }
        return favorites;
    },

    // Remove from favorites
    async removeFavorite(listingId) {
        // Mock implementation
        // return this.request(`/utilisateur/favoris/${listingId}`, {
        //     method: 'DELETE'
        // });
        
        let favorites = JSON.parse(localStorage.getItem('airbnb_favorites') || '[]');
        favorites = favorites.filter(id => id !== listingId);
        localStorage.setItem('airbnb_favorites', JSON.stringify(favorites));
        return favorites;
    },

    // ===== BOOKINGS =====
    
    // Create booking
    async createBooking(bookingData) {
        // Mock implementation
        // return this.request('/reservations', {
        //     method: 'POST',
        //     body: JSON.stringify(bookingData)
        // });
        
        return { 
            id: Date.now(), 
            ...bookingData, 
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };
    },

    // Get user bookings
    async getBookings() {
        // Mock implementation
        // return this.request('/utilisateur/reservations');
        
        return [];
    },

    // ===== REVIEWS =====
    
    // Get reviews for a listing
    async getReviews(listingId) {
        // Mock implementation
        // return this.request(`/logement/${listingId}/commentaires`);
        
        return mockData.reviews;
    },

    // Create review
    async createReview(listingId, reviewData) {
        // Mock implementation
        // return this.request(`/logement/${listingId}/commentaires`, {
        //     method: 'POST',
        //     body: JSON.stringify(reviewData)
        // });
        
        return { id: Date.now(), listingId, ...reviewData };
    }
};

// Make available globally
window.API = API;