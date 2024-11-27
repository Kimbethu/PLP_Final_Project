document.addEventListener('DOMContentLoaded', () => {
    const profileSection = document.getElementById('profile');
    const appointmentsSection = document.getElementById('appointment');
    const profileLink = document.getElementById('profileLink');
    const appointmentsLink = document.getElementById('appointmentLink');
    const logoutButton = document.getElementById('logout');
  
    profileLink.addEventListener('click', loadProfile);
    appointmentsLink.addEventListener('click', loadAppointment);
    logoutButton.addEventListener('click', logoutUser);
  
    async function loadProfile() {
      profileSection.style.display = 'block';
      appointmentsSection.style.display = 'none';
  
      try {
        const response = await fetch('/users/profile', { method: 'GET' });
        const userData = await response.json();
  
        if (response.ok) {
          document.getElementById('userName').innerText = `Name: ${userData.name}`;
          document.getElementById('userEmail').innerText = `Email: ${userData.email}`;
          document.getElementById('userPhone').innerText = `Phone: ${userData.phone}`;
          document.getElementById('userAddress').innerText = `Address: ${userData.address}`;
        } else {
          alert('Error loading profile.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    async function loadAppointment() {
      profileSection.style.display = 'none';
      appointmentsSection.style.display = 'block';
  
      try {
        const response = await fetch('/appointment', { method: 'GET' });
        const appointments = await response.json();
  
        if (response.ok) {
          const appointmentList = document.getElementById('appointmentList');
          appointmentList.innerHTML = '';
  
          appointments.forEach((appointment) => {
            const li = document.createElement('li');
            li.innerText = `Appointment with Dr. ${appointment.doctorName} on ${appointment.date} at ${appointment.time}`;
            appointmentList.appendChild(li);
          });
        } else {
          alert('Error loading appointments.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    async function logoutUser() {
      try {
        const response = await fetch('/auth/logout', { method: 'POST' });
        if (response.ok) {
          window.location.href = 'login.html';
        } else {
          alert('Logout failed.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
  