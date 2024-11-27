document.getElementById('profileForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      document.getElementById('message').textContent = result.message;
    } catch (error) {
      document.getElementById('message').textContent = 'An unexpected error occurred.';
      console.error(error);
    }
  });
  