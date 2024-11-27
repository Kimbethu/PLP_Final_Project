document.addEventListener('DOMContentLoaded', () => {
    const addDoctorForm = document.getElementById('addDoctorForm');
    const submitButton = addDoctorForm.querySelector('button[type="submit"]');

    // Handle form submission
    addDoctorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitButton.disabled = true; 

        const formData = {
            doctor_name: document.getElementById('doctor_name').value,
            email: document.getElementById('email').value,
            doctor_specialization: document.getElementById('doctor_specialization').value,
            availability: document.getElementById('availability').value,
        };

        try {
            const response = await fetch('/api/doctors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Doctor added successfully.');
                window.location.href = 'doctors.html'; 
            } else {
                alert(result.message || 'An error occurred. Please try again.'); 
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        } finally {
            submitButton.disabled = false; 
        }
    });
});
