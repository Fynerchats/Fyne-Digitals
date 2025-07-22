document.addEventListener('DOMContentLoaded', function() {
    // Authentication Tabs
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });
    
    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
    
    // Show Password Toggle
    const showPassword = document.getElementById('show-password');
    const passwordInput = document.getElementById('password');
    
    showPassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showPassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            showPassword.innerHTML = '<i class="fas fa-eye"></i>';
        }
    });
    
    // Registration
    const registerBtn = document.getElementById('register-btn');
    const regSuccessModal = document.getElementById('reg-success-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    registerBtn.addEventListener('click', function() {
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        
        if (!fullname || !email) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Generate random username and password
        const username = generateUsername();
        const password = generatePassword();
        
        // In a real app, you would send this to your backend
        console.log('Registration data:', { fullname, email, username, password });
        
        // Show success modal
        regSuccessModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', function() {
        regSuccessModal.style.display = 'none';
    });
    
    modalBtn.addEventListener('click', function() {
        regSuccessModal.style.display = 'none';
        // Switch to login tab after registration
        loginTab.click();
    });
    
    // Login
    const loginBtn = document.getElementById('login-btn');
    const authScreen = document.getElementById('auth-screen');
    const appContainer = document.getElementById('app-container');
    
    loginBtn.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        
        // In a real app, you would verify credentials with your backend
        console.log('Login attempt with:', { username, password });
        
        // For demo purposes, we'll just show the app
        authScreen.style.display = 'none';
        appContainer.style.display = 'block';
    });
    
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('expanded');
    });
    
    // Navigation between sections
    const secNavBtns = document.querySelectorAll('.sec-nav-btn');
    const menuBtns = document.querySelectorAll('.menu-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    function setActiveSection(sectionId) {
        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected section
        const activeSection = document.getElementById(sectionId + '-content');
        if (activeSection) {
            activeSection.classList.add('active');
        }
        
        // Update active state of navigation buttons
        secNavBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });
        
        menuBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });
    }
    
    secNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setActiveSection(this.dataset.section);
        });
    });
    
    menuBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setActiveSection(this.dataset.section);
        });
    });
    
    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    
    logoutBtn.addEventListener('click', function() {
        appContainer.style.display = 'none';
        authScreen.style.display = 'flex';
        // Clear form fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        // Switch to login tab
        loginTab.click();
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
    });
    
    // Helper functions for generating random username and password
    function generateUsername() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let username = '';
        const length = Math.floor(Math.random() * 3) + 10; // 10-12 characters
        
        for (let i = 0; i < length; i++) {
            username += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return username;
    }
    
    function generatePassword() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '?!.'; // Question mark, exclamation, fullstop
        let password = '';
        const length = Math.floor(Math.random() * 3) + 8; // 8-10 characters
        
        // Ensure at least one of each required character type
        password += letters.charAt(Math.floor(Math.random() * letters.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
        
        // Fill the rest with random characters
        const allChars = letters + numbers + symbols;
        for (let i = 3; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
        
        // Shuffle the password
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    }
});
// Make sure this is inside your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    // When notes button is clicked
    document.querySelectorAll('[data-section="notes"]').forEach(btn => {
        btn.addEventListener('click', function() {
            setActiveSection('notes');
        });
    });
    
    // Add to store button functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-store-btn')) {
            const btn = e.target.closest('.add-to-store-btn');
            alert('Added to store: ' + btn.dataset.noteId);
            // You'll implement the actual store functionality later
        }
    });
    
    // Your existing section switching function
    function setActiveSection(sectionId) {
        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected section
        document.getElementById(sectionId + '-content').classList.add('active');
        
        // Update active state of nav buttons
        document.querySelectorAll('.sec-nav-btn, .menu-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });
    }
});
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory storage for demo (use database in production)
const users = {};

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { fullname, email, role } = req.body;
    
    // Generate random credentials
    const username = generateUsername();
    const password = generatePassword();
    
    // Store user (in memory for demo)
    users[email] = { username, password, fullname, role };
    
    // Send email
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Fymerstu Account Credentials',
            html: `
                <h2>Welcome to Fymerstu, ${fullname}!</h2>
                <p>Here are your login credentials:</p>
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Password:</strong> ${password}</p>
                <p>Please keep this information secure.</p>
            `
        });
        res.json({ success: true, message: 'Registration successful. Check your email for credentials.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Find user by username
    const user = Object.values(users).find(u => u.username === username);
    
    if (user && user.password === password) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Helper functions
function generateUsername() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generatePassword() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '?!.';
    let password = '';
    
    // Ensure at least one of each type
    password += letters.charAt(Math.floor(Math.random() * letters.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    
    // Fill remaining characters
    const allChars = letters + numbers + symbols;
    for (let i = 3; i < 10; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    // Shuffle the password
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Registration form submission
    document.getElementById('register-btn').addEventListener('click', async function() {
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const role = document.querySelector('input[name="role"]:checked')?.value || 'student';
        
        if (!fullname || !email) {
            alert('Please fill in all required fields');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullname, email, role })
            });
            
            const data = await response.json();
            if (data.success) {
                alert(data.message);
                // Switch to login tab
                document.getElementById('login-tab').click();
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        }
    });
    
    // Login form submission
    document.getElementById('login-btn').addEventListener('click', async function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            if (data.success) {
                // Successful login
                document.getElementById('auth-screen').style.display = 'none';
                document.getElementById('app-container').style.display = 'block';
            } else {
                alert(data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed. Please try again.');
        }
    });
    
    // ... rest of your existing code ...
});
