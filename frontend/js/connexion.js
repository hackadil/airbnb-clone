// Login/Register Page Logic

// Populate date dropdowns
document.addEventListener('DOMContentLoaded', () => {
    populateDateDropdowns();
    setupForms();
});

function populateDateDropdowns() {
    const daySelect = document.getElementById('reg-day');
    const monthSelect = document.getElementById('reg-month');
    const yearSelect = document.getElementById('reg-year');

    // Days
    if (daySelect) {
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }
    }

    // Months
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    if (monthSelect) {
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = month;
            monthSelect.appendChild(option);
        });
    }

    // Years (from 18 years ago to 100 years ago)
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear - 18; i >= currentYear - 100; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }
}

function setupForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Login form
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const btn = document.getElementById('login-btn');

        // Validation
        if (!Utils.isValidEmail(email)) {
            showError('Veuillez entrer un email valide');
            return;
        }

        // Show loading
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        try {
            const result = await API.login({ email, password });
            showSuccess('Connexion réussie !');
            
            // Redirect after short delay
            setTimeout(() => {
                const redirect = Utils.getUrlParams().redirect;
                window.location.href = redirect || 'index.html';
            }, 1000);

        } catch (error) {
            showError(error.message || 'Identifiants incorrects');
            btn.innerHTML = 'Se connecter';
            btn.disabled = false;
        }
    });

    // Register form
    registerForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('reg-firstname').value;
        const lastName = document.getElementById('reg-lastname').value;
        const email = document.getElementById('reg-email').value;
        const day = document.getElementById('reg-day').value;
        const month = document.getElementById('reg-month').value;
        const year = document.getElementById('reg-year').value;
        const password = document.getElementById('reg-password').value;
        const terms = document.getElementById('reg-terms').checked;
        const btn = document.getElementById('register-btn');

        // Validation
        if (!firstName || !lastName) {
            showError('Veuillez entrer votre nom et prénom');
            return;
        }

        if (!Utils.isValidEmail(email)) {
            showError('Veuillez entrer un email valide');
            return;
        }

        if (!day || !month || !year) {
            showError('Veuillez sélectionner votre date de naissance');
            return;
        }

        if (!Utils.isValidPassword(password)) {
            showError('Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre');
            return;
        }

        if (!terms) {
            showError('Vous devez accepter les conditions générales');
            return;
        }

        // Show loading
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        try {
            const birthDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            const result = await API.register({
                firstName,
                lastName,
                email,
                birthDate,
                password
            });

            showSuccess('Inscription réussie !');
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);

        } catch (error) {
            showError(error.message || 'Erreur lors de l\'inscription');
            btn.innerHTML = 'S\'inscrire';
            btn.disabled = false;
        }
    });
}

// Tab switching
function switchTab(tab) {
    const loginTab = document.getElementById('tab-login');
    const registerTab = document.getElementById('tab-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (tab === 'login') {
        loginTab.classList.add('tab-active');
        loginTab.classList.remove('tab-inactive');
        registerTab.classList.remove('tab-active');
        registerTab.classList.add('tab-inactive');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        registerTab.classList.add('tab-active');
        registerTab.classList.remove('tab-inactive');
        loginTab.classList.remove('tab-active');
        loginTab.classList.add('tab-inactive');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }

    // Clear messages
    hideError();
    hideSuccess();
}

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.currentTarget.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Error/Success message handling
function showError(message) {
    const errorEl = document.getElementById('error-message');
    const successEl = document.getElementById('success-message');
    
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }
    if (successEl) {
        successEl.classList.add('hidden');
    }
}

function showSuccess(message) {
    const errorEl = document.getElementById('error-message');
    const successEl = document.getElementById('success-message');
    
    if (successEl) {
        successEl.textContent = message;
        successEl.classList.remove('hidden');
    }
    if (errorEl) {
        errorEl.classList.add('hidden');
    }
}

function hideError() {
    const errorEl = document.getElementById('error-message');
    if (errorEl) errorEl.classList.add('hidden');
}

function hideSuccess() {
    const successEl = document.getElementById('success-message');
    if (successEl) successEl.classList.add('hidden');
}