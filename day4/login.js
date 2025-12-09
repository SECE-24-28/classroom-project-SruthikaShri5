document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    let isValid = true;
    
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }
    
    
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    } else {
        document.getElementById('passwordError').textContent = '';
    }
    
    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', user.name);
            localStorage.setItem('userMobile', user.mobile);
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials! Please sign up first.');
            window.location.href = 'signup.html';
        }
    }
});
