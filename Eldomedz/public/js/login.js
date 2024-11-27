document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store patient_id in sessionStorage
            sessionStorage.setItem('patient_id', data.patient_id);
            alert('Login successful!');
            window.location.href = '/dashboard'; 
        } else {
            alert(data.message || 'Login failed. Please try again.');
        }
        
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});
