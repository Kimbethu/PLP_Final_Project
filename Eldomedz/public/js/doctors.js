document.addEventListener('DOMContentLoaded', () => {
    const doctorsList = document.getElementById('doctorsList');

    function showMessage(message) {
        const messageItem = document.createElement('li');
        messageItem.textContent = message;
        doctorsList.appendChild(messageItem);
    }

    showMessage('Loading doctors...');

    async function loadDoctors() {
        try {
            const response = await fetch('/api/doctors');
            doctorsList.innerHTML = '';

            if (response.ok) {
                const doctors = await response.json();

                if (doctors.length > 0) {
                    doctors.forEach((doctor) => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${doctor.doctor_name} - ${doctor.doctor_specialization}`;
                        doctorsList.appendChild(listItem);
                    });
                } else {
                    showMessage('No doctors found.');
                }
            } else {
                showMessage('Error loading doctors.');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('An unexpected error occurred. Please try again later.');
        }
    }

    loadDoctors();
});
