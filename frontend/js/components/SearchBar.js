// SearchBar Component - Two versions: Hero (large) and Mini (header)
class SearchBar {
    constructor(version = 'hero') {
        this.version = version; // 'hero' or 'mini'
        this.location = '';
        this.checkIn = '';
        this.checkOut = '';
        this.guests = { adults: 1, children: 0, infants: 0 };
        this.suggestions = [];
        this.showSuggestions = false;
        this.showGuestsDropdown = false;
        this.showCalendar = false;
    }

    // Fetch location suggestions
    async fetchSuggestions(query) {
        if (query.length < 2) {
            this.suggestions = [];
            return;
        }
        
        try {
            // Simulated API call - replace with actual endpoint
            const response = await fetch(`/api/recherche-suggestions?q=${encodeURIComponent(query)}`);
            if (response.ok) {
                this.suggestions = await response.json();
            }
        } catch (error) {
            // Fallback: mock suggestions for demo
            this.suggestions = [
                { id: 1, name: 'Paris', type: 'Ville', country: 'France' },
                { id: 2, name: 'Paris, Texas', type: 'Ville', country: 'USA' },
                { id: 3, name: 'Parisot', type: 'Village', country: 'France' },
            ].filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
        }
        this.renderSuggestions();
    }

    // Build search URL and redirect
    handleSearch() {
        const params = new URLSearchParams();
        if (this.location) params.append('lieu', this.location);
        if (this.checkIn) params.append('arrivee', this.checkIn);
        if (this.checkOut) params.append('depart', this.checkOut);
        const totalGuests = this.guests.adults + this.guests.children + this.guests.infants;
        if (totalGuests > 0) params.append('voyageurs', totalGuests);
        
        window.location.href = `service.html?${params.toString()}`;
    }

    // Update guest count
    updateGuests(type, delta) {
        const newValue = this.guests[type] + delta;
        if (newValue >= 0 && newValue <= 16) {
            this.guests[type] = newValue;
            this.renderGuestDropdown();
        }
    }

    // Get total guests text
    getGuestsText() {
        const total = this.guests.adults + this.guests.children + this.guests.infants;
        if (total === 0) return 'Ajouter des voyageurs';
        if (total === 1) return '1 voyageur';
        return `${total} voyageurs`;
    }

