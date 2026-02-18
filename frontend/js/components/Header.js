// Header Component
class Header {
    constructor() {
        this.isLoggedIn = this.checkAuth();
        this.user = this.getUser();
    }

    checkAuth() {
        return !!localStorage.getItem('airbnb_token');
    }

    getUser() {
        const userData = localStorage.getItem('airbnb_user');
        return userData ? JSON.parse(userData) : null;
    }

    logout() {
        localStorage.removeItem('airbnb_token');
        localStorage.removeItem('airbnb_user');
        window.location.reload();
    }

    // Redirection vers page hôte
    becomeHost() {
        if (!this.isLoggedIn) {
            alert('Veuillez vous connecter pour devenir hôte');
            window.location.href = 'connexion.html?redirect=' + encodeURIComponent(window.location.href);
            return;
        }
        alert('Fonctionnalité "Devenir hôte" - À implémenter avec le backend');
        // window.location.href = '/devenir-hote.html';
    }

    render() {
        const header = document.createElement('header');
        header.className = 'border-b border-gray-200 py-4 sticky top-0 bg-white z-50';
        
        header.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <!-- Logo -->
                <a href="index.html" class="flex items-center space-x-2 text-[#FF385C]">
                    <i class="fab fa-airbnb text-3xl"></i>
                    <span class="text-xl font-bold hidden md:block text-[#FF385C]">airbnb</span>
                </a>

                <!-- Navigation (Desktop) -->
                <nav class="hidden md:flex items-center space-x-6">
                    <a href="index.html" class="font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition">Accueil</a>
                    <a href="service.html" class="font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition">Explorer</a>
                    <a href="favoris.html" class="font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition">Favoris</a>
                </nav>

                <!-- Right Side -->
                <div class="flex items-center space-x-4">
                    <button onclick="header.becomeHost()" class="hidden md:block font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition">
                        Devenir hôte
                    </button>
                    
                    <!-- Language -->
                    <button class="hidden md:flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition">
                        <i class="fas fa-globe"></i>
                    </button>

                    <!-- User Menu -->
                    <div class="relative" id="user-menu-container">
                        <button id="user-menu-btn" class="flex items-center space-x-2 border border-gray-300 rounded-full p-2 pl-4 hover:shadow-md transition">
                            <i class="fas fa-bars text-gray-600"></i>
                            <div class="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white">
                                ${this.isLoggedIn && this.user?.avatar ? 
                                    `<img src="${this.user.avatar}" class="w-8 h-8 rounded-full object-cover">` : 
                                    `<i class="fas fa-user"></i>`
                                }
                            </div>
                        </button>

                        <!-- Dropdown -->
                        <div id="user-dropdown" class="hidden absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                            ${this.isLoggedIn ? `
                                <div class="px-4 py-2 border-b border-gray-100">
                                    <p class="font-semibold">${this.user?.firstName || 'Utilisateur'}</p>
                                    <p class="text-sm text-gray-500">${this.user?.email || ''}</p>
                                </div>
                                <a href="favoris.html" class="block px-4 py-2 hover:bg-gray-100">Favoris</a>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Réservations</a>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Messages</a>
                                <div class="border-t border-gray-100 my-1"></div>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Compte</a>
                                <button onclick="header.becomeHost()" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Devenir hôte</button>
                                <div class="border-t border-gray-100 my-1"></div>
                                <button onclick="header.logout()" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Déconnexion</button>
                            ` : `
                                <a href="connexion.html" class="block px-4 py-2 font-semibold hover:bg-gray-100">Inscription</a>
                                <a href="connexion.html" class="block px-4 py-2 hover:bg-gray-100">Connexion</a>
                                <div class="border-t border-gray-100 my-1"></div>
                                <button onclick="header.becomeHost()" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Louer mon logement</button>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Organiser une expérience</a>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Aide</a>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;

        return header;
    }

    init() {
        const container = document.getElementById('header-container');
        if (container) {
            container.appendChild(this.render());
            this.attachEventListeners();
        }
    }

    attachEventListeners() {
        const menuBtn = document.getElementById('user-menu-btn');
        const dropdown = document.getElementById('user-dropdown');

        if (menuBtn && dropdown) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('hidden');
            });

            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target) && !menuBtn.contains(e.target)) {
                    dropdown.classList.add('hidden');
                }
            });
        }
    }
}

// Initialize header when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.header = new Header();
    window.header.init();
});