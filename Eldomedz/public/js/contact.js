document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      document.getElementById('feedback').textContent = result.message;
    } catch (error) {
      document.getElementById('feedback').textContent = 'An error occurred while sending the message.';
      console.error(error);
    }
  });
  