    // Render Hero Version (Large)
    renderHero() {
        return `
            <div class="bg-white rounded-full search-shadow p-2 flex items-center max-w-4xl mx-auto">
                <!-- Location -->
                <div class="flex-1 px-6 py-2 hover:bg-gray-100 rounded-full cursor-pointer relative" onclick="searchBar.focusLocation()">
                    <div class="font-semibold text-sm">Lieu</div>
                    <input type="text" 
                           id="search-location" 
                           placeholder="Rechercher une destination"
                           class="w-full bg-transparent outline-none text-gray-600 text-sm"
                           value="${this.location}"
                           oninput="searchBar.handleLocationInput(this.value)"
                           onfocus="searchBar.showSuggestions = true"
                           autocomplete="off">
                    
                    <!-- Suggestions Dropdown -->
                    <div id="suggestions-dropdown" class="hidden absolute top-full left-0 mt-4 w-96 bg-white rounded-2xl shadow-xl border border-gray-200 py-4 z-50">
                        <!-- Injected by renderSuggestions -->
                    </div>
                </div>

                <div class="w-px h-8 bg-gray-300"></div>

                <!-- Check-in -->
                <div class="flex-1 px-6 py-2 hover:bg-gray-100 rounded-full cursor-pointer" onclick="searchBar.showCalendarPicker('checkin')">
                    <div class="font-semibold text-sm">Arrivée</div>
                    <div class="text-gray-600 text-sm">${this.checkIn || 'Quand ?'}</div>
                </div>

                <div class="w-px h-8 bg-gray-300"></div>

                <!-- Check-out -->
                <div class="flex-1 px-6 py-2 hover:bg-gray-100 rounded-full cursor-pointer" onclick="searchBar.showCalendarPicker('checkout')">
                    <div class="font-semibold text-sm">Départ</div>
                    <div class="text-gray-600 text-sm">${this.checkOut || 'Quand ?'}</div>
                </div>

                <div class="w-px h-8 bg-gray-300"></div>

                <!-- Guests -->
                <div class="flex-1 px-6 py-2 hover:bg-gray-100 rounded-full cursor-pointer relative" onclick="searchBar.toggleGuestsDropdown()">
                    <div class="font-semibold text-sm">Voyageurs</div>
                    <div class="text-gray-600 text-sm">${this.getGuestsText()}</div>
                    
                    <!-- Guests Dropdown -->
                    <div id="guests-dropdown" class="hidden absolute top-full right-0 mt-4 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 py-4 z-50">
                        ${this.renderGuestDropdownContent()}
                    </div>
                </div>

                <!-- Search Button -->
                <button onclick="searchBar.handleSearch()" 
                        class="bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-full w-12 h-12 flex items-center justify-center transition transform hover:scale-105">
                    <i class="fas fa-search text-lg"></i>
                </button>
            </div>

            <!-- Calendar Modal -->
            <div id="calendar-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold">Sélectionner les dates</h3>
                        <button onclick="searchBar.closeCalendar()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                        <span class="text-gray-500">Lu</span><span class="text-gray-500">Ma</span><span class="text-gray-500">Me</span>
                        <span class="text-gray-500">Je</span><span class="text-gray-500">Ve</span><span class="text-gray-500">Sa</span><span class="text-gray-500">Di</span>
                    </div>
                    <div id="calendar-grid" class="grid grid-cols-7 gap-2">
                        <!-- Calendar injected by JS -->
                    </div>
                    <div class="flex justify-between mt-4">
                        <button onclick="searchBar.clearDates()" class="text-gray-600 underline">Effacer</button>
                        <button onclick="searchBar.closeCalendar()" class="bg-[#FF385C] text-white px-6 py-2 rounded-lg">Valider</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Render Mini Version (Header)
    renderMini() {
        return `
            <div class="max-w-2xl mx-auto">
                <div class="bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition flex items-center p-2 cursor-pointer" onclick="searchBar.expandMini()">
                    <div class="flex-1 px-4 border-r border-gray-300">
                        <span class="font-semibold text-sm">${this.location || 'Où allez-vous ?'}</span>
                    </div>
                    <div class="px-4 border-r border-gray-300">
                        <span class="text-sm text-gray-600">${this.checkIn ? this.formatDateShort(this.checkIn) : 'Dates'}</span>
                    </div>
                    <div class="px-4 flex items-center space-x-2">
                        <span class="text-sm text-gray-600">${this.getGuestsText()}</span>
                        <div class="bg-[#FF385C] text-white rounded-full w-8 h-8 flex items-center justify-center">
                            <i class="fas fa-search text-sm"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Render guest dropdown content
    renderGuestDropdownContent() {
        const types = [
            { key: 'adults', label: 'Adultes', sublabel: '13 ans et plus' },
            { key: 'children', label: 'Enfants', sublabel: 'De 2 à 12 ans' },
            { key: 'infants', label: 'Bébés', sublabel: 'Moins de 2 ans' }
        ];

        return types.map(type => `
            <div class="flex items-center justify-between px-6 py-3">
                <div>
                    <div class="font-semibold">${type.label}</div>
                    <div class="text-sm text-gray-500">${type.sublabel}</div>
                </div>
                <div class="flex items-center space-x-3">
                    <button onclick="searchBar.updateGuests('${type.key}', -1)" 
                            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${this.guests[type.key] === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-black'}">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <span class="w-6 text-center font-medium">${this.guests[type.key]}</span>
                    <button onclick="searchBar.updateGuests('${type.key}', 1)" 
                            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Render suggestions
    renderSuggestions() {
        const dropdown = document.getElementById('suggestions-dropdown');
        if (!dropdown) return;

        if (this.suggestions.length === 0) {
            dropdown.classList.add('hidden');
            return;
        }

        dropdown.innerHTML = this.suggestions.map(s => `
            <div class="px-6 py-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3" onclick="searchBar.selectSuggestion('${s.name}')">
                <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <i class="fas fa-map-marker-alt text-gray-500"></i>
                </div>
                <div>
                    <div class="font-medium">${s.name}</div>
                    <div class="text-sm text-gray-500">${s.type} · ${s.country}</div>
                </div>
            </div>
        `).join('');

        dropdown.classList.remove('hidden');
    }

    // Event handlers
    handleLocationInput(value) {
        this.location = value;
        this.fetchSuggestions(value);
    }

    selectSuggestion(name) {
        this.location = name;
        document.getElementById('search-location').value = name;
        document.getElementById('suggestions-dropdown').classList.add('hidden');
    }

    toggleGuestsDropdown() {
        this.showGuestsDropdown = !this.showGuestsDropdown;
        const dropdown = document.getElementById('guests-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden', !this.showGuestsDropdown);
        }
    }

    renderGuestDropdown() {
        const dropdown = document.getElementById('guests-dropdown');
        if (dropdown) {
            dropdown.innerHTML = this.renderGuestDropdownContent();
        }
        // Update display text
        this.render();
    }

    showCalendarPicker(type) {
        this.calendarType = type;
        document.getElementById('calendar-modal').classList.remove('hidden');
        this.renderCalendar();
    }

    closeCalendar() {
        document.getElementById('calendar-modal').classList.add('hidden');
    }

    renderCalendar() {
        const grid = document.getElementById('calendar-grid');
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let html = '';
        for (let i = 0; i < (firstDay || 7) - 1; i++) {
            html += '<div></div>';
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = dateStr === this.checkIn || dateStr === this.checkOut;
            html += `
                <button onclick="searchBar.selectDate('${dateStr}')" 
                        class="w-10 h-10 rounded-full hover:bg-gray-100 ${isSelected ? 'bg-[#FF385C] text-white hover:bg-[#E31C5F]' : ''}">
                    ${day}
                </button>
            `;
        }
        
        grid.innerHTML = html;
    }

    selectDate(date) {
        if (this.calendarType === 'checkin') {
            this.checkIn = date;
            this.calendarType = 'checkout';
            this.renderCalendar();
        } else {
            this.checkOut = date;
            this.closeCalendar();
        }
        this.render();
    }

    clearDates() {
        this.checkIn = '';
        this.checkOut = '';
        this.renderCalendar();
    }

    formatDateShort(dateStr) {
        const date = new Date(dateStr);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    }

    focusLocation() {
        document.getElementById('search-location').focus();
    }

    expandMini() {
        // For mini version, could expand to full search modal
        window.location.href = 'service.html';
    }

    render() {
        const container = this.version === 'hero' ? 
            document.getElementById('hero-searchbar') : 
            document.getElementById('mini-searchbar');
        
        if (container) {
            container.innerHTML = this.version === 'hero' ? this.renderHero() : this.renderMini();
        }
    }
}

// Initialize search bars
document.addEventListener('DOMContentLoaded', () => {
    window.searchBar = new SearchBar('hero');
    searchBar.render();
});