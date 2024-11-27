document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this); 
    const submitButton = this.querySelector('button[type="submit"]');

    // Disable the button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = 'Booking...';

    fetch('/appointment/book', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert(data.message); 

        updateAppointmentsList(data.appointments); 
        this.reset();
    })
    .catch(error => {
        console.error('Error booking appointment:', error);
        if (error instanceof TypeError) {
            alert('Network error. Please check your connection.');
        } else {
            alert('Failed to book appointment. Please ensure all fields are filled out correctly and try again.');
        }
    })
    .finally(() => {
        // Re-enable the button
        submitButton.disabled = false;
        submitButton.textContent = 'Book Appointment';
    });
});

// Function to update the appointment list dynamically
function updateAppointmentsList(appointments) {
    const appointmentsContainer = document.querySelector('table.appointments-table tbody');
    
    // Clear existing rows
    appointmentsContainer.innerHTML = '';

    // Loop through appointments and add rows to the table
    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${appointment.doctor_name}</td>
            <td>${appointment.doctor_specialization}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>${appointment.status}</td>
        `;
        
        appointmentsContainer.appendChild(row);
    });
}
