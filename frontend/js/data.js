// Mock Data - Replace with actual API calls when backend is ready
const mockData = {
    // Listings for grid display
    listings: [
        {
            id: 1,
            title: "Appartement cosy au cœur de Paris",
            location: "Paris",
            city: "Paris",
            country: "France",
            price: 85,
            rating: 4.92,
            reviews: 128,
            distance: 2.5,
            dates: "15-20 oct.",
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
            images: [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
                "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800"
            ],
            isGuestFavorite: true,
            type: "Appartement",
            guests: 4,
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            host: {
                name: "Marie",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
                isSuperhost: true
            },
            amenities: ["wifi", "kitchen", "washer", "tv", "parking"],
            description: "Bel appartement haussmannien rénové avec goût. Idéalement situé dans le 11ème arrondissement, à proximité des bars et restaurants tendances. Parfait pour un séjour romantique ou entre amis.",
            coordinates: { lat: 48.8566, lng: 2.3522 }
        },
        {
            id: 2,
            title: "Loft design avec vue sur la Seine",
            location: "Lyon",
            city: "Lyon",
            country: "France",
            price: 120,
            rating: 4.85,
            reviews: 89,
            distance: 5.2,
            dates: "22-27 oct.",
            image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
            images: [
                "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
                "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800"
            ],
            isGuestFavorite: false,
            type: "Loft",
            guests: 2,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
            host: {
                name: "Pierre",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
                isSuperhost: false
            },
            amenities: ["wifi", "kitchen", "tv", "ac", "workspace"],
            description: "Magnifique loft dans une ancienne usine réhabilitée. Grande hauteur sous plafond, baies vitrées et vue imprenable sur la ville.",
            coordinates: { lat: 45.7640, lng: 4.8357 }
        },
        {
            id: 3,
            title: "Villa avec piscine privée",
            location: "Nice",
            city: "Nice",
            country: "France",
            price: 250,
            rating: 4.98,
            reviews: 45,
            distance: 8.5,
            dates: "1-8 nov.",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
            images: [
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800",
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=800",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
            ],
            isGuestFavorite: true,
            type: "Villa",
            guests: 8,
            bedrooms: 4,
            beds: 5,
            bathrooms: 3,
            host: {
                name: "Sophie",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
                isSuperhost: true
            },
            amenities: ["wifi", "pool", "kitchen", "parking", "bbq", "ac"],
            description: "Villa luxueuse avec piscine privée et jardin paysager. Idéale pour des vacances en famille ou entre amis sous le soleil de la Côte d'Azur.",
            coordinates: { lat: 43.7102, lng: 7.2620 }
        },
        {
            id: 4,
            title: "Chalet de montagne authentique",
            location: "Chamonix",
            city: "Chamonix",
            country: "France",
            price: 180,
            rating: 4.88,
            reviews: 67,
            distance: 15.3,
            dates: "10-17 déc.",
            image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=800",
            images: [
                "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=800",
                "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800"
            ],
            isGuestFavorite: false,
            type: "Chalet",
            guests: 6,
            bedrooms: 3,
            beds: 4,
            bathrooms: 2,
            host: {
                name: "Jean",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
                isSuperhost: true
            },
            amenities: ["wifi", "fireplace", "kitchen", "parking", "ski", "hottub"],
            description: "Chalet traditionnel en bois avec cheminée et vue sur le Mont-Blanc. Accès direct aux pistes de ski.",
            coordinates: { lat: 45.9237, lng: 6.8694 }
        },
        {
            id: 5,
            title: "Studio moderne proche plage",
            location: "Biarritz",
            city: "Biarritz",
            country: "France",
            price: 95,
            rating: 4.76,
            reviews: 156,
            distance: 12.8,
            dates: "5-10 nov.",
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            images: [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
                "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800"
            ],
            isGuestFavorite: false,
            type: "Studio",
            guests: 2,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
            host: {
                name: "Camille",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
                isSuperhost: false
            },
            amenities: ["wifi", "kitchen", "beach", "tv"],
            description: "Studio rénové à 2 pas de la Grande Plage. Parfait pour un séjour surf ou détente au bord de l'océan.",
            coordinates: { lat: 43.4832, lng: -1.5586 }
        },
        {
            id: 6,
            title: "Maison typique en Provence",
            location: "Aix-en-Provence",
            city: "Aix-en-Provence",
            country: "France",
            price: 140,
            rating: 4.91,
            reviews: 203,
            distance: 18.5,
            dates: "15-22 nov.",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            images: [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
            ],
            isGuestFavorite: true,
            type: "Maison",
            guests: 5,
            bedrooms: 3,
            beds: 3,
            bathrooms: 2,
            host: {
                name: "Isabelle",
                avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200",
                isSuperhost: true
            },
            amenities: ["wifi", "pool", "kitchen", "garden", "parking", "bbq"],
            description: "Bastide provençale avec jardin arboré et piscine. Calme absolu à quelques minutes du centre historique d'Aix.",
            coordinates: { lat: 43.5297, lng: 5.4474 }
        },
        {
            id: 7,
            title: "Péniche aménagée sur la Seine",
            location: "Paris",
            city: "Paris",
            country: "France",
            price: 160,
            rating: 4.95,
            reviews: 78,
            distance: 3.2,
            dates: "20-25 nov.",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
            images: [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"
            ],
            isGuestFavorite: true,
            type: "Bateau",
            guests: 4,
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            host: {
                name: "Antoine",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
                isSuperhost: true
            },
            amenities: ["wifi", "kitchen", "tv", "parking"],
            description: "Expérience unique sur une péniche authentique. Vue magique sur la Tour Eiffel depuis la terrasse.",
            coordinates: { lat: 48.8589, lng: 2.35 }
        },
        {
            id: 8,
            title: "Cabane dans les arbres",
            location: "Bordeaux",
            city: "Bordeaux",
            country: "France",
            price: 110,
            rating: 4.82,
            reviews: 92,
            distance: 22.1,
            dates: "8-13 nov.",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
            images: [
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
                "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800"
            ],
            isGuestFavorite: false,
            type: "Cabane",
            guests: 2,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
            host: {
                name: "Lucas",
                avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
                isSuperhost: false
            },
            amenities: ["wifi", "kitchen", "nature", "hottub"],
            description: "Cabane perchée dans les pins avec jacuzzi privatif. Déconnexion garantie à 20 minutes de Bordeaux.",
            coordinates: { lat: 44.8378, lng: -0.5792 }
        }
    ],

    // Reviews for property detail page
    reviews: [
        {
            id: 1,
            author: "Claire",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
            date: "octobre 2024",
            rating: 5,
            text: "Séjour parfait ! L'appartement est exactement comme sur les photos, très propre et bien situé. Marie a été une hôte attentionnée et disponible. Je recommande vivement !"
        },
        {
            id: 2,
            author: "Thomas",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
            date: "septembre 2024",
            rating: 5,
            text: "Excellent emplacement, à deux pas du métro et des commerces. Le lit est très confortable et le quartier est calme la nuit."
        },
        {
            id: 3,
            author: "Emma",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
            date: "août 2024",
            rating: 4,
            text: "Très bon séjour dans l'ensemble. La décoration est soignée et l'appartement fonctionnel. Petit bémol sur la douche un peu petite."
        },
        {
            id: 4,
            author: "Nicolas",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
            date: "juillet 2024",
            rating: 5,
            text: "Superbe expérience ! Nous avons été accueillis chaleureusement et avons eu de bons conseils pour visiter Paris. À refaire !"
        },
        {
            id: 5,
            author: "Sophie",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
            date: "juin 2024",
            rating: 5,
            text: "Magique ! Cette péniche est un véritable havre de paix en plein Paris. Le lever de soleil sur la Seine depuis la terrasse est inoubliable."
        },
        {
            id: 6,
            author: "Marc",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
            date: "mai 2024",
            rating: 5,
            text: "Une expérience unique à faire au moins une fois dans sa vie. Antoine est un hôte passionnant qui connait bien son sujet."
        }
    ],

    // Amenities mapping
    amenitiesMap: {
        wifi: { icon: "fa-wifi", label: "Wifi" },
        kitchen: { icon: "fa-utensils", label: "Cuisine" },
        washer: { icon: "fa-tshirt", label: "Lave-linge" },
        tv: { icon: "fa-tv", label: "TV" },
        parking: { icon: "fa-car", label: "Parking gratuit" },
        ac: { icon: "fa-snowflake", label: "Climatisation" },
        workspace: { icon: "fa-laptop", label: "Espace de travail" },
        pool: { icon: "fa-swimming-pool", label: "Piscine" },
        bbq: { icon: "fa-fire", label: "Barbecue" },
        fireplace: { icon: "fa-fire-alt", label: "Cheminée" },
        ski: { icon: "fa-skiing", label: "Accès pistes" },
        hottub: { icon: "fa-hot-tub", label: "Jacuzzi" },
        beach: { icon: "fa-umbrella-beach", label: "Accès plage" },
        garden: { icon: "fa-tree", label: "Jardin" },
        nature: { icon: "fa-leaf", label: "Nature" }
    },

    // Rating categories
    ratingCategories: {
        proprete: { label: "Propreté", value: 4.9 },
        precision: { label: "Précision", value: 4.8 },
        communication: { label: "Communication", value: 4.9 },
        localisation: { label: "Emplacement", value: 4.7 },
        arrivee: { label: "Arrivée", value: 4.8 },
        qualitePrix: { label: "Qualité/Prix", value: 4.6 }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mockData;
}