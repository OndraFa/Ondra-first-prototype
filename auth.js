// Authentication module for Travel Insurance Broker

// Demo credentials
const DEMO_CREDENTIALS = {
    email: 'demo@example.com',
    username: 'demo',
    password: 'demo123'
};

// Check if user is logged in
function isLoggedIn() {
    const user = localStorage.getItem('user');
    if (!user) return false;
    
    try {
        const userData = JSON.parse(user);
        return userData.loggedIn === true;
    } catch (e) {
        return false;
    }
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('user');
    if (!user) return null;
    
    try {
        return JSON.parse(user);
    } catch (e) {
        return null;
    }
}

// Login function
function login(emailOrUsername, password, rememberMe = false) {
    // Check credentials
    const isValidEmail = emailOrUsername.toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase();
    const isValidUsername = emailOrUsername.toLowerCase() === DEMO_CREDENTIALS.username.toLowerCase();
    const isValidPassword = password === DEMO_CREDENTIALS.password;
    
    if ((isValidEmail || isValidUsername) && isValidPassword) {
        const userData = {
            email: DEMO_CREDENTIALS.email,
            username: DEMO_CREDENTIALS.username,
            loggedIn: true,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // If remember me, also store in sessionStorage for cross-tab sync
        if (rememberMe) {
            sessionStorage.setItem('user', JSON.stringify(userData));
        }
        
        return { success: true, user: userData };
    } else {
        return { success: false, error: 'Invalid email/username or password' };
    }
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Initialize login form
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Clear previous errors
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
        
        // Validate inputs
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }
        
        // Attempt login
        const result = login(email, password, rememberMe);
        
        if (result.success) {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showError(result.error || 'Login failed. Please check your credentials.');
        }
    });
}

// Show error message
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
}

// Check authentication on page load
function checkAuth() {
    // If on login page and already logged in, redirect to dashboard
    if (window.location.pathname.includes('login.html') || 
        window.location.pathname.endsWith('/') && !window.location.pathname.includes('dashboard')) {
        if (isLoggedIn()) {
            window.location.href = 'dashboard.html';
        }
        return;
    }
    
    // If not on login page and not logged in, redirect to login
    if (!isLoggedIn() && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initLoginForm();
        checkAuth();
    });
} else {
    initLoginForm();
    checkAuth();
}
